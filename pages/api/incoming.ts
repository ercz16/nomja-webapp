import { firebaseAdmin } from '../../utils/firebase/FirebaseAdmin'
import { search } from '../../utils/vision/Vision'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { sendMessage } from '../../utils/plivo/Plivo'
import { withSentry } from '@sentry/nextjs'

enum TextType {
    COMMAND = "COMMAND",
    JOIN = "JOIN",
    OTHER = "OTHER"
}

var commands = ['rewards', 'commands', 'leave']

const isCommand = (text: string) => {
    for (var command of commands) {
        if (text.toLowerCase().includes(command)) return true
    }
    return false
}

const getCommand = (text: string) => {
    for (var command of commands) {
        if (text.toLowerCase().includes(command)) return command
    }
    return undefined
}

interface IProgram {
    creation: string,
    description?: string,
    id: string,
    name: string,
    rewards: Array<any>,
    users: Array<any>
}

interface ICustomer {
    phoneNumber: string,
    programs: Array<IProgram>
}

const getCustomer = async (from: string) => {
    const snapshot = await firebaseAdmin.firestore().collection('customers').doc(from).get()
    return snapshot.data()
}

const getSpendLink = async (customer, program) => {
    const db = firebaseAdmin.firestore().collection('spendLinks')
    const schema = {
        id: nanoid(8),
        redirect: {
            customer: customer.phoneNum,
            program: program.id
        },
        expire: new Date(new Date().setHours(new Date().getHours() + 1)).toString(),
    }
    const create = await db.doc(schema.id).set(schema)
    return `https://nomja.io/u/${schema.id}`
}

const executeCommand = async (text: string, to: string, from: string) => {
    const command = getCommand(text)
    const customer = await getCustomer(from)
    switch (command) {
        case 'leave':
            const program = await firebaseAdmin.firestore().collection('programs').where('phoneNum', '==', to).get()
            if (program.docs.length == 0) {
                return handleText('', to, from)
            } else {
                const first = program.docs[0].data()
                const programToRemove = first.users.filter(user => user.phoneNum == from)[0]
                if (!programToRemove || programToRemove.length == 0) {
                    return `You are not currently subscribed to @${first.uniqueCode}`
                }
                const update = await firebaseAdmin.firestore().collection('programs').doc(first.id).update({ users: 
                firebaseAdmin.firestore.FieldValue.arrayRemove(first.users.filter(user => user.phoneNum == from)[0])})
                const customerUpdate = await firebaseAdmin.firestore().collection('customers').doc(from).update({ programs: 
                    firebaseAdmin.firestore.FieldValue.arrayRemove(customer.programs.filter(program => program.id == first.id)[0]) })
                return `You have successfully left @${first.uniqueCode}`
            }
        case 'rewards':
            const snapshot = await firebaseAdmin.firestore().collection('customers').doc(from).get()
            const data = snapshot.data()
            var totalPoints = 0, totalVisits = 0
            data.rewards.forEach(reward => {
                if (reward.phoneNum == to) {
                    switch (reward.type) {
                        case "POINTS":
                            totalPoints += reward.amount
                            break
                        case "VISIT":
                            totalVisits++
                            break
                    }
                }
            })
            const programSnapshot = await firebaseAdmin.firestore().collection('programs').where('phoneNum', '==', to).get()
            let availableRewards = new Array()
            if (programSnapshot.docs.length != 0) {
                const programData = programSnapshot.docs[0].data()
                for (const reward of programData.rewards) {
                    switch (reward.attributes.type) {
                        case "POINTS":
                            if (reward.attributes.required <= totalPoints) {
                                availableRewards.push({ reward: reward, program: programData.id })
                            }
                            break
                        case "VISIT":
                        if (reward.attributes.required <= totalVisits) {
                            availableRewards.push({ reward: reward, program: programData.id })
                        }
                        break 
                    }
                }  
            }
            const spendLink = await getSpendLink(data, programSnapshot.docs[0].data())
            return `You have a total of ${totalPoints} points and ${totalVisits} visits at ${programSnapshot.docs[0].data().name}. Spend them at ${spendLink}`
        case 'commands':
            return 'Text REWARDS to see available rewards. LEAVE to stop receiving messages.'
    }
}

const handleJoin = async (from: string, text: string) => {
    const code = getJoinCode(text)
    const program = await firebaseAdmin.firestore().collection('programs').where('uniqueCode', '==', code.toLowerCase()).get()
    if (program.docs.length == 0) {
        return `@${code} is an invalid join code.`
    } else {
        const first = program.docs[0].data()
        if (first.users.filter(user => user.phoneNum == from).length != 0) {
            return 'You have already joined this program.'
        }
        const update = await firebaseAdmin.firestore().collection('programs').doc(first.id).update({ users: 
        firebaseAdmin.firestore.FieldValue.arrayUnion({
            phoneNum: from,
            date: new Date().toString()
        })}) 
        const customerUpdate = await firebaseAdmin.firestore().collection('customers').doc(from).update({ programs: 
        firebaseAdmin.firestore.FieldValue.arrayUnion({
            id: first.id,
            uniqueCode: first.uniqueCode,
            joined: new Date().toString()
        })})
        return `You have successfully joined @${code}. Text LEAVE to leave it.`
    }
}

const getJoinCode = (text: string) => {
    return text.split(' ')[0].substring(1)
}

const handleReceive = async (text: string, to: string, from: string, type: TextType) => {
    const db = firebaseAdmin.firestore().collection('customers')
    const doc = await db.doc(from).get()
    if (!doc.exists) {
        const addition = await db.doc(from).set({ id: nanoid(32), programs: new Array(), rewards: [], phoneNum: from, messageHistory: new Array(), lastMessage: {}})
    }
    const lastMessageUpdate = await db.doc(from).update({ lastMessage: { text: text, type: type }})
    const messageHistoryUpdate = await db.doc(from).update({ messageHistory: firebaseAdmin.firestore.FieldValue.arrayUnion({ 
        at: new Date().toString(), from: from, to: to, text: text, type: type }) })
    return null
}

const handleText = async (text: string, to: string, from: string) => {
    var commands = ['rewards', 'commands', 'leave']
    var type: TextType = text.toLowerCase().startsWith('@') ? TextType.JOIN : isCommand(text) ? TextType.COMMAND : TextType.OTHER
    const received = await handleReceive(text, to, from, type)
    switch (type) {
        case TextType.COMMAND:
            const execution = await executeCommand(text, to, from)
            return execution
        case TextType.JOIN:
            const join = await handleJoin(from, text)
            return join
        case TextType.OTHER:
            return 'Sorry, we did not get that. Text \'commands\' to view commands.'
    }
}

const process = async (uuid) => {
    const doc = await firebaseAdmin.firestore().collection('queuedMessages').doc(uuid).set({ start: new Date().toISOString() })
}

const isProcessing = async (uuid) => {
    const doc = await firebaseAdmin.firestore().collection('queuedMessages').doc(uuid).get()
    return doc.exists
}

const handler = async (req, res) => {
    if (req.method != 'POST') {
        return res.status(400).json({ errors: [{ message: 'Invalid request method' }]})
    }
    
    const { From, To, Text, MediaCount, MessageUUID } = req.body

    const beingProcssed = await isProcessing(MessageUUID)

    if (beingProcssed) {
        return res.status(400).json({ errors: [{ message: 'Currently processing this message.' }]})
    } else {
        process(MessageUUID)
    }

    var hasMedia = MediaCount
    if (!hasMedia) {
        const toSend = await handleText(Text, To, From)
        const sent = await sendMessage({ to: From, from: To, body: toSend })
        return res.status(200).json(sent)
    } else {
        const url = req.body.Media0
        const fetch = await axios.get(url)
        const redirect = fetch.request.res.responseUrl

        const base64 = await axios.get(redirect, {
            responseType: "arraybuffer",
        })

        const base64response = await Buffer.from(
            base64.data,
            "binary"
        )
        
        try {
            const [date, amount] = await search(base64response)
            const customerPoints = await firebaseAdmin.firestore().collection('customers').doc(From).update({ rewards: firebaseAdmin.firestore.FieldValue.arrayUnion({ type: 'POINTS', purchaseDate: date.toString(), amount: Math.floor(amount), phoneNum: To, date: new Date().toString() })})
            const customerVisit = await firebaseAdmin.firestore().collection('customers').doc(From).update({ rewards: firebaseAdmin.firestore.FieldValue.arrayUnion({ type: 'VISIT', purchaseDate: date.toString(), amount: 1, phoneNum: To, date: new Date().toString() })})
            const sent = await sendMessage({ to: From, from: To, body: `Successfully redeemed your receipt for ${Math.floor(amount)} points and 1 visit!` })
            return res.status(200).json(sent)
        } catch (e) {
            console.log(e)
            const sent = await sendMessage({ to: From, from: To, body: 'Something went wrong. Please make sure you have your receipt in the image.' })
            return res.status(200).json(sent)
        }
    }
}

export default withSentry(handler)
import { firebaseAdmin } from '../../utils/firebase/FirebaseAdmin'

const sendMessage = async (from, to, text) => {
    const db = await firebaseAdmin.firestore().collection('messages')
    const queue = await db.add({ from: from, to: to, body: text })
    return {
        from: from,
        to: to,
        body: text
    }
}

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
                const update = await firebaseAdmin.firestore().collection('programs').doc(first.id).update({ users: 
                firebaseAdmin.firestore.FieldValue.arrayRemove(first.users.filter(user => user.phoneNum == from)[0])})
                const customerUpdate = await firebaseAdmin.firestore().collection('customers').doc(from).update({ programs: 
                    firebaseAdmin.firestore.FieldValue.arrayRemove(customer.programs.filter(program => program.id == first.id)[0]) })
                return `You have successfully left @${first.uniqueCode}`
            }
        case 'rewards':
            const snapshot = await firebaseAdmin.firestore().collection('customers').doc(from).get()
            if (!snapshot.exists) {
                const creation = await firebaseAdmin.firestore().collection('customers').doc(from).set({ rewards: new Array(), phoneNumber: from, programs: new Array() })
                return 'You have a total of 0 points'
            }
            const data = await snapshot.data()
            const rewards = data.reward.filter(reward => reward.phoneNum == to && reward.type == "POINTS")
            var totalPoints = 0
            for (const reward of rewards) {
                totalPoints += reward.amount
            }
            return 'You have a total of ' + totalPoints
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
        const addition = await db.doc(from).set({ programs: new Array(), phoneNum: from, messageHistory: new Array(), lastMessage: {}})
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

const handler = async (req, res) => {
    const { From, To, Text, MediaCount} = req.body
    var hasMedia = MediaCount
    if (!hasMedia) {
        const toSend = await handleText(Text, To, From)
        const sent = await sendMessage(To, From, toSend)
        return res.status(200).json(sent)
    } else {
        const sent = await sendMessage(To, From, "media")
        return res.status(200).json(sent)
    }
}

export default handler
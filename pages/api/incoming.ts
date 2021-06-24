import { firebaseAdmin } from '../../utils/firebase/FirebaseAdmin'
import RewardRedeem from '../u/[...id]'

const sendMessage = async (from, to, text) => {
    const db = await firebaseAdmin.firestore().collection('messages')
    const queue = await db.add({ to: to, body: text })
    return {
        to: to,
        body: text
    }
}

enum TextType {
    COMMAND = "COMMAND",
    JOIN = "JOIN",
    OTHER = "OTHER"
}

var commands = ['rewards', 'commands']

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

const executeCommand = async (text: string, to: string, from: string) => {
    const command = getCommand(text)
    switch (command) {
        case 'rewards':
            const snapshot = await firebaseAdmin.firestore().collection('customers').doc(from).get()
            if (!snapshot.exists) {
                const creation = await firebaseAdmin.firestore().collection('customers').doc(from).set({ rewards: new Array(), phoneNumber: from, programs: new Array() })
                return 'You have a total of 0 pointsa'
            }
            const data = await snapshot.data()
            const rewards = data.reward.filter(reward => reward.phoneNum == to && reward.type == "POINTS")
            var totalPoints = 0
            for (const reward of rewards) {
                totalPoints += reward.amount
            }
            return 'You have a total of ' + totalPoints
        case 'commands':
            return 'Text REWARDS to see available rewards. STOP to stop receiving messages.'
    }
}

const getJoinCode = (text: string) => {
    return text.split(' ')[0].substring(1)
}

const handleText = async (text: string, to: string, from: string) => {
    var commands = ['rewards', 'commands']
    var type: TextType = text.toLowerCase().startsWith('@') ? TextType.JOIN : isCommand(text) ? TextType.COMMAND : TextType.OTHER
    switch (type) {
        case TextType.COMMAND:
            const execution = await executeCommand(text, to, from)
            return execution
        case TextType.JOIN:
            return getJoinCode(text)
        case TextType.OTHER:
            return 'Sorry, we did not get that. Send \'commands\' to view commands.'
    }
}

const handler = async (req, res) => {
    const { From, To, Text, MediaCount} = req.body
    var hasMedia = MediaCount
    if (!hasMedia) {
        const toSend = await handleText(Text, To, From)
        const sent = sendMessage(From, To, toSend)
        return res.status(200).json(sent)
    } else {
        const sent = sendMessage(From, To, "media")
        return res.status(200).json(sent)
    }
}

export default handler
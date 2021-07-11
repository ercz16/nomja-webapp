//import { withSentry } from '@sentry/nextjs'
import { client } from '../../../utils/plivo/Plivo'
import { firebaseAdmin } from '../../../utils/firebase/FirebaseAdmin'

const assign = async (programId) => {
    const numberToGet = await nextAvailable()
    const purchase = await client.numbers.buy(numberToGet.id, '89146420176655219')
    const numbers = await client.numbers.update(purchase.numbers[0].number, { subAccount: null, alias: programId, appId: '89146420176655219' })
    return purchase.numbers[0].number
}

const nextAvailable = async () => {
    const numbers = await client.numbers.search('US', { type: 'local' })
    const first = numbers[0]
    return first
}

const handler = async (req, res) => {
    if (req.method != 'POST') return res.status(400).json({ errors: [{ message: 'Invalid request method.'}]})
    const { apiKey, programId } = req.body
    const possibleUsers = await firebaseAdmin.firestore().collection('users')
        .where('apiKeys', 'array-contains', apiKey).get()
    if (possibleUsers.docs.length > 1 || possibleUsers.docs.length == 0) {
        return res.status(400).json({ errors: [{ message: 'Invalid Api Key.'}]})
    } else {
        const user = possibleUsers.docs[0].data()
        const number = await assign(programId)
        return res.status(200).json({ phoneNum: number })
    }

    return res.status(200).json({})
}

export default handler
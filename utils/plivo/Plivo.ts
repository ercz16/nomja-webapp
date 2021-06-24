import { Client } from 'plivo'

const client = new Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN)

interface IAssignResponse {
    phoneNum: string
}

const assign = async (programId: string): Promise<IAssignResponse> => {
    const numberToGet = await nextAvailable()
    const purchase = await client.numbers.buy(numberToGet.id, '89146420176655219')
    const numbers = await client.numbers.update(purchase.numbers[0].number, { subAccount: null, alias: programId, appId: '89146420176655219' })
    return {
        phoneNum: purchase.numbers[0].number
    }
}

const nextAvailable = async () => {
    const numbers = await client.numbers.search('US', { type: 'local' })
    const first = numbers[0]
    return first
}

export { client, nextAvailable, assign }
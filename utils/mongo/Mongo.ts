import { MongoClient, Collection } from 'mongodb'

const url = `mongodb://admin:${process.env.MONGO_PASSWORD}@18.232.51.243:27017/nomja?retryWrites=true&w=majority`
const client = new MongoClient(url)

const getCollection = async (name): Promise<Collection> => {
    try {
        await client.connect()

        const db = client.db('nomja')

        return db.collection(name)
    } catch (e) {
        console.error(e)
    }
}

export { getCollection }
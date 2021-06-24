import { nanoid } from 'nanoid'
import { firestore } from '../firebase/Firebase'

interface IProgramOptions { 
    name: string,
    description?: string,
    uniqueCode: SVGAnimatedString
}

const createClientProgram = async (uid, options: IProgramOptions) => {
    const schema = {
        creation: new Date().toString(),
        description: !options.description ? "" : options.description,
        name: options.name,
        id: nanoid(16),
        rewards: new Array(),
        users: new Array(),
        uniqueCode: options.uniqueCode,
        phoneNum: '19046183090'
    }

    const userUpdate = await firestore().collection('users').doc(uid).update({ programs: firestore.FieldValue.arrayUnion(schema) })
    const programUpdate = await firestore().collection('programs').doc(schema.id).set(schema)
    return schema
}

export { createClientProgram }
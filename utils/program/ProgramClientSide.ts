import { nanoid } from 'nanoid'
import QRCode from 'qrcode'
import firebase from '../firebase/Firebase'
const firestore = firebase.firestore, auth = firebase.auth, functions = firebase.functions

interface IProgramOptions { 
    name: string,
    description?: string,
    uniqueCode: string
}

console.log(firebase.app)

var assignPhoneNumber = functions().httpsCallable('assignPhoneNumber')
var deleteProgramFunc = functions().httpsCallable('deleteProgram')

const createClientProgram = async (user, options: IProgramOptions) => {
    const programId = nanoid(16)
    const phoneNum = await assignPhoneNumber({ user: user, programId: programId })

    const qrcode = await QRCode.toDataURL(`SMSTO:${phoneNum.data.phoneNum.phoneNum}:@${options.uniqueCode.toLowerCase()}`, { scale: 25 })

    const schema = {
        creation: new Date().toString(),
        description: !options.description ? "" : options.description,
        name: options.name,
        id: programId,
        rewards: new Array(),
        users: new Array(),
        uniqueCode: options.uniqueCode.toLowerCase(),
        phoneNum: phoneNum.data.phoneNum.phoneNum,
        qrcode: qrcode
    }

    console.log(schema)

    const userUpdate = await firestore().collection('users').doc(user.login.uid).update({ programs: firestore.FieldValue.arrayUnion(schema) })
    const programUpdate = await firestore().collection('programs').doc(schema.id).set(schema)
    return schema
}

const deleteProgram = async (uid, programId) => {
    const db = firestore().collection('programs')
    const snapshot = await db.doc(programId).get()
    const userDoc = await firestore().collection('users').doc(uid).get()
    const userUpdate = await firestore().collection('users').doc(uid).update({ programs: firestore.FieldValue.arrayRemove(userDoc.data().programs.filter(program => program.id == programId)[0])})
    for (const user of snapshot.data().users) {
        const customerDoc = await firestore().collection('customers').doc(user.phoneNum).get()
        const notify = await firestore().collection('messages').add({ from: snapshot.data().phoneNum, to: user.phoneNum,
             body: `${snapshot.data().uniqueCode} has been deleted. You will no longer receive texts from this number.`})
        const customerUpdate = await firestore().collection('customers').doc(user.phoneNum).update({ programs: 
            firestore.FieldValue.arrayRemove(customerDoc.data().programs.filter(program => program.id == snapshot.data().id)) })
    }
    deleteProgramFunc({ program: snapshot.data() })
    const deletion = await db.doc(programId).delete()
}

export { createClientProgram, deleteProgram }
import { firebaseAdmin } from '../firebase/FirebaseAdmin'

const fetchSSRInfo = async (id) => {
    const db = await firebaseAdmin.firestore().collection('programs')
    const doc = await db.doc(id).get()
    if (!doc.exists) throw new Error('Invalid program ID')
    const data = await doc.data()
    return data
}

export { fetchSSRInfo } 
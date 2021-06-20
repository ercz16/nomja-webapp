import { useDebugValue } from 'react'
import { auth, firestore } from '../firebase/Firebase'

interface ISignUpOptions {
    first: string,
    last: string,
    email: string,
    birthday: string,
    phone?: string,
    password: string
}

const signUp = async (options: ISignUpOptions) => {
    const user = await auth().createUserWithEmailAndPassword(options.email, options.password)
    const db = await firestore().collection('users')
    const snapshot = await db.doc(user.user.uid).get()
    if (!snapshot.exists) {
        const doc = await db.doc(user.user.uid).set({
            birthday: options.birthday != undefined ? options.birthday : "",
            email: options.email,
            emailVerified: false,
            login: {
                uid: user.user.uid
            },
            name: {
                first: options.first,
                last: options.last
            },
            programs: [],
            registered: {
                at: new Date().toString()
            }
        })
        return doc
    } else {
        throw new Error('User already exists')
    }
}

const signIn = async (email, password) => {
    const user = await auth().signInWithEmailAndPassword(email, password)
    return user
}

export { signUp, signIn }
import { auth } from '../firebase/Firebase'

const signUp = async (email, password) => {
    const user = await auth().createUserWithEmailAndPassword(email, password)
    return { uid: user.user.uid, email: user.user.email }
}

const signIn = async (email, password) => {
    const user = await auth().signInWithEmailAndPassword(email, password)
    return user
}

export { signUp, signIn }
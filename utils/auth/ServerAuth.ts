import nookies from "nookies"

import { firebaseAdmin } from '../firebase/FirebaseAdmin'

const getSSRAuth = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
        const { uid } = token

        console.log(uid)

        const user = await firebaseAdmin.firestore().collection('users').doc(uid).get()

        if (!user.exists) throw new Error('User does not exist')

        const data = await user.data()

        return data
    } catch (e) {
        console.error(e)
        return {}
    }
}

const getSSRProps = async (ctx) => {
    try {
        const user = await getSSRAuth(ctx)
        return {
            props: {
                user: user
            }
        }
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/signin'
            }, 
            props: {} as never
        }
    }
}

export { getSSRAuth, getSSRProps }
import nookies from "nookies"

import { firebaseAdmin } from '../firebase/FirebaseAdmin'
import { fetchSSRInfo } from '../program/Program'

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

const getSSRPropsUser = async (ctx) => {
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

const getSSRPropsProgram = async (ctx) => {
    const { id } = ctx.query
    try {
        const user = await getSSRAuth(ctx)
        const program = await fetchSSRInfo(id[0])
        return {
            props: {
                user: user,
                program: program
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

export { getSSRAuth, getSSRPropsUser, getSSRPropsProgram }
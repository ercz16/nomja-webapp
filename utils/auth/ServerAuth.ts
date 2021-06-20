import nookies from "nookies"

import { firebaseAdmin } from '../firebase/FirebaseAdmin'
import { fetchSSRInfo } from '../program/Program'

const getSSRAuth = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
        const { uid } = token

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

const getSSRPropsRedeem = async (ctx) => {
    const { id, p } = ctx.query

    try {
        if (!id || !p) throw new Error('Invalid ID or Program ID')

        const idDoc = await firebaseAdmin.firestore().collection('redeemShorts').doc(id).get()
        if (!idDoc.exists) throw new Error('Invalid User ID')
        const idData = await idDoc.data()
        if (new Date().getTime() > new Date(idData.expire).getTime()) throw new Error('Expired')

        const customer = await firebaseAdmin.firestore().collection('customers').doc(idData.userRedirect).get()
        if (!customer.exists) throw new Error('Invalid User ID')
        const customerData = await customer.data()
        
        const customerProgramData = customerData.programs.filter(program => program.id == idData.programRedirect)
        if (!customerProgramData) throw new Error('User is not in said program')
        var points = customerProgramData.points

        const program = await firebaseAdmin.firestore().collection('programs').doc(idData.programRedirect).get()
        if (!program.exists) throw new Error('Program ID does not exist')
        const programData = await program.data()

        const rewards = programData.rewards.filter(reward => reward.attributes.type == 'points' && reward.attributes.requirement <= points)
        return {
            props: {
                available: rewards
            }
        }

    } catch (e) {
        return {
            props: {
                available: []
            }
        }
    }
}

export { getSSRAuth, getSSRPropsUser, getSSRPropsProgram, getSSRPropsRedeem }

import { firebaseAdmin } from '../../../utils/firebase/FirebaseAdmin'

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id

    if (!id) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/signin'
            },
            props: {} as never
        }
    }

    const query = await firebaseAdmin.firestore().collection('users').where('verifyEmail', 'array-contains', id).get()

    for (const doc of query.docs) {
        const updateAuth = await firebaseAdmin.auth().updateUser(doc.data().login.uid, { emailVerified: true })
        const updateUser = await firebaseAdmin.firestore().collection('users').doc(doc.data().login.uid).update({ emailVerified: true, verifyEmail: firebaseAdmin.firestore.FieldValue.arrayRemove(id) })
    }

    return {
        redirect: {
            permanent: false,
            destination: '/manage'
        },
        props: {} as never
    }
}

const VerifyEmail = () => {
    return (
        <>
        </>
    )
}

export default VerifyEmail
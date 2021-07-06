import { firebaseAdmin } from '../../../utils/firebase/FirebaseAdmin'

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id
    if (!id) {
        return {
            props: {} as never,
            redirect: {
                permanent: false,
                destination: '/auth/signin'
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

const PasswordReset = (props) => {
    return (
        <>
        </>
    )
}

export default PasswordReset
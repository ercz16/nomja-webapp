import { firebaseAdmin } from '../../utils/firebase/FirebaseAdmin'
import firebase from '../../utils/firebase/Firebase'
import { useState } from "react";

export const getServerSideProps = async (ctx) => {
    const uid = ctx.query.account

    const doc = await firebaseAdmin.firestore().collection('users').doc(uid).get()

    if (!doc.exists) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/signin'
            },
            props: {} as never
        }
    }

    if (doc.data().emailVerified) {
        return {
            redirect: {
                permanent: false,
                destination: '/manage'
            },
            props: {} as never
        }
    }

    return {
        props: {
            user: doc.data()
        }
    }
}

const NewAccount = (props) => {
    const { user } = props

    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const sendAgain = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const sendWelcomeEmailManual = firebase.functions().httpsCallable('sendWelcomeEmailManual')
            const sent = await sendWelcomeEmailManual({user: user})

            setSent(true)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
        
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-500 bg-opacity-50 to-indigo-600">
            <div className="fixed w-3/4 lg:w-max left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)'}}>
                <div className="flex flex-col p-6 bg-white rounded shadow-sm gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 fill-current text-gray-400 p-2 rounded-full bg-gray-100" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 font-medium text-xl">Hello { user.name.first },</p>
                        <p className="text-gray-500 text-md">Please click on the link in the email sent to you to verify your email address.</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 mt-5">
                        <p className="text-md text-gray-500">Have received an email?</p>
                        <button disabled={loading || sent} onClick={sendAgain} className={`${loading ? 'gap-2 bg-indigo-400' : 'gap-1 bg-indigo-500 hover:bg-indigo-600'} text-white flex flex-row items-center px-2 py-1 rounded shadow-sm ${loading || sent ? 'cursor-not-allowed' : ''}`}>
                            <ButtonContents sent={sent} loading={loading} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ButtonContents = (props) => {
    const { loading, sent } = props
    if (loading) {
        return (
            <>
                <span>Sending</span>
                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </>
        )
    } else if (sent) {
        return (
            <>
                <span>Sent!</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </>
        )
    } else {
        return (
            <>
                <span>Send Again</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </>
        )
    }
}

export default NewAccount
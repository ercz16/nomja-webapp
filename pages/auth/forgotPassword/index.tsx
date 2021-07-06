import { useState } from "react"
import firebase from '../../../utils/firebase/Firebase'

const ForgotPassword = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { email } = e.target
        const sendForgotPasswordEmail = await firebase.functions().httpsCallable('sendForgotPasswordEmail')
        const sent = await sendForgotPasswordEmail({ email: email })
        
        setLoading(false)
        setSent(true)
    }

    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100 flex gap-4 flex-col items-center justify-center">
            <div className="flex flex-col text-center">
                <p className="text-3xl font-medium text-gray-700">Forgot password</p>
                <p className="text-xl text-gray-500">Please enter your email to reset your password</p>
            </div>
            <div className="bg-white rounded p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="font-medium text-gray-600">Email address</p>
                        <input type="email" name="email" className="border border-gray-300 rounded shadow-sm" placeholder="email@example.com" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <button type="submit" className="hover:outline-none p-2 text-md font-medium text-white bg-indigo-500 rounded shadow-sm hover:bg-indigo-600 hover:shadow">
                            { sent ? "Sent" : loading ? "Sending" : "Send Email" }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
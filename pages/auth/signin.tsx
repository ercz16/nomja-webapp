import Link from 'next/link'
import Head from 'next/head'
import firebase from '../../utils/firebase/Firebase'

import { signIn } from '../../utils/auth/ClientAuth'
import { getSSRAuth } from '../../utils/auth/ServerAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const { email, password } = e.target

        try {
            const user = await signIn(email.value, password.value)
            const doc = await firebase.firestore().collection('users').doc(user.user.uid).get()

            if (!doc.data().emailVerified) {
                router.push('/onboarding/' + user.user.uid)
            } else {
                router.push('/manage')
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Sign in to your account - Nomja</title>
            </Head>
            <div className="min-h-screen bg-gray-100">
                <div className="fixed flex flex-col gap-6 top-2/4 left-2/4" style={{ transform: 'translate(-50%, -50%)' }}>
                    <div className="flex flex-col">
                        <p className="text-3xl font-medium text-center text-gray-700">Sign in to your account</p>
                        <p className="flex flex-row justify-center text-xl text-gray-500 gap-x-1">or
                            <Link href="/auth/signup">
                                <a className="flex flex-row items-center gap-1 font-medium text-indigo-500 hover:text-indigo-600">
                                    create an account
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 p-8 bg-white rounded shadow-sm">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-gray-600">Email address</p>
                                <input type="text" name="email" className="border border-gray-300 rounded shadow-sm" placeholder="email@example.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-gray-600">Password</p>
                                <input type="password" name="password" className="border border-gray-300 rounded shadow-sm" placeholder="Password" />
                            </div>
                            <div className="grid items-center grid-cols-2 gap-4">
                                <label className="flex items-center text-gray-600">
                                    <input type="checkbox" name="rememberMe" className="rounded form-checkbox focus:outline-none" />
                                    <span className="ml-2">Remember me</span>
                                </label>
                                <Link href="/forgotpass">
                                    <a className="font-medium text-indigo-500 justify-self-end text-md hover:text-blue-600 hover:underline">Forgot your password?</a>
                                </Link>
                            </div>
                            <div className="flex flex-col mt-2">
                                <button type="submit" className={!loading ? "hover:outline-none p-2 text-lg font-medium text-white bg-indigo-500 rounded shadow-sm hover:bg-indigo-600 hover:shadow" :
                                    "p-2 text-lg flex flex-row items-center hover:outline-none justify-center font-medium text-white cursor-not-allowed bg-indigo-400 rounded shadow-sm"}>
                                    {!loading ? "Sign In" :
                                        (
                                            <>
                                                <svg className="w-5 h-5 mr-3 -ml-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                        Sign In
                                        </>
                                        )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
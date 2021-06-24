import Link from 'next/link'
import Head from 'next/head'

import { signIn } from '../../utils/auth/ClientAuth'
import { getSSRAuth } from '../../utils/auth/ServerAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SignIn = (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const { email, password } = e.target

        try {
            const user = await signIn(email.value, password.value)
            router.push('/manage')
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
                            <a className="font-medium text-red-500">
                                create an account
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
                                    <a className="font-medium text-red-500 justify-self-end text-md hover:text-blue-600 hover:underline">Forgot your password?</a>
                                </Link>
                            </div>
                            <div className="flex flex-col mt-2">
                                <button type="submit" className={ !loading ? "hover:outline-none p-2 text-lg font-medium text-white bg-red-500 rounded shadow-sm hover:bg-red-600 hover:shadow" :
                                 "p-2 text-lg flex flex-row items-center hover:outline-none justify-center font-medium text-white cursor-not-allowed bg-red-400 rounded shadow-sm"}>
                                     { !loading ? "Sign In" :
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
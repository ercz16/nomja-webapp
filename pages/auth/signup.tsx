import Link from 'next/link'

import { signUp } from '../../utils/auth/ClientAuth'
import { getSSRAuth } from '../../utils/auth/ServerAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { kStringMaxLength } from 'buffer'

enum PasswordStrength {
    WEAK = "Weak",
    MODERATE = "Moderate",
    STRONG = "Strong"
}

const checkPassStrength = (pass) => {
    var score = scorePassword(pass)
    if (score > 80) return PasswordStrength.STRONG
    else if (score > 60) return PasswordStrength.MODERATE
    else return PasswordStrength.WEAK
}

const scorePassword = (pass) => {
    var score = 0
    if (!pass) return score

    var letters = new Object()
    for (var i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1
        score += 5.0 / letters[pass[i]]
    }
    
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    var variationCount = 0
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0
    }
    score += (variationCount - 1) * 10

    return score
}
const getPasswordIndicator = (pass) => {
    const strength = checkPassStrength(pass)
    return (
        <>
        <div className="grid grid-cols-3 gap-2 mt-2">
            <div className={strength == PasswordStrength.WEAK ? "border-t-4 border-red-500" : strength == PasswordStrength.MODERATE ? "border-t-4 border-yellow-500" : "border-t-4 border-green-500"} />
            <div className={strength == PasswordStrength.WEAK ? "border-t-4 border-gray-200" : strength == PasswordStrength.MODERATE ? "border-t-4 border-yellow-500" : "border-t-4 border-green-500"} />
            <div className={strength == PasswordStrength.WEAK ? "border-t-4 border-gray-200" : strength == PasswordStrength.MODERATE ? "border-t-4 border-gray-200" : "border-t-4 border-green-500"} />
        </div>
        <div className="grid grid-cols-2">
            <p className={strength == PasswordStrength.WEAK ? "font-medium text-red-500" : strength == PasswordStrength.MODERATE ? "font-medium text-yellow-500" : "font-medium text-green-500"}>{strength} Password</p>
        </div>
        </>
    )
}

const SignUp = (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const { email, password, first, last, phone, birthday } = e.target

        try {
            const user = await signUp({ first: first.value, last: last.value, email: email.value, password: password.value, phone: phone.value != undefined ? phone.value : "", birthday: birthday != undefined ? birthday.value : "" })
            router.push('/manage')
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <div className="fixed flex flex-col gap-6 top-2/4 left-2/4" style={{ transform: 'translate(-50%, -50%)' }}>
                    <div className="flex flex-col">
                        <p className="text-3xl font-medium text-center text-gray-700">Sign up for an account</p>
                        <p className="flex flex-row justify-center text-xl text-gray-500 gap-x-1">or
                        <Link href="/auth/signin">
                            <a className="font-medium text-red-500">
                                sign in to one
                            </a>
                        </Link>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 p-8 bg-white rounded shadow-sm">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium text-gray-600">First name</p>
                                    <input type="text" name="first" className="border border-gray-300 rounded shadow-sm" placeholder="John" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium text-gray-600">Last name</p>
                                    <input type="text" name="last" className="border border-gray-300 rounded shadow-sm" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-gray-600">Email address</p>
                                <input type="text" name="email" className="border border-gray-300 rounded shadow-sm" placeholder="email@example.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-gray-600">Birthday</p>
                                <input type="date" name="birthday" className="border border-gray-300 rounded shadow-sm" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="flex flex-row items-center font-medium text-gray-600 gap-x-1">Phone number <p className="text-sm text-gray-500">(optional)</p></p>
                                <input type="text" name="phone" className="border border-gray-300 rounded shadow-sm" placeholder="(999) 999-9999" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-gray-600">Password</p>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="border border-gray-300 rounded shadow-sm" placeholder="Password" />
                                { getPasswordIndicator(password) }
                            </div>
                            <div className="flex flex-col">
                                <label className="flex items-center text-gray-600">
                                    <input type="checkbox" name="rememberMe" className="rounded form-checkbox focus:outline-none" />
                                    <span className="ml-2">I agree to the <Link href="/legal/privacy"><a className="font-medium text-red-500">privacy policy</a></Link></span>
                                </label>
                            </div>
                            <div className="flex flex-col mt-2">
                                <button type="submit" className={ !loading ? "hover:outline-none p-2 text-lg font-medium text-white bg-red-500 rounded shadow-sm hover:bg-red-600 hover:shadow" :
                                 "p-2 text-lg flex flex-row items-center hover:outline-none justify-center font-medium text-white cursor-not-allowed bg-red-400 rounded shadow-sm"}>
                                     { !loading ? "Sign Up" :
                                     (
                                        <>
                                        <svg className="w-5 h-5 mr-3 -ml-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sign Up
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

export default SignUp
import { signIn } from '../../utils/auth/ClientAuth'
import { getSSRAuth } from '../../utils/auth/ServerAuth'
import { useRouter } from 'next/router'

const SignIn = (props) => {
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = e.target
        const user = await signIn(email.value, password.value)
        
        router.push('/manage')
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row p-4 gap-x-2">
                <p>Email</p>
                <input name="email" className="border" />
            </div>
            <div className="flex flex-row p-4 gap-x-2">
                <p>Password</p>
                <input name="password" className="border" />
            </div>
            <div className="flex flex-row p-4 gap-x-2">
                <button type="submit" className="px-2 py-1 bg-gray-200">Submit</button>
            </div>
        </form>
        </>
    )
}

export default SignIn
import { signUp } from '../../utils/auth/ClientAuth'

const SignUp = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = e.target
        const user = await signUp(email.value, password.value)
        console.log(user)
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

export default SignUp
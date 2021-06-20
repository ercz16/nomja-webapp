import { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import { firebase } from '../firebase/Firebase'

const AuthContext = createContext({ user: null })

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (typeof window != "undefined") {
            (window as any).nookies = nookies
        }
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null)
                nookies.destroy(null, "token");
                nookies.set(null, "token", "", {path: '/'});
            } else {
                const token = await user.getIdToken();
                setUser(user);
                nookies.destroy(null, "token");
                nookies.set(null, "token", token, {path: '/'});
            }
        })
    }, [])

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebase.auth().currentUser
            if (user) await user.getIdToken(true)
        }, 10 * 60 * 1000)
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
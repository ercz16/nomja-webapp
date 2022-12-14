import { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import firebase from '../firebase/Firebase'
const firestore = firebase.firestore, auth = firebase.auth

const AuthContext = createContext({ user: null, data: null, programs: null })

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)
    const [programs, setPrograms] = useState(null)

    useEffect(() => {
        if (typeof window != "undefined") {
            (window as any).nookies = nookies
        }
        return auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null)
                setPrograms(null)
                setData(null)
                nookies.destroy(null, "token")
                nookies.set(null, "token", "", { path: '/' })
            } else {
                try {
                    const token = await user.getIdToken()
                    const userDoc = await firestore().collection('users').doc(user.uid).get()
                    const programs = new Array()
                    if (userDoc.exists) {
                        for (const program of userDoc.data().programs) {
                            const programDoc = await firestore().collection('programs').doc(program.id).get()
                            programs.push(programDoc.data())
                        }
                    }
                    setUser(user)
                    setData(userDoc.exists ? userDoc.data() : null)
                    setPrograms(programs)
                    nookies.destroy(null, "token")
                    nookies.set(null, "token", token, { path: '/' })
                } catch (e) {
                    setUser(null)
                    setPrograms(null)
                    setData(null)
                    nookies.destroy(null, "token")
                    nookies.set(null, "token", "", { path: '/' })
                }
            }
        })
    }, [])

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth().currentUser
            if (user) await user.getIdToken(true)
        }, 10 * 60 * 1000)
    }, [])

    return (
        <AuthContext.Provider value={{ user, data, programs }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
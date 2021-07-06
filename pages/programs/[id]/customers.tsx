import { Navbar, Sidebar } from './index'
import {getSSRPropsUser} from "../../../utils/auth/ServerAuth";
import { useRouter } from 'next/router'
import { useAuth } from '../../../utils/auth/AuthProvider'
import {useEffect, useState } from 'react'
import firebase from '../../../utils/firebase/Firebase'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsUser(ctx)
    return props
}

const Customers = (props) => {
    const router = useRouter()
    const { user, data, programs } = useAuth()
    const program = !programs ? null : programs.filter(p => p.id == router.query.id)[0]
    const [usersArr, setUsersArr] = useState([])

    useEffect(() => {
        firebase.firestore().collection('customers').where('programs', 'array-contains', program.id).get().then((query) => {
            for (const doc of query.docs) {
                setUsersArr(usersArr.concat(doc.data()))
            }
        })
    }, [])

    const getLastTextMessage = (user) => {
        const msgs = user.messageHistory.filter(msg => msg.to == program.phoneNum).sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
        const msg = msgs[0]
        return [msg.type, msg.text]
    }

    const getNumberOfPoints = (user) => {
        var totalPoints = 0
        const rewards = user.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'POINTS').forEach(reward => totalPoints += reward.amount)
        return totalPoints
    }

    const getNumberOfVisits = (user) => {
        var totalVisits = 0
        const rewards = user.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'VISIT').forEach(reward => totalVisits += reward.amount)
        return totalVisits
    }

    return (
        <div className="flex flex-col py-6 px-12 gap-4">
            <p className="font-medium text-xl font-gray-800">Customers</p>
            <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded border border-gray-300">
                <div className="grid items-center grid-cols-5 font-medium border-b border-gray-300">
                    <p className="text-sm text-center ">Phone Number</p>
                    <p className="text-sm text-center">Last Text Message</p>
                    <p className="text-sm text-center">Last Text Type</p>
                    <p className="text-sm text-center">Number of Points</p>
                    <p className="text-sm text-center">Number of Visits</p>
                    <p>{""}</p>
                </div>
                { usersArr.map(user => {
                    console.log(user)
                    return (
                        <div key={user.phoneNum} className="grid items-center grid-cols-5">
                            <p className="text-sm text-center">{ user.phoneNum }</p>
                            <p className="text-sm text-center">{ getLastTextMessage(user)[1] }</p>
                            <p className="text-sm text-center">{ getLastTextMessage(user)[0] }</p>
                            <p className="text-sm text-center">{ getNumberOfPoints(user) }</p>
                            <p className="text-sm text-center">{ getNumberOfVisits(user) }</p>
                            <p>{""}</p>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

const CustomersPage = (props) => {
    const router = useRouter()
    const { user, data, programs } = useAuth()
    const program = !programs ? null : programs.filter(p => p.id == router.query.id)[0]
    return (
        <div className="flex flex-row">
            <Sidebar props={props} />
            <div className="flex flex-col w-full">
                <Navbar />
                { !program ? <></> : <Customers /> }
            </div>
        </div>
    )
}

export default CustomersPage
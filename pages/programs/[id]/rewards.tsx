import { Navbar, Sidebar } from './index'
import {getSSRPropsUser} from "../../../utils/auth/ServerAuth"
import CreateButton from '../../../components/buttons/CreateButton'
import { useAuth } from '../../../utils/auth/AuthProvider'
import { useRouter } from 'next/router'
import CreateRewardModal from '../../../components/modals/CreateRewardModal'
import {useState} from "react";
import firebase from '../../../utils/firebase/Firebase'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsUser(ctx)
    return props
}

const LoadingRewards = () => {
    return (
        <>
            <div className="animate-pulse flex flex-col gap-1 p-2 rounded shadow-sm bg-gray-100">
                <div className="h-5 bg-gray-200 w-5/12" />
                <div className="h-4 bg-gray-200 w-8/12" />
                <div className="h-4 bg-gray-200 w-8/12" />
            </div>
            <div className="animate-pulse flex flex-col gap-1 p-2 rounded shadow-sm bg-gray-100">
                <div className="h-5 bg-gray-200 w-5/12" />
                <div className="h-4 bg-gray-200 w-8/12" />
                <div className="h-4 bg-gray-200 w-7/12" />
            </div>
            <div className="animate-pulse flex flex-col gap-1 p-2 rounded shadow-sm bg-gray-100">
                <div className="h-5 bg-gray-200 w-5/12" />
                <div className="h-4 bg-gray-200 w-6/12" />
                <div className="h-4 bg-gray-200 w-7/12" />
            </div>
            <div className="animate-pulse flex flex-col gap-1 p-2 rounded shadow-sm bg-gray-100">
                <div className="h-5 bg-gray-200 w-5/12" />
                <div className="h-4 bg-gray-200 w-8/12" />
                <div className="h-4 bg-gray-200 w-9/12" />
            </div>
        </>
    )
}

const NoRewardsMade = () => {
    return (
        <div className="flex flex-col gap-1 items-center justify-center mt-32">
            <svg xmlns="http://www.w3.org/2000/svg" className="col-span-1 col-start-2 h-12 w-12 fill-current text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            <p className="font-medium text-xl text-gray-800">You do not have any rewards made yet.</p>
        </div>
    )
}

const Rewards = (props) => {
    const router = useRouter()
    const { user, data, programs } = useAuth()
    const program = !programs ? null : programs.filter(p => p.id == router.query.id)[0]
    const [open, setOpen] = useState(false)

    const deleteReward = async (reward) => {
        const update = await firebase.firestore().collection('programs').doc(program.id).update({ rewards: firebase.firestore.FieldValue.arrayRemove(reward) })
        const reload = await router.reload()
    }

    return (
        <div className="flex flex-col py-6 px-12 gap-1">
            <div className="flex flex-row items-center justify-between border-b py-2">
                <p className="font-medium text-2xl font-gray-800">Rewards</p>
                <CreateButton action={() => setOpen(true)}>
                    <span className="text-md text-white">Create Reward</span>
                </CreateButton>
            </div>
            <CreateRewardModal user={data}  program={program} isOpen={open} openCreate={() => setOpen(true)} closeCreate={() => setOpen(false)} />
            <div className="py-2">
                { !program || !program.rewards ? <LoadingRewards /> : program.rewards.length == 0 ? <NoRewardsMade /> : (
                    <div className="grid grid-cols-5 py-2 gap-2">
                        { program.rewards.map(reward => {
                            return (
                                <div key={reward.id} className="rounded-lg p-2 bg-gray-100 flex flex-col cursor-pointer border border-transparent hover:border-gray-300">
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-gray-900 text-lg">{ reward.name }</p>
                                        <button onClick={() => deleteReward(reward)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-red-500 text-opacity-75" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-gray-600">{ getTypeFormatted(reward) }</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) }
            </div>
        </div>
    )
}

const getTypeFormatted = (reward) => {
    return `${reward.attributes.type == 'VISIT' ? `After ${reward.attributes.required} visits` : `After ${reward.attributes.required} points`}`
}

const RewardsPage = (props) => {
    return (
        <div className="flex flex-row">
            <Sidebar props={props} />
            <div className="flex flex-col w-full">
                <Navbar />
                <Rewards />
            </div>
        </div>
    )
}

export default RewardsPage
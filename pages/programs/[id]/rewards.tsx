import { Navbar, Sidebar } from './index'
import {getSSRPropsUser} from "../../../utils/auth/ServerAuth"
import CreateButton from '../../../components/buttons/CreateButton'
import { useAuth } from '../../../utils/auth/AuthProvider'
import { useRouter } from 'next/router'
import CreateRewardModal from '../../../components/modals/CreateRewardModal'
import {useState} from "react";

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
        <div className="flex flex-col gap-1 items-center mt-64">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 fill-current text-gray-700" viewBox="0 0 20 20" fill="currentColor">
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

    console.table(program)

    return (
        <div className="flex flex-col py-6 px-12 gap-1">
            <div className="flex flex-row items-center justify-between border-b py-2">
                <p className="font-medium text-2xl font-gray-800">Rewards</p>
                <CreateButton action={() => setOpen(true)}>
                    <span className="text-md text-white">Create Reward</span>
                </CreateButton>
            </div>
            <CreateRewardModal user={data}  program={program} isOpen={open} openCreate={() => setOpen(true)} closeCreate={() => setOpen(false)} />
            <div className="grid grid-cols-5 py-2 gap-2">
                { !program || !program.rewards ? <LoadingRewards /> : program.rewards.length == 0 ? <NoRewardsMade /> : (
                    <>
                        { program.rewards.map(reward => {
                            return (
                                <div key={reward.id} className="rounded-lg p-2 bg-gray-100 flex flex-row items-center justify-between cursor-pointer hover:bg-gray-200">
                                    <div className="flex flex-col">
                                        <p className="text-gray-9000 text-lg">{ reward.name }</p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) }
            </div>
        </div>
    )
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
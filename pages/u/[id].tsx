import Head from 'next/head'

import { getSSRPropsRedeem } from '../../utils/auth/ServerAuth'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsRedeem(ctx)
    return props
}

const RewardRedeem = (props) => {
    const { rewards, error, expired, program, customer, visits, points } = props
    return (
        <>
        <Head>
            <title>{ program.name } - Redeem your rewards </title>
        </Head>
        {
            expired ? <Expired /> : error ? <Error /> : <Rewards rewards={rewards} customer={customer} points={points} visits={visits} />
        }
        </>
    )
}

const Expired = (props) => {
    return (
        <>
        <div className="absolute flex flex-col text-center left-2/4 top-2/4" style={{ transform: 'translate(-50%, -50%)' }}>
            <p className="text-lg md:text-xl text-medium">This link has expired.</p>
            <p className="text-lg md:text-xl">Generate a new one by texting <b>"rewards"</b></p>
        </div>
        <div className="mb-auto">
            hello
        </div>
        </>
    )
}

const Error = (props) => {
    return (
        <>
        <div className="absolute flex flex-col text-center left-2/4 top-2/4" style={{ transform: 'translate(-50%, -50%)' }}>
            <p className="text-lg md:text-xl text-medium">An error has occurred. Wrong Link?</p>
            <p className="text-lg md:text-xl">Please generate a new link by texting <b>"rewards"</b></p>
        </div>
        <div className="mb-auto">
            hello
        </div>
        </>
    )
}

const formatPhoneNumber = (phoneNumberString) => { 
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

const Rewards = (props) => {
    const { rewards, customer, points, visits } = props
    return (
        <>
        <div className="h-screen">
                <div className="container flex flex-col gap-2 px-8 py-8 mx-auto divide-y-2">
                    <div className="flex flex-col text-center sm:items-center sm:flex-row">
                        <p className="text-xl text-center">{formatPhoneNumber(customer.phoneNum)}</p>
                        <p className="text-xl sm:ml-auto">{points} points and {visits} visits available</p>

                    </div>
                    <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-3">
                        <div className="col-span-1 sm:col-span-3">
                            <p className="text-lg text-center text-gray-600 sm:text-left">Click on a reward to redeem</p>
                        </div>
                        {rewards.map(reward => {
                            return (
                                <>
                                    <div key={reward.id} onClick={() => alert('Redeemed')} className="flex flex-col transition duration-300 ease-in-out transform border rounded shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                                        <div className="flex flex-col row-span-1 p-2 bg-gray-100">
                                            <p className="text-lg font-medium">{reward.reward.name}</p>
                                            <p className="text-gray-600 text-md">{reward.reward.description}</p>
                                            <p className="text-gray-500">{reward.reward.attributes.type.toLowerCase() == 'points'
                                                ? `After ${reward.reward.attributes.required} points` : `After ${reward.reward.attributes.required} visits`}</p>
                                        </div>
                                        <div className="flex flex-col mt-auto">
                                            <button className="text-white bg-indigo-500 rounded-b focus:outline-none hover:bg-indigo-600">Redeem</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
        </div>
        </>
    )
}

export default RewardRedeem

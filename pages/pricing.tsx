import { Navbar, Footer } from './index'
import { useState } from 'react'
import { Switch } from '@headlessui/react'

import Link from 'next/link'
import Head from 'next/head'

enum Time {
    YEARLY,
    MONTHLY
}

const PricingSection = () => {
    const [time, setTime] = useState(Time.MONTHLY)
    const enabled = time == Time.YEARLY

    return (
        <>
            <div className="relative z-10 shadow-b-lg">
                <div className="container flex flex-col items-center py-16 mx-auto px-28">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 p-1 mb-5 text-white bg-indigo-500 rounded-full fill-current" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <p className="text-5xl font-bold text-center text-gray-800">Choose a plan that works for you.</p>
                    <p className="text-2xl font-light text-center text-gray-400">No matter how many customers you have, we offer flexible and affordable pricing.</p>
                </div>
            </div>
            <div className="relative z-10 bg-gray-100">
                <div className="container flex flex-col items-center justify-center px-16 py-12 mx-auto">
                    <div className="flex flex-col">
                       <div className="flex items-center gap-4">
                           <div className="flex flex-col items-center gap-1">
                               <p className="text-lg font-medium text-gray-800">Pay Monthly</p>
                               <p className="text-sm px-2 py-1 bg-gray-200 text-gray-500 font-medium rounded shadow-sm">No discount</p>
                           </div>
                            <Switch
                                checked={enabled}
                                onChange={() => setTime(time == Time.YEARLY ? Time.MONTHLY : Time.YEARLY)}
                                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                                    } relative inline-flex items-center h-6 rounded-full w-11`}
                            >
                                <span
                                    className={`transform transition ease-in-out duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                                />
                            </Switch>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-lg font-medium text-gray-800">Pay Yearly</p>
                                <p className="text-sm px-2 py-1 bg-green-500 text-white font-medium rounded shadow-sm">2 months FREE</p>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="container gap-4 pb-8 mx-auto px-80">
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="relative z-20 flex flex-col mt-5 bg-white rounded-lg shadow">
                            <div className="flex flex-col gap-3 p-4 border-b border-opacity-75">
                                <p className="text-2xl font-medium text-center">Basic</p>
                                <div className="flex flex-row items-center justify-center gap-1">
                                    <div className="flex flex-row">
                                        <p className="text-4xl font-medium">$</p>
                                        <p className="text-5xl font-medium">{ time == Time.YEARLY ? 275 : 25}</p>
                                    </div>
                                    <p className="text-xl text-gray-500">/ { time == Time.YEARLY ? "year" : "month"}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 p-4 bg-gray-100 bg-opacity-50">
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">Up to 50 active users</p>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">$0.50 per extra user</p>
                                </div>
                                <div className="flex flex-row justify-center mt-4">
                                    <Link href="/manage">
                                        <a className="w-full px-2 py-1 text-lg font-medium text-center text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600">Buy Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-20 flex flex-col flex-grow-0 bg-white rounded-lg shadow -mt-3 flex-nowrap">
                            <div className="flex flex-col gap-3 p-4 border-b border-opacity-75">
                                <p className="text-2xl font-medium text-center">Premium</p>
                                <div className="flex flex-row items-center justify-center gap-1">
                                    <div className="flex flex-row">
                                        <p className="text-4xl font-medium">$</p>
                                        <p className="text-5xl font-medium">{ time == Time.YEARLY ? 450 : 45}</p>
                                    </div>
                                    <p className="text-xl text-gray-500">/ { time == Time.YEARLY ? "year" : "month"}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 p-4 bg-gray-100 bg-opacity-50">
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">Up to 100 active users</p>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">$0.35 per extra user</p>
                                </div>
                                <div className="flex flex-row justify-center mt-4">
                                    <Link href="/manage">
                                        <a className="w-full px-2 py-1 text-lg font-medium text-center text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600">Buy Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-20 flex flex-col mt-5 bg-white rounded-lg shadow flex-nowrap">
                            <div className="flex flex-col gap-3 p-4 border-b border-opacity-75">
                                <p className="text-2xl font-medium text-center">Enterprise</p>
                                <div className="flex flex-row items-center justify-center gap-1">
                                    <div className="flex flex-row">
                                        <p className="text-4xl font-medium">$</p>
                                        <p className="text-5xl font-medium">{ time == Time.YEARLY ? "" : ""}</p>
                                    </div>
                                    <p className="text-xl text-gray-500">/ { time == Time.YEARLY ? "year" : "month"}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 p-4 bg-gray-100 bg-opacity-50">
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">No user limit</p>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-gray-500">$0.2 per active user</p>
                                </div>
                                <div className="flex flex-row justify-center mt-4">
                                    <Link href="/company/contact-us">
                                        <a className="w-full px-2 py-1 text-lg font-medium text-center text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600">Contact Us</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 bg-white">
                <div className="container flex flex-col gap-4 px-16 py-12 mx-auto">
                    <p className="text-3xl font-bold text-center font-gray-800">All Plans Come With</p>
                    <div className="grid grid-cols-5">
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Support 24/7
                            </p>
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Free Unique Phone Number
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Analytics
                            </p>
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Suggestions
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Support 24/7
                            </p>
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Free Unique Number
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Support 24/7
                            </p>
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Free Unique Number
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Support 24/7
                            </p>
                            <p className="flex items-center gap-1 text-xl text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Free Unique Number
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Pricing = () => {
    return (
        <>
        <Head>
            <title>Pricing - Nomja</title>
        </Head>
        <Navbar shadow={false} />
        <PricingSection />
        <Footer />
        </>
    )
}

export default Pricing
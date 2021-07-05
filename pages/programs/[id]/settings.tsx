import { Navbar, Sidebar } from './index'
import { getSSRPropsUser } from "../../../utils/auth/ServerAuth";
import { useAuth } from "../../../utils/auth/AuthProvider";
import { useRouter } from 'next/router'
import {Fragment, useState} from "react";
import firebase from '../../../utils/firebase/Firebase'
import BaseModal from "../../../components/modals/BaseModal";
import {Dialog, Transition} from "@headlessui/react";

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsUser(ctx)
    return props
}

const Loading = () => {
    return (
        <div className="flex flex-col gap-4 py-8 rounded-lg px-24">
            <div className="flex">
                <p className="font-medium text-3xl text-gray-800">Program Settings</p>
            </div>
            <div className="animate-pulse flex-col flex gap-2">
                <div className="h-7 w-5/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-8/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-9/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-7/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-8/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-10/12 bg-gray-100 rounded-lg" />
                <div className="h-5 w-10/12 bg-gray-100 rounded-lg" />
            </div>
        </div>
    )
}

const Settings = (props) => {
    const { program } = props

    const handleSubmit = async (e) => {
        e.preventDefault()
        window.alert('say')
    }

    const [validCode, setValidCode] = useState(true)
    const [loadingCode, setLoadingCode] = useState(false)

    const uniqueCodeUpdate = async (e) => {
        const code = e.target.value
        setLoadingCode(true)
        const query = await firebase.firestore().collection('programs').where('uniqueCode', '==', code).get()
        setValidCode(query.docs.length == 0)
        setLoadingCode(false)
    }

    const getUniqueSymbol = () => {
        if (loadingCode) {
            return <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        } else if (validCode) {
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        } else {
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        }
    }

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 my-24 overflow-y-auto"
                    onClose={() => setModalOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-5/12 p-8 mt-24 transition-all transform bg-white rounded shadow-sm">
                                <div className="flex flex-col justify-between space-y-3 divide-y-2">
                                    <div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold text-left"
                                        >
                                            QRCode
                                        </Dialog.Title>
                                        <p className="text-left text-gray-500 text-md">
                                            Lol
                                        </p>
                                    </div>
                                    <p>llll</p>
                                </div>
                                <div className="mt-5">
                                    <div className="flex flex-row justify-end gap-4">
                                        <button
                                            onClick={() => setModalOpen(false)}
                                            className={
                                                !false
                                                    ? 'px-4 py-2 font-medium text-gray-700 border border-gray-700 rounded cursor-pointer text-md hover:text-white hover:bg-gray-700 focus:outline-none'
                                                    : 'px-4 py-2 font-medium text-gray-500 border border-gray-600 rounded cursor-pointer text-md focus:outline-none cursor-not-allowed'
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={
                                                !false
                                                    ? 'flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600 text-md focus:outline-none'
                                                    : 'flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-indigo-400 rounded cursor-not-allowed text-md focus:outline-none'
                                            }
                                        >
                                            {false ? (
                                                <>
                                                    Create
                                                    <svg
                                                        className="w-5 h-5 ml-2 animate-spin"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                </>
                                            ) : (
                                                <>
                                                    Create
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <div className="flex flex-col items-center gap-4 py-8">
                <div className="flex flex-col w-1/2">
                    <p className="font-medium text-3xl text-gray-800">Program Settings</p>
                    <p className="text-gray-400 text-lg">Fill in the information below to update your project settings.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex-col flex gap-4 w-1/2">
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-600 flex items-center gap-1">
                            QR Code
                            <a onClick={() => setModalOpen(true)} className="text-blue-500 text-sm font-medium hover:text-blue-600 cursor-pointer">What is this?</a>
                        </label>
                        <img src={program.qrcode} className="w-1/6 border border-white hover:border-gray-300 rounded-lg cursor-pointer"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-600">Name</label>
                        <input type="text" name="name" className="px-2 py-1 rounded-lg border border-gray-300 text-gray-500 focus:outline-none placeholder-gray-400" placeholder={program.name} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-600 flex gap-1 items-center">
                            Unique Code
                            { getUniqueSymbol() }
                        </label>
                        <input type="text" onChange={uniqueCodeUpdate} name="uniqueCode" className="px-2 py-1 rounded-lg border border-gray-300 text-gray-500 focus:outline-none placeholder-gray-400" placeholder={program.name} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-600">Description</label>
                        <textarea rows={4} name="description" className="resize-none px-2 py-1 rounded-lg border border-gray-300 text-gray-500 focus:outline-none placeholder-gray-400" placeholder={program.description} />
                    </div>
                    <button type="submit" className="mt-5 text-lg px-4 rounded-lg shadow-sm font-medium py-1 text-white bg-indigo-500 hover:bg-indigo-600">Save</button>
                </form>
            </div>
        </>
    )
}

const SettingsPage = (props) => {
    const router = useRouter()
    const { user, data, programs } = useAuth()
    const program = !programs ? null : programs.filter(p => p.id == router.query.id)[0]

    return (
        <div className="flex flex-row">
            <Sidebar props={props} />
            <div className="flex flex-col w-full">
                <Navbar />
                { !program ? <Loading /> : <Settings program={program} /> }
            </div>
        </div>
    )
}

export default SettingsPage
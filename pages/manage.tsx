import Link from 'next/link'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { getSSRPropsUser } from '../utils/auth/ServerAuth'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { createClientProgram } from '../utils/program/ProgramClientSide'

export const getServerSideProps = async (ctx) => {
    const props = await getSSRPropsUser(ctx)
    return props
}

const CreateModal = (props) => {
    const { user, isOpen, close, open } = props

    const router = useRouter()

    const submit = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, description, uniqueCode } = e.target

        try {
            const program = await createClientProgram(user.login.uid, { name: name.value, description:  description.value, uniqueCode: uniqueCode.value }) 
            router.push('/dash/' + program.id)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={close}
            >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
    
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium"
                    >
                      Create a program
                    </Dialog.Title>
                    <p className="text-gray-500 text-md">Fill out the form below to create a new program.</p>

                    <div className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 py-4">
                            <div className="flex flex-col col-span-2 gap-0">
                                <p className="font-lg text-md">Name</p>
                                <input name="name" className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg" placeholder="Ex. Joe's Crabshack" />
                            </div>
                            <div className="flex flex-col col-span-4 col-start-1 gap-0">
                                <p className="flex flex-row items-center gap-1 font-lg text-md">Description <span className="text-gray-500">(optional)</span></p>
                                <input name="description" className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg" placeholder="Ex. A restaurant from the ocean" />
                            </div>
                            <div className="flex flex-col col-span-4 col-start-1 gap-0">
                                <p className="flex flex-row items-center gap-1 font-lg text-md">Unique Code <span className="text-gray-500">(used to join the program through text)</span></p>
                                <input name="uniqueCode" className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg" placeholder="Ex. joescrab" />
                            </div>
                            <button ref={submit} className="hidden" type="submit" />
                        </form>
                        <div className="flex flex-row items-center justify-end gap-4 text-lg">
                            <button onClick={() => close()} className="px-3 py-1 text-gray-800 bg-gray-200 rounded shadow-sm hover:text-gray-900 hover:bg-gray-300">Cancel</button>
                            <button onClick={() => submit.current.click()} className="px-3 py-1 text-white bg-red-500 rounded shadow-sm hover:bg-red-600">Create</button>
                        </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )
}

const Manage = (props) => {
    const { user } = props
    const [createOpen, setCreateOpen] = useState(false)

    const openCreate = () => {
        setCreateOpen(true)
    }

    const closeCreate = () => {
        setCreateOpen(false)
    }
    
    return (
        <>
        <Head>
            <title>Manage - Nomja</title>
        </Head>
        <div className="min-h-screen bg-gray-100">
            <div className="grid grid-cols-12 p-4 mb-5 bg-gray-900">
                <div className="col-span-2 col-start-2">
                    <img src="/all-together.png" className="h-10" />
                </div>
            </div>
            <div className="container flex flex-col gap-2 px-8 mx-auto divide-y-2">
                <div className="flex flex-row items-center p-2">
                    <p className="text-2xl font-medium">Manage Programs</p>
                    <button onClick={() => setCreateOpen(!createOpen)} className="flex flex-row items-center gap-1 px-3 py-1 ml-auto text-xl font-medium text-white bg-red-500 rounded shadow-sm hover:bg-red-600 focus:outline-none">
                        Create New
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <CreateModal user={user} isOpen={createOpen} open={() => setCreateOpen(true)} close={() => setCreateOpen(false)} />
                <div className="grid grid-cols-5 gap-4 py-8">
                    { user.programs.map((program) => {
                        return <ProgramCard program={program} />
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

const ProgramCard = (props) => {
    const { program } = props

    const router = useRouter()

    const handleOptions = async (e) => {
        e.preventDefault()
    }

    const [optionsOpen, setOptionsOpen] = useState(false)

    return (
        <>
            <div key={program.id} className="flex flex-col gap-2 px-4 py-3 bg-white rounded-md shadow-sm">
                <div className="relative grid items-center grid-cols-3">
                    <p className="col-span-2 text-xl font-medium">{program.name}</p>
                    <div className={!optionsOpen ? "hidden" : "bg-white absolute right-0 col-span-1 p-2 border border-gray-300 text-sm text-gray-800 hover:text-gray-900 rounded mt-11"}>
                        <p className="flex flex-row items-center gap-1 p-1 font-medium rounded cursor-pointer hover:bg-gray-100">
                            Delete
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </p>
                        <p onClick={() => setOptionsOpen(false)} className="flex flex-row items-center gap-1 p-1 font-medium rounded cursor-pointer hover:bg-gray-100">
                            Close
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </div>
                    <div onClick={() => setOptionsOpen(true)} className={ !optionsOpen ? "col-span-1 p-1 ml-auto border border-gray-300 rounded cursor-pointer" : "col-span-1 p-1 ml-auto border border-gray-300 rounded cursor-pointer hidden"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col mb-1 -mt-3">
                    <p className="flex flex-row items-center gap-1 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-green-500 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>    
                        
                        Free Trial
                    </p>
                </div>
                <div className="flex flex-col -mt-3">
                    <p className="italic text-gray-500">{ program.description }</p>
                </div>
                <div className="flex flex-col gap-2 mb-auto">
                    <div className="flex flex-row gap-1">
                        <p className="px-2 text-gray-500 border border-gray-500 rounded-lg">{ program.users.length } users</p>
                        <p className="px-2 text-gray-500 border border-gray-500 rounded-lg">{ program.rewards.length } rewards</p>
                    </div>
                    <Link href={'/dash/' + program.id}>
                        <a className="flex flex-row items-center px-2 py-1 font-medium text-white bg-red-500 rounded shadow-sm hover:bg-red-600">
                            Dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Manage
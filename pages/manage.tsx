import { Fragment, useState, useRef } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import firebase from '../utils/firebase/Firebase'

import { getSSRPropsUser } from '../utils/auth/ServerAuth'
import { Dialog, Transition } from '@headlessui/react'

import { useAuth } from '../utils/auth/AuthProvider'

import CreateProgramModal from '../components/modals/CreateProgramModal'
import CreateButton from '../components/buttons/CreateButton'

import {
  createClientProgram,
  deleteProgram,
} from '../utils/program/ProgramClientSide'

export const getServerSideProps = async (ctx) => {
  const props = await getSSRPropsUser(ctx)
  return props
}

const AccountDropdown = () => {
  const [open, setOpen] = useState(false)
  return (
      <>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-gray-400 hover:text-gray-200">
          Account
          { open ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg> }
        </button>
        <div className={`${open ? '' : 'hidden'} absolute mt-16 bg-white rounded shadow flex flex-col divide-y`}>
          <div className="flex items-center gap-2 px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <p className="text-gray-600">Logout</p>
          </div>
        </div>
      </>
  )
}

const Manage = (props) => {
  const router = useRouter()
  const { user, data, programs } = useAuth()
  const [createOpen, setCreateOpen] = useState(false)

  const openCreate = () => {
    setCreateOpen(true)
  }

  const closeCreate = () => {
    setCreateOpen(false)
  }

  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const [codeShown, setCodeShown] = useState(false)

  const handleLogout = async (e) => {
    const logout = await firebase.auth().signOut()
    const redirect = await router.push('/auth/signin')
  }

  const downloadCode = useRef(null)

  return (
    <>
      <Head>
        <title>Manage - Nomja</title>
      </Head>
      <div className="border-b shadow-sm bg-white">
        <div className="flex justify-between items-center container mx-auto px-32 py-4">
          <div className="flex items-center gap-4">
            <Link href='/'>
              <p className="leading-3 text-4xl font-bold text-indigo-500 hover:text-indigo-600 cursor-pointer">nomja</p>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 flex items-center gap-2 rounded border-gray-300 dark:border-gray-700 w-40 cursor-pointer" onClick={() => setShow(!show)}>
                <p className="pl-3 py-3 text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal font-normal">Account</p>
                <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
                  {!show ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                  )}
                </div>
              </div>
              {show && (
                  <div className="border border-gray-300 flex flex-col divide-y visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded mt-2 w-48 absolute">
                    <button onClick={handleLogout}  className="px-3 py-2 cursor-pointer flex gap-2 items-center text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 text-sm leading-3 tracking-normal hover:bg-gray-100 font-normal">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      Logout
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-32 py-5 h-full">
          <div className="flex flex-row items-center justify-between w-11/12 px-2 pb-3 mx-auto border-b border-gray-300">
            <p className="text-2xl font-medium text-gray-800">Manage Programs</p>
            <CreateButton action={() => setCreateOpen(!createOpen)}>
              Create New
            </CreateButton>
          </div>
          <CreateProgramModal
            user={data}
            isOpen={createOpen}
            open={() => setCreateOpen(true)}
            close={() => setCreateOpen(false)}
          />
        <Transition appear show={codeShown} as={Fragment}>
          <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={() => setCodeShown(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
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
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded">
                  <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                  >
                    QR Code
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Use this QR Code in your business for your customers to scan and join your rewards program.
                    </p>
                  </div>

                  <img src={code} />
                  <a type="button" href={code} className="hidden" ref={downloadCode} download></a>

                  <div className="flex gap-1 items-center">
                    <button
                        type="button"
                        className="inline-flex px-2 py-1 font-medium text-gray-500 bg-gray-300 hover:bg-gray-400 hover:text-gray-600 rounded focus:outline-none"
                        onClick={() => setCodeShown(false)}
                    >
                      Close
                    </button>
                    <button
                        type="button"
                        className="inline-flex gap-1 items-center px-2 py-1 font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded focus:outline-none"
                        onClick={() => downloadCode.current.click()}
                    >
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
          <div className="grid grid-cols-6 px-24 py-4 gap-4">
            { !programs ? <ProgramsLoading /> : programs && programs.length == 0 ? (
              <NoPrograms open={() => openCreate()} />
            ) : (
              programs.map((program) => {
                return (
                  <ProgramCard setCode={setCode} openCode={() => setCodeShown(true)} closeCode={() => setCodeShown(false)} key={program.id} program={program} user={data} />
                )
              })
            )}
          </div>
      </div>
    </>
  )
}

const ProgramsLoading = () => {
  return (
    <>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col gap-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm animate-pulse">
      <div className="w-1/2 h-1 h-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
      <div className="h-1 h-4 bg-gray-200 rounded" />
    </div>
    </>
  )
}

const NoPrograms = (props) => {
  const { open } = props
  return (
    <>
      <div
        className="absolute flex flex-col items-center gap-2 p-12 text-gray-600 bg-opacity-50 top-2/4 left-2/4 border border-gray-300 rounded bg-gray-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-600 fill-current" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
        <p className="text-xl text-gray-800">
          It appears you have no programs
        </p>
        <a
            onClick={() => open()}
            className="px-2 py-1 text-lg text-white bg-indigo-500 rounded shadow-sm cursor-pointer hover:bg-indigo-600 focus:outline-none"
          >
            Create One
        </a>
      </div>
    </>
  )
}

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

const ProgramCard = (props) => {
  const { program, user, setCode, openCode, closeCode } = props
  const router = useRouter()

  const handleOptions = async (e) => {
    e.preventDefault()
  }

  const handleDelete = async () => {
    try {
      const del = await deleteProgram(user.login.uid, program.id)
      router.reload()
    } catch (e) {
      console.log(e)
    }
  }

  const [show, setShow] = useState(false)
  const [open, isOpen] = useState(false)

  const openQRCode = (code) => {
    setCode(code)
    if (open) {
      closeCode()
    } else {
      openCode()
    }
  }

  return (
    <>
      <div key={program.id}>
        <div className="flex flex-col gap-1 rounded bg-gray-100">
          <div className="flex items-center justify-between pt-2 px-2">
            <p className="font-medium text-gray-800">{ program.name }</p>
            <div className="relative">
              <div className="cursor-pointer rounded border border-transparent hover:border-gray-300" onClick={() => setShow(!show)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <Transition
                  show={show}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-75"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                <div className="bg-white shadow rounded py-1 px-2 py-3 -ml-4 absolute">
                  <button onClick={() => handleDelete()} className="cursor-pointer text-gray-700 flex gap-1 items-center hover:text-gray-800 text-sm leading-3 tracking-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </Transition>
            </div>
          </div>
          <div className="flex px-2 -mt-2">
            { !program.description ? <p className="text-gray-400 text-sm">No description set</p> : <p className="text-gray-400 text-sm">{ program.description.toString().substring(0, 24) }</p>}
          </div>
          <div className="flex px-2 -mt-2">
            <a type="button" onClick={() => openQRCode(program.qrcode)} className="text-indigo-500 hover:text-indigo-600 cursor-pointer text-sm">@{ program.uniqueCode }</a>
          </div>
          <div className="flex px-2 -mt-2">
            <p className="text-gray-400 text-sm">{ formatPhoneNumber(program.phoneNum) }</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-white px-2 py-2 border rounded-b flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="border border-indigo-400 text-sm text-indigo-400 px-1 rounded">{ program.users.length } customers</p>
                <p className="border border-indigo-400 px-1 text-sm text-indigo-400 rounded">{ program.rewards.length } rewards</p>
              </div>
              <Link href={`/programs/${program.id}`}>
                <a className="px-2 py-1 flex items-center justify-center text-white bg-indigo-500 text-sm rounded shadow-sm hover:bg-indigo-600">
                  Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manage

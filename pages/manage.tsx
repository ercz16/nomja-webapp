import { Fragment, useState, useRef } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getSSRPropsUser } from '../utils/auth/ServerAuth'
import { Dialog, Transition } from '@headlessui/react'

import CreateProgramModal from '../components/modals/CreateProgramModal'
import CreateButton from '../components/buttons/CreateButton'

import {
  createClientProgram,
  deleteProgram,
} from '../utils/program/ProgramClientSide'

import { format } from 'path'

export const getServerSideProps = async (ctx) => {
  const props = await getSSRPropsUser(ctx)
  return props
}

const Manage = (props) => {
  const { user, programs } = props
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
        <div className="pl-20 flex p-4">
          <img src="/all-together.png" className="h-10" />
        </div>
        <div className="flex flex-col h-screen gap-2 px-5 py-5">
          <div className="flex flex-row justify-between items-center w-11/12 px-2 pb-5 mx-auto border-b-2">
            <p className="text-2xl font-medium">Manage Programs</p>
            <CreateButton action={() => setCreateOpen(!createOpen)}>
              Create New
            </CreateButton>
          </div>
          <CreateProgramModal
            user={user}
            isOpen={createOpen}
            open={() => setCreateOpen(true)}
            close={() => setCreateOpen(false)}
          />
          <div className="mt-7 grid grid-cols-4 place-items-stretch gap-10 mx-12">
            {programs.length == 0 ? (
              <NoPrograms open={() => openCreate()} />
            ) : (
              programs.map((program) => {
                return (
                  <ProgramCard key={program.id} program={program} user={user} />
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const NoPrograms = (props) => {
  const { open } = props
  return (
    <>
      <div
        className="absolute flex flex-col items-center text-gray-800 top-2/4 left-2/4"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <p className="text-xl text-medium">
          It appears you haven't created a program
        </p>
        <p className="text-lg">
          <a
            onClick={() => open()}
            className="font-medium text-red-500 cursor-pointer hover:text-red-600 hover:underline"
          >
            Click here
          </a>{' '}
          to create one
        </p>
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
  const { program, user } = props
  const router = useRouter()

  const handleOptions = async (e) => {
    e.preventDefault()
  }

  const [optionsOpen, setOptionsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const del = await deleteProgram(user.login.uid, program.id)
      router.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div
        key={program.id}
        className="flex flex-col space-y-4 px-10 pt-6 pb-10 bg-white rounded-md shadow-lg"
      >
        <div className="relative flex justify-between items-center">
          <p className="col-span-2 gap-1 text-xl font-medium">{program.name}</p>
          <div
            className={
              !optionsOpen
                ? 'hidden'
                : 'bg-white absolute right-0 col-span-1 p-2 border border-gray-300 text-sm text-gray-800 hover:text-gray-900 rounded mt-11'
            }
          >
            <a
              onClick={() => handleDelete()}
              className="flex flex-row items-center gap-1 p-1 font-medium rounded cursor-pointer hover:bg-gray-100"
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <p
              onClick={() => setOptionsOpen(false)}
              className="flex flex-row items-center gap-1 p-1 font-medium rounded cursor-pointer hover:bg-gray-100"
            >
              Close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </div>
          <div
            onClick={() => setOptionsOpen(true)}
            className={
              !optionsOpen
                ? 'col-span-1 p-1 ml-auto border border-gray-300 rounded cursor-pointer'
                : 'col-span-1 p-1 ml-auto border border-gray-300 rounded cursor-pointer hidden'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-gray-500 fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mb-1 -mt-3">
          <p className="text-lg text-gray-600">
            {formatPhoneNumber(program.phoneNum)}
          </p>
          <p className="flex flex-row items-center gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-green-500 fill-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Free Trial
          </p>
        </div>
        <div className="flex flex-col -mt-3">
          <p className="italic text-gray-500">{program.description}</p>
        </div>
        <div className="flex flex-col gap-2 mb-auto">
          <div className="flex flex-row gap-1">
            <p className="px-2 text-gray-500 border border-gray-500 rounded-lg">
              {program.users.length} users
            </p>
            <p className="px-2 text-gray-500 border border-gray-500 rounded-lg">
              {program.rewards.length} rewards
            </p>
          </div>
          <Link href={'/dash/' + program.id}>
            <a className="flex flex-row items-center px-2 py-1 font-medium text-white bg-red-500 rounded shadow-sm hover:bg-red-600">
              Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Manage

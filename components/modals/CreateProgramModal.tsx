import { useState, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'

import BaseModal from './BaseModal'
import { Dialog, Transition } from '@headlessui/react'

import firebase from '../../utils/firebase/Firebase'

import {
  createClientProgram,
  deleteProgram,
} from '../../utils/program/ProgramClientSide'

const CreateProgramModal = (props) => {
  const { user, isOpen, open, close } = props
  const router = useRouter()
  const submit = useRef(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { name, description, uniqueCode } = e.target

    try {
      if (!name) throw new Error('You must enter a valid program name.')
      if (!validUniqueCode) throw new Error('You must enter a valid program unique code.')
      const program = await createClientProgram(user, {
        name: name.value,
        description: description.value,
        uniqueCode: uniqueCode.value,
      })
      router.push('/dash/' + program.id)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  const [uniqueCodeLoading, setUniqueCodeLoading] = useState(false)
  const [validUniqueCode, setValidUniqueCode] = useState(false)

  const handleUniqueCode = async (e) => {
    const { value } = e.target
    
    setUniqueCodeLoading(true)

    const docs = await firebase.firestore().collection('programs').where('uniqueCode', '==', value).get()

    if (docs.docs.length >= 1) {
      setValidUniqueCode(false)
    } else {
      setValidUniqueCode(true)
    }

    setUniqueCodeLoading(false)
  }

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        openCreate={open}
        closeCreate={close}
        loading={loading}
        setLoading={setLoading}
        submit={submit}
        dialogTitle="Create a Program"
        dialogSubTitle="Fill out the form below to create a new program"
      >
        <form onSubmit={handleCreate} className="flex flex-col py-4 space-y-5">
        { !error ? "" : (
          <div className="flex items-center gap-2 p-2 bg-red-300 bg-opacity-50 border-l-4 border-red-500 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500 text-opacity-75 fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-medium text-left text-red-500">{ error }</p>
          </div>
        )}
          <div className="flex flex-col ">
            <p className="text-left">Name</p>
            <input
              name="name"
              className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg"
              placeholder="Ex. Joe's Crabshack"
            />
          </div>
          <div className="flex flex-col">
            <p className="flex flex-row items-center gap-1 font-lg text-md">
              Description <span className="text-gray-500">(optional)</span>
            </p>
            <input
              name="description"
              className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg"
              placeholder="Ex. A restaurant from the ocean"
            />
          </div>
          <div className="flex flex-col gap-0">
            <p className="flex flex-row items-center gap-1 font-lg text-md">
              Unique Code{' '}
              <span className="text-gray-500">
                (used to join the program through text)
              </span>
            </p>
            <div className="relative rounded shadow">
            <input
              onChange={handleUniqueCode}
              type="text"
              name="uniqueCode"
              className="block w-full border-gray-300 rounded font-lg focus:ring-indigo-500 focus:border-indigo"
              placeholder="Ex. joescrab"
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                { uniqueCodeLoading ? 
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
                : validUniqueCode ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  :

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>}
            </div>
          </div>
          </div>
          <button ref={submit} className="hidden" type="submit" />
        </form>
      </BaseModal>
    </>
  )
}

export default CreateProgramModal

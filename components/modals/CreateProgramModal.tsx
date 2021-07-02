import { useState, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'

import BaseModal from './BaseModal'
import { Dialog, Transition } from '@headlessui/react'

import {
  createClientProgram,
  deleteProgram,
} from '../../utils/program/ProgramClientSide'

const CreateProgramModal = (props) => {
  const { user, isOpen, open, close } = props
  const router = useRouter()
  const submit = useRef(null)

  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { name, description, uniqueCode } = e.target

    try {
      const program = await createClientProgram(user, {
        name: name.value,
        description: description.value,
        uniqueCode: uniqueCode.value,
      })
      router.push('/dash/' + program.id)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
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
        dialogSubTitle="Fill ou the form below to create a new program"
      >
        <form onSubmit={handleCreate} className="flex flex-col space-y-5 py-4">
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
          <div className="flex flex-col">
            <p className="flex flex-row items-center gap-1 font-lg text-md">
              Unique Code{' '}
              <span className="text-gray-500">
                (used to join the program through text)
              </span>
            </p>
            <input
              name="uniqueCode"
              className="px-2 py-1 border border-gray-300 rounded shadow-sm font-lg"
              placeholder="Ex. joescrab"
            />
          </div>
          <button ref={submit} className="hidden" type="submit" />
        </form>
      </BaseModal>
    </>
  )
}

export default CreateProgramModal

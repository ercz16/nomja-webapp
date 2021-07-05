import { useState, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

const BaseModal = (props) => {
  const {
    isOpen,
    openCreate,
    closeCreate,
    loading,
    setLoading,
    submit,
    dialogTitle,
    dialogSubTitle,
    children
  } = props

  const submitButton = async (e) => {
    setLoading(true)
    submit.current.click()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 my-24 overflow-y-auto"
          onClose={loading ? () => {} : closeCreate}
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
                      {dialogTitle}
                    </Dialog.Title>
                    <p className="text-left text-gray-500 text-md">
                      {dialogSubTitle}
                    </p>
                  </div>
                  {children}
                </div>
                <div className="mt-5">
                  <div className="flex flex-row justify-end gap-4">
                    <button
                      onClick={closeCreate}
                      className={
                        !loading
                          ? 'px-4 py-2 font-medium text-gray-700 border border-gray-700 rounded cursor-pointer text-md hover:text-white hover:bg-gray-700 focus:outline-none'
                          : 'px-4 py-2 font-medium text-gray-500 border border-gray-600 rounded cursor-pointer text-md focus:outline-none cursor-not-allowed'
                      }
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => submitButton(e)}
                      className={
                        !loading
                          ? 'flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600 text-md focus:outline-none'
                          : 'flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-indigo-400 rounded cursor-not-allowed text-md focus:outline-none'
                      }
                    >
                      {loading ? (
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
    </>
  )
}

export default BaseModal

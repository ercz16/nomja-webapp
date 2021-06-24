import Link from 'next/link'

import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const exampleCustomer = { 
    name: 'Ryan McCauley', 
    phoneNum: '(850) 815-1751',
    visits: 1,
    lastVisit: 'June 19th, 2021',
    points: 50,
    discountsUsed: 3,
    textMessages: 51,
    id: 'fu8fnfndf'
}

const CustomerModal = (props) => {
    const { selected, isOpen, open, close } = props
    
    return (
        <>
          <div className="fixed inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={open}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Open dialog
            </button>
          </div>
    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={close}
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
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        your an email with all of the details of your order.
                      </p>
                    </div>
    
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={close}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )
}

const Customers = (props) => {
    const { program } = props
    const [modalOpen, setModalOpen] = useState(true)
    const [selected, setSelected] = useState(null)

    const open = () => {
        setModalOpen(true)
    }

    const close = () => {
        setModalOpen(false)
    }

    const handleSelect = async (e) => {
        console.log(e.target.props)
    }

    return (
        <>
            <div className="px-16 py-8">
                <div className="flex flex-col divide-y-2">
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">Customers</p>
                        <p className="text-lg text-gray-500">View the customers that use your rewards. Click on one to view more information.</p>
                    </div>
                    <div className="pt-3">
                        {/*<CustomerModal selected={selected} isOpen={modalOpen} open={() => open()} close={() => close()} />*/}
                        <div className="grid grid-rows-1 p-3 bg-white rounded gap-y-2">
                            <div className="grid grid-cols-7 p-2 text-lg font-semibold text-gray-600 uppercase border-b-2 border-gray-300">
                                <p>Name</p>
                                <p>Phone number</p>
                                <p>Text Messages</p>
                                <p>Visits</p>
                                <p>Last visit</p>
                                <p>Points</p>
                                <p>Discounts Used</p>
                            </div> 
                            <CustomerLine program={program} data={exampleCustomer} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CustomerLine = (props) => {
    const { program } = props
    return (
        <>
        <Link href={'/dash/' + program.id + '/customer/' + props.data.id}>
            <a key={props.data.id} className="grid grid-cols-7 p-3 text-lg cursor-pointer hover:bg-gray-100 hover:shadow">
                <p>{ props.data.name }</p>
                <p>{ props.data.phoneNum }</p>
                <p>{ props.data.textMessages }</p>
                <p>{ props.data.visits }</p>
                <p>{ props.data.lastVisit }</p>
                <p>{ props.data.points }</p>
                <p>{ props.data.discountsUsed }</p>
            </a>
        </Link>
        </>
    )
}

export default Customers
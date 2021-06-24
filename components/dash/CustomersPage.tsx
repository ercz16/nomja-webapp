import Link from 'next/link'
import firebase from '../../utils/firebase/Firebase'

import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

const CustomerModal = (props) => {
    const { selected, program, isOpen, open, close } = props
    
    return (
        <>   
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={close}
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
    
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left transition-all transform bg-white rounded shadow">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-900"
                    >
                      { formatPhoneNumber(selected.phoneNum) }
                    </Dialog.Title>
                    <div className="flex flex-col">
                      <p className="mb-3 text-gray-500">Customer since { new Date(selected.programs.filter(prog => prog.id == program.id)[0].joined).toISOString().slice(0, 10) }</p>
                      <p className="flex flex-row gap-1">Recent Text Messages ({ selected.messageHistory.filter(msg => msg.to == program.phoneNum).length })</p>
                      <div className="grid grid-cols-2 mb-3">
                        { selected.messageHistory.filter(msg => msg.to == program.phoneNum).sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime()).splice(0, 10).map(msg => {
                          return <p className="text-xs text-gray-600">'{ msg.text }', { new Date(msg.at).toLocaleString() } </p>
                        }) }
                      </div>
                      <div className="flex flex-row gap-1">Rewards ({getPoints(selected.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'POINTS'))} points 
                        & { selected.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'VISIT').length } visits)</div>
                      <div className="grid grid-cols-2">
                        { selected.rewards.filter(reward => reward.phoneNum == program.phoneNum).map(reward => {
                          return <p className="text-xs text-gray-600">+{`${reward.amount} ${reward.type.toLowerCase()}`} on { new Date(reward.date).toLocaleString()}</p>
                        })}
                      </div>
                    </div>
                    <div className="flex flex-row gap-1 mt-3">
                        <button onClick={() => close()} className="px-2 py-1 ml-auto font-medium text-white bg-gray-500 rounded shadow-sm">Close</button>
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
    const { program, customers } = props

    const [modalOpen, setModalOpen] = useState(false)
    const [selected, setSelected] = useState({
      phoneNum: '',
      rewards: [],
      messageHistory: [],
      programs: [
        {
          id: program.id,
          joined: new Date().toString()
        }
      ]
    })

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
                <CustomerModal program={program} selected={selected} isOpen={modalOpen} close={close} open={open} />
                <div className="flex flex-col divide-y-2">
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">Customers</p>
                        <p className="text-lg text-gray-500">View the customers that use your rewards. Click on one to view more information.</p>
                    </div>
                    <div className="pt-3">
                        {/*<CustomerModal selected={selected} isOpen={modalOpen} open={() => open()} close={() => close()} />*/}
                        <div className="grid grid-rows-1 p-3 bg-white rounded gap-y-2">
                            <div className="grid grid-cols-5 p-2 text-lg font-semibold text-gray-600 uppercase border-b-2 border-gray-300">
                                <p>Phone #</p>
                                <p>Texts</p>
                                <p>Visits</p>
                                <p>Last visit</p>
                                <p>Points</p>
                            </div> 
                            <CustomerLine open={() => setModalOpen(true)} setSelected={setSelected} program={program} customers={customers} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const getLastVisit = (rewards) => {
  const sorted = rewards.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime())
  return !sorted[0] ? "None" : new Date(sorted[0].date).toISOString().slice(0, 10)
}

const getPoints = (rewards) => {
  var totalPoints = 0
  for (const reward of rewards) {
    totalPoints += reward.amount
  }
  return totalPoints
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

const Customer = (props) => {
  const { open, program, customer, setSelected} = props

  const handleClick = (e) => {
    setSelected(customer)
    open()
  }

  return (
    <>
    <a onClick={handleClick} key={customer.id} className="grid grid-cols-5 p-3 text-lg cursor-pointer hover:bg-gray-100 hover:shadow">
      <p>{ formatPhoneNumber(customer.phoneNum) }</p>
      <p>{ customer.messageHistory.filter(msg => msg.to == program.phoneNum).length }</p>
      <p>{ customer.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'VISIT').length }</p>
      <p>{ getLastVisit(customer.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'VISIT')) }</p>
      <p>{ getPoints(customer.rewards.filter(reward => reward.phoneNum == program.phoneNum && reward.type == 'POINTS')) }</p>
    </a>
    </>
  )
}

const CustomerLine = (props) => {
    const { program, customers, setSelected, open } = props

    return (
        <>
        { customers.map((customer) => {
          return (
            <>
            <Customer open={open} setSelected={setSelected} customer={customer} program={program} />
            </>
          )
        })}
        </>
    )
}

export default Customers
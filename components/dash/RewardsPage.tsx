import { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { createReward } from '../../utils/program/rewards/Reward'
import { useRouter } from 'next/router'

enum RewardType {
    VISIT = "VISIT",
    POINTS = "POINTS",
    DISCOUNT = "DISCOUNT"
}

const getRequiredText = (type, required) => {
    if (type == RewardType.VISIT) {
        return <p className="text-lg text-gray-500">After { required } visit</p>
    } else if (type == RewardType.POINTS) {
        return <p className="text-lg text-gray-500">After { required } points</p>
    } else {
        return <p className="text-lg text-gray-500">After { required } visit</p>
    }
}

const Rewards = (props) => {
    let [isOpen, setIsOpen] = useState(false)
    const { program, user } = props

    const handleDelete = async (e, rewardId) => {
        e.stopPropagation()
    }

    const closeCreate = () => {
        setIsOpen(false)
    }

    const openCreate = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="px-16 py-8 overflow-hidden">
                <div className="flex flex-col divide-y-2">
                    <div className="grid grid-cols-8 mb-3">
                        <div className="col-span-3">
                            <div className="flex flex-col">
                                <p className="text-xl font-semibold">Rewards</p>
                                <p className="text-lg text-gray-500">Create rewards that your customers can use in your business. Click on one to edit.</p>
                            </div>
                        </div>
                        <div className="col-start-8">
                            <button onClick={openCreate} className="flex flex-row items-center gap-2 px-3 py-2 bg-red-500 rounded shadow cursor-pointer hover:bg-red-600 focus:outline-none">
                                <span className="text-lg font-semibold text-white">Create</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <CreateModal user={user} program={program} isOpen={isOpen} openCreate={openCreate} closeCreate={closeCreate} />
                    <div className="pt-3">
                        <div className="grid grid-cols-7 gap-4">
                            { program.rewards.length > 0 ? "" : 
                                (
                                    <>
                                    <div className="absolute flex flex-col text-lg text-center left-2/4 top-2/4" style={{ transform: 'translate(-50%, -50%)'}}>
                                        <p>It appears you do not have created any rewards.</p>
                                        <p><a className="font-medium text-blue-500 cursor-pointer hover:text-blue-600" onClick={openCreate}>Click here</a> to create one.</p>
                                    </div>
                                    </>
                                )
                            }
                            { program.rewards.map((reward) => {
                                return (
                                    <div key={reward.id} onClick={() => alert('dab')} className="px-4 py-3 bg-white rounded shadow cursor-pointer hover:shadow-md">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row items-center">
                                                <div className="flex flex-col">
                                                    <p className="text-xl">{ reward.name }</p>
                                                    { getRequiredText(reward.attributes.type, reward.attributes.required) }
                                                </div>
                                                <a onMouseDown={(e) => handleDelete(e, reward.id)} className="ml-auto text-gray-700 cursor-pointer hover:text-red-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const DeleteModal = (props) => {
    return (
        <>
        </>
    )
}

const CreateModal = (props) => {
    const { user, program, isOpen, openCreate, closeCreate } = props
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(RewardType.VISIT)
    const hiddenSubmit = useRef(null)
    const router = useRouter()
    
    const handleCreation = async (e) => {
        e.preventDefault()
        const { name, description, required, activeUntil, discountPercentage } = e.target

        try {
            const reward = await createReward(user.login.uid, program.id, { name: name.value, description: description.value != undefined ? description.value : "", attributes: {
                type: type, required: required.value != undefined ? required.value : "", activeUntil: activeUntil.value != undefined ? activeUntil.value : new Date(new Date().setFullYear(new Date().getFullYear() + 100))
                , discount: discountPercentage != undefined ? discountPercentage.value : "" }})
            router.reload()
        } catch (e) {
            console.error(e)
            setLoading(false)
            closeCreate()
        }
    }

    const submitButton = async (e) => {
        setLoading(true)
        hiddenSubmit.current.click()
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
                  <div className="inline-block w-4/12 p-8 transition-all transform bg-white rounded shadow-sm">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold text-left"
                    >
                      Create Reward
                    </Dialog.Title>
                    <p className="text-left text-gray-500 text-md">Create your new reward to your liking.</p>
                    <div className="flex flex-col gap-4 mt-5">
                      <form onSubmit={handleCreation} className="flex grid flex-col grid-cols-8 gap-2">
                        <div className="flex flex-col col-span-3">
                            <p className="font-medium text-left text-gray-800">Name</p>
                            <input type="text" name="name" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Reward Name" />
                        </div>
                        <div className="flex flex-col col-span-8 col-start-1">
                            <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">Description <span className="text-sm text-gray-500">(optional)</span></p>
                            <input type="text" name="description" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Description" />
                        </div>
                        <div className="flex flex-col col-span-8 col-start-1">
                            <p className="font-medium text-left text-gray-800">Type of reward</p>
                            <div className="flex flex-row gap-6">
                                <label className="inline-flex items-center text-md">
                                    <input type="radio" onChange={(e) => setType(RewardType.VISIT)} className="form-radio" name="accountType" value="visits" defaultChecked={true} />
                                    <span className="ml-2">Visit based</span>
                                </label>
                                <label className="inline-flex items-center text-md">
                                    <input type="radio" onChange={(e) => setType(RewardType.POINTS)} className="form-radio" name="accountType" value="points" />
                                    <span className="ml-2">Point based</span>
                                </label>
                                <label className="inline-flex items-center text-md">
                                    <input type="radio" onChange={(e) => setType(RewardType.DISCOUNT)} className="form-radio" name="accountType" value="discount" />
                                    <span className="ml-2">Discount</span>
                                </label>
                            </div>
                        </div>
                        { getRewardTypeOptions(type) }
                        <button ref={hiddenSubmit} type="submit" className="hidden"/>
                      </form>
                    </div>
                    <div className="mt-5">
                        <div className="flex flex-row justify-end gap-4">
                            <button onClick={closeCreate} className={ !loading ? "px-4 py-2 font-medium text-gray-500 border border-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white text-md focus:outline-none" : "px-4 py-2 font-medium text-gray-400 border border-gray-400 rounded cursor-pointer text-md focus:outline-none cursor-not-allowed"}>Cancel</button>
                            <button onClick={(e) => submitButton(e)} className={ !loading ? "flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 text-md focus:outline-none" : "flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-red-400 rounded cursor-not-allowed text-md focus:outline-none"} >
                                { loading ? 
                                (
                                    <>
                                    Create
                                    <svg className="w-5 h-5 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    </>
                                ) :
                                (
                                    <>
                                    Create
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"                              viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    </>
                                )
                                }
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

const getRewardTypeOptions = (type) => {
    if (type == RewardType.DISCOUNT) {
        return (
            <div className="grid grid-cols-8 col-span-8 gap-2">
                <div className="flex flex-col col-span-4">
                    <p className="font-medium text-left text-gray-800">Discount %</p>
                    <input type="number" min={1} max={100} name="discountPercentage" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="1" />
                </div>
                <div className="flex flex-col col-span-4 col-start-1">
                    <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">Active until <span className="text-sm text-gray-500">(optional)</span></p>
                    <input type="date" name="activeUntil" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Description" />
                </div>
            </div>
        )
    } else if (type == RewardType.POINTS) {
        return (
            <div className="grid grid-cols-8 col-span-8 gap-2">
                <div className="flex flex-col col-span-4">
                    <p className="font-medium text-left text-gray-800">Required points</p>
                    <input type="number" min={1} max={10000} name="required" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="1" />
                </div>
                <div className="flex flex-col col-span-4 col-start-1">
                    <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">Active until <span className="text-sm text-gray-500">(optional)</span></p>
                    <input type="date" name="activeUntil" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Description" />
                </div>
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-8 col-span-8 gap-2">
                <div className="flex flex-col col-span-4">
                    <p className="font-medium text-left text-gray-800">Required Visits</p>
                    <input type="number" min={1} max={10000} name="required" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="1" />
                </div>
                <div className="flex flex-col col-span-4 col-start-1">
                    <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">Active until <span className="text-sm text-gray-500">(optional)</span></p>
                    <input type="date" name="activeUntil" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Description" />
                </div>
            </div>
        )   
    }
}

export default Rewards
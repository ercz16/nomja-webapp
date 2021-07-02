import { useState } from 'react'

import { useRouter } from 'next/router'

import firebase from '../../utils/firebase/Firebase'

import CreateButton from '../buttons/CreateButton'
import CreateRewardModal from '../modals/CreateRewardModal'

import { RewardType } from '../rewards/RewardTypeOptions'

const getRequiredText = (type, required) => {
  if (type == RewardType.VISIT) {
    return <p className="text-lg text-gray-500">After {required} visit</p>
  } else if (type == RewardType.POINTS) {
    return <p className="text-lg text-gray-500">After {required} points</p>
  } else {
    return <p className="text-lg text-gray-500">After {required} visit</p>
  }
}

const Rewards = (props) => {
  const { program, user } = props
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async (e, rewardId) => {
    e.stopPropagation()
    try {
      const update = await firebase
        .firestore()
        .collection('programs')
        .doc(program.id)
        .update({
          rewards: firebase.firestore.FieldValue.arrayRemove(
            program.rewards.filter((reward) => reward.id == rewardId)[0]
          ),
        })
      router.reload()
    } catch (e) {
      console.log(e)
    }
  }

  const closeCreate = () => setIsOpen(false)
  const openCreate = () => setIsOpen(true)

  return (
    <>
      <div className="px-16 py-8 overflow-hidden">
        <div className="flex flex-col divide-y-2">
          <div className="flex mb-3 justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Rewards</p>
              <p className="text-lg text-gray-500">
                Create rewards that your customers can use in your business.
                Click on one to edit.
              </p>
            </div>
            <CreateButton action={openCreate}>Create</CreateButton>
          </div>
          <CreateRewardModal
            user={user}
            program={program}
            isOpen={isOpen}
            openCreate={openCreate}
            closeCreate={closeCreate}
          />
          <div className="pt-3">
            <div className="grid grid-cols7 gap-4">
              {program.rewards.length > 0 ? (
                ''
              ) : (
                <>
                  <div
                    className="absolute flex flex-col text-center text-gray-800 left-2/4 top-2/4 ml-20"
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    <p className="text-xl">
                      It appears you do not have created any rewards
                    </p>
                    <p>
                      <a
                        className="text-lg font-medium text-red-500 cursor-pointer hover:underline hover:text-red-600"
                        onClick={openCreate}
                      >
                        Click here
                      </a>{' '}
                      to create one
                    </p>
                  </div>
                </>
              )}
              {program.rewards.map((reward) => {
                return (
                  <div
                    key={reward.id}
                    className="px-4 py-3 bg-white rounded shadow cursor-pointer hover:shadow-md"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col">
                          <p className="text-xl">{reward.name}</p>
                          {getRequiredText(
                            reward.attributes.type,
                            reward.attributes.required
                          )}
                        </div>
                        <a
                          onMouseDown={(e) => handleDelete(e, reward.id)}
                          className="ml-auto text-gray-700 cursor-pointer hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 fill-current"
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
  return <></>
}

export default Rewards

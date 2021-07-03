import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import BaseModal from './BaseModal'
import RewardTypeOptions, { RewardType } from '../rewards/RewardTypeOptions'

import { createReward } from '../../utils/program/rewards/Reward'

import { nanoid } from 'nanoid'

const CreateRewardModal = (props) => {
  const { user, program, isOpen, openCreate, closeCreate } = props

  const [type, setType] = useState(RewardType.VISIT)
  const [loading, setLoading] = useState(false)
  const hiddenSubmit = useRef(null)
  const router = useRouter()

  const handleCreate = async (e) => {
    e.preventDefault()

    const { name, description, required, activeUntil, discountPercentage } =
      e.target

    try {
      const reward = await createReward(user.login.uid, program.id, {
        id: nanoid(16),
        name: name.value,
        description: description.value != undefined ? description.value : '',
        attributes: {
          type: type,
          required: required.value != undefined ? required.value : '',
          activeUntil:
            activeUntil.value != undefined
              ? activeUntil.value
              : new Date(
                  new Date().setFullYear(new Date().getFullYear() + 100)
                ),
          discount:
            discountPercentage != undefined ? discountPercentage.value : '',
        },
      })
      router.reload()
    } catch (e) {
      console.error(e)
      setLoading(false)
      closeCreate()
    }
  }

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        openCreate={openCreate}
        closeCreate={closeCreate}
        loading={loading}
        setLoading={setLoading}
        submit={hiddenSubmit}
        dialogTitle="Create Reward"
        dialogSubTitle="Create your new reward to your liking"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-2 space-y-2">
          <div className="flex flex-col col-span-3">
            <p className="font-medium text-left text-gray-800">Name</p>
            <input
              type="text"
              name="name"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Reward Name"
            />
          </div>
          <div className="flex flex-col col-span-8 col-start-1">
            <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">
              Description{' '}
              <span className="text-sm text-gray-500">(optional)</span>
            </p>
            <input
              type="text"
              name="description"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col col-span-8 col-start-1">
            <p className="font-medium text-left text-gray-800">
              Type of reward
            </p>
            <div className="flex flex-row gap-6">
              <label className="inline-flex items-center text-md">
                <input
                  type="radio"
                  onChange={(e) => setType(RewardType.VISIT)}
                  className="form-radio"
                  name="accountType"
                  value="visits"
                  defaultChecked={true}
                />
                <span className="ml-2">Visit based</span>
              </label>
              <label className="inline-flex items-center text-md">
                <input
                  type="radio"
                  onChange={(e) => setType(RewardType.POINTS)}
                  className="form-radio"
                  name="accountType"
                  value="points"
                />
                <span className="ml-2">Point based</span>
              </label>
              {/*<label className="inline-flex items-center text-md">
                                      <input type="radio" onChange={(e) => setType(RewardType.DISCOUNT)} className="form-radio" name="accountType" value="discount" />
                                      <span className="ml-2">Discount</span>
                                  </label>*/}
            </div>
          </div>
          <RewardTypeOptions type={type} />
          <button ref={hiddenSubmit} type="submit" className="hidden" />
        </form>
      </BaseModal>
    </>
  )
}

export default CreateRewardModal

export enum RewardType {
  VISIT = 'VISIT',
  POINTS = 'POINTS',
  DISCOUNT = 'DISCOUNT',
}

const RewardTypeOptions = ({ type }) => {
  return (
    <>
      {type == RewardType.DISCOUNT ? (
        <div className="grid grid-cols-8 col-span-8 gap-2">
          <div className="flex flex-col col-span-4">
            <p className="font-medium text-left text-gray-800">Discount %</p>
            <input
              type="number"
              min={1}
              max={100}
              name="discountPercentage"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="1"
            />
          </div>
          <div className="flex flex-col col-span-4 col-start-1">
            <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">
              Active until{' '}
              <span className="text-sm text-gray-500">(optional)</span>
            </p>
            <input
              type="date"
              name="activeUntil"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Description"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <p className="font-medium text-left text-gray-800">
              Required {type == RewardType.POINTS ? 'Points' : 'Visits'}
            </p>
            <input
              type="number"
              min={1}
              max={10000}
              name="required"
              className="w-1/2 px-2 py-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="1"
            />
          </div>
          <div className="flex flex-col">
            <p className="flex flex-row items-center gap-1 font-medium text-left text-gray-800">
              Active until{' '}
              <span className="text-sm text-gray-500">(optional)</span>
            </p>
            <input
              type="date"
              name="activeUntil"
              className="w-1/2 px-2 py-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="Description"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default RewardTypeOptions

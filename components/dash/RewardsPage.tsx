const Rewards = (props) => {

    const handleDelete = async (e) => {
        e.stopPropagation()
        alert('lol')
    }

    return (
        <>
            <div className="px-16 py-8">
                <div className="flex flex-col divide-y-2">
                    <div className="grid grid-cols-8 mb-3">
                        <div className="col-span-3">
                            <div className="flex flex-col">
                                <p className="text-xl font-semibold">Rewards</p>
                                <p className="text-lg text-gray-500">Create rewards that your customers can use in your business. Click on one to edit.</p>
                            </div>
                        </div>
                        <div className="col-start-8">
                            <button className="flex flex-row items-center gap-2 px-3 py-2 bg-red-500 rounded shadow cursor-pointer hover:shadow-md hover:bg-red-600">
                                <span className="text-lg font-semibold text-white">Create</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="pt-3">
                        <div className="grid grid-cols-7 gap-4">
                            <div onClick={() => alert('dab')} className="px-4 py-3 bg-white rounded shadow cursor-pointer hover:shadow-md">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row items-center">
                                        <div className="flex flex-col">
                                            <p className="text-xl">Free Lunch</p>
                                            <p className="text-lg text-gray-500">After 1 visit</p>
                                        </div>
                                        <a onMouseDown={(e) => handleDelete(e)} className="ml-auto text-gray-700 cursor-pointer hover:text-red-500">                                 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rewards
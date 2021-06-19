import RewardsPage from '../../../components/dash/RewardsPage'

const Index = (props) => {
    return (
        <>
        <div className="min-h-screen bg-gray-100">
            <div className="grid grid-cols-8 px-8 py-4 bg-gray-900">
                <div className="col-span-1">
                    <p className="text-2xl font-bold text-white">Nomja</p>
                </div>
                <div className="flex flex-row items-center col-start-8 gap-x-2">
                    <p className="text-lg text-white">Ryan McCauley</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="grid grid-cols-7">
                <div className="h-screen col-span-1 bg-white shadow">
                    <div className="grid grid-rows-1 p-8 gap-y-6">
                        <div className="flex flex-col p-2 bg-gray-100 rounded shadow">
                            <p className="text-xl font-semibold text-gray-800">Crab Shack</p>
                            <p className="text-lg text-gray-500">A restaurant from the ocean!</p> 
                            <p className="text-lg text-gray-500">Since July 7th, 2012</p> 
                        </div>
                        <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xl">Dashboard</p>
                        </div>
                        <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xl">Rewards</p>
                        </div>
                        <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <p className="text-xl">Customers</p>
                        </div>
                        <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                            <p className="text-xl">Settings</p>
                        </div>
                        <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xl">Support</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <RewardsPage />
                </div>
            </div>
        </div>
        </>
    )
}

export default Index
import { Navbar, Footer } from './index'

const Features = () => {
    return (
        <div className="relative z-10 flex flex-col gap-4 px-48 py-32">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-3 col-start-2 px-16 flex flex-col gap-4">
                    <p className="font-bold text-center text-3xl text-gray-800">A simple, easy integrated system for you to engage with your customers.</p>
                    <p className="text-xl text-gray-600 text-center ">Integration is easy. Setup an account within minutes, place a QR Code in your business, and let your customers scan it and begin to use your loyalty program.</p>
                </div>
                <div className="col-start-2 col-span-3">
                    <div className="">
                        <div className="grid gap-6 row-gap-10">
                            <div className="lg:py-6 lg:pr-16">
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                        <div>
                                            <div className="flex items-center justify-center font-medium w-10 h-10 border rounded-full">
                                                1
                                            </div>
                                        </div>
                                        <div className="w-px h-full bg-gray-300" />
                                    </div>
                                    <div className="pt-1 pb-8">
                                        <p className="mb-2 text-lg font-bold">Create a program</p>
                                        <p className="text-gray-700">
                                            Within minutes, setup a program that includes customized rewards that your customers can redeem in your business.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                        <div>
                                            <div className="flex items-center justify-center font-medium w-10 h-10 border rounded-full">
                                                2
                                            </div>
                                        </div>
                                        <div className="w-px h-full bg-gray-300" />
                                    </div>
                                    <div className="pt-1 pb-8">
                                        <p className="mb-2 text-lg font-bold">Share QR Code</p>
                                        <p className="text-gray-700">
                                            Every program has a QR Code related to it. Put up the QR Code in your business and allow your customers to scan it with their phones and text
                                            your programs phone number.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                        <div>
                                            <div className="flex items-center font-medium justify-center w-10 h-10 border rounded-full">
                                                3
                                            </div>
                                        </div>
                                        <div className="w-px h-full bg-gray-300" />
                                    </div>
                                    <div className="pt-1 pb-8">
                                        <p className="mb-2 text-lg font-bold">Take a picture of receipts</p>
                                        <p className="text-gray-700">
                                            After a purchase, your customers can scan their receipt and text it to the phone number from before and redeem points and visits.
                                            Each receipt sent is 1 visit and for each dollar spent is equal to 1 point.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                        <div>
                                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                                4
                                            </div>
                                        </div>
                                        <div className="w-px h-full bg-gray-300" />
                                    </div>
                                    <div className="pt-1 pb-8">
                                        <p className="mb-2 text-lg font-bold">Redeem rewards</p>
                                        <p className="text-gray-700">
                                            After receiving rewards for purchases, your customers can text "rewards" to the program's phone number and they get a link where
                                            they are able to redeem the rewards that you can setup on the dashboard.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                        <div>
                                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                                <svg
                                                    className="w-6 text-gray-600"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <polyline
                                                        fill="none"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        points="6,12 10,16 18,8"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="mb-2 text-lg font-bold">That's it!</p>
                                        <p className="text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 px-32">
                <div className="flex flex-col text-center items-center border rounded-lg shadow-sm p-4 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 border-2 border-green-500 p-1 rounded-full w-7 fill-current text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-md text-gray-800 font-semibold">Completely account-less.</p>
                    <p className="text-gray-600 text-sm">Your customers do not have to create an account to start gaining rewards. All they have to do is scan a QR Code and text the phone number.</p>
                </div>
                <div className="flex flex-col text-center items-center border rounded-lg shadow-sm p-4 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 border-2 border-green-500 p-1 rounded-full w-7 fill-current text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-md text-gray-800 font-semibold">Easily integrated.</p>
                    <p className="text-gray-600 text-sm">No special instructions or documentation. Print your QR Code found in your programs dashboard, put it in your restaurant, and let your customers begin redeeming.</p>
                </div>
                <div className="flex flex-col text-center items-center border rounded-lg shadow-sm p-4 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 border-2 border-green-500 p-1 rounded-full w-7 fill-current text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-md text-gray-800 font-semibold">Low cost.</p>
                    <p className="text-gray-600 text-sm">Compared to competitors, you get the most out of your money using our service. We offer a cheap solution with flexible plans for your business.</p>
                </div>
            </div>
        </div>
    )
}

const FeaturesPage = (props) => {
    return (
        <>
            <Navbar />
            <Features />
            <Footer />
        </>
    )
}

export default FeaturesPage
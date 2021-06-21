import Link from 'next/link'

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

const Customers = (props) => {
    return (
        <>
            <div className="px-16 py-8">
                <div className="flex flex-col divide-y-2">
                    <div className="flex flex-col">
                                <p className="text-xl font-semibold">Customers</p>
                                <p className="text-lg text-gray-500">View the customers that use your rewards. Click on one to view more information.</p>
                    </div>
                    <div className="pt-3">
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
                            <CustomerLine data={exampleCustomer} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CustomerLine = (props) => {
    return (
        <>
            <div key={props.data.id} className="grid grid-cols-7 p-3 text-lg cursor-pointer hover:bg-gray-100 hover:shadow">
                <p className="">{ props.data.name }</p>
                <p>{ props.data.phoneNum }</p>
                <p>{ props.data.textMessages }</p>
                <p>{ props.data.visits }</p>
                <p>{ props.data.lastVisit }</p>
                <p>{ props.data.points }</p>
                <p>{ props.data.discountsUsed }</p>
            </div>
        </>
    )
}

export default Customers
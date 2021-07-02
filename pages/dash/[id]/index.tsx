import RewardsPage from '../../../components/dash/RewardsPage'
import CustomersPage from '../../../components/dash/CustomersPage'
import Link from 'next/link'
import Head from 'next/head'
import QRCode from 'qrcode'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSSRPropsProgram } from '../../../utils/auth/ServerAuth'
import firebase from '../../../utils/firebase/Firebase'
const firestore = firebase.firestore,
  auth = firebase.auth

const getPages = (props) => {
  const { program, user, customers } = props
  return {
    DASHBOARD: <RewardsPage />,
    REWARDS: <RewardsPage user={user} program={program} />,
    CUSTOMERS: (
      <CustomersPage user={user} program={program} customers={customers} />
    ),
    SETINGS: <CustomersPage />,
    SUPPORT: <CustomersPage />,
  }
}

export const getServerSideProps = async (ctx) => {
  const props = await getSSRPropsProgram(ctx)
  return props
}

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

const Index = (props) => {
  const router = useRouter()
  const { program, user, customers } = props
  const Pages = getPages(props)
  const [currentPage, setCurrentPage] = useState(Pages.REWARDS)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{program.name} - Nomja</title>
      </Head>
      <div className="h-screen bg-gray-100">
        <div className="flex justify-between items-center px-8 py-4 bg-gray-100">
          <div className="p-1">
            <Link href="/manage">
              <a>
                <img src="/all-together.png" className="h-9" />
              </a>
            </Link>
          </div>
          <div className="flex flex-col">
            <div
              onClick={() => setAccountDropdownOpen(true)}
              className="flex justify-between items-center cursor-pointer gap-x-2"
            >
              <p className="text-lg font-medium">
                {user.name.first + ' ' + user.name.last}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={
                !accountDropdownOpen
                  ? 'hidden'
                  : 'absolute flex flex-col w-32 px-3 py-2 mt-8 bg-white rounded shadow'
              }
            >
              <p
                onClick={async () => {
                  const logout = await auth().signOut()
                  const redirect = router.push('/auth/signin')
                }}
                className="flex flex-row items-center p-1 rounded cursor-pointer hover:bg-gray-100"
              >
                <span className="font-medium">Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 ml-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="h-screen bg-white shadow border-none">
            <div className="flex flex-col justify-start p-5 gap-y-6 bg-gray-100 h-full">
              <div className="flex flex-col px-6 pb-4 pt-2 bg-white shadow-xl rounded-md">
                <p className="text-xl font-medium text-gray-800 border-b-2 border-gray-300 text-center">
                  {program.name}
                </p>
                <p className="text-lg text-gray-500 text-center">
                  {program.description}
                </p>
                <p className="text-gray-500 text-md text-center mt-2">
                  {formatPhoneNumber(program.phoneNum)}
                </p>
                <p className="text-gray-500 text-md ml-3">
                  @{program.uniqueCode}
                </p>
                <a
                  className="mt-3 font-medium text-red-500 hover:underline hover:text-red-600"
                  href={program.qrcode}
                  download
                >
                  Download QRCode
                </a>
              </div>
              <div className="flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-7 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xl">Dashboard</p>
              </div>
              <div
                onClick={() => setCurrentPage(Pages.REWARDS)}
                className={
                  currentPage == Pages.REWARDS
                    ? 'flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer text-gray-800 bg-gray-100 shadow-sm'
                    : 'flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow-sm'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-7 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xl">Rewards</p>
              </div>
              <div
                onClick={() => setCurrentPage(Pages.CUSTOMERS)}
                className={
                  currentPage == Pages.CUSTOMERS
                    ? 'flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer text-gray-800 bg-gray-100 shadow-sm'
                    : 'flex flex-row items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow-sm'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-7 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <p className="text-xl">Customers</p>
              </div>
              <div className="flex items-center gap-4 p-2 text-gray-600 rounded cursor-pointer hover:text-gray-800 hover:bg-gray-100 hover:shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-7 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                <p className="text-xl">Settings</p>
              </div>
            </div>
          </div>

          <div className="flex-grow bg-white rounded-2xl">{currentPage}</div>
        </div>
      </div>
    </>
  )
}

export default Index

import RewardsPage from '../../../components/dash/RewardsPage'
import CustomersPage from '../../../components/dash/CustomersPage'
import Link from 'next/link'
import Head from 'next/head'
import QRCode from 'qrcode'

import { useAuth } from '../../../utils/auth/AuthProvider'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSSRPropsUser } from '../../../utils/auth/ServerAuth'
import firebase from '../../../utils/firebase/Firebase'
const firestore = firebase.firestore,
  auth = firebase.auth

export const getServerSideProps = async (ctx) => {
  const props = await getSSRPropsUser(ctx)
  return props
}

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

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

const Sidebar = (props) => {
  const router = useRouter()
  const { user, data, programs } = useAuth()
  const program = !programs ? null : programs.filter(p => p.id == router.query.id)[0]
  
  return (
    <div className="flex flex-col items-center flex-none w-56 min-h-screen py-4 bg-gray-100 bg-opacity-75 border-r">
        { !program ? 
          <div className="flex flex-col w-10/12 gap-1 px-2 py-1 mb-3 bg-gray-200 rounded-lg animate-pulse">
            <div className="w-5/12 h-6 bg-gray-300 rounded" />
            <div className="w-9/12 h-5 bg-gray-300 rounded" /> 
            <div className="w-10/12 h-5 bg-gray-300 rounded" />
          </div>
        : 
          <div className="flex flex-col w-10/12 px-2 py-1 mb-3 bg-gray-200 rounded-lg">
            <p className="text-xl font-medium text-gray-700">{ program.name }</p>
            <p className="text-lg text-gray-600">{ formatPhoneNumber(program.phoneNum) }</p>
            <p className="text-lg text-gray-600">@{ program.uniqueCode }</p>
          </div>
        }
        <div className="flex flex-row items-center w-full gap-3 p-2 px-4 text-gray-600 cursor-pointer hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-lg">Dashboard</span>
        </div>
        <div className="flex flex-row items-center w-full gap-3 p-2 px-4 text-gray-600 cursor-pointer hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <span className="text-lg">Rewards</span>
        </div>
        <div className="flex flex-row items-center w-full gap-3 p-2 px-4 text-gray-600 cursor-pointer hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span className="text-lg">Customers</span>
        </div>
        <div className="flex flex-row items-center w-full gap-3 p-2 px-4 text-gray-600 cursor-pointer hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-lg">Settings</span>
        </div>
    </div>
  )
}

const Navbar = (props) => {
  const router = useRouter()
  const { user, programs, data } = useAuth()
  const program = !programs ? null : programs.filter(p => p.id == router.query.id)

  return (
    <div className="flex flex-row items-center justify-between w-full h-16 px-8 border-b">
      <div className="flex flex-row items-center gap-4">
        <Link href='/manage'>
          <a className="text-4xl font-extrabold text-indigo-500 hover:text-indigo-600">nomja</a>
        </Link>
        
      </div>
      <div className="flex flex-row items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`p-1 text-gray-600 bg-gray-100 rounded-full fill-current w-7 h-7 bg-opacity-500 ${!data ? 'animate-pulse' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        {!data ? <div className="w-24 h-4 bg-gray-100 rounded-lg animate-pulse" /> :
          <p className="text-lg text-gray-600">{ data.name.first + ' ' + data.name.last }</p>
        }
      </div>
    </div>
  )
}

const Index = (props) => {
  return (
    <div className="flex flex-row">
      <Sidebar props={props} />
      <Navbar />
    </div>
  )
}

const Indexf = (props) => {
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
        <div className="flex items-center justify-between px-8 py-4 bg-gray-100">
          <div className="p-1">
            <Link href='/manage'>
              <a className="text-3xl font-bold text-indigo-500 hover:text-indigo-600">nomja</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <div
              onClick={() => setAccountDropdownOpen(true)}
              className="flex items-center justify-between cursor-pointer gap-x-2"
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
          <div className="h-screen bg-white border-none shadow">
            <div className="flex flex-col justify-start h-full p-5 bg-gray-100 gap-y-6">
              <div className="flex flex-col px-6 pt-2 pb-4 bg-white rounded-md shadow-xl">
                <p className="text-xl font-medium text-center text-gray-800 border-b-2 border-gray-300">
                  {program.name}
                </p>
                <p className="text-lg text-center text-gray-500">
                  {program.description}
                </p>
                <p className="mt-2 text-center text-gray-500 text-md">
                  {formatPhoneNumber(program.phoneNum)}
                </p>
                <p className="ml-3 text-gray-500 text-md">
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

import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import Link from 'next/link'
import Head from 'next/head'

const Navbar = (props) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const offsetY = window.pageYOffset
      console.log(offsetY)
      if (offsetY > 5) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })
  }, [])

  const [showCompany, setShowCompany] = useState(false)
  const [mobileDrop, setMobileDrop] = useState(false)

  return (
      <>
      <div className={`${scrolled ? 'bg-white border-b shadow transition ease-in-out duration-500 transform translate-y-1 -mt-1' : ''} fixed flex justify-between w-full items-center z-20 px-8 sm:px-16 md:px-32 xl:px-64 py-4`}>
        <Link href='/'>
          <a className="text-indigo-500 hover:text-indigo-600 text-5xl font-bold leading-1 flex">
            <img className="" width="196" src="/assets/all-together.png" />
          </a>
        </Link>
        <div className={`${scrolled ? '' : 'hidden'} hidden lg:flex items-center gap-6`}>
          <Link href='/features'>
            <a className="text-gray-700 font-medium">Features</a>
          </Link>
          <Link href='/pricing'>
            <a className="text-gray-700 font-medium">Pricing</a>
          </Link>
          <div className="relative">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowCompany(!showCompany)}>
              <p className="py-3 text-gray-700 font-medium">Company</p>
              <div className="cursor-pointer text-gray-600 mr-3">
                {!showCompany ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                )}
              </div>
            </div>
            <Transition
                show={showCompany}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="flex border border-gray-300 py-5 border-opacity-50 visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded mt-2 w-max py-1 absolute">
                  <div className="flex flex-col px-6 gap-2">
                    <p className="text-gray-700 font-medium leading-3 tracking-normal">Company</p>
                    <Link href='/company/about-us'>
                      <a className="text-gray-500 hover:text-gray-700 text-sm leading-3 tracking-normal">About Us</a>
                    </Link>
                    <Link href='/company/contact-us'>
                      <a className="text-gray-500 hover:text-gray-700 text-sm leading-3 tracking-normal">Contact Us</a>
                    </Link>
                    <Link href='/company/resources'>
                      <a className="text-gray-500 hover:text-gray-700 text-sm leading-3 tracking-normal">Resources</a>
                    </Link>
                  </div>
                <div className="flex flex-col px-6 gap-2">
                  <p className="text-gray-700 font-medium leading-3 tracking-normal">Legal</p>
                  <Link href='/legal/privacy-policy'>
                    <a className="text-gray-500 hover:text-gray-700 text-sm leading-3 tracking-normal">Privacy Policy</a>
                  </Link>
                  <Link href='/legal/terms-of-service'>
                    <a className="text-gray-500 hover:text-gray-700 text-sm leading-3 tracking-normal">Terms of Service</a>
                  </Link>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div className="lg:hidden flex items-center gap-1">
          <button onClick={() => setMobileDrop(!mobileDrop)}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 fill-current text-gray-600 transform ease-in-out duration-200 ${mobileDrop ? 'rotate-90' : ''} fill-current text-gray-800`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="items-center gap-1 hidden lg:flex">
          <Link href='/auth/signin'>
            <a className={`rounded text-indigo-500 hover:text-indigo-600 px-3 font-medium py-2 flex items-center gap-1`}>
              Sign In
            </a>
          </Link>
          <Link href='/auth/signup'>
            <a className={`bg-indigo-500 hover:bg-indigo-600 border-2 border-indigo-500 hover:border-indigo-600 text-white px-3 py-2 rounded shadow font-medium flex items-center gap-1`}>
              Create Account
            </a>
          </Link>
        </div>
      </div>
        <div className="relative lg:hidden z-20">
          {mobileDrop && (
              <div className="flex flex-col items-center gap-2 py-2 transition duration-300 opacity-100 bg-white border-b border-gray-300 rounded mt-20 py-1 fixed w-full">
                <Link href='/features'>
                  <a className="cursor-pointer text-gray-700 leading-3 text-lg tracking-normal px-3 py-3 rounded hover:bg-gray-100 font-normal">Features</a>
                </Link>
                <Link href='/pricing'>
                  <a className="cursor-pointer text-gray-700 leading-3 text-lg tracking-normal px-3 py-3 rounded hover:bg-gray-100 font-normal">Pricing</a>
                </Link>
                <Link href='/auth/signin'>
                  <a className="cursor-pointer text-indigo-500 hover:text-indigo-600 leading-3 text-lg rounded tracking-normal px-3 py-3 hover:bg-gray-100 font-normal">Sign In</a>
                </Link>
                <Link href='/signup'>
                  <a className="cursor-pointer bg-indigo-500 text-white hover:bg-indigo-600 leading-3 text-lg tracking-normal px-3 py-3 rounded font-normal">Create Account</a>
                </Link>
              </div>
          )}
        </div>
      </>
  )
}

const LandingSection = () => {
  const [showing, setShowing] = useState(true)
  return (
    <>
      <div className="hidden absolute z-0 -mt-20 top-0 right-0 w-1/2">
        <svg style={{ width: '64rem' }} className="text-indigo-800 fill-current" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.8,-56.4C54.3,-45.4,55.7,-27.7,55.9,-12C56,3.6,54.9,17.3,49.1,29.5C43.4,41.6,33.1,52.2,18.7,62.2C4.2,72.1,-14.4,81.5,-25.7,75.3C-37,69.2,-40.9,47.5,-47.3,30.3C-53.8,13,-62.8,0.2,-61.1,-10.9C-59.3,-22.1,-46.8,-31.5,-34.8,-42.1C-22.8,-52.7,-11.4,-64.5,3.1,-68.2C17.6,-71.9,35.2,-67.4,44.8,-56.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="relative grid items-center grid-cols-1 lg:grid-cols-2 gap-12 px-8 sm:px-16 md:px-32 xl:px-64 py-32 shadow-b-lg">
        <div className="flex flex-col gap-5">
          <p className="text-6xl font-bold text-gray-800">The modern way to gain <span className="inline text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-indigo-500 to-indigo-800">retention</span></p>
          <p className="text-2xl font-light text-gray-700">Get the most out of your customers and encourage them to come back using a modernized loyalty program all through text messaging.</p>
          <div className="flex flex-row gap-3 items-center">
            <Link href="/auth/signup">
              <a className="px-4 py-2 text-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow">Get Started</a>
            </Link>
            <Link href='/features'>
              <a className="text-lg font-medium text-indigo-500 hover:text-indigo-600">Learn more</a>
            </Link>
          </div>
        </div>
        <Transition
            show={showing}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
          <div className="flex flex-col items-center justify-center">
            <img className="w-1/2" src="/assets/iphone_demo.png" />
          </div>
        </Transition>
      </div>
    </>
  )
}

const FeaturesSection = () => {
  return (
    <div onClick={() => window.alert('Dab')} className="py-16 bg-white">
      <div className="container px-16 mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-400 uppercase text-md">achieve more</p>
            <p className="text-2xl font-bold text-gray-800">Easily integrate a loyalty program with your customers at the tap of a button.</p>
            <Link href="/features">
              <a className="flex flex-row items-center gap-1 text-lg font-medium text-blue-500 hover:text-blue-600">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col items-center gap-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="p-1 text-green-500 fill-current w-11 h-11" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-xl font-semibold text-gray-800">No accounts needed.</p>
              <p className="text-lg text-center text-gray-600">Your customers are easily able to sign up and leave your rewards program through a single text message.</p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col items-center gap-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="p-1 text-green-500 fill-current w-11 h-11" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-xl font-semibold text-gray-800">Easily integrated.</p>
              <p className="text-lg text-center text-gray-600">Setup a rewards program for your business and start to gain loyalty within minutes.</p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col items-center gap-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="p-1 text-green-500 fill-current w-11 h-11" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-xl font-semibold text-gray-800">Easy to use.</p>
              <p className="text-lg text-center text-gray-600">Create rewards, promotions, and weekly deals with the click of a button.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HelpSection = () => {
  return (
    <div className="flex flex-col gap-4 px-56 py-16 bg-gray-100 shadow-b-lg">
      <div className="flex flex-col">
        <p className="text-4xl font-bold text-center text-gray-800">How can we help your business?</p>
        <p className="text-lg text-center text-gray-400">When you use Nomja, your business grows like never before.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1 p-4 bg-white rounded shadow hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="p-2 text-white bg-indigo-400 rounded-full fill-current w-14 h-14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <p className="text-2xl font-semibold text-center text-gray-700">Engage Your Customers</p>
          <p className="px-2 text-lg text-center text-gray-500">Through the power of text messages, you as a business have unlimited possibilities at hand. Discover the ways you can reward your customers for purchasing from you. Create rewards, discounts, promotions, and even target customers that you want to come back.</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-4 bg-white rounded shadow hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="p-2 text-white bg-indigo-400 rounded-full fill-current w-14 h-14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-2xl font-semibold text-center text-gray-700">Drive Sales</p>
          <p className="px-2 text-lg text-center text-gray-500">Promote your products and services to many with a single text message that can be viewed by many. Customers can send a picture of their receipt and receive points or visits that they can indigoeem in your business.</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-4 bg-white rounded shadow hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="p-2 text-white bg-indigo-400 rounded-full fill-current w-14 h-14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
          </svg>
          <p className="text-2xl font-semibold text-center text-gray-700">Increase Outreach</p>
          <p className="px-2 text-lg text-center text-gray-500">Over 90% of people read a text message within 3 minutes of receiving it. Almost everyone nowadays is constantly on their phone, which means that you have the power to send your promotions at a low cost with a high return rate.</p>
        </div>
      </div>
    </div>
  )
}

const LastCTA = () => {
  return (
    <div className="flex flex-col items-center gap-1 py-24 bg-indigo-700">
      <p className="text-4xl font-bold text-center text-white">Create Your First Promotion In Minutes</p>
      <p className="text-2xl font-light text-center text-gray-100">Get everything you need to encourage your customers to keep coming back to your business.</p>
      <Link href="/auth/signup">
        <a type="button" className="px-4 py-2 mt-3 text-lg font-bold text-center text-indigo-700 uppercase bg-white rounded-lg hover:text-indigo-800">Create Account</a>
      </Link>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="relative z-10 flex flex-col gap-12 px-8 sm:px-16 md:px-32 xl:px-48 py-16 bg-gray-800">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-200 uppercase">Learn</p>
            <Link href="/features">
              <a className="text-sm font-light text-gray-400">Features</a>
            </Link>
            <Link href="/start-guide">
              <a className="text-sm font-light text-gray-400">Start Guide</a>
            </Link>
            <Link href="/start-guide">
              <a className="text-sm font-light text-gray-400">FAQ</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-200 uppercase">Product</p>
            <Link href="/features">
              <a className="text-sm font-light text-gray-400">Features</a>
            </Link>
            <Link href="/pricing">
              <a className="text-sm font-light text-gray-400">Pricing</a>
            </Link>
            <Link href="/pricing/enterprise">
              <a className="text-sm font-light text-gray-400">Enterprise</a>
            </Link>
            <Link href="https://status.nomja.io/">
              <a className="text-sm font-light text-gray-400">System Status</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-200 uppercase">Resources</p>
            <Link href="/resources/help-center">
              <a className="text-sm font-light text-gray-400">Help Center</a>
            </Link>
            <Link href="/resources/demo">
              <a className="text-sm font-light text-gray-400">Demo</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-200 uppercase">Company</p>
            <Link href="/company/about-us">
              <a className="text-sm font-light text-gray-400">About Us</a>
            </Link>
            <Link href="/company/careers">
              <a className="text-sm font-light text-gray-400">Careers</a>
            </Link>
            <Link href="/company/contact-us">
              <a className="text-sm font-light text-gray-400">Contact Us</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-200 uppercase">Legal</p>
            <Link href="/legal/privacy-policy">
              <a className="text-sm font-light text-gray-400">Privacy Policy</a>
            </Link>
            <Link href="/company/terms-conditions">
              <a className="text-sm font-light text-gray-400">Terms & Conditions</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-700 rounded shadow-sm">
        <p className="font-medium text-center text-gray-300 text-md">Need help with something not listed?</p>
        <p className="text-center text-gray-400 text-md">Email us at <a className="text-gray-300" href="mailto:support@nomja.io">support@nomja.io</a> and we will get back to you within 48 hours.</p>
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-center text-gray-500">
        <div className="flex flex-row justify-center gap-2">
          <a href="https://www.instagram.com/nomjaio">
            <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
          </a>
          <a href="https://www.facebook.com/nomjaio">
            <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://www.twitter.com/nomjaio">
            <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
          </a>
          <a href="https://www.linkedin.com/company/nomja">
            <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
        </div>
        <p>© Copyright 2021 Paybund, LLC as Nomja. All rights reserved.</p>
        <p>325 John Knox Rd, Suite D-107, Tallahassee, FL 32309</p>
      </div>
    </div>
  )
}

const WhyUsSection = () => {
  return (
      <div className="grid grid-cols-2 gap-4 px-64">
        
      </div>
  )
}

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Customer loyalty taken to the next level - Nomja</title>
      </Head>
      <Navbar />
      <LandingSection />
      <WhyUsSection />
      <Footer />
    </>
  )
}

export default HomePage

export { Navbar, Footer }
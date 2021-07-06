import Link from 'next/link'

import { useRouter } from 'next/router'

const Error = () => {
  const router = useRouter()
  return (
    <>
      <div
        className="fixed top-2/4 left-2/4"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex divide-x-2 divide-gray-300 gap-8 items-center">
          <div className="flex flex-col gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 fill-current text-gray-800 rounded-lg w-16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-3xl font-bold text-gray-800">404 Error</p>
          </div>
          <div className="flex flex-col px-8 gap-1 items-center">
            <p className="text-2xl text-gray-800">The page at <b>{ router.asPath } </b> does not exist</p>
            <p className="text-md text-gray-500">There is a good chance this page is under construction</p>
            <Link href="/">
              <a className="flex flex-row gap-1 items-center justify-center mt-3 font-medium bg-indigo-500 py-2 px-3 text-white rounded-lg hover:bg-indigo-600">
                Return to safety
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current ease-in-out duration-200 transistion transform hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error

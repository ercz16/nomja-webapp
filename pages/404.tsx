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
        <div className="flex flex-col text-center">
          <p className="text-3xl font-semibold">404 Error</p>
          <p className="text-2xl text-gray-900">
            It appears the page at <b>{router.asPath}</b> does not exist
          </p>
          <Link href="/auth/signin">
            <a className="flex flex-row items-center justify-center mt-3 text-lg font-medium text-red-600 hover:text-red-700 hover:underline">
              Return to safety
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-current"
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
    </>
  )
}

export default Error

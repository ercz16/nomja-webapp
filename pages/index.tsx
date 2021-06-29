import Link from 'next/link'

const HomePage = () => {
  return (
    <>
      <div className="h-screen">
        <nav className="bg-white bg-opacity-75">
          <div className="max-w-5xl mx-auto px-3 py-3">
            <div className="flex justify-between items-center">
              <div>
                <img width="100" height="auto" src="all-together.png" />
              </div>
              <div className="flex space-x-4 items-center font-semibold text-gray-700">
                <Link href="/">
                  <a className="px-1 bg-opacity-75 hover:text-gray-900">Home</a>
                </Link>
                <Link href="/">
                  <a className="px-1 bg-opacity-75 hover:text-gray-900">
                    Features
                  </a>
                </Link>
                <Link href="/">
                  <a className="px-1 bg-opacity-75 hover:bg-gray-900">
                    Pricing
                  </a>
                </Link>
                <Link href="/">
                  <a className="px-1 bg-opacity-75 hover:bg-gray-900">
                    Resources
                  </a>
                </Link>
                <div className="flex space-x-1">
                  <Link href="/auth/signin">
                    <a className="ml-8 rounded-md border-2 border-red-500 bg-white px-3 py-1 font-bold hover:bg-gray-200 text-red-500">
                      Signin
                    </a>
                  </Link>
                  <Link href="/auth/signup">
                    <a className="rounded-md border-none bg-red-500 text-white font-semibold px-3 py-1 border-outline-none hover:bg-red-600">
                      Signup
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="h-2/3 bg-gray-100"></div>
      </div>
    </>
  )
}

export default HomePage

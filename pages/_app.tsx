import 'tailwindcss/tailwind.css'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthProvider } from '../utils/auth/AuthProvider'

function MyApp({ Component, pageProps }) {
  /*const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const logEvent = (url) => {
        analytics().setCurrentScreen(url)
        analytics().logEvent('screen_view')
      }

      router.events.on('routeChangeComplete', logEvent)

      logEvent(window.location.pathname)

      return () => {
        router.events.off('routeChangeComplete', logEvent);
      }
    }
  }, [])*/

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
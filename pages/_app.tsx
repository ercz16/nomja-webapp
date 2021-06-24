import 'tailwindcss/tailwind.css'

import ProgressBar from "@badrap/bar-of-progress"
import Router from "next/router"

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthProvider } from '../utils/auth/AuthProvider'
import firebase, { app } from '../utils/firebase/Firebase'
const analytics = firebase.analytics

const progress = new ProgressBar({
  size: 2,
  color: "#EF4444",
  className: "z-50",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

function MyApp({ Component, pageProps }) {
  const router = useRouter()

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
  }, [])

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
import React from 'react';
import { useEffect, useState } from 'react'
import { NotificationsProvider } from "@mantine/notifications";
import { BreakpointProvider } from 'react-socks';
import "./_global.scss";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <BreakpointProvider>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </BreakpointProvider>
  )
}

// React Hydration Error
// https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render/73318530#73318530

export default MyApp

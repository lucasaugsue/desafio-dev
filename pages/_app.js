import React from 'react';
import "./_global.scss";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { BreakpointProvider } from 'react-socks';
import ClientContext from '../src/contexts/ClientContext';
import serverRequest from '../src/service/RestClient';
import { NotificationsProvider } from "@mantine/notifications";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB8501'
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  const clientContext = React.useMemo(() => ({
    apiRequest: (
      method, 
      url, 
      params, 
      downloadFile,
      {contentType = undefined} = {}) => serverRequest({method, url, params, downloadFile, contentType})
  }), [])

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) return null

  return (
    <BreakpointProvider>
      <ThemeProvider theme={theme}>
        <ClientContext.Provider value={clientContext}>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ClientContext.Provider>
      </ThemeProvider>
    </BreakpointProvider>
  )
}

// React Hydration Error
// https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render/73318530#73318530

export default MyApp

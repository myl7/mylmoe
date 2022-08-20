// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { useColorMode } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

// Only use this in pages other than components
// Using this with ReactDOMServer.renderToString and without Helmet.renderStatic causes memory leak
// TODO: react-helmet should be replaced with react-helmet-async to work with high version React
export default function HljsStyle() {
  const { colorMode } = useColorMode()

  return (
    <Helmet>
      {colorMode == 'light' ? (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-light.min.css"
          integrity="sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      ) : (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark.min.css"
          integrity="sha512-Jk4AqjWsdSzSWCSuQTfYRIF84Rq/eV0G2+tu07byYwHcbTGfdmLrHjUSwvzp5HvbiqK4ibmNwdcG49Y5RGYPTg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      )}
    </Helmet>
  )
}

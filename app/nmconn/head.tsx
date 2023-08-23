// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import GHead from '@/app/ghead'

export const meta = {
  title:
    'Generate the NetworkManager nmconnection file for the Wi-Fi with WPA & WPA2 Enterprise security and PEAP authentication',
  abstract:
    'Wi-Fi with WPA & WPA2 Enterprise + PEAP is commonly used in the networks of universities, e.g., eduroam. Unlike Windows/Android which work out of the box, Linux, e.g., with GNOME, has issues when connecting with the GUI. This tool generates the NetworkManager config file directly to make the connection simple and painless. All processing is literally done locally to keep data safe.',
}

export default function Head() {
  return (
    <>
      <title>{`${meta.title} | mylmoe: myl7's blog`}</title>
      <meta name="description" content={meta.abstract} />
      <link rel="canonical" href="https://myl.moe/nmconn" />
      <GHead />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.abstract} />
      <meta property="og:url" content={'https://myl.moe/nmconn'} />
      <meta property="og:site_name" content="mylmoe" />
    </>
  )
}

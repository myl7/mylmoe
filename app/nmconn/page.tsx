// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { MdLaunch } from 'react-icons/md'
import Panel from './panel'

import type { Metadata } from 'next'

const meta = {
  title:
    'Generate the NetworkManager nmconnection file for the Wi-Fi with WPA & WPA2 Enterprise security and PEAP authentication',
  description:
    'Wi-Fi with WPA & WPA2 Enterprise + PEAP is commonly used in the networks of universities, e.g., eduroam. Unlike Windows/Android which work out of the box, Linux, e.g., with GNOME, has issues when connecting with the GUI. This tool generates the NetworkManager config file directly to make the connection simple and painless. All processing is literally done locally to keep data safe.',
  url: '/nmconn',
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: meta.url,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: 'mylmoe',
    type: 'website',
  },
}

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">
          Generate the NetworkManager nmconnection file for the Wi-Fi with WPA & WPA2 Enterprise security and PEAP
          authentication
        </h1>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p>
          Wi-Fi with WPA & WPA2 Enterprise + PEAP is commonly used in the networks of universities, e.g., eduroam.
          Unlike Windows/Android which work out of the box, Linux, e.g., with GNOME, has issues when connecting with the
          GUI. This tool generates the NetworkManager config file directly to make the connection simple and painless.
          All processing is literally done locally to keep data safe.
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <details>
          <summary className="cursor-pointer">
            <h2 className="inline-block text-lg">Do manually without the application</h2>
          </summary>
          <p>
            Please refer to{' '}
            <a
              href="https://github.com/myl7/mylmoe/tree/main/app/nmconn/nmconnTemplate.ts"
              rel="noopener"
              className="text-blue hover:underline"
            >
              the nmconnection file
              <MdLaunch className="inline-block h-3.5 w-3.5" />
            </a>{' '}
            for the template.
          </p>
          <p>
            The file is in a simple .ini-style format. Please refer to{' '}
            <a
              href="https://developer-old.gnome.org/NetworkManager/stable/nm-settings-keyfile.html"
              rel="noopener"
              className="text-blue hover:underline"
            >
              the nm-settings-keyfile manual
              <MdLaunch className="inline-block h-3.5 w-3.5" />
            </a>{' '}
            for details.
          </p>
        </details>
      </section>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h2 className="text-2xl">Generate</h2>
        <hr className="border-bg-l4 dark:border-bg-d4" />

        <Panel />
      </section>
    </main>
  )
}

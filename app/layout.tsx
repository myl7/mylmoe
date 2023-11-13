// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import './globals.css'

import { Open_Sans, Roboto_Serif, DM_Mono, Noto_Serif_SC } from 'next/font/google'
// import { headers } from 'next/headers'
import classNames from 'classnames'

import Header from './header'
import Footer from './footer'

import type { Metadata, Viewport } from 'next'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-roboto-serif' })
const dmMono = DM_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-dm-mono' })
const notoSerifSC = Noto_Serif_SC({
  weight: ['400'],
  // TODO: Google Fonts does not embed the subsets in the comments of CSS files,
  // so Next.js needs a new way to find available subsets.
  // subsets: ['chinese-simplified'],
  subsets: ['latin'],
  variable: '--font-noto-serif-sc',
})

const metadataBase = (() => {
  let url = process.env.MYLMOE_URL
  if (!url) {
    if (process.env.NODE_ENV == 'production') url = 'https://myl.moe'
    else return undefined
  }
  if (url.startsWith('http://')) throw new Error('Insecure metadataBase with `http://` protocol head')
  if (!url.startsWith('https://') && url.indexOf('://') != -1) throw new Error('Unknown protocol head: Not `https://`')
  if (!url.startsWith('https://')) url = 'https://' + url
  return new URL(url)
})()

export const metadata: Metadata = {
  metadataBase,
  title: {
    template: "%s | mylmoe: myl7's blog",
    default: "mylmoe: myl7's blog",
  },
  // TODO: Better default og image
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dark = darkSSRPreferred()

  return (
    <html
      lang="en"
      className={classNames(
        `${openSans.variable} ${robotoSerif.variable} ${dmMono.variable} ${notoSerifSC.variable} scroll-pt-[var(--header-height)] font-sans`,
        {
          dark: dark,
        }
      )}
    >
      <body className="bg-bg text-fg dark:bg-bg-d dark:text-fg-d">
        <Header />
        <div className="h-[var(--header-height)]" />
        <div className="flex flex-col gap-4 p-4">
          {children}
          <hr className="border-bg-l4 dark:border-bg-d4" />
          <Footer />
        </div>
      </body>
    </html>
  )
}

/** Dark mode preference of HTTP headers */
// TODO: Read preference from cookie
// TODO: Fix the error when using generateStaticParams with next/headers:
// Error: Dynamic server usage: headers
// See https://github.com/vercel/next.js/issues/43427 and https://github.com/vercel/next.js/issues/43392 for following progress.
// Only disable the headers() use in development make things work,
// but when using headers() in production, dynamicParams = false fails to work and would cause soft 404 error.
// So now completely comment it as a temporary fix.
function darkSSRPreferred() {
  // const h = headers()
  // const mode = h.get('Sec-CH-Prefers-Color-Scheme')
  // return mode == 'dark'
  return false
}

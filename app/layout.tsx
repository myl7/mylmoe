import './globals.css'

import { Open_Sans, Roboto_Serif, DM_Mono } from '@next/font/google'
import { headers } from 'next/headers'
import classNames from 'classnames'

import Header from './header'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-roboto-serif' })
const dmMono = DM_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-dm-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dark = darkSSRPreferred()

  return (
    <html
      lang="en"
      className={classNames(`${openSans.variable} ${robotoSerif.variable} ${dmMono.variable} font-sans`, {
        dark: dark,
      })}
    >
      <head />
      <body className="bg-bg dark:bg-bg-d text-fg dark:text-fg-d">
        <Header />
        <div className="h-[var(--header-height)]" />
        {children}
      </body>
    </html>
  )
}

/** Dark mode preference of HTTP headers */
function darkSSRPreferred() {
  const h = headers()
  const mode = h.get('Sec-CH-Prefers-Color-Scheme')
  return mode == 'dark'
}

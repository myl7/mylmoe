import './globals.css'

import { Open_Sans, Roboto_Serif } from '@next/font/google'
import { headers } from 'next/headers'

import Header from './header'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-roboto-serif' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dark = darkSSRPreferred()

  return (
    <html lang="en" className={`${openSans.variable} ${robotoSerif.variable} font-sans ` + dark ? 'dark' : ''}>
      <head />
      <body className="bg-bg dark:bg-bg-d text-fg dark:text-fg-d">
        <Header />
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

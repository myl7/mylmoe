import './globals.css'

import { Open_Sans, Roboto_Serif, DM_Mono, Noto_Serif_SC } from '@next/font/google'
import { headers } from 'next/headers'
import classNames from 'classnames'

import Header from './header'
import Footer from './footer'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-roboto-serif' })
const dmMono = DM_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-dm-mono' })
const notoSerifSC = Noto_Serif_SC({
  weight: ['400'],
  subsets: ['chinese-simplified'],
  variable: '--font-noto-serif-sc',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dark = darkSSRPreferred()

  return (
    <html
      lang="en"
      className={classNames(
        `${openSans.variable} ${robotoSerif.variable} ${dmMono.variable} ${notoSerifSC.variable} font-sans`,
        {
          dark: dark,
        }
      )}
    >
      <head />
      <body className="bg-bg text-fg dark:bg-bg-d dark:text-fg-d">
        <Header />
        <div className="h-[var(--header-height)]" />
        <main className="flex flex-col gap-4 p-4">
          {children}
          <hr className="rounded border-[1px] border-bg-l4 dark:border-bg-d4" />
          <Footer />
        </main>
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

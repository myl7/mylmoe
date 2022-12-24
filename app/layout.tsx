import './globals.css'

import { Open_Sans, Roboto_Serif } from '@next/font/google'

import Header from './header'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-roboto-serif' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${robotoSerif.variable} font-sans`}>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

'use client'

import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function DarkSwitch() {
  // user is true when the change is given by the user, which means we also need to change html dark class,
  // otherwise it is to sync switch checked state with current dark mode
  // TODO: Get initial dark in SSR to avoid switch checked state flash
  const [darkC, setDarkC] = React.useState({ dark: false, user: false })
  React.useEffect(() => {
    // This allows dup calls
    if (darkC.user) {
      if (darkC.dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkC])
  // If SSR preference is different, this causes a flash, but it is fair to happen
  React.useEffect(() => setDarkC({ dark: darkCSRPreferred(), user: true }), [])

  return (
    <label className="inline-flex items-center gap-0.5">
      <span className="inline-flex items-center" aria-label="Toggle dark mode">
        <MdLightMode className="w-4 h-4" />
        /
        <MdDarkMode className="w-4 h-4" />
      </span>
      <div className="relative">
        <input
          type="checkbox"
          checked={darkC.dark}
          onChange={(e) => setDarkC({ dark: e.target.checked, user: true })}
          className="sr-only peer"
        />
        <div className="w-9 h-6 rounded-xl bg-bg-l2 dark:bg-bg-d2 cursor-pointer hover:ring-1 after:content-[''] after:w-5 after:h-5 after:rounded-full after:bg-fg dark:after:bg-fg-d hover:after:bg-fg-l4 dark:hover:after:bg-fg-d4 after:absolute after:left-0.5 after:top-0.5 peer-checked:after:translate-x-3 after:transition-all" />
      </div>
    </label>
  )
}

/** Dark mode preference of media query prefers-color-scheme */
function darkCSRPreferred() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

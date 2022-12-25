'use client'

// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

import DarkResetButton from './darkResetButton'

const lSKey = 'mylmoe.dark'

export default function DarkSwitch() {
  // persist is true if need to save the preference to localStorage.
  const [darkC, setDarkC] = React.useState({ dark: false, persist: false })
  React.useEffect(() => {
    // This allows dup calls
    if (darkC.dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (darkC.persist) {
      try {
        localStorage.setItem(lSKey, darkC.dark ? '1' : '0')
      } catch {}
    }
  }, [darkC])
  // If SSR preference is different, this causes a flash, but it is fair to happen
  React.useEffect(() => setDarkC({ dark: darkCSRPreferred(), persist: false }), [])

  return (
    <div className="flex items-center gap-0.5">
      <label className="inline-flex items-center gap-0.5">
        <span className="inline-flex items-center" aria-label="Toggle dark mode">
          <MdLightMode className="h-4 w-4" />
          /
          <MdDarkMode className="h-4 w-4" />
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={darkC.dark}
            onChange={(e) => setDarkC({ dark: e.target.checked, persist: true })}
            className="peer sr-only"
          />
          <div className="h-6 w-9 cursor-pointer rounded-xl bg-bg-l2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-fg after:transition-all after:content-[''] hover:ring-1 hover:after:bg-fg-l4 peer-checked:after:translate-x-3 dark:bg-bg-d2 dark:after:bg-fg-d dark:hover:after:bg-fg-d4" />
        </div>
      </label>
      <DarkResetButton />
    </div>
  )
}

// TODO: Save in cookies
/** Dark mode preference of media query prefers-color-scheme & localStorage */
function darkCSRPreferred() {
  try {
    const darkVal = localStorage.getItem(lSKey)
    if (darkVal == '1') {
      return true
    } else if (darkVal == '0') {
      return false
    }
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

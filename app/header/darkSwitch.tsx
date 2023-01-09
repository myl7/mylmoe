'use client'

// Copyright (C) 2022, 2023 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { MdDarkMode, MdLightMode, MdRefresh } from 'react-icons/md'

import { giscusTheme } from '@/app/posts/[slug]/giscus'

const lSKey = 'mylmoe.dark'

export default function DarkSwitch() {
  // persist is true if need to save the preference to localStorage.
  // init is true if it happens just after page loading.
  const [darkC, setDarkC] = React.useState<{ dark: boolean; persist?: boolean; init?: boolean }>({ dark: false })
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

    // Sync giscus theme
    giscusTheme.setDark(darkC.dark, darkC.init)
  }, [darkC])
  // If SSR preference is different, this causes a flash, but it is fair to happen
  React.useEffect(() => setDarkC({ dark: darkCSRPreferred(), init: true }), [])

  function resetDark() {
    try {
      localStorage.removeItem(lSKey)
    } catch {}
  }

  return (
    <div className="flex items-center gap-1">
      <label className="flex items-center gap-0.5">
        <div className="flex items-center" aria-label="Toggle dark mode">
          <MdLightMode className="h-4 w-4" />
          /
          <MdDarkMode className="h-4 w-4" />
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={darkC.dark}
            onChange={(e) => setDarkC({ dark: e.target.checked, persist: true })}
            className="peer sr-only"
          />
          {/* TODO: Fix focus-visiable ring color */}
          <div className="h-6 w-9 cursor-pointer rounded-xl bg-bg-l2 ring-blue after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-fg after:transition-transform hover:after:bg-fg-l4 peer-checked:after:translate-x-3 peer-focus:ring-2 dark:bg-bg-d2 dark:after:bg-fg-d dark:hover:after:bg-fg-d4" />
        </div>
      </label>
      <button
        aria-label="Reset dark mode preference"
        className="rounded border p-1 hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2"
        onClick={resetDark}
      >
        <MdRefresh className="h-3 w-3" />
      </button>
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

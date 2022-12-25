'use client'

import { MdRefresh } from 'react-icons/md'

const lSKey = 'mylmoe.dark'

// TODO: Button animation otherwise hard to distinguish whether clicked
export default function DarkResetButton() {
  const resetDark = () => {
    try {
      localStorage.removeItem(lSKey)
    } catch {}
  }

  return (
    <button
      aria-label="Reset dark mode preference"
      className="rounded border p-1 hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2"
      onClick={resetDark}
    >
      <MdRefresh className="h-3 w-3" />
    </button>
  )
}

'use client'

// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { MdMenu } from 'react-icons/md'
import classNames from 'classnames'

export default function Menu({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button
        aria-label="Menu"
        onClick={() => setOpen((open) => !open)}
        className="hover:text-fg-l4 dark:hover:text-fg-d4"
      >
        <MdMenu className="h-6 w-6" />
      </button>
      <div
        // Located at the moddle of the gap
        className={classNames(
          'fixed right-2 top-[calc(var(--header-height)_+_14px_/_2)] z-10 rounded border-2 border-bg-l4 bg-bg-l1 p-2 transition-transform dark:border-bg-d4 dark:bg-bg-d1',
          { 'translate-x-[calc(100%_+_8px)]': !open }
        )}
      >
        {children}
      </div>
    </>
  )
}

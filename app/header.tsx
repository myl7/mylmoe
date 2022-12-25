// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link'
import { MdHome, MdSearch } from 'react-icons/md'

import DarkSwitch from './darkSwitch'

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-[var(--header-height)] w-full items-center gap-4 border-b-2 border-bg-l4 bg-bg-l1 px-4 dark:border-bg-d4 dark:bg-bg-d1">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Home" className="hover:text-fg-l4 dark:hover:text-fg-d4">
          <MdHome className="h-6 w-6" />
        </Link>
        <Link href="/" className="text-xl hover:text-fg-l4 hover:underline dark:hover:text-fg-d4">
          mylmoe
        </Link>
      </div>
      <div className="flex-1" />
      <SearchBox />
      <DarkSwitch />
    </header>
  )
}

function SearchBox() {
  return (
    <form action="https://www.google.com/search" className="flex gap-2">
      <label>
        <span className="sr-only">Query string of the site search</span>
        <input
          name="q"
          type="search"
          placeholder="Search..."
          className="rounded border-2 bg-bg-l1 py-0.5 px-1 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <input type="hidden" name="as_sitesearch" value="myl.moe" />
      <input type="hidden" name="ncr" value="1" />
      <button
        type="submit"
        aria-label="Search"
        className="rounded border-2 p-1 hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2"
      >
        <MdSearch className="h-5 w-5" />
      </button>
    </form>
  )
}

'use client'

// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'

import template from './nmconnTemplate'

export default function Panel() {
  const [nmConn, setNmConn] = React.useState('')

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputPanel setNmConn={setNmConn} />
      <OutputPanel nmConn={nmConn} />
    </div>
  )
}

function InputPanel({ setNmConn }: { setNmConn: (nmConn: string) => void }) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let elems = e.currentTarget.elements
    let fields = {
      ssid: (elems.namedItem('ssid') as HTMLInputElement).value,
      iface: (elems.namedItem('interface') as HTMLInputElement).value,
      identity: (elems.namedItem('identity') as HTMLInputElement).value,
      password: (elems.namedItem('password') as HTMLInputElement).value,
      id: (elems.namedItem('name') as HTMLInputElement).value as string | undefined,
    }

    if (fields.id == '') delete fields.id
    for (const key in fields) {
      if (!(fields[key as keyof typeof fields] as string)) {
        setNmConn('[Invalid input. Please check if all fields are filled.]')
        return
      }
    }

    let s = template(fields)
    setNmConn(s)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={submit}>
      {/* TODO: More option explanation */}
      <label className="flex flex-col gap-1">
        SSID
        <input
          name="ssid"
          placeholder="eduroam, etc."
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <label className="flex flex-col gap-1">
        Interface
        <input
          name="interface"
          placeholder="wlan0, wlp1s0, etc."
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <label className="flex flex-col gap-1">
        Identity
        <input
          name="identity"
          placeholder="a.k.a. username"
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input
          name="password"
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <label className="flex flex-col gap-1">
        Name
        <input
          name="name"
          placeholder="Leave empty to use SSID as the name"
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4"
        />
      </label>
      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded border px-1 py-0.5 hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2"
        >
          Generate
        </button>
      </div>
    </form>
  )
}

function OutputPanel({ nmConn }: { nmConn: string }) {
  let rows = nmConn.split('\n').length
  // Matches the height of the input form
  if (rows > 12) rows = 12

  async function copyToClipboard() {
    await navigator.clipboard.writeText(nmConn)
    // TODO: Notify
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1">
        Generated nmconnection file content:
        <textarea
          rows={rows}
          value={nmConn}
          className="w-full rounded border bg-bg-l1 px-1 py-0.5 hover:border-fg-l4 dark:bg-bg-d1  dark:hover:border-fg-d4"
        />
      </label>
      <div className="flex justify-center">
        <button
          className="rounded border px-1 py-0.5 hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2"
          onClick={copyToClipboard}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  )
}

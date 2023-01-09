'use client'

// Copyright (C) 2023 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { default as GiscusInner } from '@giscus/react'

export default function Giscus() {
  return (
    <GiscusInner
      id="giscus"
      repo="myl7/mylmoe"
      repoId="MDEwOlJlcG9zaXRvcnkzMDA4MzYxMzI="
      category="Announcements"
      categoryId="DIC_kwDOEe5lJM4CRLe1"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  )
}

class GiscusTheme {
  async setDark(dark: boolean, init?: boolean) {
    if (init) {
      let done = false
      do {
        done = this._setDark(dark)
        await new Promise((r) => setTimeout(r, 1000))
      } while (!done)
    }
    this._setDark(dark)
  }

  private _setDark(dark: boolean) {
    const iframe = document.querySelector('#giscus')?.shadowRoot?.querySelector('iframe')
    if (!iframe || !iframe.contentWindow) return false
    try {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: dark ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      )
      return true
    } catch {}
    return false
  }
}
export const giscusTheme = new GiscusTheme()

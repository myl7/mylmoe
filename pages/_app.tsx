// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '../index.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

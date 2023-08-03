// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { MdLaunch } from 'react-icons/md'
import { DecPanel, EncPanel } from './panel'

// TODO: brotli-(dec-)wasm v2

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">Brotli encode/decode tool</h1>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p>
          Encode/decode (a.k.a. compress/decompress) data in Brotli format locally in browser. All processing is
          literally done locally with WebAssembly to keep data safe.
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <details>
          <summary className="cursor-pointer">
            <h2 className="inline-block text-lg">Help: Input & output</h2>
          </summary>
          <p>
            Text input should be in Python byte string format (e.g.{' '}
            <code className="rounded bg-bg-l2 px-0.5 font-mono dark:bg-bg-d2">0\xff\\ = [48, 255, 92]</code>, which can
            omit surrounded quotes and <code className="rounded bg-bg-l2 px-0.5 font-mono dark:bg-bg-d2">b</code>{' '}
            prefix). Text output will also be in that format. When both text and file input exist, file input will be
            selected. Click the refresh button aside to abort the uploaded file.
          </p>
        </details>
      </section>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h2 className="text-2xl">Decode</h2>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <details>
          <summary className="cursor-pointer">
            <h2 className="inline-block text-lg">Help: Decoding implementation</h2>
          </summary>
          <p>
            Decoding is powered by{' '}
            <a href="https://github.com/myl7/brotli-dec-wasm" rel="noopener" className="text-blue hover:underline">
              brotli-dec-wasm
              <MdLaunch className="inline-block h-3.5 w-3.5" />
            </a>{' '}
            due to its small size.
          </p>
        </details>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <DecPanel />
      </section>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h2 className="text-2xl">Encode</h2>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <details>
          <summary className="cursor-pointer">
            <h2 className="inline-block text-lg">Help: Encoding implementation</h2>
          </summary>
          <p>
            Encoding is powered by{' '}
            <a href="https://github.com/httptoolkit/brotli-wasm" rel="noopener" className="text-blue hover:underline">
              brotli-wasm
              <MdLaunch className="inline-block h-3.5 w-3.5" />
            </a>
            . It will be dynamically loaded due to its large size.
          </p>
        </details>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <EncPanel />
      </section>
    </main>
  )
}

import React from 'react'
import { ArrowDown, RefreshCw } from 'lucide-react'
import { default as brotliDecWasmInit, decompress as brotliDecWasmDecompress } from 'brotli-dec-wasm/web'
import brotliDecWasmUrl from 'brotli-dec-wasm/web/bg.wasm?url'

const maxBOutLen = 1024

export interface PanelProps {
  variant: 'dec' | 'enc'
  proc: (b: Uint8Array) => Promise<Uint8Array>
}

function Panel({ variant, proc }: PanelProps) {
  const bRef = React.useRef<HTMLTextAreaElement>(null)
  const bOutRef = React.useRef<HTMLTextAreaElement>(null)
  const fRef = React.useRef<HTMLInputElement>(null)
  function resetFile() {
    if (fRef.current) {
      fRef.current.value = ''
    }
  }

  const [processing, setProcessing] = React.useState(false)

  const [result, setResult] = React.useState<Uint8Array | null>(null)
  function dlResult() {
    if (result) {
      const name = fRef.current?.files?.[0]?.name ? fRef.current.files[0].name + '.result.bin' : 'result.bin'
      dlFile(new Blob([result]), name)
    }
  }

  /** Transform display texts across variants by replacing the 2-char prefix */
  const t = ((variant: 'dec' | 'enc') =>
    function (text: string) {
      if (variant == 'dec') {
        return text
      } else {
        const prefix = text.substring(0, 2)
        return (
          ({
            De: 'En',
            de: 'en',
          }[prefix] ?? prefix) + text.substring(2)
        )
      }
    })(variant)

  async function doProc() {
    // We should setProcessing before async action.
    // File input can override textarea input.
    let input: Uint8Array | null = null
    let inputBlob: Blob | null = null
    const f = fRef.current?.files?.[0]
    if (f) {
      inputBlob = f
    } else {
      const bS = bRef.current?.value
      if (bS) {
        input = pyS2B(bS)
      }
    }
    if (!input && !inputBlob) {
      return
    }
    setProcessing(true)

    if (inputBlob) {
      input = new Uint8Array(await inputBlob.arrayBuffer())
    }
    let result: Uint8Array
    try {
      result = await proc(input!)
    } catch (e) {
      if (bOutRef.current) {
        bOutRef.current.value = `[${t('Decoding')} failed. The original error message is: ${e}.]`
      }
      return
    } finally {
      setProcessing(false)
    }
    setResult(result)
    if (result.length > maxBOutLen) {
      if (bOutRef.current) {
        bOutRef.current.value = `[The result is too long (${result.length}B > 1KB). Use the button below to download it as a file to view it.]`
      }
    } else {
      if (bOutRef.current) {
        bOutRef.current.value = pyB2S(result)
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 font-sans">
      <label className="flex flex-col gap-1">
        Input bytes:
        <textarea
          ref={bRef}
          rows={4}
          placeholder="Python-format byte strings are supported"
          className="bg-bg-l1 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4 w-full rounded border px-1 py-0.5"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <p>Or select a file:</p>
        <label className="sr-only" htmlFor={`${variant}-finput`}>
          Or select a file:
        </label>
        <div className="flex items-center gap-1">
          <button
            aria-label="Reset the selected file"
            onClick={resetFile}
            className="hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2 rounded border p-1"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <input
            ref={fRef}
            type="file"
            id={`${variant}-finput`}
            className="file:border-fg file:bg-bg-l1 file:text-fg file:hover:border-fg-l4 file:hover:bg-bg-l2 dark:file:border-fg-d dark:file:bg-bg-d1 dark:file:text-fg-d dark:file:hover:border-fg-d4 dark:file:hover:bg-bg-d2 file:cursor-pointer file:rounded file:border file:border-solid file:px-1 file:py-0.5"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={processing}
          onClick={doProc}
          className="hover:border-fg-l4 hover:bg-bg-l2 disabled:border-fg-l4 disabled:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2 dark:disabled:border-fg-d4 dark:disabled:bg-bg-d2 flex items-center rounded border px-1 py-0.5 disabled:cursor-not-allowed"
        >
          {processing ? (
            <RefreshCw className="h-5 w-5 animate-spin motion-reduce:animate-none" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
          {processing ? t('Decoding...') : t('Decode')}
        </button>
      </div>
      <textarea
        ref={bOutRef}
        rows={4}
        readOnly
        placeholder="Result"
        className="bg-bg-l1 placeholder:text-fg-l4 hover:border-fg-l4 dark:bg-bg-d1 dark:placeholder:text-fg-d4 dark:hover:border-fg-d4 w-full rounded border px-1 py-0.5"
      />
      <div className="flex justify-center">
        <button
          onClick={dlResult}
          className="hover:border-fg-l4 hover:bg-bg-l2 dark:hover:border-fg-d4 dark:hover:bg-bg-d2 flex items-center rounded border px-1 py-0.5"
        >
          Download the result as a file
        </button>
      </div>
    </div>
  )
}

export function DecPanel() {
  return <Panel variant="dec" proc={decode} />
}

export function EncPanel() {
  return <Panel variant="enc" proc={encode} />
}

async function decode(b: Uint8Array) {
  await brotliDecWasmInit(brotliDecWasmUrl)
  return brotliDecWasmDecompress(b)
}

// TODO: Add cancelation or mitigate the heavy load that causes blocking
async function encode(b: Uint8Array) {
  const { compress } = await (await import('brotli-wasm')).default
  return compress(b)
}

/** Convert bytes to Python-format display string */
function pyB2S(arr: Uint8Array) {
  let res = ''
  for (const i of Array.from(arr)) {
    if (i === 0x5c) {
      res += '\\\\'
    } else if (i === 0x27) {
      res += "\\'"
    } else if (0x20 <= i && i <= 0x7e) {
      res += String.fromCharCode(i)
    } else {
      res += '\\x' + i.toString(16).padStart(2, '0')
    }
  }
  res = "b'" + res + "'"
  return res
}

/** Convert Python-format display string to bytes */
function pyS2B(s: string) {
  let m
  if ((m = /^b['"](.*)['"]/.exec(s))) {
    s = m[1]!
  }
  const arr = []
  while (s) {
    if ((m = /^\\x([0-9a-fA-F]{2})/.exec(s))) {
      s = s.substring(4)
      arr.push(parseInt(m[1]!, 16))
    } else if (s.substring(0, 2) == '\\\\') {
      arr.push(s[0]!.charCodeAt(0))
      s = s.substring(2)
    } else {
      arr.push(s[0]!.charCodeAt(0))
      s = s.substring(1)
    }
  }
  return new Uint8Array(arr)
}

/** Download the blob as a file */
function dlFile(f: Blob, fname?: string) {
  const url = window.URL.createObjectURL(f)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = fname ? fname : 'result'
  a.href = url
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

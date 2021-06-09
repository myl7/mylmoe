import {fromUint8Array, toUint8Array} from 'js-base64'

export const brotliEnc = async (arr: Uint8Array) => {
  const res = await fetch('https://1g067nz0ob.execute-api.us-west-2.amazonaws.com/brotli-enc', {
    method: 'POST',
    body: fromUint8Array(arr)
  })
  if (res.status == 200) {
    const body = await res.text()
    return toUint8Array(body)
  } else {
    throw new Error(await res.text())
  }
}

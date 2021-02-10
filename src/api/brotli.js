export const brotliEnc = async arr => {
  const res = await fetch('https://c.azure-api.net/brotli/enc', {
    method: 'POST',
    body: arr.buffer
  })
  if (res.status === 200) {
    return new Uint8Array(await res.arrayBuffer())
  } else {
    throw new Error(await res.text())
  }
}

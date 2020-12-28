import {brotli_dec} from 'brotli-dec-wasm'

export const brotliDec = async (init, arr) => {
  await init
  return brotli_dec(arr)
}

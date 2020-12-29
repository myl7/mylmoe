import {brotli_dec} from 'brotli-dec-wasm'
import BrotliEncApi from '../apis/BrotliEncApi'

export const brotliDec = async (arr, init) => {
  init === undefined ? undefined : await init
  return brotli_dec(arr)
}

export const brotliEnc = async (arr, init) => {
  init === undefined ? undefined : await init
  return await new BrotliEncApi().enc(arr)
}

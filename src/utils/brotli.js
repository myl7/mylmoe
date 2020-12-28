import init, {brotli_dec} from 'brotli-dec-wasm'

export const brotliDec = async arr => {
  await init('/wasm/brotli-dec-wasm_bg.wasm')
  return brotli_dec(arr)
}

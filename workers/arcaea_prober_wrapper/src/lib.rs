mod utils;

use brotli::BrotliDecompress;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn brotli_dec(buf: Box<[u8]>) -> Result<String, JsValue> {
    let mut out = Vec::<u8>::new();
    match BrotliDecompress(&mut buf.as_ref(), &mut out) {
        Ok(_) => (),
        Err(e) => return Err(JsValue::from_str(&format!("{}", e))),
    }
    match String::from_utf8(out) {
        Ok(s) => Ok(s),
        Err(e) => return Err(JsValue::from_str(&format!("{}", e))),
    }
}
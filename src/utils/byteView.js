export const outputBytes = arr => {
  let res = ''
  for (const i of arr) {
    if (0x20 <= i && i <= 0x7e) {
      res += String.fromCharCode(i)
    } else {
      res += '\\x' + i.toString(16).padStart(2, '0')
    }
  }
  res = 'b\'' + res + '\''
  return res
}

export const inputBytes = s => {
  const arr = []
  let m
  while (s) {
    if ((m = /\\x([0-9a-fA-F]{2})/.exec(s))) {
      s = s.substring(4)
      arr.push(parseInt(m[1]))
    } else {
      arr.push(s[0].charCodeAt(0))
      s = s.substring(1)
    }
  }
  return new Uint8Array(arr)
}

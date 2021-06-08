export const printBin = (arr: Uint8Array) => {
  let res = ''
  for (const i of arr) {
    if (i === 0x5c) {
      res += '\\\\'
    } else if (i === 0x27) {
      res += '\\\''
    } else if (0x20 <= i && i <= 0x7e) {
      res += String.fromCharCode(i)
    } else {
      res += '\\x' + i.toString(16).padStart(2, '0')
    }
  }
  res = 'b\'' + res + '\''
  return res
}

export const inputBin = (s: string) => {
  let m
  if ((m = /^b'(.*)'/.exec(s))) {
    s = m[1]!
  }
  const arr = []
  while (s) {
    if ((m = /^\\x([0-9a-fA-F]{2})/.exec(s))) {
      s = s.substring(4)
      arr.push(parseInt(m[1]!, 16))
    } else {
      arr.push(s[0]!.charCodeAt(0))
      s = s.substring(1)
    }
  }
  return new Uint8Array(arr)
}

// I do not think the file has enough creative work to be eligible for copyright.
// So feel free to use and copy.

import { v4 as uuidv4 } from 'uuid'

export default function template({ id, uuid, iface, ssid, identity, password }: TemplateArgs): string {
  id = id ?? ssid
  uuid = uuid ?? uuidv4()

  return `\
[connection]
id=${id}
uuid=${uuid}
type=wifi
interface-name=${iface}

[wifi]
mode=infrastructure
ssid=${ssid}

[wifi-security]
key-mgmt=wpa-eap

[802-1x]
eap=peap;
identity=${identity}
password=${password}
phase2-auth=mschapv2

[ipv4]
method=auto

[ipv6]
addr-gen-mode=default
method=auto

[proxy]
`
}

export type TemplateArgs = {
  id?: string
  uuid?: string
  iface: string
  ssid: string
  identity: string
  password: string
}

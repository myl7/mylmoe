// SPDX-License-Identifier: Unlicense

// Feel free to copy the snippet

import { v4 as uuidv4 } from "uuid";

export default function genNmconn({ id, uuid, iface, ssid, identity, password }: NmconnArgs) {
  id = id ?? ssid;
  uuid = uuid ?? uuidv4();

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
`;
}

export interface NmconnArgs {
  id?: string;
  uuid?: string;
  iface: string;
  ssid: string;
  identity: string;
  password: string;
}

title: Use WireGuard to setup a simple intranet
pubDate: 2020-12-26
updDate: 2020-12-26
excerpt: See wg0.conf below if you are in a hurry.
---
## Ideas

To merge 3 of my servers while also to learn some VPN knowledge,
I am going to use WireGuard (abbr. wg) to set up an intranet among the servers.

wg has got into Linux kernel (after 5.6) so it is install-free.
It is also known as an easy-to-config VPN, which fits a newbie like me.

## Install helper

If you are using a Debian-series distro,
use apt to install `wireguard-tools` on servers.
It provides some greatly useful tools, including `wg` and `wg-quick`.

## Gen key and pub

We use:

```bash
umask 077
wg genkey > a.key
wg pubkey < a.key > a.pub
```

Consider permissions. Do not forget `umask 077`.

The step should be done on all hosts.

## Config

Create `/etc/wireguard/wg0.conf` and write:

```
# If you are a server, not behind a NAT, and has a public IP:
[Interface]
Address = <intranet IP with subnet mask, such as 10.0.0.1/24>
ListenPort = <port handling VPN communications>
PrivateKey = <key of the host>

# List all peers

# If the peer is the gateway
[Peer]
PublicKey = <pub of the peer>
AllowedIPs = <exact IP of the peer, such as 10.0.0.2/32>
Endpoint = <If the peer is publicly accessible, set IP/domain:port>

# If the peer is not the gateway
[Peer]
PublicKey = <like above>
AllowedIPs = <the subnet IP range, such as 10.0.0.0/24>
Endpoint = <like above>
```

Or:

```
# If you are a client, behind a NAT and has no public IP:
[Interface]
...<like above>

# List all peers

# If the peer is the gateway
[Peer]
...<like above>
# To keep the connection in firewalls or NAT tables.
# 25 is suggested by the wg office.
PersistentKeepalive = 25

# If the peer is not the gateway
[Peer]
...<like above>
PersistentKeepalive = 25
```

## Daemonization

`wireguard-tools` has provided a systemd service config.
The name is `wg-quick@`, and you can use the name `wg-quick@wg0`
to make it use `wg0.conf`.

## Test

Try to ping all hosts in the intranet after starting wg on all hosts.
There should be no problems.

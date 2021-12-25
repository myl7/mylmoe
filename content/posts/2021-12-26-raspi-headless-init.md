---
title: Headless Raspberry Pi Initialization
pubDate: 2021-12-26
updDate: 2021-12-26
excerpt: Modify files of 2 partitions on SD card previously. Share PC network with Raspberry Pi which is described in minimal form.
tags: raspi commandline linux windows network
lang: en
---

## TOC

## Motivation

If you have a monitor and keyboard, connect them with your Raspberry Pi
(The following will call it raspi as abbreviation), the initialization is indeed easy.
You can see all information and errors, and then handle them correspondingly.
However, if you want to initialize a raspi without a monitor, purely via SSH in terminal on your PC,
There are lots of critical points, and the tutorial is just to try to show all of them.

My raspi described in the post is 3B+ model, though IMO the following process should fit all raspi models.

You PC may be Windows or Linux.
Mac users may refer to Linux version steps, though I do not have a Mac to test.

## Imaging

First of all, get a SD card reader with SD card plugged and burn the Raspberry Pi OS into it.
On Windows you may use [Rufus](https://rufus.ie), and on Linux just use `dd` like:

```bash
dd if=<image file path> of=<SD card block device path under /dev>
```

As for the Raspberry Pi OS image file, you may download from [the raspi offical website](https://www.raspberrypi.com/software/operating-systems/) or any mirror website.
What is necessary is to ensure the architecture is `armhf`.
You may try `arm64` version image but it is so far still in beta stage,
and may only work on latest raspi boards like 4B model.

The offical website also provides an imager program, but I have never used it.
Rufus and dd are good enough.

## Pre-running

Before pluging the SD card in the raspi and booting,
let us plug it onto our PC and make some modifications.

The burnt SD card will have 2 partitions:
The boot one that later will be mounted at `/boot` in FAT32 format,
and the root one that will be mounted at `/` in ext4 format.

In the boot partition, create an empty file named `ssh` in the partition root dir,
to enable SSH when booting from the image.
On Linux you may do it by `touch ssh`, and on Windows you may use Notepad program and save an empty file.

I am not sure is it required, as most Linux distributions enables SSH by default.
But well, it is not a big work.

In the root partition, edit `etc/dhcpcd.conf` file to uncomment and set the following lines:

```
# It is possible to fall back to a static IP if DHCP fails:
# define static profile
profile static_eth0
static ip_address=192.168.1.2/24 # Choose anyone you like, but not the router 192.168.1.1
static routers=192.168.1.1
static domain_name_servers=8.8.8.8 # Do not use `1.1.1.1,8.8.8.8`, which causes `resolv.conf` content `nameserver 1.1.1.1,8.8.8.8`. And use a working DNS server other than the router, unless you have configured the router to have DNS service.

# fallback to static profile on eth0
interface eth0
fallback static_eth0
```

to use static IP for network when we connect to the raspi for the first time.
The step is required otherwise you may need to use another physical router to see the IP address of the raspi,
or use IPv4 local-link addresses and run `nmap`-like programs to scan the entire IPv4 link-local address range.

As for Windows users, as the root partition is in ext4 format which is not supported by Windows,
you may use programs like
[extFS for Windows by Paragon Software](https://www.paragon-software.com/business/extfs-for-windows/)
to read and write ext4 partition on Windows.

If you want to change the hostname in advance,
edit `/etc/hostname` **AND** `/etc/hosts` to replace `raspberrypi` with your new hostname.
Please make sure `/etc/hosts` is also modified otherwise DNS (when resolving local names)
and `sudo` will report errors or sometimes simply become very slow.

# Running

Now plug the SD card into the raspi and power it on.
Connect the RJ45 ethernet wire between the raspi and your PC.
On your PC set static IP with address 192.168.1.1, mask 255.255.255.0, and router 192.168.1.1.
DNS may use automatic config.
Now you should be able to ping the raspi address 192.168.1.2 with responses.

After connecting the raspi and your PC, use SSH to connect to the raspi to control.
On Linux you may simply run `ssh pi@192.168.1.2` and use the default password `raspberry`.
On Windows there are [PyTTY](https://www.putty.org/) and [Xshell](https://www.xshell.com/en/xshell/) that can also run SSH.

Now do common initialization stuff according to your requirement like running `passwd` to change passwords.
And run `raspi-config` to use the Terminal UI to configure some common raspi options.
In it please make sure `Expand Filesystem` is runned and
`Network Interface Names` is set to not use predictable network interface names.

Keep predictable network interface names off is to ensure the interface name `eth0` is used,
which we used in `/etc/dhcpcd.conf` file.
If you want to enable predictable network interface names, for example the raspi will be plugged in another USB NIC,
then ref to [the StackExchange answer](https://unix.stackexchange.com/questions/73595/wlan-number-assignment)
to fixedly configure the interface names for NICs.

# Sharing Network

To do further config the raspi need to connect to the Internet.
You may use commandline Wi-Fi config tools to use raspi on-board Wi-Fi NIC to connect to a Wireless network,
via `iwconfig` or `wpa_cli`.
But it is hard to say they are easy to use and if you do not have a wireless network it does not work.
Here I will provide the well-known method to share the network of your PC with the raspi,
but kept minimal and with some explanation that may be helpful.

If your PC is running Windows, congratulations,
just go to network device config panel and use Share tab of network device properties to make the sharing.
One needing noticed is the network device to be configured is the WAN interface,
or the device that connects to the Internet, other than connects to the raspi.

If your PC is running Linux, it is a bit complicated.
First edit `/etc/sysctl.conf` file to add or uncomment a line `net.ipv4.ip_forward=1`, and run `sysctl -p`,
to enable IPv4 forwarding if the PC is not the destination of an IPv4 packet.
Then install `iptables` and ensure iptables `INPUT` and `FORWARD` can accept the traffic with the raspi.
If you are not sure, use `iptables -P INPUT ACCEPT` to set the default policy to accept the connection.
(It is not safe but should be fine on PC, but do not do that on a publcly available server.)
Then run the following command to add a rule into iptables NAT chains:

```bash
sudo iptables -t nat -A POSTROUTING -o <WAN interface> -j MASQUERADE
```

to do NAT on your PC for the raspi.

Try on the raspi like `ping 8.8.8.8`, it should work already.

If you later had connected to a Wi-Fi, and wanted to change the network from sharing with your PC to Wi-Fi directly,
change the order of deault route in `ip route`.

There are also some extra suggestions:

If you want to change the `apt` software source, after editing `/etc/apt/source.list`,
do not forget `/etc/apt/sources.list.d/raspi.list`.

If you had changed locale, remember to re-login otherwise `locale` command will report errors.

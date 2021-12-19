---
title: Trouble to Support SOCKS Proxy for aria2
pubDate: 2021-12-19
updDate: 2021-12-19
excerpt: aria2 cares application layer much and transport layer not enough, causing no easy code point to add transport layer SOCKS proxy.
tags: aria2 socks-proxy proxy cpp inheritance
lang: en
---

## TOC

## Motivation

Recently, to give a proof of my C++ ability, I have tried to add SOCKS[^1] proxy for [aria2](https://aria2.github.io/).

It may surprise you that until 2021 aria2 still does not have SOCKS proxy support.
[The corresponding feature request issue](https://github.com/aria2/aria2/issues/153)
was opened at 2013 and now still have not be closed, even has active discussions which are sent in the past 1 year.

In the feature request issue people have actually provided many enough external solutions.
One of the most convinient solutions IMO is to use [GOST](https://v2.gost.run/en/),
which is a state-of-the-art L4/L7 protocol tunnelling tool in Golang with 8K stars on GitHub,
to convert your SOCKS proxy server into a HTTP proxy server for aria2.

However, why can not we add builtin support of SOCKS proxy for aria2?
It is obviously easier to use and can enhance aria2 as a network library meanwhile.
As a aria2 user and fan, I decided to spend some time on it.

Finally, I succeeded to add SOCKS proxy support for BT UDP including DHT and UDP tracker connections via
[this PR](https://github.com/aria2/aria2/pull/1857).
However, when I am going to generalize it to the fundmental HTTP
(and currently ignoring other aria2-supported application protocols like FTP and SFTP),
I found that it is much more difficult.

The post is just to summarize the tough points in it,
avoiding duplicated time consumption on code analysis of following people who also want to work on it,
while also maybe helping other library builders to make their libraries more extensive and reusable,
at least in the view of an ordinary developer.

## Code Analysis of BT UDP

I literally need to set proxy for aria2 BT traffic (you know, I mean, well, to avoid DMCA stuff),
plus it is only a part of aria2 and connectionless UDP should be easier,
my attempt is started at aria2 BT UDP SOCKS proxy.

The first and maybe most difficulty we faced is code of aria2, all laying flat in `src` folder, with so few comments.
`ls | wc -l` = 1355 sources and headers make it really hard to jump across them without searching.

Another feature of aria2 code is, as a C++ library and inheritting C++ tradition,
it ships no 3rd party dependency as network helper, using socket provided by OS straightforward to send and receive.
It wrapped raw OS-specified socket into class `SocketCore`, which works like Linux socket more,
taking `SOCK_STREAM` or `SOCK_DGRAM` to work on TCP or UDP respectively.

To figure out code required modification to achieve our goal, which also means to find where it works on UDP in BT code,
I searched `SOCK_DGRAM` and looped through all found points.
Finally selected code is class `DHTConnectionImpl`.

class `DHTConnectionImpl` implements interface class `DHTConnection`,
and is instantiated in class `DHTSetup` and passed into class `DHTMessageFactoryImpl` and class `DHTInteractionCommand`.

class `DHTMessageFactoryImpl` is used by many classes, including `UDPTrackerClient` surprisingly.
The comment around it says:

> For now, UDPTrackerClient was enabled along with DHT

which means if we got class `DHTConnectionImpl` done, we got both DHT connections
(which are control packets among peers) and UDP trackers done.
Similar things can also be found in class `DHTInteractionCommand` which says:

> TODO This name of this command is misleading, because now it also handles UDP trackers as well as DHT.

Except these two UDP connections, other UDP connections of BT left are only LPD (local peer discovery).
LPD should be disabled if you want to proxy BT traffic,
because at the moment local peers are local for proxy server other than you,
which makes them no (or less) advantages compared to other peers as proxy consumption should be the main part.
While aria2 BT TCP accepts HTTP proxy (we will talk about it later) according to
[this issue](https://github.com/aria2/aria2/issues/470)
answered by the main author of aria2 tatsuhiro-t (contribution 1,017,553 ++, 783,132 --),
if we got class `DHTConnectionImpl` done, we can say BT in aria2 can fully go through proxy.

## Modification for BT UDP

SOCKS proxy unlike HTTP proxy which is in application layer,
is in transport layer, works differently for TCP and UDP, and requires to send and modify transport layer packets.
To add SOCKS proxy support for aria2 BT UDP, we have to get the socket used by it to access raw transport layer packets.

Fortunately class `DHTConnectionImpl` just has a field to store the socket used by itself.
So what we are going to do is add a new class `DHTConnectionSocksProxyImpl` inheritting from class `DHTConnectionImpl`
and overwriting its `sendMessage` and `receiveMessage` method,
and adding a new method `startProxy` to initialize SOCKS proxy stuff.

Here we do not add the SOCKS proxy logic into `DHTConnectionImpl` straightforward because the logic is not short,
even requiring a new method `startProxy` to run all of it.
The SOCKS proxy logic should be added on demond.

SOCKS proxy like HTTP proxy requires address, username, password options.
We add these options referring to HTTP proxy options by searching `HTTP_PROXY` and looping thought all found code.
This, including option validation, is much easier than previous work thanks to utilities of HTTP proxy options.

The final implementation is available on [my PR](https://github.com/aria2/aria2/pull/1857) to aria2.

BTW, in SOCKS proxy RFC RFC1928, page 7, it says:

> The DST.ADDR and DST.PORT fields contain the address and port that the client expects to use to send UDP datagrams *on* for the association.

Do not miss the word ON, which means `DST.ADDR` and `DST.PORT` for SOCKS UDP proxy is like local bind address and port.

BTW, again, one interesting thing of C++11, which is the C++ version requirement of aria2, is that,
while C++11 has `std::make_shared`, `std::make_unique` surprisingly is added in C++14,
so if you want to use `make_unique` in aria2 code, you should include `a2functional.h` which implements it.

## Code Analysis of HTTP

After supporting SOCKS proxy for aria2 BT UDP,
I then continue to work on SOCKS proxy support for general HTTP in aria2.
It is a tough trip and I have not fully figure out how to implement it.

In `src` folder we can see many classes with suffix `Command`,
which after reading we can know that aria2 uses event loop to process all actions,
which is normal and wise for a modern network library and a language without async/await helper (which is C++11).

The entry point is class `HttpInitiateConnectionCommand`.
It has a comment to illustrate the workflow of HTTP, helped me to understand the event loop wokring way,
which is that a `Command` class as an event, runs its stuff,
then calls method `getNextCommand` and returns `true` to get the next event,
or calls method `addCommandSelf` and returns `false` to rerun self and wait.
Class specified in method `getNextCommand` can lead us to the next class we need to find and read.

In class `HttpInitiateConnectionCommand` we can also see
pooled socket even with proxy goes to class `HttpRequestCommand` like direct connection.
Maybe it means socket with proxy will not be reused, but I am not sure.
Anyway, let us first work on simple situation.

As for HTTP, class `HttpInitiateConnectionCommand` instantiate class `HttpProxyRequestConnectChain`,
which goes to class `HttpProxyRequestCommand` to start the connection chain.
The head of the chain about HTTP proxy is
`HttpProxyRequestCommand` -> `HttpProxyResponseCommand` -> `HttpRequestCommand`,
and the following is normal HTTP stuff.
`HttpProxyRequestCommand` -> `HttpProxyResponseCommand` is actually to send `CONNECT` to the proxy server
to start the HTTP tunnel, and wait to receive the response.
`HttpProxyRequestCommand` with `HttpProxyResponseCommand` does not have actual logic.
The actual HTTP proxy logic is at their parent class `AbstractProxyRequestCommand`, in method `executeInternal`.
In it we can see other than overwriting the destination of sending and receiving,
it creates a request as a proxy request and sends it with
methods `setProxyRequest` and `sendProxyRequest` of class `HttpConnection`.

We can add a new class `HttpConnectionSocksProxy` like class `DHTConnectionSocksProxyImpl` to inherit from
class `HttpConnection`.
Problem is unlike class `DHTConnectionImpl`, there is not clear methods to override.

## Possible Modification for HTTP

My alpha plan is to add new connection chain class `SocksProxyRequestConnectChain`.
In class `HttpInitiateConnectionCommand` if SOCKS proxy is specified, then go to this new connection chain.
The head of the chain is `SocksProxyRequestCommand` -> `HttpRequestCommand`, then the following is normal HTTP stuff.
In new class `SocksProxyRequestCommand` other than simplely inheriting from `AbstractProxyRequestCommand`,
we also override method `executeInternal` to add our SOCKS proxy initialization logic
like `DHTConnectionSocksProxyImpl::startProxy`.

The remaining is clearing class `HttpConnection` proxy flag to make it work like no proxy, but we overwrite
the packet destination to send packets to the proxy server.

SOCKS TCP proxy is easier than UDP proxy according to RFC, especially for HTTP only.
Unlike UDP proxy that needs to add a new header for the packet,
TCP proxy just need to send the traffic via the connection to the proxy server other than to the destination.
Though for FTP it requires extra steps, let us make HTTP work first.

An attempt unfinished modification can be found on
[my aria2 fork `socks-proxy` branch](https://github.com/myl7/aria2/tree/socks-proxy).
Hope my analysis can help someone to complete the work.

## Summary

From above we can see that aria2 cares application layer much more than tranport layer.
It does not provide easy hooks to override tranport layer actions.
So when we are going to add extra steps in tranport layer,
we will find out that much application layer stuff also starts to bother us, making us hard to step out.

I do not mean it is bad.
Foucing on application layer, implementing most protocols and features, aria2 has proved it IS wise.
And if you are careful enough and know much enough about the codebase,
it should be possible (even not so difficult maybe) to add transport layer actions for aria2, like SOCKS proxy support.

However, well, now I am a little tired and going to stop for some time.

[^1]: All SOCKS in the post means SOCKS5, specified in [RFC1928](https://datatracker.ietf.org/doc/html/rfc1928). SOCKS4 and SOCKS4a are indeed rarely used. (personally speaking I see only support in some softwares, never seeing someone using it.)

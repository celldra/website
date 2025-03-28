---
title: How I built a CDN at 17 and scrapped it
description: A CDN that handled 1M+ RPS, had a DNS server, TLS fingerprinting, and a challenge system — built solo, scrapped due to startup drama.
date: 2025-03-23
---

# How did we get here?

So, here we are. I'm attending college in around 2022/23, just turned 17 years old and I was contacted by an old friend of mine asking me to work on a project with one of his buddies. I accepted because, why not? The task was simple: Make a challenge page for a Content Delivery Network (CDN), like Cloudflare's. We agreed on a rate and begun work.

<br/>

_The basis of the CDN was to address the shortcomings of Cloudflare, which in both their and my opinion, lacks basic DDoS protection for anyone who doesn't pay them millions of dollars or knows how to configure it properly._

<br/>

So I got to work, building a minimal HTML template page for them to use with Tailwind CSS, and due to the tasks simplicity I was done within a day or so, I presented an invoice and was met with every freelancers worst nightmare:

> "I can't pay this, I don't have the money..."

Welp... I thought. Wasted a few days of mine for no gain oh well, but then he offered me an interesting opportunity...

> "I can offer you equity if you like, we can build this together, all 3 of us?"

Me being 17 and naive, I accepted... Bad decision... _maybe?_

<br/>

**TL;DR:** I was hired for a simple freelance job and the guy couldn't pay me and instead offered me equity which I accepted.

---

## The start: The reverse proxy

So, I got to work. I was given access to the GitHub organisation that they had setup and I took a look... I wanted to cry after that 😂. The reverse proxy I saw was a **little Go proxy** that could **definitely not take on a production-level website and barely even take on a DoS attack from someones smart fridge.**

<br/>

I had my work cut-out for me. So I got to work; rewriting the whole damn thing. They also didn't have any browser integrity checks or anything to try and weed out bad browsers. So not only did I have to rewrite it, **I spent hours researching how to detect bad browsers.**

To cut this section a bit short. I managed to rewrite the whole proxy within 1-2 weeks of me joining and added a bunch of cool little goodies to it:

- Automatic HTTPS issuance (ACME, with Let's Encrypt)
- A proper challenge page and script
- CPU pinning, core affinity and forking
- Zero allocation on middleware flows
- Custom S3 implementation using BadgerDB
- Caching with BadgerDB
- HTTP/2
- Global configuration propagation

And that my friends, is how the proxy was written.

---

## The middle: Dashboard

We'd got our proxy, but one more thing concerned us though:

> "We're gonna need a self serve dashboard, we can't update peoples sites for them all the time it's too time consuming!"

So, I didn't get to work but the others got to work on a prototype dashboard, so I patiently waited and implemented what they needed into the reverse proxy and created an architecture for them to use for configuration propagation:

![Diagram of the configuration communication structure](/images/config-dark.png)

So I left them to it, and kept an eye on what was happening. And thank god I did because within a couple of hours I was _shaking my head in disbelief._ They'd started writing this all in Javascript with Node.js

<br/>

Now, I'm not frameworkist or languagist but Node.js and Javascript was **not the right call for something like this** and I knew I'd have to take charge. So I told them to rewrite it in another language and framework, which wasn't farfetched as the whole thing only had _2 API endpoints_ which didn't do much, but they refused and argued that it was a good idea. _I wasn't going to back down,_ so I just refused to use their implementation and built my own using, in my opinion, the greatest general purpose framework to exist: **.NET**, more specifically **ASP.NET Core.**

---

## The good and the bad: Customers

So with our dashboard, our domain management system and our reverse proxy, we needed to deploy get some users and domains to crash test it properly. So we got to work creating a deployment system and purchasing servers, I handled deploying (obviously) and the others picked the servers, which turned out to be a _horrible idea_.

<br/>

Within a day or so, we regrouped with 3 servers from DataPacket with 128GB RAM, PCI-e NVMe drives, 10G networking, premium routing....... _and a damn Ryzen CPU......_

<br/>

I thought to myself:

> "Why the hell have we got consumer-grade gaming chips, we need at least an EPYC or a Xeon..."

And I was right, and this would bite us in the future badly for various reasons. But for now, it worked and I deployed an instance and it was **beautiful 🥹**. We decided that until we felt it was ready for production usage, we wouldn't charge for it just yet. Although that did put a huge financial burden on one singular member of the team and whilst I did offer solutions (scaling back the servers, going from 3 servers to just one), we stuck to the existing deployment.

<br/>

I was so excited, I thought to myself:

> "This is our baby, this is our future and this is going to be the future of the internet and the future of our lives."

And for a while, it was. After a few months of crash testing with customers we expanded and I built more features, gave the dashboard a fresh lick of paint (as it was built with [Tailwind Components](https://tailwindcss.com/plus/ui-blocks)), some of the features were:

- Cache eviction
- Rate-limiting (with path rules and by default)
- Ability for customers to see when we mitigated a DDoS attack on their property
- Analytics (with [Clickhouse](https://clickhouse.com/))
- Fallback sensor-based mitigation
- TLS fingerprinting
- Browser integrity check (request checks)
- Added Puppeteer detections (and Puppeteer stealth detections, until they were patched recently in 2025)
- Major performance optimisations (implementing [msgpack](https://github.com/hashicorp/go-msgpack) for challenge payloads, reducing allocations, patching memory leaks, using more [BadgerDB](https://github.com/hypermodeinc/badger))
- **In-house DNS server**

**BUT WE HIT A MAJOR CAVEAT...**

<br/>

We kept seeing crashes due to memory leaks sometimes with either really small DDoS attacks, or really large ones. And we knew we were doing something wrong as Go's `net/http` library is fairly efficient and can definitely handle what's being thrown at it.

<br/>

So I begun investigating and found that `net/http` was the source of it. I tried to optimise our configuration based on GitHub discussions and other forum posts from people with similar issues and whilst we got some improved throughput it still was doing the same thing. So we grouped and tried to decide on a way forward and we decided that the way forward was [fasthttp](https://github.com/valyala/fasthttp)

<br/>

So I begun my work porting everything other to `fasthttp` and also implementing a [community-made HTTP/2 library](https://github.com/fasthttp/http2) for `fasthttp`, as it didn't support HTTP/2 out of the box which is a necessity.

<br/>

And all seemed well, until we noticed _more random crashes..._ So who was the culprit? To put this short: the HTTP/2 library was. **It hadn't been updated in years and had some major flaws in it's implementation.** So I took on the task of trying to maintain a fork and patch it up which turned out to be a massive waste of time as it was such a pain to maintain.

<br/>

So, I caved and swapped back to `net/http`. We'd just have to deal with it, **but one of the other guys had a better idea...**

---

## Rust: The nuclear explosion and fallout

**With tensions high and customers threatening to walk, the guy who initially hired me had an idea which would solve all our woes with** `net/http`, **and I was all for hearing it.** He then detailed a new proxy from scratch, written in **Rust**. At the time, Rust was all the hype as it was a unique systems programming language which didn't use a garbage collector and was nearly as fast as C. So, I said go for it, _but I didn't personally work on this proxy._ I instead, stuck to maintaining the existing proxy and building new stuff for the project.

<br/>

As the proxy he was building started to flourish and became less of a PoC and a fully-fledged system, we decided on a rebrand and a restructure so I could get the equity I deserve and put it in legal writing. We agreed on a 50/50 share structure and for a while it was all good.

<br/>

Except one thing... whilst he was registering a bank in the US, and they _apparently_ asked him to get me to sign for a document, which they wanted me present for. Now bear in mind I was 17 at the time, I did **not** have the money to fly over to another country (especially the US) nor would I get permission to do that either. But that all didn't make sense to me because so many companies nowadays use digital signing anyway and that **was enough legal evidence.**

<br/>

During this tense time he became more and more secretive and possessive over the Rust proxy, refusing to let me access it and pushing me away from the project. The tension increased further and feud became more and more public over time and one of the customers who I now am friends with messaged me asking about the situation. After telling him (and my parents) what was going on, _they concluded he was likely lying and that I'm stupid for ever working with him... heh._

<br/>

In the end, the feud became too hot and it happened, the nuclear explosion...

<br/>

After a final dispute with him over the rights to the Rust proxy, which I wasn't going to even touch it is just the fact that he is purposely hiding assets from me, with him stating that I don't even do any work for the company anyway (even though I literally built it from the ground up) **I decided enough is enough and walked.**

<br/>

I took all of my code off the servers and wiped them with `rm -rf / --no-preserve-root`, deleted all the GitHub organisations, dropped an announcement stating why the platform was down, blocked him and disconnected from all public relations.

<br/>

This was met with the obvious response, chaos. Properties were desperately switching over to alternatives and a stupid damage control attempt from him condemning my actions and deleting my apology for the downtime and explanation as to why I left. Ironically, the person who claimed he was such a big part of the project found out the hard way he wasn't, as nearly every massive client we had left as soon as I did, because I did.

<br/>

I kept an eye on the operations for a few months, and saw he relaunched under a new name with his oh-so-precious Rust proxy. Now I was always curious of his ability to code as he never really did any for us when we all were working together and I was somewhat at the edge of my seat to see him prove himself.

<br/>

And as I expected... **an absolute flop of a launch**, barely anyone used it and it was just as bad as when I first joined. Crashed every 10 seconds due to memory leaks and lots of requests coming in at once. This was relieving for me and annoying at the same time because I thought:

> "He did all this, pushed me out and basically killed the project for a Rust proxy that can't even handle a few file downloads without crashing..."

**What a joke...**

---

# Moral of the story

No matter how much you trust someone, whether it be your best friend or close family member. Make sure you legally protect yourself. The people you least expect can backstab you at any time.

<br/>

Unfortunately, the source code behind it all is partially lost, I no longer have the challenge script but everything else I do, it all hasn't touched a server in years. Even though I developed all of what I have and I'm 99.9% sure this is my intellectual property, I do not know whether publishing would open me to legal troubles so if you want to see it contact me. Oh and by the way, I don't have the Rust proxy after all this time 😂

<br/>

> Years after I left the project, I found out that the person I was working with had been involved in things I'd rather not even write about here. I'm glad I walked when I did. It explained a lot.

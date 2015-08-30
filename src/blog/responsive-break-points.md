---
title: Responsive Break Points
date: 2014-03-23
tags: about me, web dev
---

![geekwagon on a phone sized screen][pic-1]

I've been playing around with [bootstrap][link-1] more, and I like _almost_ everything about it.

I'm not a fan of where they choose break points for responsive design. No doubt they've put in more
effort than me, but with their defaults a half-sized browser window on a 1280 x 1024 monitor brings
up the shortened "hotdog" style menu.

I am old fashion, I still have a 4:3 monitor (in my defense it is my secondary monitor). For
geekwagon.net's more responsive redesign I made up my own break points. They are not perfect, but
here is the thought behind them.

<!-- more -->

At it's smallest, geekwagon.net displays only two tabs and my contact information. This is how it
appears on most mobile devices (I don't have many to test with). My phone shows a width of 1080 with
a pixel ration of 3, so it's 360px wide. A mobile device with a pixel ratio of 2, 540px wide, will
also show this version.

The half window I was complaining about with bootstrap, also shows this window... so I'm a total
hypocrite, but at least I don't have a "hotdog" menu.

![geekwagon on a tablet sized screen][pic-2]

At 640px the third tab, activity, is added. It's safe to bet a mobile device user will have no
interest in viewing this tab because it's a giant table. Odds are good no one wants to view this tab
anyway. It is only interesting from a code writing perspective. This width is also how it appears in
a web browser taking up half of a wide screen monitor (1920 x 1080 see I told you I had another
monitor).

![geekwagon on a monitor][pic-3]

A touch wider, somewhere between half of a widescreen resolution and a full screen 4:3 resolution
(it's 960px), the background is added and the contact icons get larger. To me this makes it feel
like a classic web page. Nothing has changed except the page now "hovers" over some random binary
number image.

The final break point is at 1100-ish pixels. Here the only change is the summary tab switches to two
columns.

![geekwagon on a big monitor][pic-4]

This post has referred to break points in terms of pixels, but the css media queries are in em's. I
choose this because zooming shouldn't break a website (and as I get older I find a lot of websites I
Crtl + mouse wheel on). Zooming in or out on geekwagon.net should yield appropriate results. For
example, in Chrome with a zoom set to 400% on a 1920 x 1080 monitor the page will look like it does
at it's narrowest break point. Although it will be giant.

My personal website doesn't appear under the projects I've worked on even though I've spent a lot of
time on it. There is however an [easter egg][link-2] that will explain a little about the philosophy
behind geekwagon.net.

Now all I need to do is spend some time refining the code that makes my blog! I know how horrible it
is.

[pic-1]: ../images/325px.jpg "geekwagon at 325px"
[pic-2]: ../images/640px.jpg "geekwagon at 640px"
[pic-3]: ../images/960px.jpg "geekwagon at 960px"
[pic-4]: ../images/1100ishpx.jpg "geekwagon at 1100-ish px"
[link-1]: http://getbootstrap.com/
[link-2]: http://geekwagon.net/#why

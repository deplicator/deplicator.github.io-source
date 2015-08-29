---
title: Understanding OAuth
date: 2015-09-01
tags: github, oauth, php, project, tutorial, web
---

![Totally took a picture of the screen with my phone--trendy.][pic-1]

After playing with Github API without authorization and I hit the 50 calls per hour limit faster
than expected. It is time to learn how [OAuth][link-1] works.

[Here is the demo I made to help me get it][link-2]. No doubt, this is not the best demo, but it
works. Anyone more knowledgeable in this please leave me some feedback in the comments. I'm all for
making this better.

<!-- more -->

### Step 1 - Make Some Stuff Up

For this demo I'm using Github, but OAuth should be the same anywhere. The first thing to make up is
an application on out Github account. I would post a direct link, but it seems it can change.

`Github Settings -> Applications -> Developer applications tab -> Register new applcaion`

Setting up the application is strait forward. The most important part here is **Authorization
callback URL**, be sure it's a url you have access to. I found I could even set it to a url that's
only accessible from my local network (in my case http://homeserver/sanbox/). I did not try this
with an IP address. After creating an application, take note of the Client ID and Client Secret.
These will be needed later.

[Github's documentation][link-3] is decent, but with all OAuth docs I feel like I stumble over some
basic premise. That was the ultimate goal of this demo, figure out what I'm missing. I hope it helps
other people fill in gaps too.

The second thing to make up is a **state**. The state is a random string that would be no be
reproducible by someone else (or even you). This demo uses PHP, and to create the state sting I used
this:

`$_SESSION["state"] = hash("sha256", microtime(TRUE).rand().$_SERVER["REMOTE_ADDR"]);`

This was lifted from an [old Gist by aaronpk][link-4] I found while searching for how to OAuth. I
referred to this gist several times, but I think this is the only thing I left untouched because it
works just fine. Make note we've stored this random number in a [PHP Session][link-5].

Now that we have a client ID and a state, we can move on to the next step.

### Step 2 - Build an Authorization URL

There are a lot of ways to do this, but I chose to kludge it with some simple string concatenation.

`https://github.com/login/oauth/authorize?client_id=<?php echo CLIENT_ID; ?>&state=<?php echo $_SESSION["state"]; ?>`

You probably noticed in step 1 we saved the state in a [PHP Session][link-5]. We need to do this
because Github will return the state used during this GET request and we'll want to compare them to
be sure they match.




[pic-1]: ../images/IMG_20150829_122938.jpg "OAuth can be daunting"
[link-1]: https://en.wikipedia.org/wiki/OAuth
[link-2]: http://geekwagon.net/projects/github-oauth-demo/
[link-3]: https://developer.github.com/v3/oauth/
[link-4]: https://gist.github.com/aaronpk/3612742
[link-5]: http://php.net/manual/en/session.examples.basic.php

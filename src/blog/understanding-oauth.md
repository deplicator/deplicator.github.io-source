---
title: Understanding OAuth
date: 2015-09-01
tags: demo, github, oauth, tutorial
---

![Totally took a picture of the screen with my phone--trendy.][pic-1]

Playing with Github's API without authorization has a limit of 50 calls per hour. I hit this limit
faster than expected. It is time to learn how [OAuth][link-1] works.

[Here is the demo I made to help me get it][link-2]. This is not the best demo, but it works. [This
is the demo's source][link-8]. Anyone with more knowledge in this area please leave feedback in the
comments. I'm all for making this better.

### Step 1 - Make Stuff Up

For this demo I'm using Github, but OAuth should be the same anywhere.

<!-- more -->

The first thing to make up is an application on out Github account. I would post a direct link, but
it seems it has changed recently. Here are the current steps to find it after logging into Github.

`Github Settings -> Applications -> Developer applications tab -> Register new applcaion`

Setting up the application is strait forward. The most important part here is **Authorization
callback URL**, be sure it's a url you have access to. I found you can set it to a url that's only
accessible from my local network (in my case http://homeserver/sandbox/). I did not try this with an
IP address. After creating an application, take note of the Client ID and Client Secret. These will
be needed later.

[Github's documentation][link-3] is decent, but with all OAuth docs I feel as if some basic premise
eludes me. The ultimate goal of this demo is to figure out what I'm missing. I hope it helps other
people fill in gaps too.

The second thing to make up is a **state**. The state is a random string that would not be
reproducible by someone else (or even you). The demo uses PHP, and to create the state sting I used
this:

`$_SESSION["state"] = hash("sha256", microtime(TRUE).rand().$_SERVER["REMOTE_ADDR"]);`

You can see it on line 184 in [the source][link-8]. I should point out here, the source is a single
file so it's got HTML, PHP, and CSS all in one (no custom JavaScript needed, it's handled through
Bootstrap and jQuery). It is a little messy. I hope to add a concise version later, but it's not
necessary because there are free PHP OAuth libraries better than this.

The random state string was lifted from an [old Gist by aaronpk][link-4] I found while searching for
how to OAuth. I referred to this gist several times, but this is the only part left untouched
because it works. Make note we've stored this random number in a [PHP Session][link-5].

Now that we have a client ID and a state, we can move on to the next step.

### Step 2 - Build an Authorization URL

There are a lot of ways to do this, but I chose to kludge it with some simple string concatenation.

`https://github.com/login/oauth/authorize?client_id=<?php echo CLIENT_ID; ?>&state=<?php echo $_SESSION["state"]; ?>`

Going to this url might look familiar if you've ever signed into a website using Github credentials.
It's purpose is to show the user what permissions the application is requesting. In the demo we're
only requesting read access to public information. The API can do anything on behalf of the user;
including write to a repository, change user information, even delete things.

Users can opt out, or if they accept they will be redirected back to your application using the
Authorization callback URL (remember it was important).

### Step 3 - Callback URL

Along with being redirected via the callback URL, there are some URL parameters that come with it.
The two important ones are `state` and `code`.

State is the same as before, it should match the state saved in the PHP Session from Step 1. If it
does not, something funky is going on and you should not continue. This can be checked with a simple
if statement.

`if($_GET["state"] == $_SESSION["state"])`

If they match we'll use the code parameter to get an access token. _The access token is the ultimate
goal of the OAuth process._

In the demo we pause here to see the code and check the state. The process will not continue until
the Exchange button is clicked. In reality, this will happen automatically behind the scenes.

### Step 3 _and a half_ - The Exchange

This is separate, but still part of step 3. With our state's matching the code can be exchanged for
an access token by making a POST request to `https://github.com/login/oauth/access_token`. There are
three parameters to send with this request; `client_id`, `client_secret`, and `code`. Putting them
in an array makes it neat and easy.

```
    $params = array(
        "client_id" => CLIENT_ID,
        "client_secret" => CLIENT_SECRET,
        "code" => $_SESSION["code"]
    );
```

Note that CLIENT_ID and CLIENT_SECRET are constants defined earlier in the PHP file.

The most common way to make REST call in PHP is with [cURL][link-6] (also the only way I've ever
seen it done). Fun fact about cURL: it is a recursive acronym "Curl URL Request Library". Here is
the bare minimum needed for a cURL POST to Github's API.

```
    $ch = curl_init("https://github.com/login/oauth/access_token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));

    // Returned information on sucess.
    $response = json_decode(curl_exec($ch));
```

Now `$response` holds an object with some key value pairs, but the only one we care about is
access_token. It can be saved to the PHP session.

`$_SESSION["access_token"] =$response->access_token;`

### Step 4 - Now Have Fun

With an access token we can make subsequent API calls with cURL to get info about the user, their
repositories, their activity, or anything the Github API allows. Here is an example of a simple
API call to get public user information.

```
    $ch = curl_init("https://api.github.com/user?access_token=" . $_SESSION["access_token"]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_USERAGENT, "github-oauth-demo");
    $response = json_decode(curl_exec($ch));
```

The `CURLOPT_USERAGENT` is required when using an access_token. You can also get fancy and put the
[access token in the header][link-7]. This time `$response` is an object that holds user information. The demo
will output this object and you'll be able to see there are more url's available to get interesting
information. You could, for example, make a call to `api.github.com/user` to get the value for the
key `repos_url`, then use that url to list the users repositories.

[pic-1]: ../images/IMG_20150829_122938.jpg "OAuth can be daunting"
[link-1]: https://en.wikipedia.org/wiki/OAuth
[link-2]: http://geekwagon.net/projects/github-oauth-demo/
[link-3]: https://developer.github.com/v3/oauth/
[link-4]: https://gist.github.com/aaronpk/3612742
[link-5]: http://php.net/manual/en/session.examples.basic.php
[link-6]: https://en.wikipedia.org/wiki/CURL
[link-7]: https://developer.github.com/v3/oauth/#use-the-access-token-to-access-the-api
[link-8]: https://gist.github.com/deplicator/b00cf1c5d61ab6b0a714

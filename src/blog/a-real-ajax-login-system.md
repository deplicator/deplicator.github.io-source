---
title: A Real Ajax Login System
date: 2014-12-12
tags: ajax, complaints, demo, security, tutorial
---

![Real Ajax Login][picture-1]

To long; don't care: [Demo][link-1] | [Source][link-2]

After a bit of Google searching, I could not find the login system I want. I would say 'fit my
needs', but that's not accurate. There were tons that could fit the need, but I want a back end php
system that allows a user to login by way of ajax calls. Specifically one that didn't require all my
file names to end in .php. Is that necessary? No. Is that being picky? Probably. Is it fun to make
it work anyway? Of course.

There are plenty of php ajax style login systems and examples out there. I started with [this one
from 9lessons][link-3].

I have no right to complain about other people's work, but wow this code is hard to read and
inconsistent. It works though, so I chose to clean it up and start making changes.

**DISCLAIMER:** I would like to note I am not a security expert. While I feel this system is decent
enough, I cannot advise using it in a real application environment.

[Here is a demo][link-1], note all pages end in html. You can log in with demouser and password, but
check out the registration. That's where most of the magic is.

<!-- more -->

----------------------------------------------------------------------------------------------------

The demo stored passwords as an MD5 hash--at least it's not plain text, but I thought it would be
worth while to change this to use PHP's `password_hash` and `password_verify` functions. This
effectively made the minimum PHP version requirement 5.5.0, which wasn't a problem at home, but for
the demo I had to include [this library][link-4] to make it work with 5.4.0 (Dreamhost!).

I also changed the database connector to PDO instead of mysqli. This way it can be used with any
database (changeable in the config.php file). This has the advantage of not be vulnerable to sql
injection.

The biggest reason for the security disclaimer above is I am not sure of the security risks posed
with passing php session data to the browser. When a user logs in, the session is created from
php/login.php. This requires sending an HTTP post, which contains the user's entered password. There
is probably a better way, but this works for now. If the username is found and the password is
verified, the record for that user (except for the password hash) is sent back to the browser as a
JSON object. In the demo you can see this in the console after logging in.

I recently finished a database course, so in many ways I'd like to use some real data constraints.
I find theory and practice don't align well here. I maintain the username uniqueness by simply not
allowing a user to register with a name that already exist. I came up with a real time validation on
the registration page. As a user types, if the value matches a username in the database the
registration button doesn't enable.

I know what you are thinking.

James ...  
You're making it easy for the hackers to find out all your usernames!

Yes that is true, but my response is "who cares?" Really, why should user names be private?

There is a balance to be had between security and user friendly.

Most website will not tell a user which is wrong between the username or password on a failed login
attempt. The idea is a hacker won't know know if the username is valid. BUT anyone can find out if a
username is there simply by trying to register that name. Now they know all their hackory is not
wasted on an invalid username.

Security should come from within the system. If a user fails to log in after so many attempts, red
flags should be raised. A brute force attack can be thwarted with a 5 second lock out between
attempts. Doesn't sound like much but when you have the hardware to brute force a billion passwords
per minute and then limit it to 12 per minute... those guys will go somewhere else. A normal user
will not even notice. That being said, there is no timer lock out on failed attempts in this demo
(yet).

That's my two cents on security.

I plan to add more to this in the future. Feedback is appreciated, as always. :)


[picture-1]: ../images/ajaxlogin.jpg "Dashed borders let you know this is hard core web design."
[link-1]: http://geekwagon.net/projects/real-ajax-login/login.html
[link-2]: https://github.com/deplicator/real-ajax-login
[link-3]: http://www.9lessons.info/2014/07/ajax-php-login-page.html
[link-4]: https://github.com/Antnee/phpPasswordHashingLib

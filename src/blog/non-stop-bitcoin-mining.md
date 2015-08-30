---
title: Non-stop Bitcoin Mining
date: 2014-02-16
tags: bitcoin, linux, scripts
---

![It mines!][pic-1]

It's no secret I mine Bitcoins, but I don't bring up that I'm not very good for the obvious geek
creed reasons. Today I finally made a change to my mining rig that I hope will end the occasional
dreaded _"Idle Miner Notification"_ from [btcguild.com][link-1].

<!-- more -->

I have small mining setup, a mix of Block Eruptors and a single Butterfly Labs Jalapeno. We started
having strange Internet connection issues, and I immediately assumed it was AT&T's fault (to be fair
it usually is). Also about the same time bfgminer reported the Jalapeno was
<code style="color: red">sick</code>. Never crossed my mind these issues were related, but once I
sent the Jalapeno off to be RMA'd all most of our Internet problems cleared up.

With the Jalapeno gone, bfgminer ran with no problems. With the Jalapeno the program would
inexplicably give up, even with the new one back in action this still happens. As a good
administrator I'm sure I could have looked for a log or an error message or something, but it is
very easy to putty back in, hit the up arrow, enter, ctrl+A+D, and go on with life. I can even do it
remotely with [TeamViewer][link-2] because my home PC is on almost all the time (thanks for nothing
logmein). Sometimes it goes for months without my need to intervene, other times only hours (and in
the middle of the night).

After nearly a year of manual restarts and an immeasurably small loss of [Satoshis][link-3], I've
[finally made a script][link-7] to continually check if bfgminer is running and restart it if it's
not. My apologies for not giving credit where it is due, most of this script came from a post on
stackoverflow, but I'm not sure where.

It is far from perfect, but so far so good. I'd love to hear anyone's two <del>cents</del> Satoshis
on how to improve it. I also hope this is an aid to other small time miners.

EDIT: March 4, 2014  
It didn't take me long to realize this was better to run as a cronjob. The biggest problem I had was
multiple screens running, so I changed it over and made my log file a little better.

My first attempt was to remove the pause line and add the script as a cronjob that runs every 5
minutes.

The [Ubuntu Wiki CronHowto][link-4] was helpful, especially the **Enable User Level Cron** section.

I also update the log file to show a time. For weeks I thought everything was good, because you
know, nothing went wrong. I was suspicious something wasn't quite right because the log file never
showed the miners being restarted.

Today the power went out, and when the server came back on I expected miners to be running within 5
minutes... they did not. I dug a little deeper and [this comment on the Ubuntu forms][link-5]
pointed out my issue. There were a lot of comments about making sure the script was executable and
user level cron was set up. My problem specifically had to do with how [screen][link-6] works. I
needed a -d for detach. The new script is in the [gist][link-7], it's been tested and rocks along
well.


[pic-1]: ../images/itmines.jpg "Screen shot of the log file, how interesting and inefficient."
[link-1]: http://btcguild.com/
[link-2]: http://www.teamviewer.com/en/index.aspx
[link-3]: http://bitcoin.stackexchange.com/a/117
[link-4]: https://help.ubuntu.com/community/CronHowto
[link-5]: http://ubuntuforums.org/showthread.php?t=1503706&p=9424083#post9424083
[link-6]: http://linux.die.net/man/1/screen
[link-7]: https://gist.github.com/deplicator/9040062

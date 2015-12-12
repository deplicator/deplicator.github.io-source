---
title: Windows 10 Registry Hacking
date: 2015-12-11
tags: complaints, microsoft, operating systems, regedit, windows
---

Why does Windows 10 require so much registry editing for such basic features?

![giant out of focus regedit icon][pic-1]

I [complained about Windows 10 earlier this year][link-1]. To be fair it wasn't all complaining.
Since then I've moved to Windows 10 on my desktop where it gets far more use. On four occasions now
I've had to resort to editing the registry to change options that I would think could be changed
somewhere in the settings menu.

First on the list... I don't even want to look at OneDrive.

<!-- more -->

----------------------------------------------------------------------------------------------------
### OneDrive

With all the options of cloud storage available why do I have to look at Microsoft's version in
Explorer? In fact three of the four changes I want to make in Windows 10 have to do with Explorer.
OneDrive is hands down the most annoying to look at and remove. Most of Explorer's annoyance to me
stem from the left hand navigation panel. I like to try new ways of doing things, but each version
of Windows makes file navigation more complicated. There is an argument it's easier for the majority
of users, but in my experience most users have no idea where their files are. The more libraries,
quick access, and general layers of file access abstraction they add; the worse it gets. My first
trek into Explorer I had a hard time finding something as simple as `C:\`. Seriously, why do USB
hard drives show up under "This PC" and as their own top level item? One or the other would be fine.

Rants aside, [TechJourney][link-2] has made a nice tutorial on how to remove the OneDrive eye sore.
It requires the command line and regedit. I can imagine this is daunting to most users and people
will simply ignore OneDrive. This is what Microsoft is counting on. If they had a great product like
Dropbox or Google Drive they could simply leave it as something to go grab from the new Microsoft
App Store, but it sucks so consumers get it IE style.

### What is all the junk in ~~My Computer~~ This PC?

Like OneDrive, I found all the extra folders under This PC to be pointless. I go here to get to
drives, folders I use on a regular basis show up in quick access already. How many different ways do
we really need to get to files?

![Where did I save that?][pic-3]

Fortunately [How-To Geek has an answer][link-3]. Of course it requires more registry editing. Why
are none of these options in this new cool Settings Menu? The good news is you don't even have to
open regedit, How-To Geek has the .reg files you can download and run.

Despite these registry changes, these folders and OneDrive still pop up on occasion.

### Right Click Menu

Many years ago Windows associated file extensions to programs. The some time later they came up with
two associations, one to open files and one to edit them. This is an epic idea. For some reason in
Windows 10 you cannot change the program associated with editing. This makes less sense than usual.

You can change these things by editing the registry! Why would you want some menu to do this when
you can search through lists that look this awesome?

![regedit is fun][pic-2]

This is most common when dealing with images, and the registry path you're looking for is:

    HKEY_CLASSES_ROOT\SystemFileAssociations\image\shell\edit\command

There is a single key here named `(Default)` that most likely has the path to `mspaint.exe` as is
value. You can change it to any executable you want. For example you can use:

    "%programfiles%\paint.net\PaintDotNet.exe" "%1"

To have images open in Paint.net when selecting edit. You can use PhotoShop or the GIMP or whatever.
You cannot change the part with `"%1"` though, leave that alone.

If you are not familiar with `%programfiles%` don't worry, this is just an environmental variable to
`C:\Program Files`. Well, most likely this is where it goes, it would be different if you moved
Program Files so some other place. If you want to see it in action open Windows Explorer and copy
`%programfiles%` into the address bar.

### The Less Functional Volume Mixer

I understand most of my complaints here are nit picky and make it sound like I'm cranky about
change. This is not true, I like new things. However I don't like when new things are measurably
worse than old things. For Windows 10 that is the case with the volume mixer.

What sucks most is the registry edit to go back to the older style volume mixer doesn't fix why it's
worse. It's worse because it can't remember the settings like Windows 7 could. Once I turned the
volume down on a game, it was down forever. In 10, I keep turning down the volume on Civilization V
every time I fire it up.

Shawn Brink created a nice registry file and shared it on [tenforums.com][link-4]. The only
difference to get to the mixer is a right click instead of a left click (still same number of
clicks). This is handy if you are having trouble adapting, but it make the mixer remember volume
settings.





[link-1]: blog/james-complains-about-windows-10
[link-2]: https://techjourney.net/disable-or-uninstall-onedrive-completely-in-windows-10/
[link-3]: http://www.howtogeek.com/222057/how-to-remove-the-folders-from-%E2%80%9Cthis-pc%E2%80%9D-on-windows-10/
[link-4]: http://www.tenforums.com/tutorials/7948-volume-control-old-new-windows-10-a.html
[pic-1]: ../images/regeditfun.png "You know you love it."
[pic-2]: ../images/regeditfun2.png "Of course, it was in AppXf4ry1xaj6j9nm2m6g08zm9mkyq88zjpc the whole time."
[pic-3]: ../images/regeditfun3.png "It's like they don't trust me to keep up with my own stuff."

---
title: Some Backup Scripts
date: 2015-01-30
tags: backup, scripts, tutorial, windows
---

I've been updating my backup procedure for Windows and learned some new tricks to share. My current
backup procedure is the most horrible thing I could imagine. It copies and compresses all the files
I care about and stores them on a NAS. It ignores some critical backup components:

* **Waste space**, no incremental just a full copy of everything. This takes up a lot of space.
* **No daily archive**. What if I want to recover a file I deleted 17 days ago from a networked
  directory? As of right now it cannot be done.
* **Compression sucks**, for three reasons.
    * _First_, it takes longer to do the backup.
    * _Second_, it is harder to search through.
    * _Third_, if the single massive zip file is corrupt the backup is useless.

These are some serious issues I should deal with in my new solution. In addition to that I don't
want to give up the power, flexibility, and--let's just go with--geek pride a scripted solution
provides. Geek pride could be replaced with frugal, but to be honest some of this stuff is a little
fun to figure out. Saving a dollar is a by product more than a motivator.

<!-- more -->

----------------------------------------------------------------------------------------------------
### Quick Overview

When this is done there will be a script that runs from the computer with a source folder I want to
back up. Every day it will copy all files that changed in the last 24 hours from the source folder
to a network location. Once a month it will copy all files. Each backup, daily and monthly, will be
placed in a folder named with that days date so they do not over write every day.

### Windows Scripted Backup

I am a simple guy with simple needs. The tools used here are:

* Robocopy (Included with Windows or a free download)
* A text editor (I recommend [Notepad++][link-1] for Windows users, but go with what you know)
* Scheduled Tasks (built into Windows)

#### Robocopy

_This step is optional for Windows Vista and 7 users, but worth checking out. Not sure about
8--sorry can't bring myself to care about Windows 8._

Windows Vista, 7 and Server 2008 come with robocopy. If you are using XP you can download robocopy
from may places on the web, but I trust Microsoft (believe it or not) to put out a worry free copy.
The only catch is that it is part of their [Windows Server 2003 Resource Kit Tools][link-2].
Robocopy is burred in the executable that comes from that package. I recommend installing it,
finding the robocopy.exe, and copying it some place useful.

Call me old fashion, but even though I use Windows 7 I make a copy (not move) robocopy.exe to the
same folder the scripts are in. The easiest way to find the robocopy executable is to search for it.
I found mine in `C:\Windows\System32\robocopy.exe`, and copied it to `C:\scripts`.

#### A Text Editor

In a pinch notepad is fine for this task, but if you've never used [Notepad++][link-1] you are in
for a treat. To create a batch file I generally just start in Windows Explorer. Navigate to my
scripts folder, `C:\scripts`; then right click on the screen and make a new text document. You will
need to have ["Hide extensions for known file types" unchecked][link-3] in folder options so you can
rename it from `New Text Document.txt` to `awesomebackupscript.bat`. You don't have to name it that,
but the `.bat` part is required.

Here is a quick example of the script I used. It will be explained line by line.

    net use z: /delete
    net use z: \\NAS\backup /user:admin password
    robocopy "E:\myfiles" "z:\%Date:~-4,4%-%Date:~-10,2%-%Date:~-7,2%(day)\myfiles" /ZB /S /R:2 /MAXAGE:1 /LOG+:z:\logs\%Date:~-4,4%-%Date:~-10,2%-%Date:~-7,2%_mycomputer(day).txt /TS_

The first two lines remove the mapped network drive taking up letter 'z', and adds the network
location used for back up. These two lines are precautionary, and the script will work without them.
It is nice to know you are using the drive you intended to use. In my case the NAS required
different credentials which is why I chose to do it this way.

The robocopy line is all the magic. There is a nice [technical manual for robocopy][link-4]. For the
purposes of a simple daily backup you will only be interested in the following.

    robocopy [source] [destination]

At it's core that's all that is going on in line 3.

The source and destination need to be in double quotation marks if the file path has a space in it.
For example `"C:\Program Files"`. They can be used on paths without spaces too (like the example),
I've found it to be good practice in Windows.

The source path is strait forward in the example, I'm backing up everything on E: in a folder called
myfiles. The destination, on the other hand, is not so simple. In part this is the motivation for
this post. It's daunting to look at but here it is:

    "z:\%Date:-4,4%-%Date:~-10,2%-%Date:~7,2%(day)\myfiles"

An example out put would be `z:\2013-02-26(day)\myfiles`. That's understandable, a folder on drive
Z named 2013-02-26(day) with a sub-folder that is a copy of the files from my source. I'll save my
argument about why I am an American who uses year-month-day for another post, but what it important
is that when this script is run it creates a new folder based on the date. The (day) part is because
I have another script that runs using the date and it is differentiated by naming it
`2013-02-26(full)`.

Everything else on line 3 are options. Strait from the documentation:

    /Z : Copy files in restartable mode (survive network glitch).
    /B : Copy files in Backup mode.
    /S : Copy Subfolders.

    /R:n : Number of Retries on failed copies - default is 1 million.
    /MAXAGE:n : MAXimum file AGE - exclude files older than n days/date.

    /LOG:file : Output status to LOG file (overwrite existing log).
    /TS : Include Source file Time Stamps in the output.

The log file is saved the same way the date is in the destination folder. Maxage is what grabs only
the files that have changed in the past day.

There is a Scheduled Tasks to run this file daily. Then once a month I run a similar script with no
MAXAGE option to do a complete backup. I also have a task that deletes backup folders older than 90
days to keep the size reasonable. This gives me an option to restore a file that has changed in the
last 90 days.

_I am posting this almost two years after I wrote this back up solution. Since this I've come up
with an even better way. Maybe I'll write it up before another two years pass._


[link-1]: https://notepad-plus-plus.org/
[link-2]: http://www.microsoft.com/en-us/download/details.aspx?id=17657
[link-3]: http://windows.microsoft.com/en-US/windows-vista/Show-or-hide-file-name-extensions
[link-4]: http://ss64.com/nt/robocopy.html

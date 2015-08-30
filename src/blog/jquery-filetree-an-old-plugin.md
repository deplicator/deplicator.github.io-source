---
title: jQuery FileTree - An Old Plugin
date: 2014-11-29
tags: jquery, plugin, web dev
---

I've been on a project at school for some time, it's a lot of fun. I enjoy working with others for a
change. The project uses jQuery and we had a need to view directories from the server. Originally I
wrote a very messy class that got the job done, but then one day I stumbled on
[jQueryFileTree][link-1].

<!-- more -->

Over all it was much simpler than my implementation. The only thing I don't like about it is it
passes raw html from the connector script. My implementation passed a json object. Still, didn't
take much work to get everything changed over. Most importantly, jQueryFileTree's implementation
looked prettier... a lot prettier.

![I blame Glyphicons.][pic-1]

![This also taught me about base64 encoding--very cool.][pic-2]

<p style="clear: both;"></p>

If there is anything I've learned about working with web interfaces, it's this: no one cares how
efficient/useful/pretty/awesome your underlying scripts is, they only look at the surface. It's
actually unfair the value placed on aesthetics. Cover some craptacular code with bootstrap, everyone
think's it gold.

Why am I even writing about this?

For as much as I like jQueryFileTree, there were a couple of things it couldn't do. Now it can do
those things, because open source!

One part of our project didn't need files, only folders. The user selects a folder and magic happens
no matter what is inside. I added a Boolean option called 'folderSelect' to handle this behavior. By
default it's false, but if set to true files are not displayed and when the user clicks a folder
that directory path is passed to the callback.

The other thing we needed was a way to exclude files by name or extension. The new option 'exclude'
is an array of strings. Any strings that match a folder or file name is given a hidden class. In
contrast 'folderSelect' does not return files at all, this will return the excluded names but not
show them. I did this just in case we wanted to have an option to show hidden files. In addition to
names, any string that starts with `*.` will exclude by file extension.

jQueryFileTree with these new options can be found at this [fork of the original][link-2]. The
exclusion code gets complicated, no doubt there are ways to improve it (I'm all ears if anyone has a
suggestion).

Maybe I'll change it up to pass json in the ajax call, and have a way for the user to change up the
look. I think that would be better. I don't have a need for that right now though, so I won't be
surprised if it doesn't happen.


[pic-1]: ../images/jquery-filetree-mine.png "My lame file tree."
[pic-2]: ../images/jquery-filetree-theirs.png "jQueryFileTree's default."
[link-1]: http://www.abeautifulsite.net/jquery-file-tree/
[link-2]: https://github.com/deplicator/jQueryFileTree

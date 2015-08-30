---
title: My First WildStar Addon - Kael's Housing Tour
date: 2014-07-19
tags: lua, mmorpg, plugin, project
---

![Oh WildStar how fun you were; too bad things didn't work out...][pic-1]

The screen shows it's not much of an addon, but the person I made it for is ecstatic about it.

This post isn't about how to use Kael's Housing Tour. I spent more time writing a readme than it
will be cumulatively read by users. It's [available on the git repo][link-1]. After some tweaks I'll
put it on Cursed Gaming too.

EDIT: It's [on cursed now too][link-2].

<!-- more -->

The look of this addon was made by Kaelish (that's who Kael is). If you are curious why it's her
housing tour I suggest the aforementioned readme file. Obviously this will get better over time, for
example I'd like to grey out the Guide and Change Guide button if you haven't clicked join a tour..
or not show them.

Development wise, lua is kind of strange. I'm not a huge fan of Houston, the official addon
development tool. I only used it for making changes to the graphical form. All the lua editing was
done in Notepad++. This was the first time I ever used git in Windows. I was told there was some
pretty gui for it, but I found Git Bash and did what I usually do (except no copy and paste, lame).

The API is lacking in official documentation. Most unofficial documentation is just lists of
libraries and methods available. Most of my real insight was gained looking at other addons. There
are some area's my code is very similar to others. At first I thought that was kind of wrong, but
the right click menu code for every addon I saw was virtually identical. I cyclomatic complexity-ed
mine up by changing the right click menu option based on if you are a tour guide or not. Also, if
you click on yourself the text is different.

The Visitor addon's function for searching random properties was decent, but I had to do some
tweaking. The most notable (imo) improvement is I pass the unique properties searched to the form
instead of searches done. Searches done will always increment until the user clicks stop. Unique
Properties will eventually hit a cap, so the user can see they probably aren't going to find the
property they're looking for. Future improvements a visual indicator that the search is still going,
and I'd like to add an auto stop after so many searches with no more unique properties found. The
are really a ton of things I want to add... some are in that readme.

This addon also marked the next iteration of my 10 minute hack experiment. I wrote a quick blurb in
my notes for almost every day. I'm happy to share it, but these [are just notes for myself][link-3]
(nothing juicy). They're in markdown, but I only ever view them in a text editor so it might not be
perfect markdown.

[pic-1]: ../images/khtss.png "Hard to see, but there is a handsome warrior with new PvP gear in this picture."
[link-1]: https://github.com/deplicator/HousingTour
[link-2]: http://www.curse.com/ws-addons/wildstar/222538-kaels-housing-tour
[link-3]: http://geekwagon.net/projects/HousingTour/2014-06-26_notes.md

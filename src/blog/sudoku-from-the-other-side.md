---
title: Sudoku from the Other Side
date: 2015-04-15
tags: bootstrap, experiment, javascript, jquery, game dev, project, requirejs, sudoku, underscore, web app
---

![Real Sudoku Game][picture1]

I do love Sudoku, and I play it too much. Not long ago (before this semester
started kicking my butt) there were two things I wanted to play with: Local
Storage and a Sudoku library.

[This is what I came up with][link1].

<!-- more -->

----------------------------------------------------------------------------------------------------

I didn't use a library for local storage, for some reason I wanted to do it the
hard way. This project has only been tested in Chrome, so if you want to see the
mess I put in local storage the developer tools (F12) has a tab named Resources.

I'd love to write my own Sudoku creating/solving/playing library (maybe
someday), but for now I'm playing with [this one made by Einar Egilsson][link2],
which is a port of one created in Python by Peter Norvig. It was easy to use,
and it's been a few months but I want to say I made some minor modifications.
Should have written what.

There are some simple options. The highlighting presented an interesting jQuery
technical challenge I hadn't encountered. Over all this is just clean fun. Quite
a bit of functionality doesn't work yet (sorry), but I hope to get back to this
project sometime. Unfortunately it is one of millions of projects I start and
never finish.

[link1]: http://geekwagon.net/projects/sudoku/
[link2]: https://github.com/einaregilsson/sudoku.js
[picture1]: ../images/IMG_20150424_140251.jpg "I play in pen because I'm a glutton for punishment."

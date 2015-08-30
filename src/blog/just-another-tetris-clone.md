---
title: Just Another Tetris Clone
date: 2014-06-20
tags: game dev, jquery, mobile, phaser, project, tetris, web app
---

![It wasn't me][pic-1]

Despite WildStar's critical hit on my free time this past month, I've managed to code a little. Let
me introduce both of my blog readers to the buggiest and most poorly coded version of Tetris they've
ever seen.

[geekwagon.net/projects/flipsy][link-1]

Don't ask why it's called Flipsy. That was just the name of the folder when I started and I didn't
bother to change it.

<!-- more -->

I did follow the [Tetris guidelines][link-2] to the best of my coding ability. The obvious things,
like piece colors are there. With the exception of the square. One cube on the square red so I could
see it was rotate. Less obvious Tetris familiarity is the piece randomness. There are a ton of
guidelines I haven't implemented yet.

The primary goal of this project was to increase my familiarity with [Phaser][link-3], an HTML5 game
framework. It takes care of the lame part of game crafting, drawing stuff on a canvas, and lets you
focus on the look and logic of the game. Their site has a lot of examples to help you. I found most
of their examples are for every game type imaginable except a falling block puzzle game. They are
none the less helpful at getting concepts across.

This was also a personal experiment with [the 10 minute hack][link-4].

The idea behind the 10 minute hack is to work on something for 10 minutes every day. The idea is
that once you get into a project it is easier to keep going. If you are just not in the mood you can
at least say you thought about it for 10 minutes. I am certain, had this stupid WildStar game not
come out there would have been less days of only 10 minutes. To be honest there were a couple of
days I didn't even get my 10 minutes in. Every day I did do the 10 minute hack I made a note of it
in a text file. Like a 10 minute hack daily journal. Most entries were a sentence, but I found the
reflection to be useful.

I'd post my 10 minute hack journal, but my biggest mistake was using the hack to work on multiple
projects at once. I think in the future, for at least a few weeks at a time, decide which project
the 10 minute hack will be used on.

For the future of this project, first thing will be some major refactoring. Then some bug fixing.
For example; if you go nuts with the rotate key and left/right arrows at the same time you can split
a piece apart. Especially weird stuff can happen at the edge of the screen. After that I'd like to
start making some serious changes, like make it more than another Tetris clone.

[pic-1]: ../images/2014-06-15at8.00.34PM.png "Someone sucks at Tetris."
[link-1]: http://geekwagon.net/projects/flipsy/
[link-2]: http://tetris.wikia.com/wiki/Tetris_Guideline
[link-3]: http://phaser.io/
[link-4]: http://lifehacker.com/5889332/the-10-minute-hack

---
title: Game Development Practice
date: 2014-08-30
tags: game dev, ideas
---

![Game in a tube, what a concept!][pic-1]

I found Eric Zimmerman's blog a while back and have enjoyed his series of posts about how he teaches
game design. Particularly [this one about fixing broken games][link-1]. Like most geeks, I like
games. I like playing them, thinking about them, how could I make them better, how can I make my
own...

<!-- more -->

Zimmerman explains broken games as ones with no meaningful outcomes. Almost exactly the same
conclusion I made, except I defined it as the player having no bearing on the outcome. No doubt I
picked this idea up years ago from Sid Meier's idea of games being "a series of interesting
choices".

Zimmerman lists five broken game examples; War, Rock-Paper-Scissors, The Dice Game, The Number
Guessing Game, and Matching Pennies. The assignment in his post is to create a variation on one of
these games to fix the broken aspect.

I'd like to do this assignment, but I'm going to choose a different broken game: [LCR][link-2]. Here
are the original rules (as best I can recall).

* The game has 3 custom dice; half the sides are a dot, one side is an R, one is an L, and the final
  is C.
* There must be 3 or more players (too many make for a long game too few is more boring).
* Each player starts with 3 tokens (or quarters to make the random win more exciting).
* On each players turn they rolls a die for each token they control, max 3.
* If a player controls no tokens, they are still in the game but cannot roll dice on their turn.
* The player will pass a token right for each R rolled, to the left for each L rolled, and put a
  token in the center for each C rolled.
* The final player to be the only one with tokens, wins (and gets the quarters in the center if
  playing with money).
* It's a simple game, and can even be fun. I think it's a party favorite because inebriated people
  don't have to make decisions.

I've played this silly little game many times, and every time I can't help but think we're just
waiting to find out what the random outcome will be (I'm rarely inebriated). Until I read
Zimmerman's post, it never occurred to me to think about how I could change the game.

This is what I came up with (unchanged rules are grey):

* <span style="color: lightgrey;">The game has 3 custom dice; half the sides are a dot, one side is an R,
  one is an L, and the final is C.</span>
* <span style="color: lightgrey;">There must be 3 or more players (too many make for a long game too few
  is more boring).</span>
* Each player starts with 4 tokens (or quarters to make the random win more exciting).
* <span style="color: lightgrey;">On each players turn they rolls a die for each token they control, max
  3.</span>
* Before dice roll, the player will pass one token to the right or left.
* <span style="color: lightgrey;">If a player controls no tokens, they are still in the game but cannot
  roll dice on their turn.</span>
* <span style="color: lightgrey;">The player will pass a token right for each R rolled, to the left for
  each L rolled, and put a token in the center for each C rolled.</span>
* If a player rolls three dots, they take a token (if available) from the left or right player.
* <span style="color: lightgrey;">The final player to be the only one with tokens, wins (and gets the
  quarters in the center if playing with money).</span>

I didn't change much. I felt it was important to use the same dice as the original game. Everyone
will start with 4 tokens (now a nice round dollar if you're playing with quarters), and pass one
before the roll. At the beginning of the game the choice is arbitrary. As it goes on though I hope
this will make things more interesting. Will you pass to the player with more tokens than you, or to
the player with none? Having the player pass before the roll makes players with only one token
effectively out of the game, but still with a decision to make.

The other decision making change is when a player rolls 3 dots, there is a 1 in 8 chance a player
will roll this if they have 3 tokens (based on my experiences this is more common than you'd think).
These two changes give players some deciding power on tokens going out and coming in.

Unlike the real assignment I haven't been able to do any play testing (the number of people I know
willing to play table top games is sad).

[pic-1]: ../images/LCR_Tubes.jpg "LCR Tubes with less fun instructions inside."
[link-1]: https://ericzimmerman.wordpress.com/2014/08/11/how-i-teach-game-design-lesson-2-broken-games-and-meaningful-play/
[link-2]: https://en.wikipedia.org/wiki/LCR_(dice_game)

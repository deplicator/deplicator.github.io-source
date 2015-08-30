---
title: Ultima VII Party Planner
date: 2014-01-25
tags: backbone, javascript, jquery, project, underscore, ultima, web app
---

![The Exult form loved it.][pic-1]

In an effort to learn more about [backbone.js][link-1] I made a web application that is easily
considered beautifully useless (beauty in the eye of the beholder, useless in the eye of everyone
else). Really, this is probably one of the finest work of code writing I've accomplished to date and
there are maybe ten people in the world who will use it.

There is plenty of room for improvements, but I'd like to write about it anyway.

The picture is an example of a typical, eight character, all level six party. You have a list of all
trainers to go visit, who to train when you get there, and about where they are on the map. It also
shows how much gold to take to each trainer, and the total cost of all training.

Link: [geekwagon.net/projects/u7pp][link-2]

Source: [github.com/deplicator/U7PartyPlanner][link-3]

<!-- more -->

What I thought was going to be a simple little training app for an old rpg turned out to be not so
simple. I had the basics working, a model that represents a party member with attributes that can be
changed. Some attributes are linked, like hit points are always equal to strength. That was easy
enough. I made a simple function where you could throw in a trainer name and it will update the
party member model to reflect training with them in the game (add to stats, subtract from training
points). It was even easy to undo (subtract from stats, add to training points).

The wrench was the rubberband effect. Ultima VII has the three primary stats: Strength, Dexterity,
and Intelligence. And two secondary stats: Combat and Magic. Dexterity is linked to Combat and
Intelligence is linked to Magic. If you train Dexterity and increase it by 1, your combat increases
by 1 as well. If you train to increase Combat by 1, it goes up by 1 unless you have a lot of
Dexterity. Then it will go up by about half the difference of a characters Dexterity and Combat.

For example: Spark starts with 22 Dexterity and 10 Combat. If he trains with Sentri, who gives a
single Dexterity, he'll have 23 Dexterity and 11 Combat. On the other hand if he trains with Markus,
who gives a single Combat, he'll have 22 Dexterity and 16 combat.

This wasn't a huge problem until I realized undoing character training was impossible without
knowing the order they trained in. When I first started to think about the problem I thought it was
going to be hard to implement a fix. I opted to make a statHistory object in the party member model.
Key 0 is the original stats, key 1 is the first trainer increase, and so on. I thought about making
statHistory a regular backbone model but didn't.

This is also the first time I've tried to use right click in an app. I was befuddled at first
because everything I read said to just take the button event from the mouse click. That's true, but
what eluded me is to use mousedown instead of click. Also:

`document.oncontextmenu = function() { return false; };`

That bit removes the normal browser right click menu. I didn't look into it, but as I write this I
think it would be nice if I could only turn off the normal right click menu over specific page
elements and leave it in place everywhere else.

Everything up to that point was easy to do, just took time to implement and test. The training
checklist took some serious trial and error. I don't think the current solution is very clever, but
it's the only one I've gotten to work reliably. There is a method in the Party collection that loops
through every party member and makes a list of unique trainers. That sounds good, but the method
runs every time any model in the collection changes. At first I tries to make the checklist by
comparing who was just clicked to the list, but that turned out to be a can of worm--especially with
untraining.

I thought the map was going to be harder than it was, backbone made working with the canvas easier
than the old fashion way. It made me appreciate the `render()` method.

_I'm still working on this project from time to time, and I don't think this post will be spared
from editing either._

[pic-1]: ../images/u7pp.jpg "Menion makes out like a bandit."
[link-1]: http://backbonejs.org/
[link-2]: http://geekwagon.net/projects/u7pp/
[link-3]: https://github.com/deplicator/U7PartyPlanner

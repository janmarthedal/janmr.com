---
layout: post
status: publish
published: true
title: The Game of Nim
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "<h3>Introduction<&#47;h3>\r\n<div style=\"float:right\"><a href=\"&#47;book&#47;link.php?id=taocp4f1\"><img
  src=\"&#47;book&#47;taocp4f1.jpg\" &#47;><&#47;a><&#47;div>\r\nI have known the
  game of Nim for many years. Once, a friend of mine beat me repeatedly in one game
  after another and I had no idea how he did it. Looking back, I am not sure he knew
  the perfect Nim-strategy, but he knew enough to frustrate me immensely. A year ago
  or so, I was flicking through Fascicle 1 of <a href=\"http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html\">The
  Art of Computer Programming<&#47;a>, Volume 4 by <a href=\"http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;\">Donald
  E. Knuth<&#47;a>, and I read about the strategy of Nim. The strategy is <em>very<&#47;em>
  simple but I could not possibly understand <em>why<&#47;em> it worked.\r\n\r\nThis
  article shows why the strategy works, introducing the necessary game theory along
  the way.\r\n\r\n"
wordpress_id: 58
wordpress_url: http://sputsoft.com/wp/?p=58
date: 2009-04-20 14:02:36.000000000 +02:00
categories:
- mathematics
tags:
- combinatorial game
- impartial game
- Nim
- Sprague-Grundy
- game theory
comments:
- id: 276
  author: Jon Ingram
  author_email: jon.ingram@gmail.com
  author_url: http://joningram.org
  date: !binary |-
    MjAwOS0wNC0yNiAwMDo0MDo1MSArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNC0yNSAyMzo0MDo1MSArMDIwMA==
  content: ! "Thank you for the pointer to this article -- well done for the readable
    writeup of the impartial game theory that lies behind Nim. Winning Ways and On
    Numbers and Games are two of my favourite recreational maths textbooks. I didn't
    realise that Knuth has written on the topic -- I'll have to hunt down a copy of
    the facsicle (or perhaps a complete copy of volume 4, if it's ever finished!).\r\n\r\nThe
    only negative comment I can make is that the extensive use of jsMath has made
    my poor Netbook feel a little overloaded; it does look good, though!"
- id: 381
  author: perastikos
  author_email: perastikos1@gmail.com
  author_url: ''
  date: !binary |-
    MjAwOS0wNS0zMSAxMzowNToyOSArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNS0zMSAxMjowNToyOSArMDIwMA==
  content: ! "hello\r\nhave you got nim game solved in matlab?\r\nthanks a lot"
- id: 457
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com/blog/
  date: !binary |-
    MjAwOS0wNy0yNCAwNzozMzo0OSArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNy0yNCAwNTozMzo0OSArMDIwMA==
  content: ! '@perastikos: No, I haven''t tried that. Computing a winning move - if
    possible - in Matlab should be quite easy, though, as Matlab has an xor operator
    (called bitxor).'
- id: 573
  author: fushar
  author_email: fushar@gmail.com
  author_url: http://www.programmersdream.com
  date: !binary |-
    MjAwOS0wOS0xNiAxMzozNDoyMyArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wOS0xNiAxMjozNDoyMyArMDIwMA==
  content: Thanks for posting such nice article pointing to game theory. Nowadays
    there are many problems in programming contests that must be solved by Sprague-Grundy
    Theorem. This genre of problem is interesting, I think.
- id: 1997
  author: ! 'Book Review: The Book of Numbers | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2010/05/book-review-the-book-of-numbers.html
  date: !binary |-
    MjAxMC0wNS0yMyAxNjo0Njo1NyArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNS0yMyAxNDo0Njo1NyArMDIwMA==
  content: ! '[...] ordinal numbers, cardinal numbers, surreal numbers, the game of
    Hackenbush, nimbers, the game of Nim, and orders of [...]'
---
<h3>Introduction<&#47;h3>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp4f1"><img src="&#47;book&#47;taocp4f1.jpg" &#47;><&#47;a><&#47;div>
I have known the game of Nim for many years. Once, a friend of mine beat me repeatedly in one game after another and I had no idea how he did it. Looking back, I am not sure he knew the perfect Nim-strategy, but he knew enough to frustrate me immensely. A year ago or so, I was flicking through Fascicle 1 of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume 4 by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>, and I read about the strategy of Nim. The strategy is <em>very<&#47;em> simple but I could not possibly understand <em>why<&#47;em> it worked.

This article shows why the strategy works, introducing the necessary game theory along the way.

<a id="more"></a><a id="more-58"></a>

<h3>Nim<&#47;h3>
Nim is played by two players who take turns moving. The initial game position for Nim consists of a number of piles, each containing any number of sticks. A player moves by removing any positive number of sticks from a single pile, possibly emptying the pile. The first player to face an empty position, consisting of no sticks at all, loses. An example of a game of Nim, starting with three piles with 2, 3, and 4 sticks, can be seen in Figure&nbsp;1.

[caption id="" align="alignnone" width="698" caption="Figure&nbsp;1: A possible gameplay in Nim."]<a href="&#47;images&#47;blog&#47;game234.svg"><img class="   " title="Figure 1" src="&#47;images&#47;blog&#47;game234.png" alt="Figure 1" width="698" height="126" &#47;><&#47;a>[&#47;caption]

Nim is an important special case of impartial games.
<h3>Impartial Games<&#47;h3>
A combinatorial game is a game for two players where both players have perfect information, that is, everything about the game is visible at all times, and where no part of the game is left to chance. An impartial game is a combinatorial game with further restrictions:
<ul>
	<li>Two players who take turns at moving.<&#47;li>
	<li>The legal moves depend only on the position and not which player it is to move.<&#47;li>
	<li>A player unable to move loses.<&#47;li>
	<li>Any game will come to an end, that is, no sequence of moves are possible for which the game will continue forever.<&#47;li>
<&#47;ul>
Let an impartial game be identified by <em>the set of all the (sub)games that every legal move can lead to<&#47;em>. Note the recursive nature of this definition. The terminal game, where no legal move can be made, is thus the empty set, \(\{\}\). As an aside, note how any (finite) set of sets is a game.

In Nim, we represent a game consisting of a single pile of \(n\) sticks by \(\star n\). The set representation of this trivial, but important type of game is
<ul>
	<li>\(\star 0 = \{\}\).<&#47;li>
	<li>\(\star n = \{ \star (n-1), \star (n-2), \ldots, \star 0 \}\).<&#47;li>
<&#47;ul>
For instance, \(\star 1 = \{\{\}\}\), \(\star 2 = \{\{\},\{\{\}\}\}\), and \(\star 3 = \{\{\},\{\{\}\},\{\{\},\{\{\}\}\}\}\). A graph representation of all possible game positions in a Nim game starting with the position \(\star 4\) can be seen in Figure&nbsp;2.

[caption id="" align="alignnone" width="720" caption="Figure 2: Graph representation of the Nim game "]<a href="&#47;images&#47;blog&#47;graph4.svg"><img class="    " title="Figure 2" src="&#47;images&#47;blog&#47;graph4.png" alt="Figure 2" width="720" height="248" &#47;><&#47;a>[&#47;caption]

We can also construct a new game by adding two games. Given two games \(G\) and \(H\) the notation \(G + H\) means that a move can be chosen from either \(G\) or \(H\). If, e.g., a move is made in \(G\) that leads to the game \(g \in G\), the game for the added game becomes \(g + H\). In general we have
\[G + H = \{ G + h \mid h \in H \} \cup \{ g + H \mid g \in G \}\]
We see that \(G + \{\} = \{\} + G = G\), as it should be. These special cases, and the fact that set union is commutative, makes position adding commutative too. Likewise, since union is associative and \(G + (\{\} + H) = (G + \{\}) + H\) and \(G + (H + \{\}) = (G + H) + \{\}\), we also have associativity for game adding.

Recall the initial Nim game in Figure&nbsp;1 with three piles of 2, 3, and 4 sticks, respectively. We can now write that position as \(\star 2 + \star 3 + \star 4\). It is possible to write out its set representation but it is <a href="&#47;images&#47;blog&#47;set234.txt">quite large<&#47;a>.
<h3>Properties of Impartial Games<&#47;h3>
Given an impartial game, let \(\cal S\) be the set of all possible game positions. We now  introduce two subsets of \(\cal S\) in the following way:
<ul>
	<li>\({\cal S}_P\) consists of the terminal position \(\{\}\), from where no legal move can be made, and every position for which <em>every<&#47;em> move will lead to a position in \({\cal S}_N\) (\(\{G_1,\ldots,G_n\} \in {\cal S}_P \Leftrightarrow \forall k: G_k \in {\cal S}_N\)).<&#47;li>
	<li>\({\cal S}_N\) consists of every position for which <em>at least one<&#47;em> move will lead to a position in \({\cal S}_P\) (\(\{G_1,\ldots,G_n\} \in {\cal S}_N \Leftrightarrow \exists k: G_k \in {\cal S}_P\)).<&#47;li>
<&#47;ul>
Consider a graph in which every game position is a node and where there is an arc (directed edge) from position <em>G<&#47;em> to position <em>g<&#47;em> if and only if \(g \in G\). Since any game will terminate, this graph contains no cycles and is thus a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Directed_acyclic_graph">Directed Acyclic Graph (DAG)<&#47;a>. This makes it possible to <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Topological_sorting">topologically sort<&#47;a> the nodes&#47;positions, starting from the terminal position and working backwards through every possible position, placing each position in \({\cal S}_P\) or \({\cal S}_N\) in the process. We have, in this way, divided \({\cal S}\) into two disjoint subsets.

Such a <a href="&#47;images&#47;blog&#47;graph234.svg">graph<&#47;a> (<a href="&#47;images&#47;blog&#47;graph234.png">png<&#47;a>) for the game \(\star 2 + \star 3 + \star 4\) would consists of 27 vertices and 114 arcs. Only 4 of the vertices represent games&#47;positions in \({\cal S}_P\).

From the definitions of \({\cal S}_P\) and \({\cal S}_N\) we have something essential. Given a position in \({\cal S}_N\), the <strong>n<&#47;strong>ext player to move will always win, assuming a perfect play on his&#47;her part. Similarly, given a position in \({\cal S}_P\), the <strong>p<&#47;strong>revious player will always win, again assuming a perfect play.

We now move on to different facts about impartial games. Some of them are interesting and useful in themselves, others simply stepping stones towards showing the central theorem, the Sprague&ndash;Grundy Theorem.

<strong>Theorem 1.<&#47;strong> \(G + G \in {\cal S}_P\) for any game \(G\).

<div class="sputproof">
<em>Proof.<&#47;em> We use structural induction (we consider a topologically sorted graph of a game from the terminal game and backwards). For \(G = \{\}\) the statement is trivially true. Now assume that \(G = \{ G_1, G_2, \ldots, G_n \}\) where \(G_k + G_k \in {\cal S}_P\) for \(k = 1, 2, \ldots, n\). If, in the position \(G + G\), the player to move chooses the position \(G_j + G\), the other player can make the same move in the "other part", leading to \(G_j + G_j\), which was assumed to lie in \({\cal S}_P\). This shows that \(G_j + G \in {\cal S}_N\) and since \(j\) was chosen arbitrarily \(G + G \in {\cal S}_P\).&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

Next is the very important concept of <em>equivalence<&#47;em> between games.

<strong>Definition 2.<&#47;strong> The games \(G\) and \(H\) are <em>equivalent<&#47;em>, written \(G \sim H\), if and only if \(G + X \in {\cal S}_P \Leftrightarrow H + X \in {\cal S}_P\) for all games \(X\).

It is clear that \(\sim\) is an equivalence relation (it is reflexive, \(G \sim G\), symmetric, \(G \sim H\) if and only if \(H \sim G\), and transitive, \(G \sim F\) and \(F \sim H\) implies \(G \sim H\)).

<strong>Theorem 3.<&#47;strong> For all \(G, H \in {\cal S}_P\) we have \(G + H \in {\cal S}_P\).

<div class="sputproof">
<em>Proof.<&#47;em> Again, we use structural induction. If \(G = \{\}\) the result follows easily. Now assume that \(G'' + H \in {\cal S}_P\) for all \(G'' \in {\cal S}_P\) where \(G'' \in G'\) and \(G' \in G\). If a move is made from \(G + H\) to \(G' + H\), where \(G' \in G\), we can go to a position \(G'' + H\) where \(G'' \in G'\) and \(G'' \in {\cal S}_P\). This last position lies in \({\cal S}_P\) by assumption and then \(G + H \in {\cal S}_P\) does too. By symmetry the same arguments can be used if a move is made in the \(H\) part.&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

The following important theorem shows that any game in \({\cal S}_P\) is equivalent to the terminal game.

<strong>Theorem 4.<&#47;strong> \(G \sim \{\}\) for all \(G \in {\cal S}_P\).

<div class="sputproof">
<em>Proof.<&#47;em> We need to show \(G + X \in {\cal S}_P \Leftrightarrow X \in {\cal S}_P\) for all games \(X\). First we show \(X \in {\cal S}_P \Rightarrow G + X \in {\cal S}_P\) so let \(X \in {\cal S}_P\) and consider the position \(G + X\). But that \(G + X \in {\cal S}_P\) follows immediately from Theorem&nbsp;3.
Next we show \(G + X \in {\cal S}_P \Rightarrow X \in {\cal S}_P\) which is equivalent to \(X \in {\cal S}_N \Rightarrow G + X \in {\cal S}_N\). So let \(X \in {\cal S}_N\) and consider the position \(G + X\). We can now make a move to \(G + X'\) where \(X' \in X\) and \(X' \in {\cal S}_P\). From Theorem&nbsp;3 follows that \(G + X' \in {\cal S}_P\) and thus \(G + X \in {\cal S}_N\).&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

The next theorem shows that we can add and "subtract" on both sides of a \(\sim\).

<strong>Theorem 5.<&#47;strong> \(G \sim H \Leftrightarrow F + G \sim F + H\) for all games \(F, G, H\).

<div class="sputproof">
<em>Proof.<&#47;em> Let \(G \sim H\), meaning \(G + X \in {\cal S}_P \Leftrightarrow H + X \in {\cal S}_P\) for all games \(X\). Now assume \(F + G + Y \in {\cal S}_P\) for some \(Y \in \cal S\) and by setting \(X = F + Y\) we have \(H + X = H + F + Y \in \cal S\), showing that \(F + G + Y \in {\cal S}_P \Rightarrow F + H + Y \in {\cal S}_P\) for all \(Y \in \cal S\). Analogously we can show the same statement with \(G\) and \(H\) interchanged. Hence, \(F + G \sim F + H\). Now assume \(F + G \sim F + H\). We then have \(G = G + \{\} \sim G + (F + F) = (G + F) + F \sim (H + F) + F = H + (F + F) \sim H + \{\} = H\).&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

Finally a theorem essential for the next section.

<strong>Theorem 6.<&#47;strong> \(G \sim H \Leftrightarrow G + H \in {\cal S}_P\) for all games \(G\) and \(H\).

<div class="sputproof">
<em>Proof.<&#47;em> \(G \sim H \Leftrightarrow G + H \sim H + H \sim \{\} \Leftrightarrow G + H \in {\cal S}_P\).&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

<h3>Characterizing Winning Positions<&#47;h3>
The goal is now to characterize \({\cal S}_P\) or, equivalently, the games \(G\) for which \(G \sim \{\}\) (see Theorem&nbsp;4). If a player always chooses a move that leads to a position \(G \in {\cal S}_P\), then that player is going to win.

We do this by constructing a function \(E: {\cal S} \rightarrow \{0, 1, 2, \ldots \}\) such that
\[G \sim \star E(G)\]
for all games \(G\). This will identify \({\cal S}_P\) since we will have \(G \sim \{\} \Leftrightarrow E(G) = 0\).

Naturally we have \(E(\{\}) = 0\). Let us now define \(E(G)\) using an inductive approach. Since \(G = \{\}\) is already taken care of, we let \(G=\{G_1, G_2, \ldots, G_n\}\) and assume that the values \(p_j=E(G_j)\) are known. Using Theorem&nbsp;8 this means that \(G_j + \star p_j \in {\cal S}_P\) for all \(j\). We now wish to find \(k\) such that \(G + \star k \in {\cal S}_P\).

We can get an idea of what we need from \(E\) if we let \(k\) be fixed and then consider the four possible classes of moves from the position \(G + \star k\):
<ul>
	<li>\(G_j + \star k \sim \star p_j + \star k\) with \(k > p_j\). We could now move to \(\star p_j + \star p_j \in {\cal S}_P\), implying \(G_j + \star k \in {\cal S}_N\).<&#47;li>
	<li>\(G_j + \star k \sim \star p_j + \star k\) with \(k < p_j\). We could now move to \(\star k + \star k \in {\cal S}_P\), implying \(G_j + \star k \in {\cal S}_N\).<&#47;li>
	<li>\(G_j + \star k\) with \(k = p_j\). We would like to avoid this situation since then \(G_j + \star k \in {\cal S}_P\), implying \(G + \star k \in {\cal S}_N\).<&#47;li>
	<li>\(G + \star k'\) where \(k' < k\). We would now like to choose a position \(G_j\) for which \(E(G_j) = k'\) since then \(G_j + \star k' \in {\cal S}_P\), implying \(G + \star k \in {\cal S}_P\).<&#47;li>
<&#47;ul>
If these points are fulfilled then, since \(G_j\) and \(k'\) could be chosen arbitrarily, we have covered all possible moves. We would then have \(G + \star k \in {\cal S}_P\).

These points actually give away the solution:

<strong>Theorem 7<&#47;strong> (The Sprague&ndash;Grundy Theorem)<strong>.<&#47;strong> For any impartial game \(G\) we have \(G \sim \star E(G)\) with
\[E(G) = \mbox{mex}(\{ E(G') \mid G' \in G \}),\]
where \(\mbox{mex}(S) = \min\{k \mid k \geq 0 \mbox{ and } k \notin S \}\) is the "minimal excludant" of \(S\).
<h3>Winning Nim<&#47;h3>
Let us now apply the theory to Nim. Since every game of Nim has the form
\[G = \star p_1 + \star p_2 + \cdots + \star p_n, \quad p_j \geq 0,\]
and since
\[E(G + H) = E(\star E(G) + \star E(H))\]
for all games \(G\) and \(H\), we have
\[E(G) = E(\star p_1 + \star E(\star p_2 + \cdots + \star E(\star p_{n-1} + \star p_n) \cdots )).\]
This means that if we know the value of \(E(\star x + \star y)\) for all \(x, y \geq 0\), then we can compute \(E(G)\) of every Nim-game \(G\). Let us introduce the notation \(x \circ y = E(\star x + \star y)\). Using the Sprague&ndash;Grundy Theorem we have
\[x \circ y = \mbox{mex}(\{ x \circ (y-1), \ldots, x \circ 1, x \circ 0 \} \cup \{ (x-1) \circ y, \ldots, 1 \circ y, \ldots, 0 \circ y \}).\]
This makes it possible to tabulate the values of the \(\circ\)-operator:
<table class="sputtable">
<tbody>
<tr>
<th>\(\circ\)<&#47;th>
<th>0<&#47;th>
<th>1<&#47;th>
<th>2<&#47;th>
<th>3<&#47;th>
<th>4<&#47;th>
<th>5<&#47;th>
<th>6<&#47;th>
<th>7<&#47;th>
<th>8<&#47;th>
<th>9<&#47;th>
<th>10<&#47;th>
<th>\(\cdots\)<&#47;th>
<&#47;tr>
<tr>
<th>0<&#47;th>
<td>0<&#47;td>
<td>1<&#47;td>
<td>2<&#47;td>
<td>3<&#47;td>
<td>4<&#47;td>
<td>5<&#47;td>
<td>6<&#47;td>
<td>7<&#47;td>
<td>8<&#47;td>
<td>9<&#47;td>
<td>10<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>1<&#47;th>
<td>1<&#47;td>
<td>0<&#47;td>
<td>3<&#47;td>
<td>2<&#47;td>
<td>5<&#47;td>
<td>4<&#47;td>
<td>7<&#47;td>
<td>6<&#47;td>
<td>9<&#47;td>
<td>8<&#47;td>
<td>11<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>2<&#47;th>
<td>2<&#47;td>
<td>3<&#47;td>
<td>0<&#47;td>
<td>1<&#47;td>
<td>6<&#47;td>
<td>7<&#47;td>
<td>4<&#47;td>
<td>5<&#47;td>
<td>10<&#47;td>
<td>11<&#47;td>
<td>8<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>3<&#47;th>
<td>3<&#47;td>
<td>2<&#47;td>
<td>1<&#47;td>
<td>0<&#47;td>
<td>7<&#47;td>
<td>6<&#47;td>
<td>5<&#47;td>
<td>4<&#47;td>
<td>11<&#47;td>
<td>10<&#47;td>
<td>9<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>4<&#47;th>
<td>4<&#47;td>
<td>5<&#47;td>
<td>6<&#47;td>
<td>7<&#47;td>
<td>0<&#47;td>
<td>1<&#47;td>
<td>2<&#47;td>
<td>3<&#47;td>
<td>12<&#47;td>
<td>13<&#47;td>
<td>14<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>5<&#47;th>
<td>5<&#47;td>
<td>4<&#47;td>
<td>7<&#47;td>
<td>6<&#47;td>
<td>1<&#47;td>
<td>0<&#47;td>
<td>3<&#47;td>
<td>2<&#47;td>
<td>13<&#47;td>
<td>12<&#47;td>
<td>15<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>6<&#47;th>
<td>6<&#47;td>
<td>7<&#47;td>
<td>4<&#47;td>
<td>5<&#47;td>
<td>2<&#47;td>
<td>3<&#47;td>
<td>0<&#47;td>
<td>1<&#47;td>
<td>14<&#47;td>
<td>15<&#47;td>
<td>12<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>7<&#47;th>
<td>7<&#47;td>
<td>6<&#47;td>
<td>5<&#47;td>
<td>4<&#47;td>
<td>3<&#47;td>
<td>2<&#47;td>
<td>1<&#47;td>
<td>0<&#47;td>
<td>15<&#47;td>
<td>14<&#47;td>
<td>13<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>8<&#47;th>
<td>8<&#47;td>
<td>9<&#47;td>
<td>10<&#47;td>
<td>11<&#47;td>
<td>12<&#47;td>
<td>13<&#47;td>
<td>14<&#47;td>
<td>15<&#47;td>
<td>0<&#47;td>
<td>1<&#47;td>
<td>2<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>9<&#47;th>
<td>9<&#47;td>
<td>8<&#47;td>
<td>11<&#47;td>
<td>10<&#47;td>
<td>13<&#47;td>
<td>12<&#47;td>
<td>15<&#47;td>
<td>14<&#47;td>
<td>1<&#47;td>
<td>0<&#47;td>
<td>3<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>10<&#47;th>
<td>10<&#47;td>
<td>11<&#47;td>
<td>8<&#47;td>
<td>9<&#47;td>
<td>14<&#47;td>
<td>15<&#47;td>
<td>12<&#47;td>
<td>13<&#47;td>
<td>2<&#47;td>
<td>3<&#47;td>
<td>0<&#47;td>
<td>\(\cdots\)<&#47;td>
<&#47;tr>
<tr>
<th>\(\vdots\)<&#47;th>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\vdots\)<&#47;td>
<td>\(\ddots\)<&#47;td>
<&#47;tr>
<&#47;tbody>
<&#47;table>
This looks suspiciously like the binary <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Exclusive_or">exclusive-or (XOR)<&#47;a> operator \(\oplus\). And indeed it is, as shown by the following theorem (the theorem is slightly more general than needed, but it is actually a bit more concise this way).

<strong>Theorem 8<&#47;strong> (The Sprague&ndash;Grundy Theorem)<strong>.<&#47;strong> Let \(x = \mbox{mex}(S)\) and \(y = \mbox{mex}(T)\). Then
\[x \oplus y = \mbox{mex} \left( (S \oplus y) \cup (x \oplus T) \right),\]
where \(S \oplus y = \{ x \oplus y \mid x \in S \}\) and \(x \oplus T = \{ x \oplus y \mid y \in T \}\).

<div class="sputproof">
<em>Proof.<&#47;em> We need to show two things: (a) \(x \oplus y \notin (S \oplus y) \cup (x \oplus T)\) and (b) \(k \in (S \oplus y) \cup (x \oplus T)\) for all \(0 \leq k < x \oplus y\).
To show (a) we assume \(x \oplus y = s \oplus y\) for some \(s \in S\). But this implies \(s = x\) and \(x \notin S\) by the definition of \(\mbox{mex}\). Similarly \(x \oplus y \in x \oplus T\) is impossible. So \(x \oplus y \notin (S \oplus y) \cup (x \oplus T)\).
To show (b) we choose a \(k\) such that \(0 \leq k < x \oplus y\). We now set \(x \oplus y = (\alpha 1 \alpha')_2\) and \(k = (\alpha 0 \alpha'')_2\) where \(\alpha\), \(\alpha'\), and \(\alpha''\) are binary strings and \(|\alpha'| = |\alpha''|\). Let now \(x = (\beta 1 \beta')_2\) and \(y = (\gamma 0 \gamma')_2\) where \(|\beta| = |\gamma| = |\alpha|\) (the (\(|\alpha|+1\))th bits of \(x\) and \(y\) must be different and we assume, without loss of generality, that \(x\) has a \(1\)). Note how we have \(\beta \oplus \gamma = \alpha\) and therefore \(k \oplus y = (\beta 0 \beta'')_2 < x\) and thus \(k \oplus y \in S\). We now see that \(k = (k \oplus y) \oplus y \in S \oplus y\).&nbsp;&nbsp;&nbsp;&nbsp;∎
<&#47;div>

From this theorem we see that if \(S = \{ 0, 1, \ldots, x-1 \}\) and \(T = \{ 0, 1, \ldots, y-1 \}\) we have the desired equality. We now have
\[E(\star p_1 + \star p_2 + \cdots + \star p_n) = p_1 \oplus p_2 \oplus \cdots \oplus p_n,\]
and thus
\[G = \star p_1 + \star p_2 + \cdots + \star p_n \in {\cal S}_P \quad \Leftrightarrow \quad p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0.\]
Recalling the definitions of \({\cal S}_P\) and \({\cal S}_N\) we now have the ultimate strategy for Nim:
<ul>
	<li>Given a position \(G = \star p_1 + \star p_2 + \cdots + \star p_n\) with \(p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0\) (\(G \in {\cal S}_N\)) it is possible to choose a move \(G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G\) such that \(p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n = 0\) (\(G' \in {\cal S}_P\)).<&#47;li>
	<li>Given a position \(G = \star p_1 + \star p_2 + \cdots + \star p_n\) with \(p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0\) (\(G \in {\cal S}_P\)), any move will lead to a position \(G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G\) for which \(p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n \neq 0\) (\(G' \in {\cal S}_N\)).<&#47;li>
<&#47;ul>
In other words, if a game has \(p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0\) then the player to move is guaranteed to win&mdash;provided a perfect play on his&#47;her part. On the other hand, if \(p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0\) then the player to move can only hope that the other player makes a mistake.

<h3>Finishing Remarks<&#47;h3>
According to Fascicle 1 of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume 4, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>, the binary operator XOR, \(\oplus\), was known long before operators such as binary <em>AND<&#47;em> and binary <em>OR<&#47;em>, because it is so intimately tied to the Nim game. For the same reason, the XOR operator has often been called the "nim sum".
<div style="float:right"><a href="&#47;book&#47;link.php?id=numbers-games"><img src="&#47;book&#47;numbers-games.jpg" &#47;><&#47;a><&#47;div>
Note how the definition of the \(\star n\)-games resembles one of the standard ways to construct the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Natural_number">natural numbers<&#47;a>. Other than its obvious relation to the Nim-game, this is perhaps one of the reasons that \(\star n\)-games are sometimes called <em>nimbers<&#47;em>. Generalized numbers and games are the subject of the book <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;On_Numbers_and_Games">On Numbers and Games<&#47;a> by <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;John_Horton_Conway">John H. Conway<&#47;a>.

<a href="http:&#47;&#47;www.wikipedia.org">Wikipedia<&#47;a> has some relevant pages in relation to this article, see <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Impartial_game">impartial game<&#47;a>, <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Combinatorial_game_theory">combinatorial game theory<&#47;a>, and <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Sprague&ndash;Grundy_theorem">Sprague&ndash;Grundy Theorem<&#47;a>. See also the blog entry on <a href="http:&#47;&#47;blog.plover.com&#47;math&#47;sprague-grundy.html">The Universe of Discourse<&#47;a>.

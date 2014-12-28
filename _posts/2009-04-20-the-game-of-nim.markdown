---
layout: post
title: The Game of Nim
author: Jan Marthedal Rasmussen
excerpt: ! "I have known the game of Nim for many years. Once, a friend of mine beat me repeatedly in one game
  after another and I had no idea how he did it. Looking back, I am not sure he knew
  the perfect Nim-strategy, but he knew enough to frustrate me immensely. A year ago
  or so, I was flicking through Fascicle 1 of The
  Art of Computer Programming, Volume 4 by Donald
  E. Knuth, and I read about the strategy of Nim. The strategy is <em>very</em>
  simple but I could not possibly understand <em>why</em> it worked. This
  article shows why the strategy works, introducing the necessary game theory along
  the way."
date: 2009-04-20 14:02:36.000000000 +02:00
categories:
- mathematics
tags:
- combinatorial game
- impartial game
- Nim
- Sprague-Grundy
- game theory
---
### Introduction

<div style="float:right"><a href="{% amazon taocp4f1 %}"><img src="{% bookcover taocp4f1 %}" /></a></div>
I have known the game of Nim for many years. Once, a friend of mine beat me repeatedly in one game after another and I had no idea how he did it. Looking back, I am not sure he knew the perfect Nim-strategy, but he knew enough to frustrate me immensely. A year ago or so, I was flicking through Fascicle 1 of <a href="http://www-cs-faculty.stanford.edu/~uno/taocp.html">The Art of Computer Programming</a>, Volume 4 by <a href="http://www-cs-faculty.stanford.edu/~uno/">Donald E. Knuth</a>, and I read about the strategy of Nim. The strategy is *very* simple but I could not possibly understand *why* it worked.

This article shows why the strategy works, introducing the necessary game theory along the way.<span></span>

### Nim

Nim is played by two players who take turns moving. The initial game position for Nim consists of a number of piles, each containing any number of sticks. A player moves by removing any positive number of sticks from a single pile, possibly emptying the pile. The first player to face an empty position, consisting of no sticks at all, loses. An example of a game of Nim, starting with three piles with 2, 3, and 4 sticks, can be seen in Figure 1.

<figure>
  <img title="Figure 1" src="/media/game234.svg" alt="Figure 1" class="img-responsive">
  <figcaption><strong>Figure 1.</strong> A possible gameplay in Nim.</figcaption>
</figure>

Nim is an important special case of impartial games.

### Impartial Games

A combinatorial game is a game for two players where both players have perfect information, that is, everything about the game is visible at all times, and where no part of the game is left to chance. An impartial game is a combinatorial game with further restrictions:

<ul>
<li>Two players who take turns at moving.</li>
<li>The legal moves depend only on the position and not which player it is to move.</li>
<li>A player unable to move loses.</li>
<li>Any game will come to an end, that is, no sequence of moves are possible for which the game will continue forever.</li>
</ul>
<p>Let an impartial game be identified by *the set of all the (sub)games that every legal move can lead to*. Note the recursive nature of this definition. The terminal game, where no legal move can be made, is thus the empty set, {% imath \{\} %}. As an aside, note how any (finite) set of sets is a game.</p>
<p>In Nim, we represent a game consisting of a single pile of {% imath n %} sticks by {% imath \star n %}. The set representation of this trivial, but important type of game is</p>
<ul>
<li>{% imath \star 0 = \{\} %}.</li>
<li>{% imath \star n = \{ \star (n-1), \star (n-2), \ldots, \star 0 \} %}.</li>
</ul>

For instance, {% imath \star 1 = \{\{\}\} %}, {% imath \star 2 = \{\{\},\{\{\}\}\} %}, and {% imath \star 3 = \{\{\},\{\{\}\},\{\{\},\{\{\}\}\}\} %}. A graph representation of all possible game positions in a Nim game starting with the position {% imath \star 4 %} can be seen in Figure 2.

<figure>
  <img class="img-responsive" title="Figure 2" src="/media/graph4.svg" alt="Figure 2">
  <figcaption><strong>Figure 2.</strong> Graph representation of the Nim game</figcaption>
</figure>
  
We can also construct a new game by adding two games. Given two games {% imath G %} and {% imath H %} the notation {% imath G + H %} means that a move can be chosen from either {% imath G %} or {% imath H %}. If, e.g., a move is made in {% imath G %} that leads to the game {% imath g \in G %}, the game for the added game becomes {% imath g + H %}. In general we have

{% dmath G + H = \{ G + h \mid h \in H \} \cup \{ g + H \mid g \in G \} %}

We see that {% imath G + \{\} = \{\} + G = G %}, as it should be. These special cases, and the fact that set union is commutative, makes position adding commutative too. Likewise, since union is associative and {% imath G + (\{\} + H) = (G + \{\}) + H %} and {% imath G + (H + \{\}) = (G + H) + \{\} %}, we also have associativity for game adding.

Recall the initial Nim game in Figure 1 with three piles of 2, 3, and 4 sticks, respectively. We can now write that position as {% imath \star 2 + \star 3 + \star 4 %}. It is possible to write out its set representation but it is <a href="/media/set234.txt">quite large</a>.

### Properties of Impartial Games

Given an impartial game, let {% imath \cal S %} be the set of all possible game positions. We now  introduce two subsets of {% imath \cal S %} in the following way:

*   {% imath {\cal S}_P %} consists of the terminal position {% imath \{\} %}, from where no legal move can be made, and every position for which *every* move will lead to a position in {% imath {\cal S}_N %} ({% imath \{G_1,\ldots,G_n\} \in {\cal S}_P \Leftrightarrow \forall k: G_k \in {\cal S}_N %}).
*   {% imath {\cal S}_N %} consists of every position for which *at least one* move will lead to a position in {% imath {\cal S}_P %} ({% imath \{G_1,\ldots,G_n\} \in {\cal S}_N \Leftrightarrow \exists k: G_k \in {\cal S}_P %}).

Consider a graph in which every game position is a node and where there is an arc (directed edge) from position {% imath G %} to position {% imath g %} if and only if {% imath g \in G %}. Since any game will terminate, this graph contains no cycles and is thus a <a href="http://en.wikipedia.org/wiki/Directed_acyclic_graph">Directed Acyclic Graph (DAG)</a>. This makes it possible to <a href="http://en.wikipedia.org/wiki/Topological_sorting">topologically sort</a> the nodes/positions, starting from the terminal position and working backwards through every possible position, placing each position in {% imath {\cal S}_P %} or {% imath {\cal S}_N %} in the process. We have, in this way, divided {% imath {\cal S} %} into two disjoint subsets.

Such a <a href="/media/graph234.svg">graph</a> for the game {% imath \star 2 + \star 3 + \star 4 %} would consists of 27 vertices and 114 arcs. Only 4 of the vertices represent games/positions in {% imath {\cal S}_P %}.

From the definitions of {% imath {\cal S}_P %} and {% imath {\cal S}_N %} we have something essential. Given a position in {% imath {\cal S}_N %}, the **n**ext player to move will always win, assuming a perfect play on his/her part. Similarly, given a position in {% imath {\cal S}_P %}, the **p**revious player will always win, again assuming a perfect play.

We now move on to different facts about impartial games. Some of them are interesting and useful in themselves, others simply stepping stones towards showing the central theorem, the Sprague–Grundy Theorem.

**Theorem 1.** {% imath G + G \in {\cal S}_P %} for any game {% imath G %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf1');">*Proof*</button>
<div class="proof" id="prf1" style="display: none;">
We use structural induction (we consider a topologically sorted graph of a game from the terminal game and backwards). For {% imath G = \{\} %} the statement is trivially true. Now assume that {% imath G = \{ G_1, G_2, \ldots, G_n \} %} where {% imath G_k + G_k \in {\cal S}_P %} for {% imath k = 1, 2, \ldots, n %}. If, in the position {% imath G + G %}, the player to move chooses the position {% imath G_j + G %}, the other player can make the same move in the &#8220;other part&#8221;, leading to {% imath G_j + G_j %}, which was assumed to lie in {% imath {\cal S}_P %}. This shows that {% imath G_j + G \in {\cal S}_N %} and since {% imath j %} was chosen arbitrarily {% imath G + G \in {\cal S}_P %}.
</div>

Next is the very important concept of *equivalence* between games.

**Definition 2.** The games {% imath G %} and {% imath H %} are *equivalent*, written {% imath G \sim H %}, if and only if {% imath G + X \in {\cal S}_P \Leftrightarrow H + X \in {\cal S}_P %} for all games {% imath X %}.

It is clear that {% imath \sim %} is an equivalence relation (it is reflexive, {% imath G \sim G %}, symmetric, {% imath G \sim H %} if and only if {% imath H \sim G %}, and transitive, {% imath G \sim F %} and {% imath F \sim H %} implies {% imath G \sim H %}).

**Theorem 3.** For all {% imath G, H \in {\cal S}_P %} we have {% imath G + H \in {\cal S}_P %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf3');">*Proof*</button>
<div class="proof" id="prf3" style="display: none;">
Again, we use structural induction. If {% imath G = \{\} %} the result follows easily. Now assume that {% imath G'' + H \in {\cal S}_P %} for all {% imath G'' \in {\cal S}_P %} where {% imath G'' \in G' %} and {% imath G' \in G %}. If a move is made from {% imath G + H %} to {% imath G' + H %}, where {% imath G' \in G %}, we can go to a position {% imath G'' + H %} where {% imath G'' \in G' %} and {% imath G'' \in {\cal S}_P %}. This last position lies in {% imath {\cal S}_P %} by assumption and then {% imath G + H \in {\cal S}_P %} does too. By symmetry the same arguments can be used if a move is made in the {% imath H %} part.
</div>

The following important theorem shows that any game in {% imath {\cal S}_P %} is equivalent to the terminal game.

**Theorem 4.** {% imath G \sim \{\} %} for all {% imath G \in {\cal S}_P %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf4');">*Proof*</button>
<div class="proof" id="prf4" style="display: none;">
We need to show {% imath G + X \in {\cal S}_P \Leftrightarrow X \in {\cal S}_P %} for all games {% imath X %}. First we show {% imath X \in {\cal S}_P \Rightarrow G + X \in {\cal S}_P %} so let {% imath X \in {\cal S}_P %} and consider the position {% imath G + X %}. But that {% imath G + X \in {\cal S}_P %} follows immediately from Theorem 3.

Next we show {% imath G + X \in {\cal S}_P \Rightarrow X \in {\cal S}_P %} which is equivalent to {% imath X \in {\cal S}_N \Rightarrow G + X \in {\cal S}_N %}. So let {% imath X \in {\cal S}_N %} and consider the position {% imath G + X %}. We can now make a move to {% imath G + X' %} where {% imath X' \in X %} and {% imath X' \in {\cal S}_P %}. From Theorem 3 follows that {% imath G + X' \in {\cal S}_P %} and thus {% imath G + X \in {\cal S}_N %}.
</div>

The next theorem shows that we can add and &#8220;subtract&#8221; on both sides of a {% imath \sim %}.

**Theorem 5.** {% imath G \sim H \Leftrightarrow F + G \sim F + H %} for all games {% imath F, G, H %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf5');">*Proof*</button>
<div class="proof" id="prf5" style="display: none;">
Let {% imath G \sim H %}, meaning {% imath G + X \in {\cal S}_P \Leftrightarrow H + X \in {\cal S}_P %} for all games {% imath X %}. Now assume {% imath F + G + Y \in {\cal S}_P %} for some {% imath Y \in \cal S %} and by setting {% imath X = F + Y %} we have {% imath H + X = H + F + Y \in \cal S %}, showing that {% imath F + G + Y \in {\cal S}_P \Rightarrow F + H + Y \in {\cal S}_P %} for all {% imath Y \in \cal S %}. Analogously we can show the same statement with {% imath G %} and {% imath H %} interchanged. Hence, {% imath F + G \sim F + H %}. Now assume {% imath F + G \sim F + H %}. We then have {% imath G = G + \{\} \sim G + (F + F) = (G + F) + F \sim (H + F) + F = H + (F + F) \sim H + \{\} = H %}.
</div>

Finally a theorem essential for the next section.

**Theorem 6.** {% imath G \sim H \Leftrightarrow G + H \in {\cal S}_P %} for all games {% imath G %} and {% imath H %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf6');">*Proof*</button>
<div class="proof" id="prf6" style="display: none;">
{% imath G \sim H \Leftrightarrow G + H \sim H + H \sim \{\} \Leftrightarrow G + H \in {\cal S}_P %}.
</div>

### Characterizing Winning Positions

The goal is now to characterize {% imath {\cal S}_P %} or, equivalently, the games {% imath G %} for which {% imath G \sim \{\} %} (see Theorem 4). If a player always chooses a move that leads to a position {% imath G \in {\cal S}_P %}, then that player is going to win.

We do this by constructing a function {% imath E: {\cal S} \rightarrow \{0, 1, 2, \ldots \} %} such that

{% dmath G \sim \star E(G) %}

for all games {% imath G %}. This will identify {% imath {\cal S}_P %} since we will have {% imath G \sim \{\} \Leftrightarrow E(G) = 0 %}.

Naturally we have {% imath E(\{\}) = 0 %}. Let us now define {% imath E(G) %} using an inductive approach. Since {% imath G = \{\} %} is already taken care of, we let {% imath G=\{G_1, G_2, \ldots, G_n\} %} and assume that the values {% imath p_j=E(G_j) %} are known. Using Theorem 8 this means that {% imath G_j + \star p_j \in {\cal S}_P %} for all {% imath j %}. We now wish to find {% imath k %} such that {% imath G + \star k \in {\cal S}_P %}.

We can get an idea of what we need from {% imath E %} if we let {% imath k %} be fixed and then consider the four possible classes of moves from the position {% imath G + \star k %}:

*   {% imath G_j + \star k \sim \star p_j + \star k %} with {% imath k > p_j %}. We could now move to {% imath \star p_j + \star p_j \in {\cal S}_P %}, implying {% imath G_j + \star k \in {\cal S}_N %}.
*   {% imath G_j + \star k \sim \star p_j + \star k %} with {% imath k < p_j %}. We could now move to {% imath \star k + \star k \in {\cal S}_P %}, implying {% imath G_j + \star k \in {\cal S}_N %}.
*   {% imath G_j + \star k %} with {% imath k = p_j %}. We would like to avoid this situation since then {% imath G_j + \star k \in {\cal S}_P %}, implying {% imath G + \star k \in {\cal S}_N %}.
*   {% imath G + \star k' %} where {% imath k' < k %}. We would now like to choose a position {% imath G_j %} for which {% imath E(G_j) = k' %} since then {% imath G_j + \star k' \in {\cal S}_P %}, implying {% imath G + \star k \in {\cal S}_P %}.

If these points are fulfilled then, since {% imath G_j %} and {% imath k' %} could be chosen arbitrarily, we have covered all possible moves. We would then have {% imath G + \star k \in {\cal S}_P %}.

These points actually give away the solution:

**Theorem 7** (The Sprague–Grundy Theorem)**.** For any impartial game {% imath G %} we have {% imath G \sim \star E(G) %} with

{% dmath E(G) = \mbox{mex}(\{ E(G') \mid G' \in G \}), %}

where {% imath \mbox{mex}(S) = \min\{k \mid k \geq 0 \mbox{ and } k \notin S \} %} is the &#8220;minimal excludant&#8221; of {% imath S %}.

### Winning Nim

Let us now apply the theory to Nim. Since every game of Nim has the form

{% dmath G = \star p_1 + \star p_2 + \cdots + \star p_n, \quad p_j \geq 0, %}

and since

{% dmath E(G + H) = E(\star E(G) + \star E(H)) %}

for all games {% imath G %} and {% imath H %}, we have

{% dmath E(G) = E(\star p_1 + \star E(\star p_2 + \cdots + \star E(\star p_{n-1} + \star p_n) \cdots )). %}

This means that if we know the value of {% imath E(\star x + \star y) %} for all {% imath x, y \geq 0 %}, then we can compute {% imath E(G) %} of every Nim-game {% imath G %}. Let us introduce the notation {% imath x \circ y = E(\star x + \star y) %}. Using the Sprague–Grundy Theorem we have

{% dmath x \circ y = \mbox{mex}(\{ x \circ (y-1), \ldots, x \circ 1, x \circ 0 \} \cup \{ (x-1) \circ y, \ldots, 1 \circ y, \ldots, 0 \circ y \}). %}

This makes it possible to tabulate the values of the {% imath \circ %}-operator:

<table class="table table-striped table-bordered">
<tbody>
<tr>
<th>{% imath \circ %}</th>
<th>0</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>9</th>
<th>10</th>
<th>{% imath \cdots %}</th>
</tr>
<tr>
<th>0</th>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>8</td>
<td>9</td>
<td>10</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>1</th>
<td>1</td>
<td>0</td>
<td>3</td>
<td>2</td>
<td>5</td>
<td>4</td>
<td>7</td>
<td>6</td>
<td>9</td>
<td>8</td>
<td>11</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>2</th>
<td>2</td>
<td>3</td>
<td>0</td>
<td>1</td>
<td>6</td>
<td>7</td>
<td>4</td>
<td>5</td>
<td>10</td>
<td>11</td>
<td>8</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>3</th>
<td>3</td>
<td>2</td>
<td>1</td>
<td>0</td>
<td>7</td>
<td>6</td>
<td>5</td>
<td>4</td>
<td>11</td>
<td>10</td>
<td>9</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>4</th>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>12</td>
<td>13</td>
<td>14</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>5</th>
<td>5</td>
<td>4</td>
<td>7</td>
<td>6</td>
<td>1</td>
<td>0</td>
<td>3</td>
<td>2</td>
<td>13</td>
<td>12</td>
<td>15</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>6</th>
<td>6</td>
<td>7</td>
<td>4</td>
<td>5</td>
<td>2</td>
<td>3</td>
<td>0</td>
<td>1</td>
<td>14</td>
<td>15</td>
<td>12</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>7</th>
<td>7</td>
<td>6</td>
<td>5</td>
<td>4</td>
<td>3</td>
<td>2</td>
<td>1</td>
<td>0</td>
<td>15</td>
<td>14</td>
<td>13</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>8</th>
<td>8</td>
<td>9</td>
<td>10</td>
<td>11</td>
<td>12</td>
<td>13</td>
<td>14</td>
<td>15</td>
<td>0</td>
<td>1</td>
<td>2</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>9</th>
<td>9</td>
<td>8</td>
<td>11</td>
<td>10</td>
<td>13</td>
<td>12</td>
<td>15</td>
<td>14</td>
<td>1</td>
<td>0</td>
<td>3</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>10</th>
<td>10</td>
<td>11</td>
<td>8</td>
<td>9</td>
<td>14</td>
<td>15</td>
<td>12</td>
<td>13</td>
<td>2</td>
<td>3</td>
<td>0</td>
<td>{% imath \cdots %}</td>
</tr>
<tr>
<th>{% imath \vdots %}</th>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \vdots %}</td>
<td>{% imath \ddots %}</td>
</tr>
</tbody>
</table>

This looks suspiciously like the binary <a href="http://en.wikipedia.org/wiki/Exclusive_or">exclusive-or (XOR)</a> operator {% imath \oplus %}. And indeed it is, as shown by the following theorem (the theorem is slightly more general than needed, but it is actually a bit more concise this way).

**Theorem 8** (The Sprague–Grundy Theorem)**.** Let {% imath x = \mbox{mex}(S) %} and {% imath y = \mbox{mex}(T) %}. Then

{% dmath x \oplus y = \mbox{mex} \left( (S \oplus y) \cup (x \oplus T) \right), %}

where {% imath S \oplus y = \{ x \oplus y \mid x \in S \} %} and {% imath x \oplus T = \{ x \oplus y \mid y \in T \} %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf8');">*Proof*</button>
<div class="proof" id="prf8" style="display: none;">
We need to show two things: (a) {% imath x \oplus y \not\in (S \oplus y) \cup (x \oplus T) %} and (b) {% imath k \in (S \oplus y) \cup (x \oplus T) %} for all {% imath 0 \leq k < x \oplus y %}.

To show (a) we assume {% imath x \oplus y = s \oplus y %} for some {% imath s \in S %}. But this implies {% imath s = x %} and {% imath x \not\in S %} by the definition of {% imath \mbox{mex} %}. Similarly {% imath x \oplus y \in x \oplus T %} is impossible. So {% imath x \oplus y \not\in (S \oplus y) \cup (x \oplus T) %}.

To show (b) we choose a {% imath k %} such that {% imath 0 \leq k < x \oplus y %}. We now set {% imath x \oplus y = (\alpha 1 \alpha')_2 %} and {% imath k = (\alpha 0 \alpha'')_2 %} where {% imath \alpha %}, {% imath \alpha' %}, and {% imath \alpha'' %} are binary strings and {% imath |\alpha'| = |\alpha''| %}. Let now {% imath x = (\beta 1 \beta')_2 %} and {% imath y = (\gamma 0 \gamma')_2 %} where {% imath |\beta| = |\gamma| = |\alpha| %} (the ({% imath |\alpha|+1 %})th bits of {% imath x %} and {% imath y %} must be different and we assume, without loss of generality, that {% imath x %} has a {% imath 1 %}). Note how we have {% imath \beta \oplus \gamma = \alpha %} and therefore {% imath k \oplus y = (\beta 0 \beta'')_2 < x %} and thus {% imath k \oplus y \in S %}. We now see that {% imath k = (k \oplus y) \oplus y \in S \oplus y %}.
</div>

From this theorem we see that if {% imath S = \{ 0, 1, \ldots, x-1 \} %} and {% imath T = \{ 0, 1, \ldots, y-1 \} %} we have the desired equality. We now have

{% dmath E(\star p_1 + \star p_2 + \cdots + \star p_n) = p_1 \oplus p_2 \oplus \cdots \oplus p_n, %}

and thus

{% dmath G = \star p_1 + \star p_2 + \cdots + \star p_n \in {\cal S}_P \quad \Leftrightarrow \quad p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0. %}

Recalling the definitions of {% imath {\cal S}_P %} and {% imath {\cal S}_N %} we now have the ultimate strategy for Nim:

*   Given a position {% imath G = \star p_1 + \star p_2 + \cdots + \star p_n %} with {% imath p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0 %} ({% imath G \in {\cal S}_N %}) it is possible to choose a move {% imath G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G %} such that {% imath p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n = 0 %} ({% imath G' \in {\cal S}_P %}).
*   Given a position {% imath G = \star p_1 + \star p_2 + \cdots + \star p_n %} with {% imath p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0 %} ({% imath G \in {\cal S}_P %}), any move will lead to a position {% imath G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G %} for which {% imath p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n \neq 0 %} ({% imath G' \in {\cal S}_N %}).

In other words, if a game has {% imath p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0 %} then the player to move is guaranteed to win—provided a perfect play on his/her part. On the other hand, if {% imath p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0 %} then the player to move can only hope that the other player makes a mistake.

### Finishing Remarks

According to Fascicle 1 of <a href="http://www-cs-faculty.stanford.edu/~uno/taocp.html">The Art of Computer Programming</a>, Volume 4, by <a href="http://www-cs-faculty.stanford.edu/~uno/">Donald E. Knuth</a>, the binary operator XOR, {% imath \oplus %}, was known long before operators such as binary *AND* and binary *OR*, because it is so intimately tied to the Nim game. For the same reason, the XOR operator has often been called the &#8220;nim sum&#8221;.

<div style="float:right"><a href="{% amazon numbers-games %}"><img src="{% bookcover numbers-games %}" /></a></div>
Note how the definition of the {% imath \star n %}-games resembles one of the standard ways to construct the <a href="http://en.wikipedia.org/wiki/Natural_number">natural numbers</a>. Other than its obvious relation to the Nim-game, this is perhaps one of the reasons that {% imath \star n %}-games are sometimes called *nimbers*. Generalized numbers and games are the subject of the book <a href="http://en.wikipedia.org/wiki/On_Numbers_and_Games">On Numbers and Games</a> by <a href="http://en.wikipedia.org/wiki/John_Horton_Conway">John H. Conway</a>.

<a href="http://www.wikipedia.org">Wikipedia</a> has some relevant pages in relation to this article, see <a href="http://en.wikipedia.org/wiki/Impartial_game">impartial game</a>, <a href="http://en.wikipedia.org/wiki/Combinatorial_game_theory">combinatorial game theory</a>, and <a href="http://en.wikipedia.org/wiki/Sprague–Grundy_theorem">Sprague–Grundy Theorem</a>. See also the blog entry on <a href="http://blog.plover.com/math/sprague-grundy.html">The Universe of Discourse</a>.

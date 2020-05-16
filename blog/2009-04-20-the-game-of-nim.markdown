---
title: The Game of Nim
date: '2009-04-20'
layout: layouts/post.njk
tags:
  - combinatorial-game
  - game-theory
categories:
  - mathematics
excerpt: >-
  I have known the game of Nim for many years. Once, a friend of mine beat me
  repeatedly in one game after another and I had no idea how he did it. Looking
  back, I am not sure he knew the perfect Nim-strategy, but he knew enough to
  frustrate me immensely. A year ago or so, I was flicking through Fascicle 1 of
  The Art of Computer Programming, Volume 4 by Donald E. Knuth, and I read about
  the strategy of Nim. The strategy is very simple but I could not possibly
  understand why it worked. This article shows why the strategy works,
  introducing the necessary game theory along the way. [...]
---
### Introduction

<div style="float:right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0321580508"><img src="/media/books/taocp4f1.jpg" alt=""></a></div>

I have known the game of Nim for many years. Once, a friend of mine beat me repeatedly in one game after another and I had no idea how he did it. Looking back, I am not sure he knew the perfect Nim-strategy, but he knew enough to frustrate me immensely. A year ago or so, I was flicking through Fascicle 1 of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume 4 by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/), and I read about the strategy of Nim. The strategy is *very* simple but I could not possibly understand *why* it worked.

This article shows why the strategy works, introducing the necessary game theory along the way.

### Nim

Nim is played by two players who take turns moving. The initial game position for Nim consists of a number of piles, each containing any number of sticks. A player moves by removing any positive number of sticks from a single pile, possibly emptying the pile. The first player to face an empty position, consisting of no sticks at all, loses. An example of a game of Nim, starting with three piles with 2, 3, and 4 sticks, can be seen in Figure 1.

<figure>
  <img title="Figure 1" src="/media/game234.svg" alt="Figure 1" class="img-responsive">
  <figcaption><strong>Figure 1.</strong> A possible gameplay in Nim.</figcaption>
</figure>

Nim is an important special case of impartial games.

### Impartial Games

A combinatorial game is a game for two players where both players have perfect information, that is, everything about the game is visible at all times, and where no part of the game is left to chance. An impartial game is a combinatorial game with further restrictions:

* Two players who take turns at moving.
* The legal moves depend only on the position and not which player it is to move.
* A player unable to move loses.
* Any game will come to an end, that is, no sequence of moves are possible for which the game will continue forever.

Let an impartial game be identified by *the set of all the (sub)games that every legal move can lead to*. Note the recursive nature of this definition. The terminal game, where no legal move can be made, is thus the empty set, $\{\}$. As an aside, note how any (finite) set of sets is a game.

In Nim, we represent a game consisting of a single pile of $n$ sticks by $\star n$. The set representation of this trivial, but important type of game is

* $\star 0 = \{\}$.
* $\star n = \{ \star (n-1), \star (n-2), \ldots, \star 0 \}$.

For instance, $\star 1 = \{\{\}\}$, $\star 2 = \{\{\},\{\{\}\}\}$, and $\star 3 = \{\{\},\{\{\}\},\{\{\},\{\{\}\}\}\}$. A graph representation of all possible game positions in a Nim game starting with the position $\star 4$ can be seen in Figure 2.

<figure>
  <img class="img-responsive" title="Figure 2" src="/media/graph4.svg" alt="Figure 2">
  <figcaption><strong>Figure 2.</strong> Graph representation of the Nim game</figcaption>
</figure>

We can also construct a new game by adding two games. Given two games $G$ and $H$ the notation $G + H$ means that a move can be chosen from either $G$ or $H$. If, e.g., a move is made in $G$ that leads to the game $g \in G$, the game for the added game becomes $g + H$. In general we have

$$
G + H = \{ G + h \mid h \in H \} \cup \{ g + H \mid g \in G \}
$$

We see that $G + \{\} = \{\} + G = G$, as it should be. These special cases, and the fact that set union is commutative, makes position adding commutative too. Likewise, since union is associative and $G + (\{\} + H) = (G + \{\}) + H$ and $G + (H + \{\}) = (G + H) + \{\}$, we also have associativity for game adding.

Recall the initial Nim game in Figure 1 with three piles of 2, 3, and 4 sticks, respectively. We can now write that position as $\star 2 + \star 3 + \star 4$. It is possible to write out its set representation but it is [quite large](/media/set234.txt).

### Properties of Impartial Games

Given an impartial game, let $\mathcal{S}$ be the set of all possible game positions. We now  introduce two subsets of $\mathcal{S}$ in the following way:

*   $\mathcal{S}_P$ consists of the terminal position $\{\}$, from where no legal move can be made, and every position for which *every* move will lead to a position in $\mathcal{S}_N$ ($\{G_1,\ldots,G_n\} \in \mathcal{S}_P \Leftrightarrow \forall k: G_k \in \mathcal{S}_N$).
*   $\mathcal{S}_N$ consists of every position for which *at least one* move will lead to a position in $\mathcal{S}_P$ ($\{G_1,\ldots,G_n\} \in \mathcal{S}_N \Leftrightarrow \exists k: G_k \in \mathcal{S}_P$).

Consider a graph in which every game position is a node and where there is an arc (directed edge) from position $G$ to position $g$ if and only if $g \in G$. Since any game will terminate, this graph contains no cycles and is thus a [Directed Acyclic Graph (DAG)](http://en.wikipedia.org/wiki/Directed_acyclic_graph). This makes it possible to [topologically sort](http://en.wikipedia.org/wiki/Topological_sorting) the nodes/positions, starting from the terminal position and working backwards through every possible position, placing each position in $\mathcal{S}_P$ or $\mathcal{S}_N$ in the process. We have, in this way, divided $\mathcal{S}$ into two disjoint subsets.

Such a [graph](/media/graph234.svg) for the game $\star 2 + \star 3 + \star 4$ would consists of 27 vertices and 114 arcs. Only 4 of the vertices represent games/positions in $\mathcal{S}_P$.

From the definitions of $\mathcal{S}_P$ and $\mathcal{S}_N$ we have something essential. Given a position in $\mathcal{S}_N$, the **n**ext player to move will always win, assuming a perfect play on his/her part. Similarly, given a position in $\mathcal{S}_P$, the **p**revious player will always win, again assuming a perfect play.

We now move on to different facts about impartial games. Some of them are interesting and useful in themselves, others simply stepping stones towards showing the central theorem, the Sprague–Grundy Theorem.

**Theorem 1.** $G + G \in \mathcal{S}_P$ for any game $G$.

*Proof*. We use structural induction (we consider a topologically sorted graph of a game from the terminal game and backwards). For $G = \{\}$ the statement is trivially true. Now assume that $G = \{ G_1, G_2, \ldots, G_n \}$ where $G_k + G_k \in \mathcal{S}_P$ for $k = 1, 2, \ldots, n$. If, in the position $G + G$, the player to move chooses the position $G_j + G$, the other player can make the same move in the &#8220;other part&#8221;, leading to $G_j + G_j$, which was assumed to lie in $\mathcal{S}_P$. This shows that $G_j + G \in \mathcal{S}_N$ and since $j$ was chosen arbitrarily $G + G \in \mathcal{S}_P$.&emsp;&#9724;

Next is the very important concept of *equivalence* between games.

**Definition 2.** The games $G$ and $H$ are *equivalent*, written $G \sim H$, if and only if $G + X \in \mathcal{S}_P \Leftrightarrow H + X \in \mathcal{S}_P$ for all games $X$.

It is clear that $\sim$ is an equivalence relation (it is reflexive, $G \sim G$, symmetric, $G \sim H$ if and only if $H \sim G$, and transitive, $G \sim F$ and $F \sim H$ implies $G \sim H$).

**Theorem 3.** For all $G, H \in \mathcal{S}_P$ we have $G + H \in \mathcal{S}_P$.

*Proof*. Again, we use structural induction. If $G = \{\}$ the result follows easily. Now assume that $G'' + H \in \mathcal{S}_P$ for all $G'' \in \mathcal{S}_P$ where $G'' \in G'$ and $G' \in G$. If a move is made from $G + H$ to $G' + H$, where $G' \in G$, we can go to a position $G'' + H$ where $G'' \in G'$ and $G'' \in \mathcal{S}_P$. This last position lies in $\mathcal{S}_P$ by assumption and then $G + H \in \mathcal{S}_P$ does too. By symmetry the same arguments can be used if a move is made in the $H$ part.&emsp;&#9724;

The following important theorem shows that any game in $\mathcal{S}_P$ is equivalent to the terminal game.

**Theorem 4.** $G \sim \{\}$ for all $G \in \mathcal{S}_P$.

*Proof*. We need to show $G + X \in \mathcal{S}_P \Leftrightarrow X \in \mathcal{S}_P$ for all games $X$. First we show $X \in \mathcal{S}_P \Rightarrow G + X \in \mathcal{S}_P$ so let $X \in \mathcal{S}_P$ and consider the position $G + X$. But that $G + X \in \mathcal{S}_P$ follows immediately from Theorem 3.

Next we show $G + X \in \mathcal{S}_P \Rightarrow X \in \mathcal{S}_P$ which is equivalent to $X \in \mathcal{S}_N \Rightarrow G + X \in \mathcal{S}_N$. So let $X \in \mathcal{S}_N$ and consider the position $G + X$. We can now make a move to $G + X'$ where $X' \in X$ and $X' \in \mathcal{S}_P$. From Theorem 3 follows that $G + X' \in \mathcal{S}_P$ and thus $G + X \in \mathcal{S}_N$.&emsp;&#9724;

The next theorem shows that we can add and &#8220;subtract&#8221; on both sides of a $\sim$.

**Theorem 5.** $G \sim H \Leftrightarrow F + G \sim F + H$ for all games $F, G, H$.

*Proof*. Let $G \sim H$, meaning $G + X \in \mathcal{S}_P \Leftrightarrow H + X \in \mathcal{S}_P$ for all games $X$. Now assume $F + G + Y \in \mathcal{S}_P$ for some $Y \in \mathcal{S}$ and by setting $X = F + Y$ we have $H + X = H + F + Y \in \mathcal{S}$, showing that $F + G + Y \in \mathcal{S}_P \Rightarrow F + H + Y \in \mathcal{S}_P$ for all $Y \in \mathcal{S}$. Analogously we can show the same statement with $G$ and $H$ interchanged. Hence, $F + G \sim F + H$. Now assume $F + G \sim F + H$. We then have $G = G + \{\} \sim G + (F + F) = (G + F) + F \sim (H + F) + F = H + (F + F) \sim H + \{\} = H$.&emsp;&#9724;

Finally a theorem essential for the next section.

**Theorem 6.** $G \sim H \Leftrightarrow G + H \in \mathcal{S}_P$ for all games $G$ and $H$.

*Proof*. $G \sim H \Leftrightarrow G + H \sim H + H \sim \{\} \Leftrightarrow G + H \in \mathcal{S}_P$.&emsp;&#9724;

### Characterizing Winning Positions

The goal is now to characterize $\mathcal{S}_P$ or, equivalently, the games $G$ for which $G \sim \{\}$ (see Theorem 4). If a player always chooses a move that leads to a position $G \in \mathcal{S}_P$, then that player is going to win.

We do this by constructing a function $E: \mathcal{S} \rightarrow \{0, 1, 2, \ldots \}$ such that

$$
G \sim \star E(G)
$$

for all games $G$. This will identify $\mathcal{S}_P$ since we will have $G \sim \{\} \Leftrightarrow E(G) = 0$.

Naturally we have $E(\{\}) = 0$. Let us now define $E(G)$ using an inductive approach. Since $G = \{\}$ is already taken care of, we let $G=\{G_1, G_2, \ldots, G_n\}$ and assume that the values $p_j=E(G_j)$ are known. Using Theorem 8 this means that $G_j + \star p_j \in \mathcal{S}_P$ for all $j$. We now wish to find $k$ such that $G + \star k \in \mathcal{S}_P$.

We can get an idea of what we need from $E$ if we let $k$ be fixed and then consider the four possible classes of moves from the position $G + \star k$:

*   $G_j + \star k \sim \star p_j + \star k$ with $k > p_j$. We could now move to $\star p_j + \star p_j \in \mathcal{S}_P$, implying $G_j + \star k \in \mathcal{S}_N$.
*   $G_j + \star k \sim \star p_j + \star k$ with $k < p_j$. We could now move to $\star k + \star k \in \mathcal{S}_P$, implying $G_j + \star k \in \mathcal{S}_N$.
*   $G_j + \star k$ with $k = p_j$. We would like to avoid this situation since then $G_j + \star k \in \mathcal{S}_P$, implying $G + \star k \in \mathcal{S}_N$.
*   $G + \star k'$ where $k' < k$. We would now like to choose a position $G_j$ for which $E(G_j) = k'$ since then $G_j + \star k' \in \mathcal{S}_P$, implying $G + \star k \in \mathcal{S}_P$.

If these points are fulfilled then, since $G_j$ and $k'$ could be chosen arbitrarily, we have covered all possible moves. We would then have $G + \star k \in \mathcal{S}_P$.

These points actually give away the solution:

**Theorem 7** (The Sprague–Grundy Theorem)**.** For any impartial game $G$ we have $G \sim \star E(G)$ with

$$
E(G) = \text{mex}(\{ E(G') \mid G' \in G \}),
$$

where $\text{mex}(S) = \min\{k \mid k \geq 0 \text{ and } k \not\in S \}$ is the &#8220;minimal excludant&#8221; of $S$.

### Winning Nim

Let us now apply the theory to Nim. Since every game of Nim has the form

$$
G = \star p_1 + \star p_2 + \cdots + \star p_n, \quad p_j \geq 0,
$$

and since

$$
E(G + H) = E(\star E(G) + \star E(H))
$$

for all games $G$ and $H$, we have

$$
E(G) = E(\star p_1 + \star E(\star p_2 + \cdots + \star E(\star p_{n-1} + \star p_n) \cdots )).
$$

This means that if we know the value of $E(\star x + \star y)$ for all $x, y \geq 0$, then we can compute $E(G)$ of every Nim-game $G$. Let us introduce the notation $x \circ y = E(\star x + \star y)$. Using the Sprague–Grundy Theorem we have

$$
x \circ y = \text{mex}(\{ x \circ (y-1), \ldots, x \circ 1, x \circ 0 \} \cup \{ (x-1) \circ y, \ldots, 1 \circ y, \ldots, 0 \circ y \}).
$$

This makes it possible to tabulate the values of the $\circ$-operator:

<table>
<tbody>
<tr>
<th>&cir;</th>
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
<th>&#8943;</th>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
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
<td>&#8943;</td>
</tr>
<tr>
<th>&#8942;</th>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8942;</td>
<td>&#8945;</td>
</tr>
</tbody>
</table>

This looks suspiciously like the binary [exclusive-or (XOR)](http://en.wikipedia.org/wiki/Exclusive_or) operator $\oplus$. And indeed it is, as shown by the following theorem (the theorem is slightly more general than needed, but it is actually a bit more concise this way).

**Theorem 8** (The Sprague–Grundy Theorem)**.** Let $x = \text{mex}(S)$ and $y = \text{mex}(T)$. Then

$$
x \oplus y = \text{mex} \left( (S \oplus y) \cup (x \oplus T) \right),
$$

where $S \oplus y = \{ x \oplus y \mid x \in S \}$ and $x \oplus T = \{ x \oplus y \mid y \in T \}$.

*Proof*. We need to show two things: (a) $x \oplus y \not\in (S \oplus y) \cup (x \oplus T)$ and (b) $k \in (S \oplus y) \cup (x \oplus T)$ for all $0 \leq k < x \oplus y$.

To show (a) we assume $x \oplus y = s \oplus y$ for some $s \in S$. But this implies $s = x$ and $x \not\in S$ by the definition of $\text{mex}$. Similarly $x \oplus y \in x \oplus T$ is impossible. So $x \oplus y \not\in (S \oplus y) \cup (x \oplus T)$.

To show (b) we choose a $k$ such that $0 \leq k < x \oplus y$. We now set $x \oplus y = (\alpha 1 \alpha')_2$ and $k = (\alpha 0 \alpha'')_2$ where $\alpha$, $\alpha'$, and $\alpha''$ are binary strings and $|\alpha'| = |\alpha''|$. Let now $x = (\beta 1 \beta')_2$ and $y = (\gamma 0 \gamma')_2$ where $|\beta| = |\gamma| = |\alpha|$ (the ($|\alpha|+1$)th bits of $x$ and $y$ must be different and we assume, without loss of generality, that $x$ has a $1$). Note how we have $\beta \oplus \gamma = \alpha$ and therefore $k \oplus y = (\beta 0 \beta'')_2 < x$ and thus $k \oplus y \in S$. We now see that $k = (k \oplus y) \oplus y \in S \oplus y$.&emsp;&#9724;

From this theorem we see that if $S = \{ 0, 1, \ldots, x-1 \}$ and $T = \{ 0, 1, \ldots, y-1 \}$ we have the desired equality. We now have

$$
E(\star p_1 + \star p_2 + \cdots + \star p_n) = p_1 \oplus p_2 \oplus \cdots \oplus p_n,
$$

and thus

$$
G = \star p_1 + \star p_2 + \cdots + \star p_n \in \mathcal{S}_P \quad \Leftrightarrow \quad p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0.
$$

Recalling the definitions of $\mathcal{S}_P$ and $\mathcal{S}_N$ we now have the ultimate strategy for Nim:

*   Given a position $G = \star p_1 + \star p_2 + \cdots + \star p_n$ with $p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0$ ($G \in \mathcal{S}_N$) it is possible to choose a move $G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G$ such that $p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n = 0$ ($G' \in \mathcal{S}_P$).
*   Given a position $G = \star p_1 + \star p_2 + \cdots + \star p_n$ with $p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0$ ($G \in \mathcal{S}_P$), any move will lead to a position $G' = \star p'_1 + \star p'_2 + \cdots + \star p'_n \in G$ for which $p'_1 \oplus p'_2 \oplus \cdots \oplus p'_n \neq 0$ ($G' \in \mathcal{S}_N$).

In other words, if a game has $p_1 \oplus p_2 \oplus \cdots \oplus p_n \neq 0$ then the player to move is guaranteed to win—provided a perfect play on his/her part. On the other hand, if $p_1 \oplus p_2 \oplus \cdots \oplus p_n = 0$ then the player to move can only hope that the other player makes a mistake.

### Finishing Remarks

According to Fascicle 1 of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume 4, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/), the binary operator XOR, $\oplus$, was known long before operators such as binary *AND* and binary *OR*, because it is so intimately tied to the Nim game. For the same reason, the XOR operator has often been called the &#8220;nim sum&#8221;.

<div style="float:right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/1568811276"><img src="/media/books/numbers-games.jpg" alt=""></a></div>

Note how the definition of the $\star n$-games resembles one of the standard ways to construct the [natural numbers](http://en.wikipedia.org/wiki/Natural_number). Other than its obvious relation to the Nim-game, this is perhaps one of the reasons that $\star n$-games are sometimes called *nimbers*. Generalized numbers and games are the subject of the book [On Numbers and Games](http://en.wikipedia.org/wiki/On_Numbers_and_Games) by [John H. Conway](http://en.wikipedia.org/wiki/John_Horton_Conway).

[Wikipedia](http://www.wikipedia.org) has some relevant pages in relation to this article, see [impartial game](http://en.wikipedia.org/wiki/Impartial_game), [combinatorial game theory](http://en.wikipedia.org/wiki/Combinatorial_game_theory), and [Sprague–Grundy Theorem](http://en.wikipedia.org/wiki/Sprague–Grundy_theorem). See also the blog entry on [The Universe of Discourse](http://blog.plover.com/math/sprague-grundy.html).

---
layout: post
status: publish
published: true
title: The Stern-Brocot Tree of Fractions
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "Consider two fractions \\(\\frac{m_1}{n_1}\\) and \\(\\frac{m_2}{n_2}\\)
  with positive numerators and denominators. The fraction \\(\\frac{m_1+m_2}{n_1+n_2}\\)
  is called the <em>mediant</em> of \\(\\frac{m_1}{n_1}\\) and \\(\\frac{m_2}{n_2}\\).
  It is straightforward to show that the mediant is placed numerically between the
  original fractions,\r\n\\[\r\n\\frac{m_1}{n_1} < \\frac{m_2}{n_2} \\quad \\Rightarrow
  \\quad \\frac{m_1}{n_1} < \\frac{m_1+m_2}{n_1+n_2} < \\frac{m_2}{n_2}.\r\n\\]\r\nConsider
  now the following simple procedure [...]"
wordpress_id: 998
wordpress_url: http://sputsoft.com/?p=998
date: 2009-12-04 21:21:54.000000000 +01:00
categories:
- mathematics
tags:
- continued fraction
- continuant
- binary search tree
- Stern-Brocot tree
comments:
- id: 2423
  author: Fractions and Circles | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2010/02/fractions-and-circles.html
  date: !binary |-
    MjAxMS0wOS0xNSAwOToxMDozNyArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wOS0xNSAwNzoxMDozNyArMDIwMA==
  content: ! '[...] by mediants have some very interesting properties. We saw some
    of them in connection with the Stern-Brocot tree. This articles explores a more
    curious property, relating fractions to circles in the plane. It was [...]'
---
Consider two fractions \(\frac{m_1}{n_1}\) and \(\frac{m_2}{n_2}\) with positive numerators and denominators. The fraction \(\frac{m_1+m_2}{n_1+n_2}\) is called the <em>mediant<&#47;em> of \(\frac{m_1}{n_1}\) and \(\frac{m_2}{n_2}\). It is straightforward to show that the mediant is placed numerically between the original fractions,

<a id="more"></a><a id="more-998"></a>

<div style="float:right">(1)<&#47;div>
\[
\frac{m_1}{n_1} < \frac{m_2}{n_2} \quad \Rightarrow \quad \frac{m_1}{n_1} < \frac{m_1+m_2}{n_1+n_2} < \frac{m_2}{n_2}.
\]

Consider now the following simple procedure. Start with the two fractions,

<div style="float:right">(2)<&#47;div>
\[
\frac{0}{1}, \frac{1}{0}.
\]

(If you don't like calling \(\frac{1}{0}\) a fraction just consider tuples of integers instead, where inequality \((m_1,n_1) < (m_2,n_2)\), for instance, means \(m_1 n_2 < m_2 n_1\). However, \(\frac{1}{0}\) is just an auxiliary fraction that makes everything simpler.) Insert now the mediant in between the two,

<div style="float:right">(3)<&#47;div>
\[
\frac{0}{1}, \frac{\mathbf{1}}{\mathbf{1}}, \frac{1}{0}.
\]

and repeat the process, inserting mediants between any two consequtive fractions, obtaining

<div style="float:right">(4)<&#47;div>
\[
\frac{0}{1}, \frac{\mathbf{1}}{\mathbf{2}}, \frac{1}{1}, \frac{\mathbf{2}}{\mathbf{1}}, \frac{1}{0},
\]

<div style="float:right">(5)<&#47;div>
\[
\frac{0}{1}, \frac{\mathbf{1}}{\mathbf{3}}, \frac{1}{2}, \frac{\mathbf{2}}{\mathbf{3}}, \frac{1}{1}, \frac{\mathbf{3}}{\mathbf{2}}, \frac{2}{1}, \frac{\mathbf{3}}{\mathbf{1}}, \frac{1}{0},
\]

and so on. At any stage of the process we see that the values of the fractions strictly increase going from left to right, because of&nbsp;(1).

<h2>The Stern-Brocot Tree<&#47;h2>

A lot more can be said about these sequences, but first we arrange the fractions in the so-called Stern-Brocot tree. To simplify the definition and the properties of this structure, we use \(2 \times 2\) matrices with non-negative integers as elements. The initial two fractions from&nbsp;(2) will be represented by

<div style="float:right">(6)<&#47;div>
\[
I=\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix},
\]

where the numerators and denominators are in the first and second row, respectively. For technical reasons we will always have the larger fraction in the first column and the smaller fraction in the second column. We can now associate a fraction to any \(2 \times 2\) matrix,

\[
f \left( \begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} \right) = \frac{m_2+m_1}{n_2+n_1},
\]

which is seen to be the mediant of the two fractions represented by the columns of the matrix. So the first mediant we inserted was \(f(I) = \frac{1}{1}\), leading to&nbsp;(3).

We now introduce

<div style="float:right">(7)<&#47;div>
\[
\begin{aligned}
L=\begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix}, \quad \hbox{so} \quad 
&\begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} L
= \begin{bmatrix} m_2+m_1 & m_1 \\ n_2+n_1 & n_1 \end{bmatrix} \quad \hbox{and} \\
R=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}, \quad \hbox{so} \quad 
&\begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} R
= \begin{bmatrix} m_2 & m_2+m_1 \\ n_2 & n_2+n_1 \end{bmatrix}.
\end{aligned}
\]

Notice how (right-)multiplication of both \(L\) and \(R\) preserves the fact that the fraction represented by the first column is greater than the fraction represented by the second column. This follows from&nbsp;(1). Notice also how \(f(L) = \frac{1}{2}\) and \(f(R) = \frac{2}{1}\) are the left- and rightmost of the newly inserted fractions in&nbsp;(4), respectively. Similarly, \(f(L^2) = \frac{1}{3}\), \(f(L R) = \frac{2}{3}\), \(f(R L) = \frac{3}{2}\), \(f(R^2) = \frac{3}{1}\) are the inserted fractions in&nbsp;(5).

This process is easily generalized:

<strong>Definition 1.<&#47;strong> The <strong>Stern-Brocot tree<&#47;strong> is equal to \(T(I)\), where \(T(M)\) is a binary tree with root \(f(M)\), left subtree \(T(M L)\), and right subtree \(T(M R)\).

So the root of the Stern-Brocot tree is \(f(I)=\frac{1}{1}\) with \(T(L)\) and \(T(R)\) as left and right subtree, respectively. \(T(L)\) has root \(f(L)=\frac{1}{2}\), left subtree \(T(L^2)\) and right subtree \(T(L R)\). \(T(R)\) has root \(f(R)=\frac{2}{1}\), left subtree \(T(R L)\) and right subtree \(T(R^2)\). And so on. The top of the tree can be seen in Figure&nbsp;1.

[caption id="" align="alignnone" width="717" caption="Figure 1. The Stern-Brocot tree."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163913710&#47;" title="The Stern-Brocot tree by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6156&#47;6163913710_49c5a6a076_b.jpg" width="717" height="364" alt="The Stern-Brocot tree"><&#47;a>[&#47;caption]
Consider any subtree \(T(M)\) of the Stern-Brocot tree with root \(f(M)\). Note that it follows from the definitions that every node in the left subtree \(T(M L)\) is strictly less than \(f(M)\) and that every node in the right subtree \(T(M R)\) is strictly greater than \(f(M)\). Thus, <em>the Stern-Brocot tree is a <&#47;em><a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Binary_search_tree"><em>binary search tree<&#47;em><&#47;a>, although an infinite one.

From the definition we see that for any node \(f(M)\) of the Stern-Brocot tree we have

<div style="float:right">(8)<&#47;div>
\[
M=R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}},
\]

for even \(n\) and non-negative integers \(a_k\). Insisting that \(n\) must be even is just a technicality which will be clarified later. Any \(a_k\) can be zero so its not a restriction. Computing the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Determinant">determinants<&#47;a> of the simple matrices in&nbsp;(6) and&nbsp;(7) we get \(\det I = \det L = \det R = 1\). Since \(\det (A B) = \det A \, \det B\) it follows that

<div style="float:right">(9)<&#47;div>
\[
\det M = 1 \hbox{ for any subtree } T(M) \hbox{ of the Stern-Brocot tree.}
\]

This is an important property. Consider any node \(\frac{m}{n}\) of the tree. Then the left subtree is \(T(M')\) with

\[
M' = \begin{bmatrix} m' & m \\ n' & n \end{bmatrix}
\]

for some integers \(m'\) and \(n'\). But then \(m' n - m n' = 1\) from&nbsp;(9), which shows that \(m\) and \(n\) are <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Relatively_prime">relatively prime<&#47;a>, \(m \perp n\). Or, to put it another way, <em>every fraction in the Stern-Brocot tree is in its lowest terms<&#47;em>.

A natural question is now: Can <em>any<&#47;em> reduced positive fraction be found in the Stern-Brocot tree? Assume there is a fraction \(\frac{p}{q}\) with \(p \perp q\) which is <em>not<&#47;em> present. Consider now the process of searching for this fraction. This will produce an infinite sequence of matrices of the form&nbsp;(8) for \(n=0, 1, \ldots\), where the \(a_k\)'s are determined from the number of left and right branches chosen during the search. Let one of the matrices be

\[
M = \begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} \hbox{ where } \frac{m_1}{n_1} < \frac{p}{q} < \frac{m_2}{n_2}.
\]

The inequalities follow from the properties of the Stern-Brocot tree and the search process being performed. They imply that

\[
p n_1 - q m_1 \geq 1 \hbox{ and } q m_2 - p n_2 \geq 1
\]

and we know from&nbsp;(9) that \(n_1 m_2 - m_1 n_2 = 1\). We now get

\[
\begin{aligned}
p + q &= p (n_1 m_2 - m_1 n_2) + q (n_1 m_2 - m_1 n_2) \\
      &= (m_1 + n_1) (q m_2 - p n_2) + (m_2 + n_2) (p n_1 - q m_1) \\
      &\geq m_1 + n_1 + m_2 + n_2.
\end{aligned}
\]

This inequality must hold for the infinite sequence of matrices from the search process. This is not possible since the sum of the elements of any matrix of the form&nbsp;(8) strictly increases when multiplied by \(L\) or \(R\). So <em>the Stern-Brocot tree contains all reduced positive fractions<&#47;em>.

<h2>Relation to Continued Fractions<&#47;h2>

The Stern-Brocot tree is intimately tied to continued fractions. See the article <a href="&#47;blog&#47;2009&#47;11&#47;continued-fractions-and-continuants.html">Continued Fractions and Continuants<&#47;a> for some basic properties that we will use below. Especially equations&nbsp;(8) and&nbsp;(10) from that article are essential to the following. Observe that

\[
\begin{aligned}
P L^a &= \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ a & 1 \end{bmatrix}
= \begin{bmatrix} a & 1 \\ 1 & 0 \end{bmatrix}, \\
R^a P &= \begin{bmatrix} 1 & a \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}
= \begin{bmatrix} a & 1 \\ 1 & 0 \end{bmatrix},
\end{aligned}
\]

where \(P\) is a permutation matrix for which \(P^2 = I\). Recall that any node in the Stern-Brocot is of the form \(f(M)\) where \(M\) is as in&nbsp;(8). Using the identities above we get

\[
\begin{aligned}
M &= R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}} \\
  &= (R^{a_0} P) (P L^{a_1}) (R^{a_2} P) (P L^{a_3}) \cdots (R^{a_{n-2}} P) (P L^{a_{n-1}}) \\
  &= \begin{bmatrix} a_0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} a_1 & 1 \\ 1 & 0 \end{bmatrix} \cdots \begin{bmatrix} a_{n-1} & 1 \\ 1 & 0 \end{bmatrix} \\
  &= \begin{bmatrix}
K_n(a_0, \ldots, a_{n-1}) & K_{n-1}(a_0, \ldots, a_{n-2}) \\
K_{n-1}(a_1, \ldots, a_{n-1}) & K_{n-2}(a_1, \ldots, a_{n-2})
\end{bmatrix}
\end{aligned}
\]

where we assume that \(n \geq 2\) is even. The \(K_n\) functions are so-called <a href="&#47;blog&#47;2009&#47;11&#47;continued-fractions-and-continuants.html">continuants<&#47;a>. We now have

\[
\begin{aligned}
f(M) &= f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}}) \\
 &= f \left( \begin{bmatrix}
K_n(a_0, \ldots, a_{n-1}) & K_{n-1}(a_0, \ldots, a_{n-2}) \\
K_{n-1}(a_1, \ldots, a_{n-1}) & K_{n-2}(a_1, \ldots, a_{n-2})
\end{bmatrix} \right) \\
 &= \frac{K_n(a_0, \ldots, a_{n-1}) + K_{n-1}(a_0, \ldots, a_{n-2})}{K_{n-1}(a_1, \ldots, a_{n-1}) + K_{n-2}(a_1, \ldots, a_{n-2})} \\
 &= \frac{K_n(a_0, \ldots, a_{n-1}, 1)}{K_{n-1}(a_1, \ldots, a_{n-1}, 1)} \\
 &= a_0 + &#47;\!&#47; a_1, \ldots, a_{n-1}, 1 &#47;\!&#47;.
\end{aligned}
\]

This is a truly remarkable result. There is a one-to-one correspondance between continued fractions and nodes in the Stern-Brocot tree. Indeed, the continued fraction \(a_0 + &#47;\!&#47; a_1, \ldots, a_{n-1}, 1 &#47;\!&#47;\) can be found in the tree by starting at the root \(\frac{1}{1}\) and then taking \(a_0\) right branches, \(a_1\) left branches, \(a_2\) right branches, and so on, until taking \(a_{n-1}\) left branches. What if \(a_{n-1} = 0\) for even \(n \geq 2\)? We have

\[
a_0 + &#47;\!&#47; a_1, \ldots, a_{n-2}, 0, 1 &#47;\!&#47; = a_0 + &#47;\!&#47; a_1, \ldots, a_{n-2}, 1 &#47;\!&#47;,
\]

so a trailing \(&#47;\!&#47; \ldots, 0, 1 &#47;\!&#47;\) can be simplified to \(&#47;\!&#47; \ldots, 1 &#47;\!&#47;\). So all cases are captured in

\[
\begin{aligned}
f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots R^{a_{n-2}} L^{a_{n-1}}) &= a_0 + &#47;\!&#47; a_1, \ldots, a_{n-2}, a_{n-1}, 1 &#47;\!&#47;, \\
f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots R^{a_{n-2}}) &= a_0 + &#47;\!&#47; a_1, \ldots, a_{n-2}, 1 &#47;\!&#47;,
\end{aligned}
\]

for even \(n \geq 2\), linking any node from the Stern-Brocot tree to a continued fraction and vice versa.

For instance, \(\frac{7}{5} = 1 + &#47;\!&#47; 2, 2 &#47;\!&#47; = 1 + &#47;\!&#47; 2, 1, 1 &#47;\!&#47;\), so \(\frac{7}{5}\) can be found in the Stern-Brocot tree by going right one time from the root, then 2 times to the left, and finally 1 time to the right. Check Figure&nbsp;1 to verify. Similarly, we see that \(\frac{1}{4}\) is located by going 3 times to the left from the root. What is its continued fraction representation? Since we must start by counting right we rephrase its location to: Go 0 times to the right and then 3 times to the left. This gives us \(\frac{1}{4} = 0 + &#47;\!&#47; 3, 1 &#47;\!&#47; = &#47;\!&#47; 4 &#47;\!&#47;\).

<h2>Further Reading<&#47;h2>

<div style="float:right"><a href="&#47;book&#47;link.php?id=concrete"><img src="&#47;book&#47;concrete.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
The Stern-Brocot tree is mentioned in Exercise&nbsp;4.5.3&#8211;(40) of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a> and treated in more detail in Section&nbsp;4.5 of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;gkp.html">Concrete Mathematics<&#47;a> by <a href="http:&#47;&#47;math.ucsd.edu&#47;~fan&#47;ron&#47;">Graham<&#47;a>, <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Knuth<&#47;a>, and <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Oren_Patashnik">Patashnik<&#47;a>.
<div style="clear:both"><&#47;div>

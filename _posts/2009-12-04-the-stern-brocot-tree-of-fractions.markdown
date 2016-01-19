---
layout: post
title: The Stern-Brocot Tree of Fractions
author: Jan Marthedal Rasmussen
excerpt: ! "Consider two fractions m_1/n_1 and m_2/n_2 with positive numerators and denominators. The fraction (m_1+m_2)/(n_1+n_2) is called the mediant of m_1/n_1 and m_2/n_2. It is straightforward to show that the mediant is placed numerically between the original fractions,"
date: 2009-12-04 21:21:54.000000000 +01:00
categories:
- mathematics
tags:
- continued-fraction
- stern-brocot-tree
---
Consider two fractions {% imath \frac{m_1}{n_1} %} and {% imath \frac{m_2}{n_2} %} with positive numerators and denominators. The fraction {% imath \frac{m_1+m_2}{n_1+n_2} %} is called the *mediant* of {% imath \frac{m_1}{n_1} %} and {% imath \frac{m_2}{n_2} %}. It is straightforward to show that the mediant is placed numerically between the original fractions,

<div class="pull-right">(1)</div>
{% dmath \frac{m_1}{n_1} < \frac{m_2}{n_2} \quad \Rightarrow \quad \frac{m_1}{n_1} < \frac{m_1+m_2}{n_1+n_2} < \frac{m_2}{n_2}. %}

Consider now the following simple procedure. Start with the two fractions,

<div class="pull-right">(2)</div>
{% dmath \frac{0}{1}, \frac{1}{0}. %}

(If you don't like calling {% imath \frac{1}{0} %} a fraction just consider tuples of integers instead, where inequality {% imath (m_1,n_1) < (m_2,n_2) %}, for instance, means {% imath m_1 n_2 < m_2 n_1 %}. However, {% imath \frac{1}{0} %} is just an auxiliary fraction that makes everything simpler.) Insert now the mediant in between the two,

<div class="pull-right">(3)</div>
{% dmath \frac{0}{1}, \frac{\mathbf{1}}{\mathbf{1}}, \frac{1}{0}. %}

and repeat the process, inserting mediants between any two consequtive fractions, obtaining

<div class="pull-right">(4)</div>
{% dmath \frac{0}{1}, \frac{\mathbf{1}}{\mathbf{2}}, \frac{1}{1}, \frac{\mathbf{2}}{\mathbf{1}}, \frac{1}{0}, %}

<div class="pull-right">(5)</div>
{% dmath \frac{0}{1}, \frac{\mathbf{1}}{\mathbf{3}}, \frac{1}{2}, \frac{\mathbf{2}}{\mathbf{3}}, \frac{1}{1}, \frac{\mathbf{3}}{\mathbf{2}}, \frac{2}{1}, \frac{\mathbf{3}}{\mathbf{1}}, \frac{1}{0}, %}

and so on. At any stage of the process we see that the values of the fractions strictly increase going from left to right, because of&nbsp;(1).

### The Stern-Brocot Tree

A lot more can be said about these sequences, but first we arrange the fractions in the so-called Stern-Brocot tree. To simplify the definition and the properties of this structure, we use {% imath 2 \times 2 %} matrices with non-negative integers as elements. The initial two fractions from&nbsp;(2) will be represented by

<div class="pull-right">(6)</div>
{% dmath I=\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, %}

where the numerators and denominators are in the first and second row, respectively. For technical reasons we will always have the larger fraction in the first column and the smaller fraction in the second column. We can now associate a fraction to any {% imath 2 \times 2 %} matrix,

{% dmath f \left( \begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} \right) = \frac{m_2+m_1}{n_2+n_1}, %}

which is seen to be the mediant of the two fractions represented by the columns of the matrix. So the first mediant we inserted was {% imath f(I) = \frac{1}{1} %}, leading to&nbsp;(3).

We now introduce

<div class="pull-right">(7)</div>
{% dmath \begin{aligned} L=\begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix}, \quad \text{so} \quad &\begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} L = \begin{bmatrix} m_2+m_1 & m_1 \\ n_2+n_1 & n_1 \end{bmatrix} \quad \text{and} \\ R=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}, \quad \text{so} \quad &\begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} R = \begin{bmatrix} m_2 & m_2+m_1 \\ n_2 & n_2+n_1 \end{bmatrix}. \end{aligned} %}

Notice how (right-)multiplication of both {% imath L %} and {% imath R %} preserves the fact that the fraction represented by the first column is greater than the fraction represented by the second column. This follows from&nbsp;(1). Notice also how {% imath f(L) = \frac{1}{2} %} and {% imath f(R) = \frac{2}{1} %} are the left- and rightmost of the newly inserted fractions in&nbsp;(4), respectively. Similarly, {% imath f(L^2) = \frac{1}{3} %}, {% imath f(L R) = \frac{2}{3} %}, {% imath f(R L) = \frac{3}{2} %}, {% imath f(R^2) = \frac{3}{1} %} are the inserted fractions in&nbsp;(5).

This process is easily generalized:

**Definition 1.** The **Stern-Brocot tree** is equal to {% imath T(I) %}, where {% imath T(M) %} is a binary tree with root {% imath f(M) %}, left subtree {% imath T(M L) %}, and right subtree {% imath T(M R) %}.

So the root of the Stern-Brocot tree is {% imath f(I)=\frac{1}{1} %} with {% imath T(L) %} and {% imath T(R) %} as left and right subtree, respectively. {% imath T(L) %} has root {% imath f(L)=\frac{1}{2} %}, left subtree {% imath T(L^2) %} and right subtree {% imath T(L R) %}. {% imath T(R) %} has root {% imath f(R)=\frac{2}{1} %}, left subtree {% imath T(R L) %} and right subtree {% imath T(R^2) %}. And so on. The top of the tree can be seen in Figure&nbsp;1.

<figure>
  <img src="{{site.baseurl}}media/stern-brocot.svg" alt="The Stern-Brocot tree" class="img-responsive">
  <figcaption><strong>Figure 1.</strong> The Stern-Brocot tree.</figcaption>
</figure>

Consider any subtree {% imath T(M) %} of the Stern-Brocot tree with root {% imath f(M) %}. Note that it follows from the definitions that every node in the left subtree {% imath T(M L) %} is strictly less than {% imath f(M) %} and that every node in the right subtree {% imath T(M R) %} is strictly greater than {% imath f(M) %}. Thus, *the Stern-Brocot tree is a [binary search tree](http://en.wikipedia.org/wiki/Binary_search_tree)*, although an infinite one.

From the definition we see that for any node {% imath f(M) %} of the Stern-Brocot tree we have

<div class="pull-right">(8)</div>
{% dmath M=R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}}, %}

for even {% imath n %} and non-negative integers {% imath a_k %}. Insisting that {% imath n %} must be even is just a technicality which will be clarified later. Any {% imath a_k %} can be zero so its not a restriction. Computing the [determinants](http://en.wikipedia.org/wiki/Determinant) of the simple matrices in&nbsp;(6) and&nbsp;(7) we get {% imath \det I = \det L = \det R = 1 %}. Since {% imath \det (A B) = \det A \, \det B %} it follows that

<div class="pull-right">(9)</div>
{% dmath \det M = 1 \text{ for any subtree } T(M) \text{ of the Stern-Brocot tree.} %}

This is an important property. Consider any node {% imath \frac{m}{n} %} of the tree. Then the left subtree is {% imath T(M') %} with

{% dmath M' = \begin{bmatrix} m' & m \\ n' & n \end{bmatrix} %}

for some integers {% imath m' %} and {% imath n' %}. But then {% imath m' n - m n' = 1 %} from&nbsp;(9), which shows that {% imath m %} and {% imath n %} are [relatively prime](http://en.wikipedia.org/wiki/Relatively_prime), {% imath m \perp n %}. Or, to put it another way, *every fraction in the Stern-Brocot tree is in its lowest terms*.

A natural question is now: Can *any* reduced positive fraction be found in the Stern-Brocot tree? Assume there is a fraction {% imath \frac{p}{q} %} with {% imath p \perp q %} which is *not* present. Consider now the process of searching for this fraction. This will produce an infinite sequence of matrices of the form&nbsp;(8) for {% imath n=0, 1, \ldots %}, where the {% imath a_k %}'s are determined from the number of left and right branches chosen during the search. Let one of the matrices be

{% dmath M = \begin{bmatrix} m_2 & m_1 \\ n_2 & n_1 \end{bmatrix} \text{ where } \frac{m_1}{n_1} < \frac{p}{q} < \frac{m_2}{n_2}. %}

The inequalities follow from the properties of the Stern-Brocot tree and the search process being performed. They imply that

{% dmath p n_1 - q m_1 \geq 1 \text{ and } q m_2 - p n_2 \geq 1 %}

and we know from&nbsp;(9) that {% imath n_1 m_2 - m_1 n_2 = 1 %}. We now get

{% dmath \begin{aligned} p + q &= p (n_1 m_2 - m_1 n_2) + q (n_1 m_2 - m_1 n_2) \\ &= (m_1 + n_1) (q m_2 - p n_2) + (m_2 + n_2) (p n_1 - q m_1) \\ &\geq m_1 + n_1 + m_2 + n_2. \end{aligned} %}

This inequality must hold for the infinite sequence of matrices from the search process. This is not possible since the sum of the elements of any matrix of the form&nbsp;(8) strictly increases when multiplied by {% imath L %} or {% imath R %}. So *the Stern-Brocot tree contains all reduced positive fractions*.

### Relation to Continued Fractions

The Stern-Brocot tree is intimately tied to continued fractions. See the article [Continued Fractions and Continuants](/2009/11/continued-fractions-and-continuants.html) for some basic properties that we will use below. Especially equations&nbsp;(8) and&nbsp;(10) from that article are essential to the following. Observe that

{% dmath \begin{aligned} P L^a &= \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ a & 1 \end{bmatrix} = \begin{bmatrix} a & 1 \\ 1 & 0 \end{bmatrix}, \\ R^a P &= \begin{bmatrix} 1 & a \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} a & 1 \\ 1 & 0 \end{bmatrix}, \end{aligned} %}

where {% imath P %} is a permutation matrix for which {% imath P^2 = I %}. Recall that any node in the Stern-Brocot is of the form {% imath f(M) %} where {% imath M %} is as in&nbsp;(8). Using the identities above we get

{% dmath \begin{aligned} M &= R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}} \\ &= (R^{a_0} P) (P L^{a_1}) (R^{a_2} P) (P L^{a_3}) \cdots (R^{a_{n-2}} P) (P L^{a_{n-1}}) \\ &= \begin{bmatrix} a_0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} a_1 & 1 \\ 1 & 0 \end{bmatrix} \cdots \begin{bmatrix} a_{n-1} & 1 \\ 1 & 0 \end{bmatrix} \\ &= \begin{bmatrix} K_n(a_0, \ldots, a_{n-1}) & K_{n-1}(a_0, \ldots, a_{n-2}) \\ K_{n-1}(a_1, \ldots, a_{n-1}) & K_{n-2}(a_1, \ldots, a_{n-2}) \end{bmatrix} \end{aligned} %}

where we assume that {% imath n \geq 2 %} is even. The {% imath K_n %} functions are so-called [continuants](/2009/11/continued-fractions-and-continuants.html). We now have

{% dmath \begin{aligned} f(M) &= f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots L^{a_{n-1}}) \\ &= f \left( \begin{bmatrix} K_n(a_0, \ldots, a_{n-1}) & K_{n-1}(a_0, \ldots, a_{n-2}) \\ K_{n-1}(a_1, \ldots, a_{n-1}) & K_{n-2}(a_1, \ldots, a_{n-2}) \end{bmatrix} \right) \\ &= \frac{K_n(a_0, \ldots, a_{n-1}) + K_{n-1}(a_0, \ldots, a_{n-2})}{K_{n-1}(a_1, \ldots, a_{n-1}) + K_{n-2}(a_1, \ldots, a_{n-2})} \\ &= \frac{K_n(a_0, \ldots, a_{n-1}, 1)}{K_{n-1}(a_1, \ldots, a_{n-1}, 1)} \\ &= a_0 + /\!/ a_1, \ldots, a_{n-1}, 1 /\!/. \end{aligned} %}

This is a truly remarkable result. There is a one-to-one correspondance between continued fractions and nodes in the Stern-Brocot tree. Indeed, the continued fraction {% imath a_0 + /\!/ a_1, \ldots, a_{n-1}, 1 /\!/ %} can be found in the tree by starting at the root {% imath \frac{1}{1} %} and then taking {% imath a_0 %} right branches, {% imath a_1 %} left branches, {% imath a_2 %} right branches, and so on, until taking {% imath a_{n-1} %} left branches. What if {% imath a_{n-1} = 0 %} for even {% imath n \geq 2 %}? We have

{% dmath a_0 + /\!/ a_1, \ldots, a_{n-2}, 0, 1 /\!/ = a_0 + /\!/ a_1, \ldots, a_{n-2}, 1 /\!/, %}

so a trailing {% imath /\!/ \ldots, 0, 1 /\!/ %} can be simplified to {% imath /\!/ \ldots, 1 /\!/ %}. So all cases are captured in

{% dmath \begin{aligned} f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots R^{a_{n-2}} L^{a_{n-1}}) &= a_0 + /\!/ a_1, \ldots, a_{n-2}, a_{n-1}, 1 /\!/, \\ f(R^{a_0} L^{a_1} R^{a_2} L^{a_3} \cdots R^{a_{n-2}}) &= a_0 + /\!/ a_1, \ldots, a_{n-2}, 1 /\!/, \end{aligned} %}

for even {% imath n \geq 2 %}, linking any node from the Stern-Brocot tree to a continued fraction and vice versa.

For instance, {% imath \frac{7}{5} = 1 + /\!/ 2, 2 /\!/ = 1 + /\!/ 2, 1, 1 /\!/ %}, so {% imath \frac{7}{5} %} can be found in the Stern-Brocot tree by going right one time from the root, then 2 times to the left, and finally 1 time to the right. Check Figure&nbsp;1 to verify. Similarly, we see that {% imath \frac{1}{4} %} is located by going 3 times to the left from the root. What is its continued fraction representation? Since we must start by counting right we rephrase its location to: Go 0 times to the right and then 3 times to the left. This gives us {% imath \frac{1}{4} = 0 + /\!/ 3, 1 /\!/ = /\!/ 4 /\!/ %}.

### Further Reading

<div class="pull-right"><a href="{% amazon concrete %}"><img src="{% bookcover concrete %}" alt=""></a></div>
<div class="pull-right"><a href="{% amazon taocp2 %}"><img src="{% bookcover taocp2 %}" alt=""></a></div>
The Stern-Brocot tree is mentioned in Exercise&nbsp;4.5.3-(40) of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume&nbsp;2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) and treated in more detail in Section&nbsp;4.5 of [Concrete Mathematics](http://www-cs-faculty.stanford.edu/~uno/gkp.html) by [Graham](http://math.ucsd.edu/~fan/ron/), [Knuth](http://www-cs-faculty.stanford.edu/~uno/), and [Patashnik](http://en.wikipedia.org/wiki/Oren_Patashnik).

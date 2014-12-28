---
layout: post
title: On the Divergence of a Geometric Progression Sum
author: Jan Marthedal Rasmussen
date: 2009-08-28 17:50:28.000000000 +02:00
categories:
- mathematics
tags:
- proof
- infinite series
---
Let us revisit the geometric progression sum considered in an <a href="/2008/10/nice-geometric-progression-proof.html">earlier article</a>,

{% dmath s_r = \sum_{k=0}^\infty r^k = 1 + r + r^2 + r^3 + \ldots, %}

where {% imath r %} here is a <a href="http://en.wikipedia.org/wiki/Complex_number">complex number</a>. For what values of {% imath r %} does this infinite sum make sense? Can we find a <a href="http://en.wikipedia.org/wiki/Closed-form_expression">closed-form expression</a> for {% imath s_r %} in such cases?<span></span> To investigate this, we fix {% imath r %} to some value and consider the partial sums:

{% dmath s_r(n) = \sum_{k=0}^n r^k = 1 + r + r^2 + \ldots + r^{n-1}, %}

where we just add the first {% imath n %} terms of {% imath s_r %}. Now if {% imath s_r(n) %} tends to a finite limit&nbsp;{% imath v %} as {% imath n \rightarrow \infty %} (can we for any {% imath \delta > 0 %} find an {% imath n_0 %} such that {% imath |v-s_r(n)| \leq \delta %} for all {% imath n \geq n_0 %}?) then we have {% imath s_r = v %}.

Let us first single out the special case {% imath r=1 %}. Since {% imath s_r(n) = n %} we cannot assign any well-defined, finite value to {% imath s_1 %}, so {% imath s_r %} is divergent for {% imath r=1 %}. For {% imath r \neq 1 %} we get

{% dmath (1-r) s_r(n) = 1-r^n \quad \Longleftrightarrow \quad s_r(n) = \frac{1-r^n}{1-r}. %}

Let us consider three different cases. If {% imath |r| < 1 %} we see that the only term that depends on {% imath n %} tends to zero so we suspect that the limit is {% imath 1/(1-r) %},

{% dmath \left| \frac{1}{1-r} - \frac{1-r^n}{1-r} \right| = \left| \frac{r^n}{1-r} \right| = \frac{|r|^n}{|1-r|}. %}

Since the magnitude of the difference between our suspected limit and the partial sums can be made as small as we like (as long as we choose {% imath n %} sufficiently large), we have

{% dmath s_r = \frac{1}{1-r}, \quad \hbox{for } |r| < 1. %}

What about {% imath |r| > 1 %}? We get

{% dmath |s_r(n)| = \left| \frac{1-r^n}{1-r} \right| \geq \frac{|r^n|-1}{|r-1|} \geq \frac{|r|^n-1}{|r|+1}, %}

and we see that {% imath |s_r(n)| \rightarrow \infty %} as {% imath n \rightarrow \infty %}. We can thus not find a finite limit to which {% imath s_r(n) %} tends as {% imath n \rightarrow \infty %}, so the series {% imath s_r %} is divergent for {% imath |r| > 1 %}.

Left to consider is the case {% imath |r|=1 %}, {% imath r \neq 1 %}, and this is where it gets interesting. We get

{% dmath |s_r(n)| = \left| \frac{1-r^n}{1-r} \right| = \frac{|1-r^n|}{|1-r|} \leq \frac{1 + |r^n|}{|1-r|} = \frac{2}{|1-r|}. %}

So the partial sums {% imath s_r(n) %} are bounded by some constant independent of {% imath n %}. Does the value {% imath 1/(1-r) %} work as a limit in this case also? We set {% imath r = e^{i \theta} %} with {% imath 0 < \theta < 2\pi %} and subtract,

{% dmath \begin{aligned} s_r(n) - \frac{1}{1-r} &= \frac{e^{i \theta n}}{e^{i \theta}-1} = \frac{e^{i \theta n} (e^{-i \theta}+1)}{(e^{i \theta}-1)(e^{-i \theta}+1)} = \frac{e^{i \theta (n-1)} + e^{i \theta n}}{2i\sin \theta} \\ &= \frac{e^{i(\theta(2n-1)-\pi)/2}}{2\sin(\theta/2)} \end{aligned} %}

(using {% imath e^{i x} + e^{i y} = 2 \cos((x-y)/2) e^{i(x+y)/2} %} and {% imath \sin \theta = 2\sin(\theta/2)\cos(\theta/2) %}). So {% imath s_r(n) %} does <em>not</em> converge to {% imath 1/(1-r) %} as {% imath n \rightarrow \infty %}. Indeed, we see that {% imath s_r(n) %} follows a circle in the complex plane; a circle centered in {% imath 1/(1-r) %} with radius {% imath 1/(2\sin(\theta/2)) %}. And this is what I find interesting: {% imath s_r(n) %} does not converge to any value,

{% dmath \hbox{the series } s_r \hbox{ is divergent for } |r| \geq 1, %}

but circles around the value {% imath 1/(1-r) %} when {% imath |r|=1 %}, {% imath r \neq 1 %}. In fact, {% imath 1/(1-r) %} makes sense for all {% imath r \neq 1 %}, so can this value be assigned to {% imath s_r %} in some meaningful way? (When {% imath |r| < 1 %}, I would suspect that the values of {% imath s_r(n) %} spirals inward towards {% imath 1/(1-r) %} as {% imath n %} grows and spirals outwards when {% imath |r| > 1 %}; I have not verified this, though.)

<div style="float:right"><a href="{% amazon hardy-div %}"><img src="{% bookcover hardy-div %}" /></a></div>
This reminded me that <a href="http://en.wikipedia.org/wiki/G._H._Hardy">G. H. Hardy</a> has written a book called <em>Divergent Series</em>, where he manipulates infinite series with an &#8220;entirely uncritical spirit&#8221;. Therein, he also considers the series {% imath s_r %} and, e.g., {% imath s_{-1} = 1/2 %} can somehow make sense. I have only flicked through the book (<a href="http://books.google.com/books?id=jPccoUKsLdQC&#038;printsec=frontcover&#038;source=gbs_v2_summary_r&#038;cad=0">excerpt</a>), but I think I should take a closer look&#8230;

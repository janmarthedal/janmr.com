---
layout: post
status: publish
published: true
title: Line-line Intersection in the Plane
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "How do you calculate the point where two lines in the plane intersect?
  It is not very hard to do, but the formula can look <a href=\"http:&#47;&#47;en.wikipedia.org&#47;w&#47;index.php?title=Line-line_intersection&oldid=330824670\">quite
  complicated<&#47;a>, depending on how you write it up. This article is a reminder
  that it can be expressed in a simple manner.\r\n\r\n"
wordpress_id: 1247
wordpress_url: http://sputsoft.com/?p=1247
date: 2010-03-30 23:12:42.000000000 +02:00
categories:
- mathematics
tags:
- geometry
- lines
- inner product
- plane
- vector space
- Euclidean geometry
comments:
- id: 2076
  author: Brian
  author_email: sckuz254@yahoo.com
  author_url: ''
  date: !binary |-
    MjAxMC0wNi0xNyAyMzoxNDo1MiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNi0xNyAyMToxNDo1MiArMDIwMA==
  content: ! "Could you help me out please? This is a sequel to a game i wrote 7 or
    so years ago called \"Force Disruptor\". Well, i \r\n\r\nguess a forgot how to
    write code for this. This has been bothering me for close to eternity. I know
    the codes problem is \r\n\r\nsomewhere in here, but i can't figure it out! Could
    you do me a huge favor and look at it?\r\n The error is somewhere in here:\r\n\r\nvoid
    fixCollisions()\r\n{\r\n\r\n     for (int i = 1; i<wall_ubound;i++)\r\n     {\r\n
    \    \r\n         if (lineSegmentIntersection(\r\n            FDX-cos(FDA),FDY-sin(FDA),\r\n
    \           FDX+cos(FDA),FDY+sin(FDA),\r\n            wallX[i]-cos(wallRot[i]),wallY[i]-sin(wallRot[i]),\r\n
    \           wallX[i]+cos(wallRot[i]),wallY[i]+sin(wallRot[i]),\r\n            &amp;FDX,\r\n
    \           &amp;FDY))\r\n    \r\n   bigX=true;                     &#47;&#47;
    \ &#47;\\  There is something weird going on here. \r\n  }\r\n}                                 &#47;&#47;
    Shucks!\r\n&#47;&#47;-------------------------------------------------------------\r\nbool
    lineSegmentIntersection(\r\ndouble Ax, double Ay,\r\ndouble Bx, double By,\r\ndouble
    Cx, double Cy,\r\ndouble Dx, double Dy,\r\ndouble *X, double *Y) {\r\n\r\n  double
    \ distAB, theCos, theSin, newX, ABpos ;\r\n\r\n  &#47;&#47;  Fail if either line
    segment is zero-length.\r\n  if (Ax==Bx &amp;&amp; Ay==By || Cx==Dx &amp;&amp;
    Cy==Dy) return false;\r\n\r\n  &#47;&#47;  Fail if the segments share an end-point.\r\n
    \ if (Ax==Cx &amp;&amp; Ay==Cy || Bx==Cx &amp;&amp; By==Cy\r\n  ||  Ax==Dx &amp;&amp;
    Ay==Dy || Bx==Dx &amp;&amp; By==Dy) {\r\n    return false; }\r\n\r\n  &#47;&#47;
    \ (1) Translate the system so that point A is on the origin.\r\n  Bx-=Ax; By-=Ay;\r\n
    \ Cx-=Ax; Cy-=Ay;\r\n  Dx-=Ax; Dy-=Ay;\r\n\r\n  &#47;&#47;  Discover the length
    of segment A-B.\r\n  distAB=sqrt(Bx*Bx+By*By);\r\n\r\n  &#47;&#47;  (2) Rotate
    the system so that point B is on the positive X axis.\r\n  theCos=Bx&#47;distAB;\r\n
    \ theSin=By&#47;distAB;\r\n  newX=Cx*theCos+Cy*theSin;\r\n  Cy  =Cy*theCos-Cx*theSin;
    Cx=newX;\r\n  newX=Dx*theCos+Dy*theSin;\r\n  Dy  =Dy*theCos-Dx*theSin; Dx=newX;\r\n\r\n
    \ &#47;&#47;  Fail if segment C-D doesn&#039;t cross line A-B.\r\n  if (Cy<0.
    &amp;&amp; Dy=0. &amp;&amp; Dy>=0.) return false;\r\n\r\n  &#47;&#47;  (3) Discover
    the position of the intersection point along line A-B.\r\n  ABpos=Dx+(Cx-Dx)*Dy&#47;(Dy-Cy);\r\n\r\n
    \ &#47;&#47;  Fail if segment C-D crosses line A-B outside of segment A-B.\r\n
    \ if (ABposdistAB) return false;\r\n\r\n  &#47;&#47;  (4) Apply the discovered
    position to line A-B in the original coordinate system.\r\n  *X=Ax+ABpos*theCos;\r\n
    \ *Y=Ay+ABpos*theSin;\r\n   \r\n  return true;\r\n}\r\nThanks for the help, i
    really appreciate it."
- id: 2285
  author: TheFifthHorseman
  author_email: the_fifth_horseman@interia.pl
  author_url: ''
  date: !binary |-
    MjAxMC0xMS0xOCAxNTozMzo1NiArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0xMS0xOCAxNDozMzo1NiArMDEwMA==
  content: ! "There's a solution which I wrote basing on the Wikipedia article http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Line-line_intersection\r\n(this
    was for other purposes, but adapting it for your game should not take long - your
    function uses a nearly identical set of arguments already). The execution takes
    ~0,000015 to 0,000016 ms per test, a third of that if you drop the floats in favor
    of integrals.\r\nNote that this DOES return a collision if the lines share endpoints
    or an endpoint of one lies on the other. To eliminate that, you'd have to modify
    the ((x1-x)*(x2-x)>0 || (x3-x)*(x4-x)>0)  condition.\r\n\r\nstruct POINT { float
    x, y; };\r\nstruct EDGE { POINT p[2]; };\r\n\r\nbool intersect (float x1, float
    y1, float x2, float y2, float x3, float y3, float x4, float y4, POINT *res=NULL)\r\n{
    float x1_x2=x1-x2, x3_x4=x3-x4, y1_y2=y1-y2, y3_y4=y3-y4;\r\n  float div=x1_x2*y3_y4-y1_y2*x3_x4;\r\n
    \ if (div==0) return false;\r\n  float x1_y1_x2_y2=x1*y2-y1*x2, x3_y3_x4_y4=x3*y4-y3*x4,
    \r\n        x=(x1_y1_x2_y2*x3_x4-x1_x2*x3_y3_x4_y4)&#47;div;\r\n  if ((x1-x)*(x2-x)>0
    || (x3-x)*(x4-x)>0) return false;\r\n  if (res!=NULL) { float y=(x1_y1_x2_y2*y3_y4-y1_y2*x3_y3_x4_y4)&#47;div;\r\n
    \                   (*res).x=x;\r\n                    (*res).y=y; }\r\n  return
    true; }\r\n\r\ninline bool intersect(POINT p1,POINT p2,POINT p3,POINT p4,POINT
    *res=NULL){ return intersect(p1.x,p1.y,p2.x,p2.y, p3.x,p3.y,p4.x,p4.y, res); }\r\ninline
    bool intersect(EDGE e1, EDGE e2, POINT *res=NULL) { return intersect(e1.p[0],e1.p[1],
    e2.p[0],e2.p[1], res); }"
- id: 2291
  author: HeWhoCouldTheoreticallyBeNamed
  author_email: agraham@agraham.ca
  author_url: ''
  date: !binary |-
    MjAxMS0wMS0yMiAwNzoyMDoxNCArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMS0yMiAwNjoyMDoxNCArMDEwMA==
  content: ! "Great code. I found it sometimes doesn't work with large numbers for
    example intersecting 1126,175 1243,173 with 1039,105 1214,105 would not find an
    intersection.\r\nI changed all the temporary floats to doubles and it worked."
---
How do you calculate the point where two lines in the plane intersect? It is not very hard to do, but the formula can look <a href="http:&#47;&#47;en.wikipedia.org&#47;w&#47;index.php?title=Line-line_intersection&oldid=330824670">quite complicated<&#47;a>, depending on how you write it up. This article is a reminder that it can be expressed in a simple manner.

<a id="more"></a><a id="more-1247"></a>

We start out by not restricting ourselves to the plane, but any <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Vector_space">vector space<&#47;a> with an <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Inner_product">inner product<&#47;a> \(\langle \cdot, \cdot \rangle\). Let two lines be represented as

<div style="float:right">(1)<&#47;div>
\[
\hbox{p} + s \hbox{v}, \quad s \in \mathbb{R}
\]

and

\[
\hbox{q} + t \hbox{w}, \quad t \in \mathbb{R}
\]

where \(\hbox{p}\), \(\hbox{q}\), \(\hbox{v}\), and \(\hbox{w}\) are vectors. We assume that both \(\hbox{v}\) and \(\hbox{w}\) are non-null. See Figure&nbsp;1.
[caption id="" align="alignnone" width="500" caption="Figure 1. Line-line intersection"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163910904&#47;" title="Line-line intersection by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6176&#47;6163910904_bd2c2c06e8.jpg" width="500" height="333" alt="Line-line intersection"><&#47;a>[&#47;caption]
We look for values of \(s\) and \(t\) such that

<div style="float:right">(2)<&#47;div>
\[
\hbox{p} + s \hbox{v} = \hbox{q} + t \hbox{w}.
\]

Let \(\hat{\hbox{w}} \neq 0\) be a vector perpendicular to \(\hbox{w}\), \(\langle \hbox{w}, \hat{\hbox{w}} \rangle = 0\). We get

<div style="float:right">(3)<&#47;div>
\[
s \langle \hbox{v}, \hat{\hbox{w}} \rangle = \langle \hbox{q} - \hbox{p}, \hat{\hbox{w}} \rangle
\]

Now if \(\langle \hbox{v}, \hat{\hbox{w}} \rangle = 0\) there are two possibilities: If \(\langle \hbox{q} - \hbox{p}, \hat{\hbox{w}} \rangle = 0\) there are infinitely many solutions, i.e., the lines overlap, but if \(\langle \hbox{q} - \hbox{p}, \hat{\hbox{w}} \rangle \neq 0\) there are no solutions, i.e., the lines are parallel and do not intersect.

Assume then \(\langle \hbox{v}, \hat{\hbox{w}} \rangle \neq 0\). We get

\[
s = \frac{\langle \hbox{q} - \hbox{p}, \hat{\hbox{w}} \rangle}{\langle \hbox{v}, \hat{\hbox{w}} \rangle},
\]

and thus, after inserting into&nbsp;(1), the point of intersection is

\[
\hbox{p} + \frac{\langle \hbox{q} - \hbox{p}, \hat{\hbox{w}} \rangle}{\langle \hbox{v}, \hat{\hbox{w}} \rangle} \hbox{v}.
\]

<h2>The Plane is Special<&#47;h2>

The derivation above is actually a little careless. If&nbsp;(2) is to hold for some \(s\) and \(t\), then&nbsp;(3) must also hold. Turning the implication the other way, which we would like to, is less straightforward.

Assume that&nbsp;(3) holds for some value of&nbsp;\(s\),

<div style="float:right">(4)<&#47;div>
\[
\langle s \hbox{v} + \hbox{p} - \hbox{q}, \hat{\hbox{w}} \rangle = 0.
\]

What does this mean? It means that the vectors \(s \hbox{v} + \hbox{p} - \hbox{q}\) and \(\hat{\hbox{w}}\) are perpendicular to each other, and if we are in two dimensions&#47;the plane we must have \(s \hbox{v} + \hbox{p} - \hbox{q} = t \hbox{w}\) for some value of \(t\). This is&nbsp;(2) and we are done.

Does this work in higher dimensions? Generally, no. Consider, e.g., three dimensions and Equation&nbsp;(4). What can we derive of it now? We have that

\[
s \hbox{v} + \hbox{p} - \hbox{q} = \alpha \hbox{w}_1 + \beta \hbox{w}_2
\]

for some values of \(\alpha\) and \(\beta\) and where \(\langle \hbox{w}_1, \hat{\hbox{w}} \rangle = \langle \hbox{w}_2, \hat{\hbox{w}} \rangle = 0\). And \(\alpha \hbox{w}_1 + \beta \hbox{w}_2 = t \hbox{w}\) does not necessarily hold for any \(t\), so&nbsp;(2) does generally not follow in three dimensions or more.

<h2>Summary Using Coordinates<&#47;h2>

Let us consider the usual <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclidean_geometry">two-dimensional Euclidean<&#47;a> <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclidean_space">space<&#47;a> and <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Cartesian_coordinate_system">Cartesian coordinates<&#47;a>. We set

\[
\hbox{p} = (p_1,p_2), \quad \hbox{q} = (q_1,q_2), \quad 
\hbox{v} = (v_1,v_2), \quad \hbox{w} = (w_1,w_2),
\]

and use the inner product

\[
\langle (a_1,a_2), (b_1,b_2) \rangle = a_1 b_1 + a_2 b_2.
\]

Rotating a vector \(\hbox{w} = (w_1,w_2)\) counterclockwise by a right angle is easily done with \(\hat{\hbox{w}} = (-w_2, w_1)\). It is easily checked that \(\langle \hbox{w}, \hat{\hbox{w}} \rangle = 0\).

Recall that we are interested in knowing whether the two lines

\[
(x,y) = (p_1,p_2) + s (v_1,v_2), \quad s \in \mathbb{R}
\]

and

\[
(x,y) = (q_1,q_2) + t (w_1,w_2), \quad t \in \mathbb{R}
\]

intersect.

Setting \(\alpha = w_1 v_2 - w_2 v_1\) and \(\beta = w_1 (q_2-p_2) - w_2 (q_1-p_1)\), we have

<ul>
<li>\(\alpha = 0\), \(\beta = 0\): The two lines overlap.
<&#47;li>
<li>\(\alpha = 0\), \(\beta \neq 0\): The lines are parallel but do not intersect.
<&#47;li>
<li>\(\alpha \neq 0\): The lines meet at a single point, \((p_1 + \frac{\beta}{\alpha} v_1, p_2 + \frac{\beta}{\alpha} v_2)\).
<&#47;li>
<&#47;ul>

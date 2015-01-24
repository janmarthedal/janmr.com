---
layout: post
title: Typesetting Math Using HTML and CSS &mdash; Fractions
author: Jan Marthedal Rasmussen
excerpt: |
  Currently, there is no best way of showing math on the web. An HTML5 standard exists, MathML, but unfortunately it doesn't have broad browser support. Instead, many alternatives exist, all with varying quality and speed.

  I would like to explore how far you can get by using just HTML and CSS (including web fonts). My findings should be considered experimental.

  This post will deal with one way of typesetting fractions, inspired by the approach taken by Kahn Academy's KaTeX project.
inhead: |
    <style>
        .well {
            font-family: 'KaTeX_Main', sans-serif;
            font-size: 200%;
            text-align: center;
        }
        .math-box {
            display: inline-block;
        }
        .math-box .strut {
            display: inline-block; 
        }
        .math-box .frac-line {
            width: 100%;
            display: inline-block;
        }
        .math-box .baseline-fix {
            display: inline-table;
            table-layout: fixed;
        }
        .math-box .vstack {
            display: inline-block;
            position: relative;
        }
        .math-box .vstack > div {
            position: relative;
            height: 0;
            text-align: center;
        }
        .math-box .frac-line:before {
            display: block;
            border-bottom-style: solid;
            content: "";
            border-bottom-width: 1px;
        }
        .math-box .frac-line:after {
            display: block;
            border-bottom-style: solid;
            content: "";
            border-bottom-width: 0.04em;
            margin-top: -1px;
        }
    </style>
categories: [programming]
tags: [math, typesetting, html, css]
---
Currently, there is no best way of showing math on the web. An HTML5 standard exists, [MathML](http://www.w3.org/TR/MathML/), but unfortunately it doesn't have broad [browser support](http://caniuse.com/#feat=mathml). Instead, many alternatives exist, all with varying quality and speed.

I would like to explore how far you can get by using just HTML and CSS (including [web fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)). My findings should be considered experimental and in no way authoritative.

This post will deal with one way of typesetting fractions, inspired by the approach taken by Kahn Academy's [KaTeX project](http://khan.github.io/KaTeX/).

Consider first the following layout:

<div class="well">
before<span class="math-box"><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

which is obtained by the following HTML and CSS:

{% highlight html %}
before<span class="math-box">
  <span class="vstack">
    <div style="top: 0.686em;">8</div>
    <div style="top: -0.677em;">1234</div>
    <span class="baseline-fix"></span>
  </span>
</span>after
{% endhighlight %}

{% highlight css %}
.math-box {
  display: inline-block;
}
.math-box .vstack {
  display: inline-block;
  position: relative;
}
.math-box .vstack > div {
  position: relative;
  text-align: center;
  height: 0;
}
.math-box .baseline-fix {
  display: inline-table;
  table-layout: fixed;
}
{% endhighlight %}

([Live demo](http://jsfiddle.net/janmr/3xuz8tL1/).) Worth noting is:

*   The two outermost elements `span.math-box` and `span.vstack` are `inline-block` elements, meaning that they are positioned as inline elements (aligning baselines, for one, which is very important here), but otherwise behave as block elements (able to contain other block elements).
*   The `div`s will be stacked on top of each other because of their block style. Therefore the width of the enclosing `span.vstack` element will be the widest of the `div`s.
*   The `div`s have height zero which means that, by themselves, they will be displayed on top of each other, all following the same baseline.
*   The `div`s are positioned relatively, so the `top` property can position the elements correctly in the vertical direction.
*   The `.baseline-fix` is necessary in Internet Explorer, since otherwise the elements outside `.math-box` will not be aligned correctly (in the vertical direction). I don't know exactly [why this fix works](http://stackoverflow.com/questions/27702027/why-is-this-css-baseline-fix-necessary-for-inline-fractions).

But we would also like to display a horizontal line between the numerator and denominator, like so:

<div class="well">
before<span class="math-box"><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.23em;"><span class="frac-line"></span></div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

We aim for this markup

{% highlight html %}
before<span class="math-box">
  <span class="vstack">
    <div style="top: 0.686em;">8</div>
    <div style="top: -0.677em;">1234</div>
    <div style="top: -0.23em;"><span class="frac-line"></span></div>
    <span class="baseline-fix"></span>
  </span>
</span>after
{% endhighlight %}

but what should the style be for `span.frac-line`? Using something like `display: inline-block; width: 100%; border-bottom: 1px solid black;` will work, but how thick should the line be? Using something like `0.04em` makes the line scale with the font size, but using a small font size can result in a line thickness less than 1 pixel (leading to the line disappearing or having a modified color). Here, KaTeX has a nice trick up their sleeve:

{% highlight css %}
.math-box .frac-line {
  width: 100%;
  display: inline-block;
}
.math-box .frac-line:before {
  display: block;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  content: "";
}
.math-box .frac-line:after {
  display: block;
  margin-top: -1px;
  border-bottom-style: solid;
  border-bottom-width: 0.04em;
  content: "";
}
{% endhighlight %}

([Live demo](http://jsfiddle.net/janmr/3xuz8tL1/1/).) Using the pseudo-elements `:before` and `:after`, two lines will be drawn on top of each other. This way the line will be `0.04em`, but never less than `1px`.

Now we have a complete fraction, but there is one remaining issue. We would like the outer-most box `span.math-box` to exactly enclose the inner elements, like this:

<div class="well">
before<span class="math-box" style="border: 1px solid red;"><span class="strut" style="height: 2.008em; vertical-align: -0.686em;"></span><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.23em;"><span class="frac-line"></span></div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

(If the fit is not perfect then see the comment in the final paragraph.) This will *not* be the case for the HTML/CSS presented above because of the relative positioning of the elements. The outer box will fit perfectly in the horizontal direction, but not in the vertical direction. A fix is to use a so-called [*strut*](https://en.wikipedia.org/wiki/Strut_(typesetting)), widely used in TeX:

{% highlight html %}
before<span class="math-box" style="border: 1px solid red;">
  <span class="strut" style="height: 2.008em; vertical-align: -0.686em;"></span>
  <span class="vstack">
    <div style="top: 0.686em;">8</div>
    <div style="top: -0.677em;">1234</div>
    <div style="top: -0.23em;"><span class="frac-line"></span></div>
    <span class="baseline-fix"></span>
  </span>
</span>after
{% endhighlight %}

{% highlight css %}
.math-box .strut {
  display: inline-block; 
}
{% endhighlight %}

([Live demo](http://jsfiddle.net/janmr/3xuz8tL1/2/).) A strut is just a zero-width element, which can be made to control the vertical extent both below and above the baseline.

This concludes the demonstration of how to typeset a fraction using HTML and CSS. Note one important thing here: The browser's layout engine will take care of all spacing and alignment in the *horizontal direction*, but you have to position everything yourself in the *vertical direction*. And to do that, you need precise information of how tall your font's characters are.

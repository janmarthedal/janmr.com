---
layout: post
title: Typesetting Math Using HTML and CSS &mdash; Fractions
author: Jan Marthedal Rasmussen
excerpt: ! ""
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
This post will

First we have

<div class="well">
before<span class="math-box"><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

which is obtained by the following HTML and CSS:

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

{% highlight html %}
before<span class="math-box">
  <span class="vstack">
    <div style="top: 0.686em;">8</div>
    <div style="top: -0.677em;">1234</div>
    <span class="baseline-fix"></span>
  </span>
</span>after
{% endhighlight %}

Then we get

<div class="well">
before<span class="math-box"><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.23em;"><span class="frac-line"></span></div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

by adding

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


Finally, ...

<div class="well">
before<span class="math-box" style="border: 1px solid #ddd;"><span class="strut" style="height: 2.008em; vertical-align: -0.686em;"></span><span class="vstack"><div style="top: 0.686em;">8</div><div style="top: -0.23em;"><span class="frac-line"></span></div><div style="top: -0.677em;">1234</div><span class="baseline-fix"></span></span></span>after
</div>

Produced by adding

{% highlight css %}
.math-box .strut {
  display: inline-block; 
}
{% endhighlight %}

{% highlight html %}
before<span class="math-box">
  <span class="strut" style="height: 2.008em; vertical-align: -0.686em;"></span>
  <span class="vstack">
    <div style="top: 0.686em;">8</div>
    <div style="top: -0.677em;">1234</div>
    <div style="top: -0.23em;"><span class="frac-line"></span></div>
    <span class="baseline-fix"></span>
  </span>
</span>after
{% endhighlight %}

Conclusion...

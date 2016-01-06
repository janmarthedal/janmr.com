---
layout: post
title: Using MathML to Wrap all Math
author: Jan Marthedal Rasmussen
excerpt: |
  FOOBAR
categories:
- web-math
tags:
- mathml
---
MathML is an HTML5 standard for

It could look like this

{% highlight xml %}
<math display="block">
  <msqrt>
    <mn>1</mn>
    <mo>+</mo>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
  </msqrt>
</math>
{% endhighlight %}

which would produce

{% dmath \sqrt{1+x^2} %}

Unfortunately, browser support is far from great ...

What people do instead is use MathJax/KaTeX, dynamic or prerendered

For accessibility some include the corresponding MathML inside the HTML markup.

What if we reversed this? Use MathML as the main element and then include the HTML markup inside?

MathML has a feature called `semantics`, which can contain alternate...

&lt;annotation&gt; and &lt;annotation-xml&gt;

So the example above could be

{% highlight xml %}
<math display="block">
  <semantics>
    <msqrt>
      <mn>1</mn><mo>+</mo><msup><mi>x</mi><mn>2</mn></msup>
    </msqrt>
    <annotation encoding="application/tex">
      \sqrt{1 + x^2}
    </annotation>
    <annotation-xml encoding="text/html">
      <span class="mjx-chtml MJXc-display" style="text-align: center;">
        ...
      </span>
    </annotation-xml>
</math>
{% endhighlight %}

This is great for (math) search engines, accessibility, ...

If you view this in Chrome you get something like

...

Why? Because Chrome has a built-in (user agent) stylesheet which contains

{% highlight css %}
semantics > mi, semantics > mn, semantics > mo, semantics > mtext, semantics > mspace, semantics > ms, semantics > maligngroup, semantics > malignmark, semantics > mrow, semantics > mfrac, semantics > msqrt, semantics > mroot, semantics > mstyle, semantics > merror, semantics > mpadded, semantics > mphantom, semantics > mfenced, semantics > menclose, semantics > msub, semantics > msup, semantics > msubsup, semantics > munder, semantics > mover, semantics > munderover, semantics > mmultiscripts, semantics > mtable, semantics > mstack, semantics > mlongdiv, semantics > maction {
    display: none;
}
{% endhighlight %}

What this does is ...

The fix is ...

Nesting ...

Browser support is good but Safari ...

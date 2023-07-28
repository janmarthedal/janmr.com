---
title: Wrapping HTML inside MathML
date: '2017-02-23'
layout: post
tags:
  - mathml
  - post
categories:
  - web-math
excerpt: >-
  MathML is a mathematical markup language that can be used to integrate math
  into web pages. Unfortunately, browser support is far from great. What people
  do instead is use libraries such as MathJax which can replace the math
  container with the appropriate HTML, either server-side or client-side.
  However, putting math markup in a structured way inside math elements has many
  advantages, such as accessibility and search engines. So let's put the HTML
  inside the `math` element, alongside the MathML.
---
[MathML](https://www.w3.org/Math/) is a mathematical markup language that can be used to integrate math into web pages. For example,

``` xml
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
```

which would produce

$$
\sqrt{1+x^2} \, .
$$

Unfortunately, browser support is [far from great](http://radar.oreilly.com/2013/11/mathml-forges-on.html#browser-support) (and not as good as [caniuse.com](http://caniuse.com/#feat=mathml) reports).

What people do instead is use libraries such as [MathJax](https://www.mathjax.org/) which can replace the `math` container with the appropriate HTML, either server-side or client-side.

However, putting math markup in a structured way inside `math` elements has many advantages, such as accessibility and search engines.

So let's put the HTML inside the `math` element instead, alongside the MathML. [MathML has a feature](https://www.w3.org/TR/MathML3/chapter5.html) which makes it possible to include &ldquo;alternate representations of an expression&rdquo;. These alternate representations are put inside `annotation` or `annotation-xml` blocks. The example above could look like

``` xml
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
```

This will not display properly out-of-the-box, but Chrome's current [user agent stylesheet](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/mathml.css) comes close:

``` css
math {
    display: inline;
}

math[display="block"] {
    display: block;
    text-align: center;
}

semantics > mi, semantics > mn, semantics > mo, semantics > mtext, semantics > mspace, semantics > ms, semantics > maligngroup, semantics > malignmark, semantics > mrow, semantics > mfrac, semantics > msqrt, semantics > mroot, semantics > mstyle, semantics > merror, semantics > mpadded, semantics > mphantom, semantics > mfenced, semantics > menclose, semantics > msub, semantics > msup, semantics > msubsup, semantics > munder, semantics > mover, semantics > munderover, semantics > mmultiscripts, semantics > mtable, semantics > mstack, semantics > mlongdiv, semantics > maction {
    display: none;
}

annotation, annotation-xml {
    display: inline-block;
}
```

If a `semantics` element is present it will not show the (presentation) MathML markup, but instead show all `annotation` blocks.

This is a bit too accepting, but if we replace the bottom three lines with the following, then exactly the right `annotation-xml` blocks will be visible:

``` css
annotation, annotation-xml {
    display: none;
}

annotation-xml[encoding="text/html"] {
  display: inline-block;
}
```

Browser support for this seems to be good, with the exception of Safari.

You can experiment with a [codepen example](http://codepen.io/janmr/pen/dGNLog) and the css can be found as a [GitHub gist](https://gist.github.com/janmarthedal/1c4d0db7be01053c408b).

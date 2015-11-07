---
layout: post
title: Entering the World of Web Components
author: Jan Marthedal Rasmussen
excerpt: ! "I am very excited about Web Components. It is going to fundamentally change the way we do web development. This post is going to contain miscellaneous information and links related to Web Components.

The specification is still being developed, but the overall parts have been decided upon. To quote Introduction to Web Components, Web Components consists of five main parts..."
categories:
- programming
tags:
- web components
- polymer
- web development

---
I am very excited about Web Components. It is going to fundamentally change the way we do web development. This post is going to contain miscellaneous information and links related to Web Components.

The specification is [still being developed](http://www.w3.org/standards/techs/components), but the overall parts have been decided upon. To quote [Introduction to Web Components](http://www.w3.org/TR/components-intro/), Web Components consists of five main parts:

 1. *Templates*, which define chunks of markup that are inert but can be activated for use later.
 2. *Decorators*, which apply templates based on CSS selectors to affect rich visual and behavioral changes to documents.
 3. *Custom Elements*, which let authors define their own elements, with new tag names and new script interfaces.
 4. *Shadow DOM*, which encapsulates a DOM subtree for more reliable composition of user interface elements.
 5. *Imports*, which defines how templates, decorators and custom elements are packaged and loaded as a resource.

The site [WebComponents.org](http://webcomponents.org) is a site "where pioneers and community-members of the Web Components ecosystem \[...\] document web components best practices so that others can follow the same path instead of needlessly striking out on their own."

The [Polymer project](http://www.polymer-project.org/) is driven by Google and attempts to do several things:

 * Build an easy-to-use library on top of Web Components.
 * Provide a polyfill layer to add Polymer support to [evergreen browsers](http://tomdale.net/2013/05/evergreen-browsers/) not yet having native support for Web Components.
 * Implement and publish own core custom elements.

[Matt McNulty](https://twitter.com/mattsmcnulty) from the Polymer team recently [gave a talk](https://www.youtube.com/watch?v=yRbOSdAe_JU) on *Polymer and the Web Components revolution*. [Addy Osmani](https://twitter.com/addyosmani) also [made a video](https://www.youtube.com/watch?v=2toYLLcoY14) on how to make your own custom Polymer elements. Polymer can be followed on [Twitter](http://twitter.com/polymer) and has its [own blog](https://blog.polymer-project.org).

[X-Tag](http://x-tags.org) is a Mozilla project with a goal similar to that of Polymer. The two projects even share the polyfill layer.

[Bosonic](http://bosonic.github.io) provide tools to develop Web Components "closer to the metal", that is, following the [spec draft](http://www.w3.org/TR/components-intro) without any sugaring layer (and filling the missing parts themselves, I guess). The Bosonic approach is a bit different from Polymer and X-Tag in that they require running a transpiler to turn Web Component HTML sources into JS and CSS files before use.

One of the most powerful aspects of Web Components is the ability to create and share custom elements. [customelements.io](http://customelements.io) is a growing collection of custom elements, where anyone can submit their own creations.

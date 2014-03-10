---
layout: post
status: publish
published: true
title: ! 'Release: Sputsoft Numbers 0.2 (formerly SputArithmetic)'
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "<em>Update 2011-09-28: Both the name and the hosting of this library have
  changed since this post was first published. See the <a href=\"&#47;numbers&#47;\">project
  page<&#47;a> for up-to-date information.<&#47;em>\r\n\r\nI am very excited about
  this release. The library has been redesigned and almost everything has been rewritten.
  Even the name has changed, it is now called Sputsoft Numbers (instead of SputArithmetic).\r\n\r\n"
wordpress_id: 1354
wordpress_url: http://sputsoft.com/?p=1354
date: 2010-06-19 09:57:00.000000000 +02:00
categories:
- programming
tags:
- numbers project
- release
comments: []
---
<em>Update 2011-09-28: Both the name and the hosting of this library have changed since this post was first published. See the <a href="&#47;numbers&#47;">project page<&#47;a> for up-to-date information.<&#47;em>

I am very excited about this release. The library has been redesigned and almost everything has been rewritten. Even the name has changed, it is now called Sputsoft Numbers (instead of SputArithmetic).

<a id="more"></a><a id="more-1354"></a>

Features include:
<ul>
	<li>A generic, portable backend that should make compilation possible on practically every modern C++ compiler and architecture.<&#47;li>
	<li>Compilation against a <a href="http:&#47;&#47;gmplib.org&#47;">GMP<&#47;a> backend, which leads to high performance programs (requires that the system has installed the GMP library, of course).<&#47;li>
	<li>Usage of smart pointers which make pass-by-value and return-by-value extremely cheap operations.<&#47;li>
	<li>All functions have a common interface, such as <span class="sputcode">add(z, x, y)<&#47;span> or <span class="sputcode">mul(z, x, y).<&#47;span><&#47;li>
	<li>Operators such as <span class="sputcode">+<&#47;span>, <span class="sputcode">-<&#47;span>, <span class="sputcode">*<&#47;span> and <span class="sputcode">&#47;<&#47;span> have been overloaded to enable generic programming and more elegant code.<&#47;li>
<&#47;ul>
You can read more <a href="&#47;numbers&#47;">about the library<&#47;a> or <a href="http:&#47;&#47;sourceforge.net&#47;projects&#47;sputsoftnumbers&#47;files&#47;">download the code<&#47;a>.

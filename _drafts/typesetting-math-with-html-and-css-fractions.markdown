---
layout: post
title: Typesetting Math Using HTML and CSS -- Fractions
author: Jan Marthedal Rasmussen
excerpt: ! ""
css: |
    .math-box {
        display: inline-block;
        border: 1px solid #ddd;
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
categories: [programming]
tags: [math, typesetting, html, css]
---
This post will

<div class="panel">
before<span class="math-box"><!--
        --><span class="strut" style="height: 2.00744em; vertical-align: -0.686em;"></span><!--
        --><span class="vstack"><!--
            --><div style="top: 0.686em;">8</div><!--
            --><div style="top: -0.23em;"><span class="frac-line"></span></div><!--
            --><div style="top: -0.677em;">1234</div><!--
            --><span class="baseline-fix"></span><!--
        --></span><!--
 --></span>after
</div>

Finally, ...

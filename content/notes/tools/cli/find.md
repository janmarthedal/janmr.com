---
title: find
layout: page
---
Run command for each file:
```bash
find . -name '*.csv' -exec grep needle {} \;
```

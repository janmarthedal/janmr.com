---
title: find
layout: new-page
---
Run command for each file:
```bash
find . -name '*.csv' -exec grep needle {} \;
```

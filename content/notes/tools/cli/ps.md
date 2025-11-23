---
title: ps
layout: page
---
### How long has a process been running
```bash
ps -o etime= -p "$$"
```
where `$$` is the process id.

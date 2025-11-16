---
title: ps
layout: page
---
# ps

### How long has a process been running
```bash
ps -o etime= -p "$$"
```
where `$$` is the process id.

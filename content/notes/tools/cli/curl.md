---
title: curl
layout: page
---
[curl POST examples](https://gist.github.com/subfuzion/08c5d85437d5d4f00e58)

### POST with json data
```bash
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
```
### Silent mode
```bash
curl -s http://example.com
```

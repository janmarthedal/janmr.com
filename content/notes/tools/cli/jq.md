---
title: jq
layout: page
---
"jq is like `sed` for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that `sed`, `awk`, `grep` and friends let you play with text."

Extract the property `name` from each object in an array
```bash
jq ".[].name" repos.json > names.txt
```

Delete property
```bash
jq "del(.name)" some.json
```

Sort keys of all objects
```bash
jq "." --sort-keys some.json
```

---
title: bash
layout: page
---
# bash

## for loop

### value list

```bash
for i in 1 2 3
do
    echo "i=$i"
done
```

### sequence of numbers

```bash
for i in $(seq 1 10)
do
    echo "i=$i"
done
```

Zero-padding numbers:
```bash
for i in $(seq -f "%02g" 1 10)
do
    echo "i=$i"
done
```

### loop through lines of file

```bash
while read p; do
    echo $p
done <some-file.txt
```

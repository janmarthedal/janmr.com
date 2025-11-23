---
title: sed
layout: page
---
[Manual](https://www.gnu.org/software/sed/manual/sed.html)

### Examples

#### Prepend/append to each line of file

Command:
```bash
sed 's/.*/before & after/' < value.txt
```

Output:
```text
before value1 after
before value2 after
before value3 after
before value4 after
```

#### Extract specific line

Extract line 4:
```bash
sed '4!d' foo.csv
```

import fileinput
import re

totals = []

for name in fileinput.input():
    name = name.strip()
    if not name:
        continue
    mathjax_count = 0
    with open(name, "rt") as f:
        doc = f.read()
        print(name)
        katex_count = doc.count('<span class="katex"')
        for match in re.finditer(r'<script type="math/tex.*?">(.*?)</script>', doc, flags=re.DOTALL):
            print("  {}".format(match.group(1)))
            mathjax_count += 1
    totals.append((name, katex_count, mathjax_count))

katex_total = 0
mathjax_total = 0

for t in totals:
    print("{} {} {}".format(t[1], t[2], t[0]))
    katex_total += t[1]
    mathjax_total += t[2]

print("{} {} total".format(katex_total, mathjax_total))


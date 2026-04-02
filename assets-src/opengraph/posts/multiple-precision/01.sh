#!/bin/bash

OUT=../../../content/media/og/multiple-precision-01.png

# Create a temporary LaTeX file with the equation
cat > /tmp/equation.tex << 'EOF'
\documentclass{standalone}
\usepackage{amsmath}
\begin{document}
$\displaystyle u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{k=0}^{n-1} u_k b^k, \quad 0 \leq u_k \leq b-1$
\end{document}
EOF

# Compile LaTeX to PDF
pdflatex -output-directory=/tmp /tmp/equation.tex > /dev/null 2>&1

# Convert PDF to PNG with high resolution (600 DPI for sharper output)
magick -density 600 -background none /tmp/equation.pdf /tmp/equation.png

# Composite the equation onto the background image and add title text
magick ../../base-with-logo.png \
  -gravity center -font Helvetica -fill black \
  -pointsize 48 -annotate +0-100 "Multiple-Precision Number Representation" \
  -pointsize 24 -annotate +0-50 "First post in a series of six on multiple-precision algorithms" \
  \( /tmp/equation.png -resize 40% \) -geometry +0+80 -composite \
  $OUT

# Clean up temporary files
rm /tmp/equation.*

echo "Generated: $OUT"

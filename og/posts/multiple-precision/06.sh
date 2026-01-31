#!/bin/bash

OUT=../../../content/media/og/multiple-precision-06.png

# Create a temporary LaTeX file with the equation
cat > /tmp/equation.tex << 'EOF'
\documentclass{standalone}
\usepackage{amsmath}
\begin{document}
$\displaystyle
\hat{q} = \min \left( \left\lfloor \frac{u_n b + u_{n-1}}{v_{n-1}} \right\rfloor, b-1 \right)
$
\end{document}
EOF

# Compile LaTeX to PDF
pdflatex -output-directory=/tmp /tmp/equation.tex > /dev/null 2>&1

# Convert PDF to PNG with high resolution (600 DPI for sharper output)
magick -density 600 -background none /tmp/equation.pdf /tmp/equation.png

# Composite the equation onto the background image and add title text
magick ../../base-with-logo.png \
  -gravity center -font Helvetica -fill black \
  -pointsize 48 -annotate +0-100 "Basic Multiple-Precision Long Division" \
  -pointsize 24 -annotate +0-50 "Sixth post in a series of six on multiple-precision arithmetic" \
  \( /tmp/equation.png -resize 40% \) -geometry +0+80 -composite \
  $OUT

# Clean up temporary files
rm /tmp/equation.*

echo "Generated: $OUT"

#!/bin/bash

OUT=../../content/media/og/multiple-precision-03.png

# Create a temporary LaTeX file with the equation
cat > /tmp/equation.tex << 'EOF'
\documentclass{standalone}
\usepackage{amsmath}
\begin{document}
$\displaystyle
\begin{aligned}
w_i     &\leftarrow (u_i - v_i - k_i) \;\text{mod}\; b, \\
k_{i+1} &\leftarrow [u_i < v_i + k_i]
\end{aligned}
$
\end{document}
EOF

# Compile LaTeX to PDF
pdflatex -output-directory=/tmp /tmp/equation.tex > /dev/null 2>&1

# Convert PDF to PNG with high resolution (600 DPI for sharper output)
magick -density 600 -background none /tmp/equation.pdf /tmp/equation.png

# Composite the equation onto the background image and add title text
magick ../base-with-logo.png \
  -gravity center -font Helvetica -fill black \
  -pointsize 48 -annotate +0-100 "Multiple-Precision Subtraction" \
  -pointsize 24 -annotate +0-50 "Third post in a series of six on multiple-precision algorithms" \
  \( /tmp/equation.png -resize 40% \) -geometry +0+80 -composite \
  $OUT

# Clean up temporary files
rm /tmp/equation.*

echo "Generated: $OUT"

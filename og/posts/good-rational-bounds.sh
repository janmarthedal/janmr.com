#!/bin/bash

OUT=../../content/media/og/good-rational-bounds.png

# Create a temporary LaTeX file with the equation
cat > /tmp/equation.tex << 'EOF'
\documentclass{standalone}
\usepackage{amsmath}
\begin{document}
$\frac{205}{681} < 0.301029 < \frac{\ln(2)}{\ln(10)} < 0.301030 < \frac{146}{485}$
\end{document}
EOF

# Compile LaTeX to PDF
pdflatex -output-directory=/tmp /tmp/equation.tex > /dev/null 2>&1

# Convert PDF to PNG with high resolution (600 DPI for sharper output)
magick -density 600 -background none /tmp/equation.pdf /tmp/equation.png

# Composite the equation onto the background image and add title text
magick ../base-with-logo.png \
  -gravity center -font Helvetica -fill black \
  -pointsize 48 -annotate +0-100 "Good Rational Bounds" \
  -pointsize 24 -annotate +0-50 "Using continued fractions to obtain good, rational bounds" \
  \( /tmp/equation.png -resize 40% \) -geometry +0+80 -composite \
  $OUT

# Clean up temporary files
rm /tmp/equation.*

echo "Generated: $OUT"

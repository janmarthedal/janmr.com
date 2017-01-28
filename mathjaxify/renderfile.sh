echo Rendering $1
cp $1 /tmp/foo
sed '/<script.*MathJax\.js/d' /tmp/foo | node ./page2html.js --nodollars > $1

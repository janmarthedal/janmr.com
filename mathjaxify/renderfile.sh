echo Rendering $1
node ./page2html.js < $1 > tmp.html
mv tmp.html $1

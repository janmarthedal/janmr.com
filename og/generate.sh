magick -size 1200x630 xc:black -fill "#f8f8f8" -draw "rectangle 3,3 1196,626" base-frame.png
magick base-frame.png \( janmr-logo.png -resize 50% \) -gravity NorthEast -geometry +13+13 -composite base.png

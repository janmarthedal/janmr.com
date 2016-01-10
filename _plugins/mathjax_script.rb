Jekyll::Hooks.register :posts, :post_render do |post|
    if post.output.include? '<script type="math/tex'
        post.output.sub!('<!-- nomj -->', '<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML" async></script>')
    end
end

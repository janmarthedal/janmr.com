Jekyll::Hooks.register :posts, :post_render do |post|
    if post.output.include? '<script type="math/tex'
        post.output.sub!('<!-- nomj -->', '<script type="text/x-mathjax-config">MathJax.Hub.Config({menuSettings: {CHTMLpreview: false}});</script><script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>')
    end
end

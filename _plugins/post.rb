module Jekyll
  class Post

    alias orig_render render

    def render(layouts, site_payload)
        res = orig_render(layouts, site_payload)
        if self.output.include? '<script type="math/tex'
          self.output.sub!('<!-- nomj -->', '<script type="text/x-mathjax-config">MathJax.Hub.Config({menuSettings: {CHTMLpreview: false}});</script><script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>')
        end
        res
    end

  end
end


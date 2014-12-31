require 'octopress-hooks'

module BlogHooks
  class BlogPageHooks < Octopress::Hooks::Post

    def post_render(page)
      if page.output.include? '<script type="math/tex'
        page.output.sub!('<!-- nomj -->', '<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>')
      end

    end

  end
end


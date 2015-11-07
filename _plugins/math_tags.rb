require 'uri'
require 'net/http'

module Jekyll
  class MathTags < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      is_block = tag_name == 'dmath'
      tag = is_block ? 'div' : 'span'
      #html = katex_markup(source.strip, is_block)
      html = mathjax_markup(source.strip, is_block)
      @source = "<#{tag} class=\"math-item\">#{html}</#{tag}>"
    end

    def render(context)
      @source
    end

    def katex_markup(source, is_block)
      html = Net::HTTP.get('localhost', '/render?q=' + URI.encode_www_form_component(source) + '&d=' + (is_block ? 'block' : 'inline'),
                           3000).force_encoding('utf-8').strip
      html == '-' ? mathjax_markup(source, is_block) : html
    end

    def mathjax_markup(source, is_block)
      type = is_block ? 'math/tex; mode=display' : 'math/tex'
      coded = source.unpack('H*')[0]
      "<script type=\"#{type}\">-RAW-#{coded}-</script>"
    end

  end
end

Liquid::Template.register_tag('imath', Jekyll::MathTags)
Liquid::Template.register_tag('dmath', Jekyll::MathTags)

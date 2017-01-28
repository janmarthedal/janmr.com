module Jekyll
  class MathTags < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      type = tag_name == 'dmath' ? 'math/tex; mode=display' : 'math/tex'
      coded = source.strip.unpack('H*')[0]
      @source = "<script type=\"#{type}\">-RAW-#{coded}-</script>"
    end

    def render(context)
      @source
    end

  end
end

Liquid::Template.register_tag('imath', Jekyll::MathTags)
Liquid::Template.register_tag('dmath', Jekyll::MathTags)

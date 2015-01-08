module Jekyll
  class MathTags < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      @source = combined(source.strip, tag_name == 'dmath')
    end

    def render(context)
      @source.strip
    end

    def simple(source, is_block)
      if is_block
        return '<div class="math-item"><script type="math/tex; mode=display">-RAW-' + source.unpack('H*')[0] + '-</script></div>'
      else
        return '<span class="math-item"><script type="math/tex">-RAW-' + source.unpack('H*')[0] + '-</script></span>'
      end
    end

    def combined(source, is_block)
      source = source.split('\\').join('\\\\')
      source = source.gsub('$', '\\\\$')
      if is_block
        return `cd _plugins; node tex2html.js "#{source}" block`
      else
        return `cd _plugins; node tex2html.js "#{source}"`
      end
    end

  end
end

Liquid::Template.register_tag('imath', Jekyll::MathTags)
Liquid::Template.register_tag('dmath', Jekyll::MathTags)


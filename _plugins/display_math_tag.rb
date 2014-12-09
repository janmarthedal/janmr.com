module Jekyll
  class DisplayMathTag < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      source = source.strip.split('\\').join('\\\\')
      @source = `cd _plugins; node tex2html.js "#{source}" block`
    end

    def render(context)
      @source.strip!
    end

  end
end

Liquid::Template.register_tag('dmath', Jekyll::DisplayMathTag)


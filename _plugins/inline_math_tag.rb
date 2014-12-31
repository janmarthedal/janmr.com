module Jekyll
  class InlineMathTag < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      source = source.strip.split('\\').join('\\\\')
      source = source.gsub('$', '\\$')
      @source = `cd _plugins; node tex2html.js "#{source}"`
    end

    def render(context)
      @source.strip!
    end

  end
end

Liquid::Template.register_tag('imath', Jekyll::InlineMathTag)


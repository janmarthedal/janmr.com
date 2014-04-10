module Jekyll
  class InlineMathTag < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      @source = source.strip.split('\\').join('\\\\').gsub("_", "\\_")
    end

    def render(context)
      "\\\\\(#{@source}\\\\\)"
    end
  end
end

Liquid::Template.register_tag('imath', Jekyll::InlineMathTag)


module Jekyll
  class BookCoverTag < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      @source = source
      @source.strip!
    end

    def render(context)
      baseurl = context.registers[:site].config['baseurl']
      "#{baseurl}media/books/#{@source}.jpg"
    end
    
  end
end

Liquid::Template.register_tag("bookcover", Jekyll::BookCoverTag)


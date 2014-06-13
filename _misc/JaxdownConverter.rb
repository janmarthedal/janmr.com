module Jekyll
  class JaxdownConverter < Converters::Markdown

    alias :markdown_convert :convert

    def matches(ext)
      ext =~ /^\.jaxdown$/i
    end

    def convert(content)
      items = content.split('$$')
      items.each_with_index {|val, index|
        if index % 2 != 0
          items[index] = '\\[' + val + '\\]'
        end
      }
      content = items.join
      result = markdown_convert(content)
      result
    end

  end
end

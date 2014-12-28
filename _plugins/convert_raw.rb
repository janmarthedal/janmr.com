module Jekyll
  module ConvertRaw
    def convert_raw(input)
      input.gsub(/-RAW-([0-9a-f]+)-/) {[$1].pack('H*')}
    end
  end
end

Liquid::Template.register_filter(Jekyll::ConvertRaw)

module Jekyll
  class AmazonTag < Liquid::Tag

    def initialize(tag_name, source, tokens)
      super
      @source = source
      @source.strip!
    end

    def render(context)
      case @source
      when "abramowitz"
        "http://www.amazon.com/gp/product/0486612724?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0486612724"
      when "pww1"
        "http://www.amazon.com/gp/product/0883857006?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0883857006"
      when "concrete"
        "http://www.amazon.com/gp/product/0201558025?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201558025"
      when "conway-guy"
        "http://www.amazon.com/gp/product/038797993X?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=038797993X"
      when "davis00"
        "http://www.amazon.com/gp/product/0393322297?ie=UTF8&tag=sputsoft-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0393322297"
      when "derbyshire03"
        "http://www.amazon.com/gp/product/0452285259?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0452285259"
      when "derbyshire06"
        "http://www.amazon.com/gp/product/0452288533?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0452288533"
      when "hackers-delight"
        "http://www.amazon.com/gp/product/0201914654?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201914654"
      when "hardy-div"
        "http://www.amazon.com/gp/product/0821826492?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0821826492"
      when "hardy-wright"
        "http://www.amazon.com/gp/product/0198531710?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0198531710"
      when "hawking"
        "http://www.amazon.com/gp/product/0762430044?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0762430044"
      when "khinchin"
        "http://www.amazon.com/gp/product/0486696308?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0486696308"
      when "korner"
        "http://www.amazon.com/gp/product/0521568234?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0521568234"
      when "mathmyst"
        "http://www.amazon.com/gp/product/0306454041?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0306454041"
      when "numbers-games"
        "http://www.amazon.com/gp/product/1568811276?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1568811276"
      when "proofsbook"
        "http://www.amazon.com/gp/product/3540404600?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=3540404600"
      when "pww2"
        "http://www.amazon.com/gp/product/0883857219?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0883857219"
      when "sicp"
        "http://www.amazon.com/gp/product/0262510871?ie=UTF8&tag=sputsoft-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0262510871"
      when "stanley97"
        "http://www.amazon.com/gp/product/0521663512?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0521663512"
      when "stepanov09"
        "http://www.amazon.com/gp/product/032163537X?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=032163537X"
      when "stroustrup"
        "http://www.amazon.com/gp/product/0201700735?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201700735"
      when "taocp1"
        "http://www.amazon.com/gp/product/0201896834?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0201896834"
      when "taocp2"
        "http://www.amazon.com/gp/product/0201896842?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201896842"
      when "taocp3"
        "http://www.amazon.com/gp/product/0201896850?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201896850"
      when "taocp1f1"
        "http://www.amazon.com/gp/product/0201853922?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853922"
      when "taocp4f0"
        "http://www.amazon.com/gp/product/0321534964?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321534964"
      when "taocp4f1"
        "http://www.amazon.com/gp/product/0321580508?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321580508"
      when "taocp4f2"
        "http://www.amazon.com/gp/product/0201853930?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853930"
      when "taocp4f3"
        "http://www.amazon.com/gp/product/0201853949?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853949"
      when "taocp4f4"
        "http://www.amazon.com/gp/product/0321335708?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321335708"
      end
    end
    
  end
end

Liquid::Template.register_tag("amazon", Jekyll::AmazonTag)


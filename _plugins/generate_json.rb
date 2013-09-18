module Jekyll
  require 'json'

  class JsonFile < StaticFile
    def write(dest)
      begin
        super(dest)
      rescue
      end

      true
    end
  end

  class JSONGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Converter for .md > .html
      converter = site.getConverterImpl(Jekyll::Converters::Markdown)

      # Start building the path
      path = "_site/content"
      hash = Hash.new("0")

      # Iterate over all posts
      site.posts.each do |post|

        # Encode the HTML to JSON
        link = post.url
        hash[link] = {"title" => post.title, "content" => converter.convert(post.content)}
      end

	  	# hash = [hashstring.join(',')]

	    # Create the directories from the path
	    FileUtils.mkpath(path) unless File.exists?(path)

	    # Create the JSON file and inject the data
	    f = File.new("#{path}/content.json", "w+")
	    f.puts JSON.generate(hash)

	    site.static_files << Jekyll::JsonFile.new(site, site.dest, "content", "content.json")

    end

  end

end
module Jekyll
	require 'json'

	# Fix issue whereby Jekyll cleans out unrecognised files
	class JsonFile < StaticFile
    	def write(dest)
      		begin
        		super(dest)
      			rescue
      		end
			true
    	end
  	end

  	# Generate the required JSON file to hold all posts and pages
  	class JSONGenerator < Generator
    	safe true
    	priority :low

    	def generate(site)

      		# Converter for Markdown to HTML
      		converter = site.getConverterImpl(Jekyll::Converters::Markdown)

      		# Start building the path to the JSON file and an empty hash
      		path = "_site/content"
      		hash = Hash.new("0")

      		# Iterate over all posts
      		site.posts.each do |post|

        		# Encode the post HTML content to JSON
        		link = post.url
        		hash[link] = { "title" => post.title, "content" => converter.convert(post.content) }
      		end

      		# Iterate over all pages
      		site.pages.each do |page|

        		# Encode the page HTML content to JSON
        		link = page.url
        		hash[link] = { "title" => page.data['title'], "body_class" => page.data['body_class'], "content" => converter.convert(page.content) }
      		end

	    	# Create the directories from the path
	    	FileUtils.mkpath(path) unless File.exists?(path)

	    	# Create the JSON file and inject the data
	    	f = File.new("#{path}/content.json", "w+")
	    	f.puts JSON.generate(hash)

	    	site.static_files << Jekyll::JsonFile.new(site, site.dest, "content", "content.json")

    	end
	end
end
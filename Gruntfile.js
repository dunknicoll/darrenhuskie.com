/*
 * Gruntfile
 * http://darrenhuskie.com
 * @author Darren Huskie
 */

 'use strict';


// Grunt module
module.exports = function(grunt) {

	// Load required npm tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-jekyll');

  	// Grunt configuration
  	grunt.initConfig({

  		pkg: grunt.file.readJSON('package.json'),

		jekyll: {
			server: {
				server : true,
				server_port : 4000,
				auto : true
			},
	    	dist: {
	      		options: {
	        		config: '_config.yml, _config.build.yml'
	      		}
	    	},
	    	serve: {
	      		options: {
	        		drafts: true
	      		}
	    	}
	  	},

	    sass:
	    {
	      options:
	      {
	        style: 'compressed'
	      },
	      dist:
	      {
	        files:
	        {
	          'assets/css/style.css' : 'assets/sass/style.scss',
	          'assets/css/old-ie.css' : 'assets/sass/old-ie.scss'
	        }
	      }
	    },


	    concat:
	    {
	      dist:
	      {
	        src: [
	          'assets/js/src/libs/jquery-1.10.1.min.js',
	          'assets/js/src/init.js'
	        ],
	        dest: 'assets/js/build/build.js'
	      }
	    },

	    uglify: {
	      dist: {
	        files: {
	          'assets/js/build/build.min.js': ['assets/js/build/build.js']
	        }
	      }
	    },


	    watch:
	    {
	    	jekyll: {
				files: ['templates/*.html'],
				tasks: ['jekyll:serve']
			},

	    	css:
	      	{
	        	files: 'assets/sass/**/*.scss',
	        	tasks: ['sass']
	      	},

	      	concat:
	      	{
	        	files: 'assets/js/src/**/*.js',
	        	tasks: ['concat']
	      	},

	      	scripts: {
	        	files: ['assets/js/build/build.js'],
	        	tasks: ['uglify']
	      	}
	    }

	});


  	// Register the default grunt task - run from command line using 'grunt'
	grunt.registerTask('default', [
	    'sass:dist',
	    'concat:dist',
	    'uglify:dist',
	    'watch'
	]);

	// Register the build grunt task - run from command line using 'grunt build'
	grunt.registerTask('build', [
		'sass:dist',
		'concat:dist',
		'uglify:dist',
		'jekyll:server'
	]);

};
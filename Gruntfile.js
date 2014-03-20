'use strict';

module.exports = function (grunt) {

	// Dynamically load npm tasks

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Banner

		banner: '\n/*\n * Generated with Grunt on <%= grunt.template.today("dd.mm.yyyy") %> at <%= grunt.template.today("H:MM:ss") %>\n */\n',


		///////////////////////////////////////////////////////////

		// Directories

		project: {

			// Cache

			cache: 'public/cache',

			// Scripts

			scripts: [
				'public/js/*.js',
				'public/modules/*/*.js',
				'public/modules/*/skins/*.js'
			],

			scriptsLint: [
				'public/modules/*/*.js',
				'public/modules/*/skins/*.js'
			],

			// Styles

			styles: [
				'public/css/*.less',
				'public/modules/*/*.less',
				'public/modules/*/skins/*.less'
			],

			// Markup

			markup: [
				'public/*.php',
				'public/modules/*/*.phtml'
			]
		},


		///////////////////////////////////////////////////////////

		// Styles

		less_imports: {
			all: {
				src : '<%= project.styles %>',
				dest : '<%= project.cache %>/less-imports.less'
			}
		},

		less: {
			options: {
				sourceMap: true,
				sourceMapFilename: '<%= project.cache %>/styles.css.map',
				sourceMapRootpath: '../',
				sourceMapBasepath: 'public'
			}

			,all: {
				src : '<%= project.cache %>/less-imports.less',
				dest : '<%= project.cache %>/styles.css'
			}
		},

		/**
		 * https://github.com/nDmitry/grunt-autoprefixer
		 */
		autoprefixer: {
			options: {
				cascade: true
			},
			all: {
				src: '<%= project.cache %>/styles.css',
				dest: '<%= project.cache %>/styles.css'
			}
		},

		/**
		 * CSSMin
		 * CSS minification
		 * https://github.com/gruntjs/grunt-contrib-cssmin
		 */
		cssmin: {
			min: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'<%= project.cache %>/styles.css': '<%= project.cache %>/styles.css'
				}
			}
		},


		///////////////////////////////////////////////////////////

		// Scripts

		jshint: {
			files: '<%=project.scriptsLint%>'
		},

		uglify: {

			dev: {
				options: {
					banner: '<%= banner %>',
					beautify: true,
					sourceMap: '<%=project.cache%>/scripts.map.js',
					sourceMapRoot: '../',
					sourceMappingURL: 'scripts.map.js'
				},

				files: {
					'<%=project.cache%>/scripts.js': ['<%=project.scripts%>']
				}
			},

			min: {
				options: {
					banner: '<%= banner %>',
					sourceMap: '<%=project.cache%>/scripts.map.js',
					sourceMapRoot: '../',
					sourceMappingURL: 'scripts.map.js'
				},

				files: {
					'<%=project.cache%>/scripts.js': ['<%=project.scripts%>']
				}
			}
		},



		///////////////////////////////////////////////////////////

		// Watch

		watch: {
			scripts: {
				files: ['Gruntfile.js', '<%= project.scripts %>'],
				tasks: ['jshint', 'uglify']
			},
			styles: {
				files: '<%= project.styles %>',
				tasks: ['less_imports', 'less']
			},
			livereload: {
				options: {
					livereload: 35729
				},
				files: [
					'Gruntfile.js',
					'<%= project.scripts %>',
					'<%= project.styles %>',
					'<%= project.markup %>',
				]
			}
		}
	});


	///////////////////////////////////////////////////////////
	
	// Default Tasl
	grunt.registerTask('default', [
		'less_imports',
		'less',
		'autoprefixer',
		'jshint',
		'uglify:dev',
		'watch'
	]);


	// Minification
	
	grunt.registerTask('min', [
		'less_imports',
		'less',
		'autoprefixer',
		'cssmin',
		'jshint',
		'uglify:min'
	]);

};

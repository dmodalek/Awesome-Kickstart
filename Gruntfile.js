/*!
 * Awesome Frontend Boilerplate
 * https://github.com/dmodalek/awesome-frontend-boilerplate
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
	port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

/**
 * Grunt module
 */
module.exports = function (grunt) {

	/**
	 * Dynamically load npm tasks
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	/**
	 * FireShell Grunt config
	 */
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Banner

		banner: '\n/*\n * Generated with Grunt on <%= grunt.template.today("dd.mm.yyyy") %> at <%= grunt.template.today("H:MM:ss") %>\n */\n',

		////////////////////////////////////////////////////////////////////////////////

		// Directories

		project: {

			src: 'src',
			public: 'public',
			css: [
				'<%= project.src %>/scss/import.scss'
			],
			js: [
				'<%= project.src %>/js/{,*/}*.js',
			]
		},


		////////////////////////////////////////////////////////////////////////////////

		// Tasks

		/**
		 * Connect port/livereload
		 * https://github.com/gruntjs/grunt-contrib-connect
		 * Starts a local webserver and injects
		 * livereload snippet
		 */

		connect: {
			options: {
				port: 9000,
				hostname: '*'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [lrSnippet, mountFolder(connect, 'public')];
					}
				}
			}
		},

		/**
		 * JSHint
		 * https://github.com/gruntjs/grunt-contrib-jshint
		 * Manage the options inside .jshintrc file
		 */

		jshint: {
			files: ['src/js/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		/**
		 * Concatenate JavaScript files
		 * https://github.com/gruntjs/grunt-contrib-concat
		 * Imports all .js files and publicends project banner
		 */
		concat: {
			dev: {
				files: {
					'<%= project.public %>/js/scripts.min.js': '<%= project.js %>'
				}
			},
			options: {
				stripBanners: true,
				nonull: true,
				banner: '<%= banner %>'
			}
		},

		/**
		 * Uglify (minify) JavaScript files
		 * https://github.com/gruntjs/grunt-contrib-uglify
		 * Compresses and minifies all JavaScript files into one
		 */
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			public: {
				files: {
					'public/js/scripts.min.js': '<%= project.js %>'
				}
			}
		},

		/**
		 * Compile Sass/SCSS files
		 * https://github.com/gruntjs/grunt-contrib-sass
		 * Compiles all Sass/SCSS files and publicends project banner
		 */
		sass: {
			dev: {
				options: {
					banner: '<%= banner %>',
					style: 'nested',
					sourcemap: true,
					require: 'sass-globbing'
				},
				files: {
					'<%= project.public %>/css/style.min.css': '<%= project.css %>'
				}
			},

			prod: {
				options: {
					banner: '<%= banner %>',
					style: 'compressed',
					sourcemap: true,
					require: 'sass-globbing'
				},
				files: {
					'<%= project.public %>/css/style.min.css': '<%= project.css %>'
				}
			}
		},

		/**
		 * Opens the web server in the browser
		 * https://github.com/jsoverson/grunt-open
		 */
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>',
				app: 'Firefox' // 'Firefox' or 'Google Chrome'
			}
		},

		/**
		 * Runs tasks against changed watched files
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * Watching development files and run concat/compile tasks
		 * Livereload the browser once complete
		 */
		watch: {
			concat: {
				files: '<%= project.src %>/js/{,*/}*.js',
				tasks: ['concat:dev', 'jshint']
			},
			sass: {
				files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
				tasks: ['sass:dev']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'Gruntfile.js',
					'<%= project.public %>/index.html',
					'<%= project.public %>/css/*.css',
					'<%= project.public %>/js/{,*/}*.js',
					'<%= project.public %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		}
	});

	/**
	 * Default task
	 * Run `grunt` on the command line
	 */
	grunt.registerTask('default', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'connect:livereload',
		'open',
		'watch'
	]);


	/**
	 * Dev task without opening
	 * Run `grunt` on the command line
	 */
	grunt.registerTask('dev', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'connect:livereload',
		'watch'
	]);

	/**
	 * Build task
	 * Run `grunt build` on the command line
	 * Then compress all JS/CSS files
	 */
	grunt.registerTask('prod', [
		'sass:prod',
		'jshint',
		'uglify',
	]);

};

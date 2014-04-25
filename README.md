# Awesome Kickstart

![Awesome Theme](https://raw.github.com/dmodalek/awesome-kickstart/master/public/img/example-logo.png)

A Kickstart for your next PHP Project using Terrific, LESS and Grunt.

- The Terrific Concept (https://github.com/brunschgi/terrificjs)
- The official Wordpress Starter Theme (https://github.com/Automattic/_s/)
- HTML5 Mobile Boilerplate (http://html5boilerplate.com/mobile)
- Grunt (https://github.com/gruntjs/grunt)

## Getting started

* Clone this repo in your project folder 
```bash
  $ git clone git@github.com:dmodalek/Awesome-Kickstart.git .
```
* Install dependencies
```bash
  $ npm install
```
* Build with Grunt
```bash
  $ grunt
```
* Point your vHost to the project public folder
```bash
# Your project
<VirtualHost *:80>
    ServerName your-project.loc
    DocumentRoot "/Users/You/Sites/Your-Project/git"
</VirtualHost>
```
* Open your browser and start developing


## Features

Here are some of the main features:

* Livereloading the browser and file injection upon changes in CSS, JS or HTML
* Sourcemaps for CSS and JS
* Automatic CSS Vendor prefixes
* Debug Helper for your Grid System
* Baseline HTML5 template and features, DNS prefetching, responsive meta
* Encourages one-file CSS/JS in the view (HTML) for performance
* Includes jQuery CDN and relative fallback
* Includes Modernizr and HTML5 Shiv
* Google Universal Analytics snippet
* Open source workflow with Grunt.js running on Node.js
* Includes .editorconfig for consistent coding styles in IDEs
* Standard .gitignore to ignore standard ignorables such as .DS_Store
* JSHint .jshintrc file for configuring JavaScript linting
* No superfluous code comments
* Extremely lightweight footprint


## Based on...

* Terrific: [https://github.com/brunschgi/terrificjs)
* Fireshell: [github.com/toddmotto/fireshell](https://github.com/toddmotto/fireshell)

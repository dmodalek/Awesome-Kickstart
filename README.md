# Awesome Kickstart

A Kickstart for your next PHP Project using Terrific, LESS and Grunt.

* Source: [github.com/dmodalek/awesome-frontend-kickstart](http://github.com/dmodalek/awesome-kickstart)

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
    DocumentRoot "/Users/You/Sites/Your-Project/public"
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


## File Overview

````
├── public
│   ├── cache
│   ├── css
│   ├── fonts
│   ├── img
│   ├── js
│   ├── modules
│   ├── php
│   ├── apple-touch-icon-precomposed.png
│   ├── favicon.ico
│   └── index.html
├── .editorconfig
├── .gitignore
├── .jshintrc
├── CHANGELOG.md
├── Gruntfile.js
├── package.json
└── README.md
````

## Based on...

* Fireshell: [github.com/toddmotto/fireshell](https://github.com/toddmotto/fireshell)
* Rhythmless: [paulgb.github.io/rhythmless](http://paulgb.github.io/rhythmless)

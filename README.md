# Workflow #

---

## Table of Contents ##
* [Preparing Workflow](#preparing-workflow)
* [Directory Structure](#directory-structure)
* [CSS/JS Optimization](#optimization)
* [Template Engine](#template-engine)
* [Gulp Tasks](#gulp-tasks)

---

### Preparing Workflow ###
_Only used if starting from scratch and/or modifying workflow_
* npm init
* npm install gulp --save-dev
* npm install gulp-sass --save-dev
* npm install gulp-nunjucks-render --save-dev
* npm install browser-sync --save-dev
* npm install gulp-useref --save-dev
* npm install gulp-uglify --save-dev
* npm install gulp-if --save-dev
* npm install gulp-cssnano --save-dev
* npm install gulp-imagemin --save-dev
* npm install gulp-cache --save-dev
* npm install del --save-dev
* npm install run-sequence --save-dev

ADD gulp connect-php and use with browserSync
ADD gulp sourcemaps
ADD gulp autoprefixer

---

### Directory Structure ###

    |- root/
      |- core/ (if using php; soon to be deprecated)
        |- .htaccess
        |- config.inc.php
        |- controller/
        |- model/
        |- view/
      |- src/
        |- css/
        |- fonts/
        |- images/
        |- index.html
        |- js/
        |- pages/
        |- scss/
          |- styles.scss
          |- partials/
            |- _config.scss
            |- _settings.scss
            |- _variables.scss
        |- templates/
          |- macros/
          |- partials/
          |- layout.njk.html (main nunjucks layout)
      |- dist/
      |- gulpfile.js
      |- node_modules/
      |- package.json

---

### Optimization ###
#### _Basic useref syntax_ ####

    <!-- build:css css/combined.css -->
        <link href="css/one.css" rel="stylesheet">
        <link href="css/two.css" rel="stylesheet">
    <!-- endbuild -->

    <!-- build:js scripts/combined.js -->
      <script type="text/javascript" src="scripts/one.js"></script>
      <script type="text/javascript" src="scripts/two.js"></script>
    <!-- endbuild -->

---

### Template Engine ###
#### _Nunjucks_ ####
  * Essential Nunjucks files have an .njk extension (i.e. layout.njk.html)
  * src/templates/layout.njk.html holds the header, main code block, and footer
  * Views are in src/pages
  * src/templates/macros - for dynamic partials/macros
  * src/templates/partials - for static partials
  * More: https://mozilla.github.io/nunjucks/

---

### Gulp Tasks ###

#### _Development_ ####
      gulp
  Default task (used in development, before production/distribution). Spools up browserSync server and opens in browser. Watches files for changes and reloads browserSync when files are changed and saved. Renders full html files from templates, pages, partials, and macros. Compiles Sass into CSS.

#### _Distribution_ ####
      gulp build

  Build task. Compiles Sass into CSS. Renders complete html files from templates. Optimizes/minifies CSS, JS and images. Cleans dist/ directory. Moves all relevant files, including images and fonts, to dist/ directory, thus creating the packaged project.

bower-main
===============

Made to be used with Gulp. Get bower main files as normal file names array and as minimized file names array.
If no minified version is found for some files, these file names will be available as a 3rd array so you can minify them yourself.
It uses [bower-main-files](https://www.npmjs.com/package/main-bower-files), manipulates the result and checks for the
availability of a minimized version (in the bower package).

## Installation

```shell
  npm install --save-dev bower-main
```

## Usage

Require the module and get a set of files, giving two paramenters: First paramenter is the non-mimified file extension,
like 'js' or 'css'. Second parameter is the minified file extension, like 'min.js' or 'min.css'.
Here is a usage with JavaScript files:

```js
var bowerMain = require('bower-main');
var bowerMainJavaScriptFiles = bowerMain('js','min.js');

var normalJavaScriptFileNamesArray           = bowerMainJavaScriptFiles.normal;
var minifiedJavaScriptFileNamesArray         = bowerMainJavaScriptFiles.minified;
var minifiedJavaScriptFileNamesNotFoundArray = bowerMainJavaScriptFiles.minifiedNotFound;
```

## Example with Gulp

Again, the example uses JavaScript files:

```js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var bowerMain = require('bower-main');

var bowerMainJavaScriptFiles = bowerMain('js','min.js');

gulp.task('vendorScriptsDevelopment', function() {
  return gulp.src(bowerMainJavaScriptFiles.normal)
    .pipe(concat('vendor-scripts.js'))
    .pipe(gulp.dest('dev'))
});

gulp.task('vendorScriptsProduction', function() {
  return merge2(
    gulp.src(bowerMainJavaScriptFiles.minified),
    gulp.src(bowerMainJavaScriptFiles.minifiedNotFound)
      .pipe(concat('tmp.min.js'))
      .pipe(uglify())
  )
    .pipe(concat('vendor-scripts.min.js'))
    .pipe(gulp.dest('dist'))
});
```

## LICENSE

MIT © Frode Fikke <frodefi@gmail.com>

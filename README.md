bower-main
===============

Made to be used with Gulp. Get bower main files as normal file names array and as minimized file names array.
If no minified version is found for some files, these file names will be available as a 3rd array so you can minify them yourself.
It uses [bower-main-files](https://www.npmjs.com/package/main-bower-files), manipulates the result and checks the
availability of a minimized version.

## Installation

```shell
  npm install --save-dev bower-main
```

## Usage

Require the module and get a set of files (example js-files):

```js
var bowerMain = require('bower-main');
var bowerMainJavaScriptFiles = bowerMain('js','min.js');

var normalJavaScriptFilesArray           = bowerMainJavaScriptFiles.normal;
var minifiedJavaScriptFilesArray         = bowerMainJavaScriptFiles.minified;
var minifiedJavaScriptFilesNotFoundArray = bowerMainJavaScriptFiles.minifiedNotFound;
```

## Example with Gulp

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

(MIT License)

Copyright (c) 2015 Frode Fikke <frodefi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

bower-main
===============

Intended to be used with Gulp. Get bower main files in both normal and minimized formats (if available in package).
It uses [bower-main-files](https://www.npmjs.com/package/main-bower-files) and manipulates the result.

## Installation

```shell
  npm install bower-main --save
```

## Usage

Require the module

```js
var bowerMain = require('bower-main');
```

To get a none-minified list of a certain kind of assets, call method 'assets' with the desired file extension, like '.js', '.css' and so on.

```js
bowerMain.assets('.js')
```

To get a minified list of a certain kind of assets, call method 'assets' with the desired file extension (like above)
and the minified file extension, like '.min.js', '.min.js.gzip', '.min.css' and so on.
If no minified version is found, the original is kept.

```js
bowerMain.assets('.js','.min.js')
```

## Example with Gulp

```js
var concat = require('gulp-concat');
var bowerMain = require('bower-main');

gulp.task('vendorScriptsDevelopment', function() {
  return gulp.src(bowerMain.assets('.js'))
    .pipe(concat('vendor-scripts.js'))
    .pipe(gulp.dest('dev'))
});

gulp.task('vendorScriptsProduction', function() {
  return gulp.src(bowerMain.assets('.js','.min.js'))
    .pipe(concat('vendor-scripts.js'))
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

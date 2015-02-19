var mainBowerFiles = require('main-bower-files'),
  fs = require('fs');

/**
 * Get an array the defined main bower files (therefore being non-minified), filtered for the desired type (extension)
 * Get an array of minified variants of the main bower files, if exist in the packages,
 * filtered for the desired type (extension) and type of minification.
 * If minified variant is not found, original will be kept.
 *
 * @param  {String} extension - The asset type you want, for example .js or .css
 * @param  {String} minifiedExtension - Optional: The minified asset type you want, for example .min.js, .min.js.gzip or .min.css
 * @return {Object} - With the properties of type Array: 'normal', 'minified' and 'minifiedNotFound'. The last two properties is only present if function is called with both parameters.
 */
module.exports = function (extension, minifiedExtension) {
  var matchExtension = new RegExp('.+\.' + extension + '$'),
    matchMinifiedExtension = new RegExp('.+\.' + minifiedExtension + '$'),
    filenameWithoutExtension = new RegExp('^(.+)\.' + extension + '$'),
    result = {},
    tmpFiles;

  result.normal = mainBowerFiles()
    .filter(function (filename) {
      return filename.match(matchExtension)
    });

  if (minifiedExtension) {
    tmpFiles = result.normal.map(function (orgFilename) {
      var minFilename = orgFilename.replace(filenameWithoutExtension, '$1.' + minifiedExtension);
      if (fs.existsSync(minFilename)) {
        return minFilename
      }
      return orgFilename;
    });
    result.minified = tmpFiles.filter(function (filename) {
      return filename.match(matchMinifiedExtension)
    });
    result.minifiedNotFound = tmpFiles.filter(function (filename) {
      if (filename.indexOf(minifiedExtension, this.length - minifiedExtension.length) === -1) {
        return filename;
      }
    });
  };

  return result;
};

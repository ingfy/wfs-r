var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var PLUGIN_NAME = 'manifest-data';
var fs = require('fs');
var _ = require('lodash');

module.exports = function jsonMerge(source) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) return cb(null, false);
		if (file.isStream()) 
			return cb(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));

		if (file.isBuffer()) {
			var target = JSON.parse(file.contents.toString(enc));
			
			target = _.merge(target, source);

			file.contents = new Buffer(JSON.stringify(target, null, 4));
		}

		cb(null, file);
	});
};
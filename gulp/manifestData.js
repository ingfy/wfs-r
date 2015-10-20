var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var PLUGIN_NAME = 'manifest-data';
var fs = require('fs');

var attributeMap = {
	// Map of manifest.json keys from package.json keys
	'description': 'description',
	'name': 'name'
};

function addManifestData(packageJson) {
	var packageInfo = fs.readFileSync(packageJson);

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) return cb(null, false);
		if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));

		if (file.isBuffer()) {
			var manifest = JSON.parse(file.contents.toString(enc));

			for (var manifestKey in attributeMap) {
				var packageJsonKey = attributeMap[manifestKey];
				manifest[manifestKey] = packageInfo[packageJsonKey];
			}

			manifest.description = packageInfo.description;
			manifest.name = packageInfo.name;

			file.contents = new Buffer(JSON.stringify(manifest));
		}

		cb(null, file);
	});
}

module.exports = { add: addManifestData };
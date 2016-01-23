gulp = require 'gulp'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
browserify = require 'browserify'
tsify = require 'tsify'
del = require 'del'
fs = require 'fs'
stream = require 'stream'
mocha = require 'gulp-mocha' 
zip = require 'gulp-zip'
path = require 'path'
merge = require 'merge-stream'
domains = require './src/domains.js'
jsonMerge = require './gulp/gulp-jsonMerge'
	
config =
	paths:
		build: './build'
		dist: './dist'
		resources: './resources'
		source: './src'
		tests: './test'		
	dirs:
		contentScripts: './contentScripts'
	files:
		eventPageScript: 'eventPage.js'
		contentScript: 'contentScript.js'
		mainIn: 'eventPage.ts'
		packageJson: 'package.json'
		manifest: 'manifest.json'
	sourceMaps: !gutil.env.production
	
config.paths.contentScripts = path.join config.paths.source, config.dirs.contentScripts


gulp.task 'default', ['test', 'build']
gulp.task 'deploy', ['test', 'build', 'zip']
gulp.task 'build', ['clean', 'manifest', 'resources', 'js']

gulp.task 'zip', ['build'], () -> 
	manifest = require (config.paths.build + '/' + config.files.manifest)
	packageName = "#{manifest.name} v#{manifest.version}"
	packageFileName = "#{packageName}.zip"
	mapFileName = "#{packageName}-maps.zip"
	
	gulp.src [config.paths.build + '/**', '!' + config.paths.build + '/**/*.map']
		.pipe zip packageFileName
		.pipe gulp.dest config.paths.dist

gulp.task 'test', () ->
	require 'typescript-require'
	
	gulp.src [config.paths.tests + '/**/*.ts'], {read: false}
		.pipe mocha()
		
basename = (filename) ->
	path.basename filename, path.extname filename
	
arrayize = (e) -> if (e instanceof Array) then e else [e]
    
contentScripts = 
	({
		in: script.main, 
		domains: arrayize(domains.sites[script.site]), 
		out: script.site + '-' + config.files.contentScript
		} for script in ({
			main: path.join(config.dirs.contentScripts, script), 
			site: basename script
			} for script in fs.readdirSync config.paths.contentScripts))

makeBundle = (main) ->
	bundler = browserify {basedir: config.paths.source}
		.add(main)
		.plugin tsify
	
compileJs = (main, out) ->
	(makeBundle main).bundle()
		.pipe source ('./' + out)
		.pipe gulp.dest config.paths.build
		
gulp.task 'eventPage', () ->
	compileJs config.files.mainIn, config.files.eventPageScript
		
gulp.task 'contentScripts', () ->
	merge (compileJs script.in, script.out for script in contentScripts)
		
gulp.task 'js', ['contentScripts', 'eventPage']

project = (source, mapping) ->
	Object
		.keys mapping
		.reduce (target, key) ->
				target[key] = source[mapping[key]]		
				target 
			, {}

gulp.task 'manifest', () ->
	gulp.src config.files.manifest
		.pipe jsonMerge {
			background:
				scripts: [config.files.eventPageScript]
		}
		.pipe jsonMerge {
			content_scripts: ({
				matches: [].concat(
                    ('http://' + domain + '/*' for domain in script.domains), 
                    ('https://' + domain + '/*' for domain in script.domains)),
				js: [script.out]
			} for script in contentScripts)
		}
		.pipe jsonMerge project require('./' + config.files.packageJson), {
			'description': 'description'
			'name': 'name'
			'version': 'version'
		}
		.pipe gulp.dest(config.paths.build)

gulp.task 'resources', () ->
	gulp.src (config.paths.resources + '/**/*')
		.pipe gulp.dest (config.paths.build + '/' + config.paths.resources)

gulp.task 'clean-build', () ->
	del.sync [config.paths.build]

gulp.task 'clean-dist', () ->
	del.sync [config.paths.dist]
	
gulp.task 'clean', ['clean-build', 'clean-dist']
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function(name, prefix, rename) {
	console.log('..............task runing................')
	var now = Date.now();
	var fileList = [];
	return through.obj(function (file, enc, cb) {
		if (file.isDirectory()) {
			return cb(null, file);
		}
		if (file.isStream()) {
			msg = 'Streaming not supported';
			return cb(new gutil.PluginError(pluginName), msg);
		}
		var relative = path.relative(file.cwd, file.path);
		var extension = path.extname(relative);
		var filename= path.basename(relative).slice(0, -extension.length);
		var filePath = {};
			filePath[filename] = {}
		//添加时间戳
		filePath[filename][relative] = now.toString();
		fileList.push(filePath);
		cb();
	}, function (cb) {

		var fileListFile = new File({
			path: name,
			contents: new Buffer(JSON.stringify(fileList, null, '  '))
		});
		var name_ = path.join(__dirname, name);

		this.push(new gutil.File({
			path: name_,
			contents: new Buffer(JSON.stringify(fileList, null, '  '))
		}));
		console.log('..............task end................')
		cb();
	});
}
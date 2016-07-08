var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var File = require('vinyl');
module.exports = function(name, prefix, rename) {
    console.log('.....task runing.....\n')
    var now = Date.now();
    var fileList = [];
    return through.obj(function(file, enc, cb) {
        if (file.isDirectory()) {
            return cb(null, file);
        }
        if (file.isStream()) {
            msg = 'Streaming not supported';
            return cb(new gutil.PluginError(pluginName), msg);
        }
        var relative = path.relative(file.cwd, file.path).replace(/\\/g, '/');
        var extension = path.extname(relative);
        var filename = path.basename(relative).slice(0, -extension.length);
        var filePath = {};
        filePath[filename] = {}
            //添加时间戳
        filePath[filename][relative] = now.toString();
        fileList.push(filePath);
        cb();
    }, function(cb) {

        var name_ = path.join(process.cwd(), name);
        // console.log('process is : ',process.cwd())


        this.push(new gutil.File({
            path: name_,
            contents: new Buffer(JSON.stringify(fileList, null, '  '))
        }));

        console.info(name, ':\n', fileList, '\n\n.....task over.....')

        cb();
    });
}

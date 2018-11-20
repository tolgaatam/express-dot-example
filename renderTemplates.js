var path = require('path')
    , fs = require('fs');

function req(name) {
    var module = require("./.dotjs_build/" + name);
    delete exports[name];
    return exports[name] = module;
}

fs.readdirSync(__dirname + "/.dotjs_build").forEach(function(file) {
    if (file[0] === '_') { return; }
    var ext = path.extname(file);
    var stats = fs.statSync(__dirname + '/.dotjs_build/' + file);
    if (stats.isFile() && !(ext in require.extensions)) { return; }
    var basename = path.basename(file, '.js');
    exports.__defineGetter__(basename, function(){ return req(basename); });
});
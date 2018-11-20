// this file exports an object of the compiled template functions

const path = require('path')
    , fs = require('fs');

function req(name) {
    let module = require("./.dotjs_build/" + name);
    delete exports[name];
    return exports[name] = module;
}

fs.readdirSync(__dirname + "/.dotjs_build").forEach(function(file) {
    if (file[0] === '_') { return; }
    let ext = path.extname(file);
    let stats = fs.statSync(__dirname + '/.dotjs_build/' + file);
    if (stats.isFile() && !(ext in require.extensions)) { return; }
    let basename = path.basename(file, '.js');
    exports.__defineGetter__(basename, function(){ return req(basename); });
});

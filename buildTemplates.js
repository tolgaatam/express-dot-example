const fs = require('fs');

const source = __dirname + "/views";
const destination = __dirname + "/.dotjs_build/";

if (!fs.existsSync(destination)){ // if the destination folder is not present, make one first
    fs.mkdirSync(destination);
}

require("dot").process({ // compile the templates into the destination folder.
    destination: destination,
    path: source
});

const fs = require('fs');

const source = __dirname + "/views";
const destination = __dirname + "/.dotjs_build/";

if (!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}

require("dot").process({
    destination: destination,
    path: source
});
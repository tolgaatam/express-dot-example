const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const responseTime = require('response-time');

const app = express();

// START: DEFINE THE TEMPLATE ENGINE AND ITS SETTINGS

if(process.env.NODE_ENV === 'development' || !fs.existsSync(__dirname + "/.dotjs_build/")){
    require('./buildTemplates');
}
const renderTemplates = require('./renderTemplates.js');

// define the view engine as dotjs
app.engine('jst', function (filePath, options, callback) {
    return callback(null,  renderTemplates[path.basename(filePath, '.jst')](options));
});

app.set('views', './views'); // specify the views directory for express lookup
app.set('view engine', 'jst'); // register the dotjs template engine we just defined

// END: DEFINE THE TEMPLATE ENGINE AND ITS SETTINGS

app.use(responseTime());

app.get('/', function(req, res){
    res.render('dashboard', {time_of_day: req.query.time_of_day || "morning"});
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const httpServer = http.createServer(app);
httpServer.listen(3000, function() {
    console.log('Listening on port %d', httpServer.address().port);
});
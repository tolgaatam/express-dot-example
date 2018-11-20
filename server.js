const express = require('express');
const http = require('http');
const path = require('path');
const responseTime = require('response-time');

const app = express();

// START: DEFINE THE TEMPLATE ENGINE AND ITS SETTINGS

if (process.env.NODE_ENV === 'development') { // if in development, always compile templates
    require('./buildTemplates');
}

let renderTemplates;
// try gathering the templates. If throws,
// it means we have not compiled any templates yet.
// (we may only see this in production, hopefully)
try{
    renderTemplates = require('./renderTemplates.js');
}
catch (e) {
    console.log("No compiled template found.");
    require('./buildTemplates');
    renderTemplates = require('./renderTemplates.js');
}

// define the view engine as dotJS
app.engine('jst', (filePath, options, callback) => {
    return callback(null, renderTemplates[path.basename(filePath, '.jst')](options));
});

app.set('views', './views'); // specify the views directory for express lookup
app.set('view engine', 'jst'); // register the dotJS template engine we just defined

// END: DEFINE THE TEMPLATE ENGINE AND ITS SETTINGS

app.use(responseTime()); // we may want to measure the response time, maybe

// for the base page, give our dashboard template page.
app.get('/', (req, res) => {
    res.render('dashboard', {time_of_day: req.query.time_of_day || "morning"});
});

// generic error handler for express
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is wrong with our server!');
});

// start the http server
const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
    console.log('Listening on port %d', httpServer.address().port);
});

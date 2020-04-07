//Install express server
const express = require('express');
const path = require('path');

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20
});

const app = express();

// apply rate limiter to all requests
app.use(limiter);


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/dpkProject'));

app.get('/*', function (req, res) {
    res.redirect("https://" + req.headers.host + "/" + req.path);
    res.sendFile(path.join(__dirname + '/dist/dpkProject/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

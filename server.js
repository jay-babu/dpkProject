//Install express server
const express = require('express');
const path = require('path');
const enforce = require('express-sslify');

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 40
});

const app = express();

// apply rate limiter to all requests
app.use(limiter);
app.set('trust proxy', 1);
app.use(enforce.HTTPS({trustProtoHeader: true}));


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/dpkProject'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/dpkProject/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

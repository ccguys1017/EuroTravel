// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const opn = require('opn');
const path = require('path');

const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const index = require('./routes/index');

// DB Setup
// Un-Comment line 19 out and insert your mongoDB connection String
// mongoose.connect('INSERT YOUR MONGODB STRING HERE');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
index(app);

app.use(express.static(path.resolve(__dirname + '/public')));

app.get('*', function(req, res) {
    res.sendfile(path.resolve(__dirname + '/public/views/404.html'));
   });

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);


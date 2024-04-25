var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
require("dotenv").config();
var app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var userRoutes = require('./Routes/UserRoutes');
var clientRoutes = require('./Routes/ClientRoutes');
var roomRoutes = require('./Routes/RoomRoutes');
var roomClientRoutes = require('./Routes/RoomClientRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/roomclient', roomClientRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

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

var exampleRoutes = require('./routes/ExampleRoutes');
var userRoutes = require('./routes/UserRoutes');
var clientRoutes = require('./routes/ClientRoutes');
var providerRoutes = require('./routes/ProviderRoutes');
var orderRoutes = require('./routes/OrderRoutes');

app.use('/api/v1/example', exampleRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/provider', providerRoutes);
app.use('/api/v1/order', orderRoutes);

module.exports = app;
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var drugRouter = require('./routes/drug');
var vendorRouter = require('./routes/vendor');
var unitRouter = require('./routes/unit');
var invoiceRouter = require('./routes/invoice');
var invoiceItemRouter = require('./routes/invoiceitem');
var manufacturerRouter = require('./routes/manufacturer');
app.use('/drug', drugRouter);
app.use('/vendor', vendorRouter);
app.use('/unit', unitRouter);
app.use('/invoice', invoiceRouter);
app.use('/invoiceitem', invoiceItemRouter);
app.use('/manufacturer', manufacturerRouter);

module.exports = app;

console.log('Server started: http://localhost:3000/');

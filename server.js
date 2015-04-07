var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000);



var drugRouter = require('./routes/drug');
var vendorRouter = require('./routes/vendor');
var unitRouter = require('./routes/unit');
var invoiceRouter = require('./routes/invoice');
var invoiceItemRouter = require('./routes/invoice_item');
app.use('/drug', drugRouter);
app.use('/vendor', vendorRouter);
app.use('/unit', unitRouter);
app.use('/invoice', invoiceRouter);
app.use('/invoice_item', invoiceItemRouter);

module.exports = app;

console.log('Server started: http://localhost:3000/');
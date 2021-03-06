var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var middlewares = require('./middlewares');
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// send mail with defined transport object
app.post('/email', middlewares.sendMail);
//
app.post('/authenticate', middlewares.generateToken);
//
app.use('/drug', require('./routes/drug'));
app.use('/vendor', require('./routes/vendor'));
app.use('/unit', require('./routes/unit'));
app.use('/invoice', require('./routes/invoice'));
app.use('/invoiceitem', require('./routes/invoiceitem'));
app.use('/manufacturer', require('./routes/manufacturer'));
app.use('/user', require('./routes/user'));
//

//
module.exports = app;
var port = process.env.PORT || 3000
console.log('Server started at port ' + port);
app.listen(port);

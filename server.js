var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Sequelize = require('sequelize');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000);


var sequelize = new Sequelize('ngPharm', 'root', 'hackathon', {
    host: '52.5.44.90',
    dialect: 'mariadb',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({
    force: true
}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});
console.log('Server started: http://localhost:3000/');
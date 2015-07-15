"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
var data      = require('../populated_data');
var Q         = require('q');
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function syncTables() {
    console.log("Sync table\n");
    return sequelize.sync({
        force: true
    });
}

function createFunction(Model) {
    return function(item){
        console.log("Create " + Model.name + "\n");
        return Model.create(item);
    };
}


//
function multipleCreateFunction(Model) {
    return function(items){
        console.log("Create " + Model.name + "\n");
        for (var i = 0; i < items.length - 1; i++) {
            Model.create(items[i]);
        }
        return Model.create(items[items.length - 1]);
    };
}
//
function bulkCreateFunction(Model) {
    return function(items){
        console.log("Create " + Model.name + "\n");
        return Model.bulkCreate(items);
    };
}
var createVendor = multipleCreateFunction(db.Vendor);
var createCurrency = multipleCreateFunction(db.Currency);
var createManufacturer = multipleCreateFunction(db.Manufacturer);
var createUnit = multipleCreateFunction(db.Unit);
var createItemPrice = multipleCreateFunction(db.ItemPrice);
var createInvoice = multipleCreateFunction(db.Invoice);
var createDrug = multipleCreateFunction(db.Drug);
var createInvoiceItem = multipleCreateFunction(db.InvoiceItem);
var createUser = multipleCreateFunction(db.User);


//
function populateData() {
    return createVendor(data.vendors)
        .then(function() {
            return createInvoice(data.invoices);
        })
        .then(function() {
            return createUnit(data.units);
        })
        .then(function(){
            return createManufacturer(data.manufacturers);
        })
        .then(function(){
            return createDrug(data.drugs);
        })
        .then(function(){
            return createInvoiceItem(data.invoiceItems);
        })
        .then(function(){
            return createCurrency(data.currencies);
        })
        .then(function(){
            return createUser(data.users)
        })
        .then(function(){
            return createItemPrice(data.itemPrices);
        });
}

Q
    .fcall(function() {
        return syncTables();
    })
    .then(function() {
        return populateData();
    })
    .then(function() {
        console.log("Populated data successfully");
    })

.catch(function(error) {
    console.log("error: " + error);
})

module.exports = db;

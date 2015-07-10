"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
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
var users = [
    {"username": "trananhduc", "password": "123456789", "first_name": "Duc", "last_name": "Tran"}
];
var currencies = [   
    {  "name": "USD"}, 
    {  "name": "VND"}, 
    {  "name": "GBP"}
]

var vendors =
[
    {   "name": "CVS",                  "email": "info@cvs.com",        "telephone": "123-456-7890",        "address": "Emory"    }, 
    {   "name": "Walgreen",             "email": "info@walgreen.com",   "telephone": "123-456-7890",        "address": "Georgia Tech"    }
];
var manufacturers = [
    {  "name": "Traphaco"}, 
    { "name": "Domesco"}
];

var drugs = [
    {"name": "Dodacin",  "use": "Antibiotic",       "manufacturer": 1},
    {"name": "Claritin", "use": "Anti-histamine",   "manufacturer": 1,  "salesPrice": 12}
];
var invoiceItems = [
    { "invoice": 1,    "drug": 1,    "quantity": 1,    "unit": 1,    "manufactureDate": new Date("2015/01/01"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5},
    { "invoice": 1,    "drug": 2,    "quantity": 4,    "unit": 1,    "manufactureDate": new Date("2012/05/03"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5},
    { "invoice": 1,    "drug": 2,    "quantity": 4,    "unit": 1,    "manufactureDate": new Date("2012/05/03"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5}
];
var itemPrices = [
    { "drug": 1, "unit": 1, "currency": 1, price: 10.5}
];
var units = [
    {"name": "Box"}
];

var invoices = [
    {"vendor": 1,"number": "HD001"}
];

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
    return createVendor(vendors)
        .then(function() {
            return createInvoice(invoices);
        })
        .then(function() {
            return createUnit(units);
        })
        .then(function(){
            return createManufacturer(manufacturers);
        })
        .then(function(){
            return createDrug(drugs);
        })
        .then(function(){
            return createInvoiceItem(invoiceItems);
        })
        .then(function(){
            return createCurrency(currencies);
        })
        .then(function(){
            return createUser(users)
        })
        .then(function(){
            return createItemPrice(itemPrices);
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

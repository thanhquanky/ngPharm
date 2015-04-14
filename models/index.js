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


var vendors = 
[{
        "name": "CVS",
        "email": "info@cvs.com",
        "telephone": "123-456-7890",
        "address": "adfadf"
    }, {
        "name": "Walgreen",
        "email": "info@walgreen.com",
        "telephone": "123-456-7890",
        "address": "abcdef"
    }, {
        "name": "CÔNG TY CỔ PHẦN XNK Y TẾ DOMESCO",
        "address": "66 Quốc lộ 30 - P.Mỹ Phú - TP. Cao Lãnh - Tỉnh Đồng Tháp - Việt Nam",
        "telephone": "84673852278",
        "email": "domesco@domesco.com"
}];

var dodacin = {
    "id": 1,
    "name": "Dodacin",
    "use": "Antibiotic"
}

var claritin = {
    "id": 2,
    "name": "Claritin",
    "use": "Anti-histamine"
}

var dodacin_item = {
    "InvoiceId": 1,
    "DrugId": 1,
    "quantity": 1,
    "UnitId": 1,
    "manufactureDate": new Date("2015/01/01"),
    "expirationDate": new Date("2017/01/01"),
    "price": 3.5
}

var claritin_item = {
    "InvoiceId": 1,
    "DrugId": 2,
    "quantity": 5,
    "UnitId": 1,
    "manufactureDate": new Date("2015/01/01"),
    "expirationDate": new Date("2017/02/01"),
    "price": 7.5
}


var box = {
    "id": 1,
    "name": "Box"
}

var invoice_one = {
    "id": 1,
    "orderDate": new Date(),
    "VendorId": 1,
    "number": "HD001"
}

function syncTables() {
    console.log("Sync table\n");
    return sequelize.sync({
        force: true
    });
}

function createVendor(vendors) {
    console.log("Create vendor\n");
    return db.Vendor.bulkCreate(vendors);
};

function createInvoice(invoice) {
    console.log("Create invoice\n");

    return db.Invoice.create(invoice);
}

function createUnit(unit) {
    console.log("Create unit\n");

    return db.Unit.create(unit);
}

function createDrug(drug) {
    console.log("Create drug\n");

    return db.Drug.create(drug);
}

function createInvoiceItem(invoice_item) {
    console.log("Create invoice item\n");

    return db.InvoiceItem.create(invoice_item);
}

function populateData() {
    return createVendor(vendors)
        .then(function() {
            return createInvoice(invoice_one);
        })
        .then(function() {
            return createUnit(box);
        })
        .then(function() {
            return createDrug(dodacin);
        })
        .then(function() {
            return createDrug(claritin);
        })
        .then(function() {
            return createInvoiceItem(dodacin_item);
        })
        .then(function() {
            return createInvoiceItem(claritin_item);
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

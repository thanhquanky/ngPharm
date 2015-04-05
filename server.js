var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Sequelize = require('sequelize');
var Q = require('q');

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
    },
});

var Vendor = require('./models/vendor.js').Vendor(sequelize);
var Invoice = require('./models/invoice.js').Invoice(sequelize);
var Unit = require('./models/unit.js').Unit(sequelize);
var InvoiceItem = require('./models/invoice_item.js').InvoiceItem(sequelize);
var Drug = require('./models/drug.js').Drug(sequelize);

Invoice.belongsTo(Vendor, {
    foreignKey: {
        name: "vendor_name"
    }
});

Invoice.hasMany(InvoiceItem, {
    foreignKey: {
        name: "invoice_id"
    }
});
InvoiceItem.belongsTo(Drug, {
    foreignKey: {
        name: "drug_id"
    }
});
Unit.belongsTo(InvoiceItem, {
    foreignKey: {
        name: "unit_id"
    }
});

var domesco = {
    "name": "CÔNG TY CỔ PHẦN XNK Y TẾ DOMESCO",
    "address": "66 Quốc lộ 30 - P.Mỹ Phú - TP. Cao Lãnh - Tỉnh Đồng Tháp - Việt Nam",
    "telephone": "84673852278",
    "email": "domesco@domesco.com"
};

var dodacin = {
    "id": 1,
    "name": "Dodacin",
    "use": "Antibiotic"
}

var dodacin_item = {
    "invoice_id": 1,
    "drug_id": 1,
    "quantity": 1,
    "unit_id": 1,
    "manufacture_date": new Date("2015/01/01"),
    "expiration_date": new Date("2017/01/01"),
    "price": 3.5
}

var box = {
    "id": 1,
    "name": "Box"
}

var invoice_one = {
    "id": 1,
    "order_date": new Date(),
    "vendor_name": "CÔNG TY CỔ PHẦN XNK Y TẾ DOMESCO"
}

function syncTables() {
    console.log("Sync table\n");
    return sequelize.sync({force: true});
}
function createVendor(vendor) {
    console.log("Create vendor\n");
    return Vendor.create(vendor);
};

function createInvoice(invoice) {
    console.log("Create invoice\n");

    return Invoice.create(invoice_one);
}

function createUnit(unit) {
    console.log("Create unit\n");

    return Unit.create(box);
}

function createDrug(drug) {
    console.log("Create drug\n");

    return Drug.create(dodacin);
}

function createInvoiceItem(invoice_item) {
    console.log("Create invoice item\n");

    return InvoiceItem.create(dodacin_item);
}

function populateData() {
    return createVendor(domesco)
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
            return createInvoiceItem(dodacin_item);
        });
}

Q.fcall(function() {
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


console.log('Server started: http://localhost:3000/');

var exported = {}
exported.users = [
    {"username": "trananhduc", "password": "123456789", "first_name": "Duc", "last_name": "Tran"}
];

exported.vendors = require('./data/vendor.json')["vendors"];
// [
//     {   "name": "CVS",                  "email": "info@cvs.com",        "telephone": "123-456-7890",        "address": "Emory"    }, 
//     {   "name": "Walgreen",             "email": "info@walgreen.com",   "telephone": "123-456-7890",        "address": "Georgia Tech"    }
// ];
exported.manufacturers = require('./data/manufacturer.json')["manufacturers"].slice(0, 20);
exported.drugs = require('./data/drug.json')["drugs"];
// [
//     	{"name": "Dodacin",  "use": "Antibiotic",       "manufacturer": 1},
//     	{"name": "Claritin", "use": "Anti-histamine",   "manufacturer": 5,  "salesPrice": 12}
// ]
exported.currencies = require('./data/currency.json')["currencies"].slice(0, 20)
exported.invoiceItems = [
    { "invoice": 1,    "drug": 1,    "quantity": 1,    "unit": 1,    "manufactureDate": new Date("2015/01/01"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5},
    { "invoice": 1,    "drug": 2,    "quantity": 4,    "unit": 1,    "manufactureDate": new Date("2012/05/03"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5},
    { "invoice": 1,    "drug": 2,    "quantity": 4,    "unit": 1,    "manufactureDate": new Date("2012/05/03"),    "expirationDate": new Date("2017/01/01"),    "price": 3.5}
];
exported.itemPrices = [
    { "drug": 1, "unit": 1, "currency": 1, price: 10.5}
];
exported.units = [
    {"name": "Box"},     {"name": "Bottle"},     {"name": "Pill"},  
];

exported.invoices = [
    {"vendor": 1,"number": "HD001"}
];
module.exports = exported;
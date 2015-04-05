angular.module('ngPharm.services', ['firebase'])
    .factory('Invoices', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
        var firebaseUrl = "https://amber-inferno-7229.firebaseio.com/invoices";
        var invoiceRef = new Firebase(firebaseUrl);
        var invoices = $firebaseArray(invoiceRef);

        return {
            all: function() {
                return invoices;
            },
            updateItem: function(itemId, invoiceId, updatedItem) {
                var itemsRef = new Firebase(firebaseUrl + "/" + invoiceId + "/items");
                var items = $firebaseArray(itemsRef);
                items[itemId] = updatedItem;
                items.$save();
            },
            addItem: function(invoiceId, item) {
                var itemsRef = new Firebase(firebaseUrl + "/" + invoiceId + "/items");
                var items = $firebaseArray(itemsRef);
                items.$add(item);
            }
        };
    }])
    .factory('InvoiceItems', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
        var firebaseUrl = "https://amber-inferno-7229.firebaseio.com/invoices";
        return {
            fromInvoice: function(invoiceId) {
                var itemsRef = new Firebase(firebaseUrl + "/" + invoiceId + "/items");
                return $firebaseArray(itemsRef);
            }
        };
    }]);

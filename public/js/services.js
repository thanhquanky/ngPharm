angular.module('ngPharm.services', ['ngResource'])
    .factory('Invoices', ['ServerInfo', '$resource', function(ServerInfo, $resource) {
        return $resource("/invoice/:invoiceId", {});
    }])
    /*
    .factory('InvoiceItems', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
        var firebaseUrl = "https://amber-inferno-7229.firebaseio.com/invoices";
        return {
            fromInvoice: function(invoiceId) {
                var itemsRef = new Firebase(firebaseUrl + "/" + invoiceId + "/items");
                return $firebaseArray(itemsRef);
            }
        };
    }]);
    */

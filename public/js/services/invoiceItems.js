(function() {
    angular.module('ngPharm.services')
        .service('InvoiceItems', ['$resource', function($resource) {
            return $resource('/invoiceitem/:name', {}, {
                'get': {
                    isArray: true
                }
            });
        }]);
})();

(function() {
    angular.module('ngPharm.services')
        .service('InvoiceItems', ['$resource', function($resource) {
            return $resource('/invoiceitem/:name', {}, {
                'get': {
                    isArray: true,
                    transformResponse: function(data, headers) {
                        data = angular.fromJson(data);
                        var n = data.length;
                        for (var i=0; i<n; i++) {
                            data[i].manufactureDate = new Date(data[i].manufactureDate);
                            data[i].expirationDate = new Date(data[i].expirationDate);
                        }
                        return data;
                    }
                }
            });
        }]);
})();

(function() {
    angular.module('ngPharm.services')
        .service('InvoiceItems', ['$resource', function($resource) {
            var that = this;
            that.transformDate = function(item) {
                item.manufactureDate = new Date(item.manufactureDate);
                item.expirationDate = new Date(item.expirationDate);
                return item;
            };
            return $resource('/invoiceitem/:name', {}, {
                'get': {
                    isArray: true,
                    transformResponse: function(data, headers) {
                        data = angular.fromJson(data);
                        data = data.map(that.transformDate);
                        return data;
                    }
                }
            });
        }]);
})();

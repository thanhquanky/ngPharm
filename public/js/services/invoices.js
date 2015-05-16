/**
 * Created by thanhquanky on 4/8/15.
 */


(function() {
	angular.module('ngPharm.services')
		.service('Invoices', ['$resource', 'InvoiceItems', function($resource, InvoiceItems){
			var that = this;
			that.transformDate = function(item) {
				item.manufactureDate = new Date(item.manufactureDate);
				item.expirationDate = new Date(item.expirationDate);
				return item;
			}
			return $resource('/invoice/:invoiceId', {}, {
				'get': {
					transformResponse: function(data, headers) {
						data = angular.fromJson(data);
						data.InvoiceItems = data.InvoiceItems.map(that.transformDate);
						return data;
					}
				}
			});
		}]);
})();

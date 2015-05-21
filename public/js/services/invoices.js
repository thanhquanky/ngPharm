/**
 * Created by thanhquanky on 4/8/15.
 */


(function() {
	angular.module('ngPharm.services')
		.service('Invoices', ['$resource', 'InvoiceItems', function($resource, InvoiceItems){
			var that = this;
			that.fullDateStringToDate = function(item) {
				item.manufactureDate = moment(item.manufactureDate, "YYYY-MM-DDThh:mm:ss.sTZD").toDate();
				item.expirationDate = moment(item.expirationDate, "YYYY-MM-DDThh:mm:ss.sTZD").toDate();
				return item;
			}
			that.monthToDate = function(item) {
				item.expirationDate = moment(item.expirationDate, 'MM/YYYY');
				item.manufactureDate = moment(item.manufactureDate, 'MM/YYYY');
				return item;
			}
			return $resource('/invoice/:invoiceId', {}, {
				'get': {
					transformResponse: function(data) {
						data = angular.fromJson(data);	
						data.InvoiceItems = data.InvoiceItems.map(that.fullDateStringToDate);
						return data;
					}
				},
				'save': {
					method: 'POST',
					transformRequest: function(data) {
						data = angular.fromJson(data);
						data.InvoiceItems = data.InvoiceItems.map(that.monthToDate);
						return angular.toJson(data);
					}
				}
			});
		}]);
})();

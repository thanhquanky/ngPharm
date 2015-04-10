(function() {
	angular.module('ngPharm.services')
		.service('Invoices', ['ServerInfo', '$resource', function(ServerInfo, $resource){
			return $resource('/invoice/:invoiceId', {});
		}]);
})();
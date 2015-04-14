/**
 * Created by thanhquanky on 4/8/15.
 */


(function() {
	angular.module('ngPharm.services')
		.service('Invoices', ['ServerInfo', '$resource', function(ServerInfo, $resource){
			return $resource('/invoice/:invoiceId', {});
		}]);
})();

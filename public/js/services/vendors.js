(function() {
	angular.module('ngPharm.services')
		.service('Vendors', ['ServerInfo', '$resource', function(ServerInfo, $resource){
			return $resource('/vendor/:vendorId', {});
		}]);
})();
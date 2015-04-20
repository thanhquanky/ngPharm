(function(){
	angular.module('ngPharm.services')
		.service('Drugs', ['ServerInfo', '$resource', function(ServerInfo, $resource){
			return $resource('/drug/:drugId', {});
		}]);
})();
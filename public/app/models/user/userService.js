(function() {
	angular.module('ngPharm.services')
		.service('Users', ['ServerInfo', '$resource', function(ServerInfo, $resource){
			return $resource('/user/:user_name', {});
		}]);
})();
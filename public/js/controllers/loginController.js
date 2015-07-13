ngPharm.controller('LoginController', ['$scope', '$location', '$rootScope', '$q', '$window', '$timeout', 'Auth',
	function($scope, $location, $rootScope, $q, $window, $timeout, Auth){
		var vm = this;
		vm.abc = true;
		vm.loginData = {};
		vm.loggedIn = Auth.isLoggedIn(); // Check if there is a token given
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
		}); // Function to watch for change in loggedIn
		//
		vm.login = function(){
			console.log ('Username: ' + vm.loginData.username + ". Password " + vm.loginData.password);
			vm.processing = true; // just for the spinning icon when the server is processing.
			vm.errorMessage = ''; // Show error messages on screen
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data){
					vm.processing = false; // End the process
					// Either redirect or send message error
					if (data.success) {
						$location.path('home');
						location.reload();
					}
					else vm.errorMessage = data.message;
				}
			);
		};
		vm.logout = function(){
			Auth.logout();
			location.reload();
		};
	}]
);
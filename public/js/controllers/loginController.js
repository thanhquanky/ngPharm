ngPharm.controller('LoginController', ['$scope', 
	function($scope){
		var vm = this;
		vm.loginData = {};
		vm.login = function(){
			console.log ('Username: ' + vm.loginData.username + ". Password " + vm.loginData.password);
			vm.processing = true; // just for the spinning icon when the server is processing.
			vm.errorMessage = ''; // Show error messages on screen
			// Auth.login(vm.loginData.username, vm.loginData.password)
			// 	.success(function(data){
			// 		vm.processing = false; // End the process
			// 		// Either redirect or send message error
			// 		if (data.success) $location.path('/');
			// 		else vm.errorMessage = data.message;
			// 	}
			// );
		};
	}]
);





// angular.module('mainCtrl', [])
// 	.controller('mainController', function($window, $scope, $rootScope, $location, Auth){
// 		var vm = this;
// 		// console.log('mainCtrl is alive');
// 		vm.currentUserId = sessionStorage.getItem('userId');
// 		console.log('new assignment at top: ' + vm.currentUserId);
// 		$rootScope.$watch(function() {
// 			return sessionStorage.getItem('userId');
// 		}, function(newValue) {
//       		vm.currentUserId = newValue;
// 		});

// 		vm.loggedIn = Auth.isLoggedIn();
// 		$rootScope.$on('$routeChangeStart', function() {
// 			vm.loggedIn = Auth.isLoggedIn();
// 				// get user information on route change
// 			Auth.getUser()
// 			.then(function(data) {
// 				vm.user = data;
// 				// console.log(data);
// 			});
// 		});
// 		vm.doLogin = function() {
// 			vm.processing = true;
// 			vm.error = '';
// 			Auth
// 			.login(vm.loginData.username, vm.loginData.password)
// 			.success(function(data) {
// 				vm.processing = false;
// 				sessionStorage.setItem('userId', Auth.currentUserId);
// 				vm.currentUserId = sessionStorage.getItem('userId');
// 				console.log('currentUserId: ' + vm.currentUserId);
// 				// if a user successfully logs in, redirect to users page
// 				if (data.success)
// 					$location.path('/users/' + vm.currentUserId);
// 				else
// 					vm.error = data.message;
// 			});
// 		};
// 		vm.doLogout = function() {
// 			Auth.logout();
// 			sessionStorage.setItem('userId', null)
// 			vm.currentUserId = sessionStorage.getItem('userId');
// 			console.log("logout: " + vm.currentUserId);
// 			// reset all user info
// 			vm.user = {};
// 			$location.path('/login');
// 		};

// 	});

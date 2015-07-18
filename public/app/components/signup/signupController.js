ngPharm.controller('SignupController', ['$scope', '$http', '$location', 'Auth',
	function($scope, $http, $location, Auth){
		var vm = this;
		vm.signupData = {};
		vm.loggedIn = Auth.isLoggedIn();
		vm.errorMessage = '';
		vm.signup = function(){
			if (!vm.signupData.username || !vm.signupData.password) return vm.errorMessage = "Account must have username and password";
			if (vm.signupData.password != vm.confirm_password) return vm.errorMessage = "Password and password confirmation does not match";
			$http.get('user/' + vm.signupData.username).success(getUsernameSuccess);
		};
		function getUsernameSuccess(data){
			if (data) return vm.errorMessage = 'Username already existed';			
			$http.post('user', vm.signupData).success(postSuccess);
		}
		function postSuccess(data) {
			console.log(data);
			Auth.login(vm.signupData.username, vm.signupData.password) // can't use data.password because it is the hased passwor now.
			.success(loginSuccess);
		}
		function loginSuccess(data){
			if (data.success){
				$location.path('home');
				location.reload();
			} else vm.errorMessage = data.message;
		}
	}]
);

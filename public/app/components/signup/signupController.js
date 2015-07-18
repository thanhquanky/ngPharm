ngPharm.controller('SignupController', ['$scope', '$http', '$location', 'Auth',
	function($scope, $http, $location, Auth){
		var vm = this;
		vm.signupData = {};
		vm.loggedIn = Auth.isLoggedIn();
		vm.errorMessage = '';
		vm.signup = function(){
			// console.log(JSON.stringify(vm.signupData));
			if (!vm.signupData.username || !vm.signupData.password) return vm.errorMessage = "Account must have username and password";
			if (vm.signupData.password != vm.confirm_password) return vm.errorMessage = "Password and password confirmation does not match";
			//
			$http.get('user/' + vm.signupData.username).success(function(username){
				if (username) return vm.errorMessage = 'Username already existed';
				$http.post('user', vm.signupData).success(function(signupData){
					Auth
					.login(vm.signupData.username, vm.signupData.password)
					.success(function(data) {
						// Either redirect or send message error
						if (data.success) {
							$location.path('home');
							location.reload();
						} else vm.errorMessage = data.message;						
					});
				});
			});
		};
	}]
);

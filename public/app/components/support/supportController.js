ngPharm.controller('SupportController', ['$scope', '$location', '$http',
	function($scope, $location, $http){
		var vm = this;
		vm.submitRequest = function(){
			// console.log(JSON.stringify(vm.request));
			alert('Thank you for your request. We will be in touch soon');
			$http.post('email', {
				name: vm.request.name,
				phoneNumber: vm.request.phoneNumber,
				emailAddress: vm.request.emailAddress,
				message: vm.request.message
			});
			//
			$location.path('home');
		};
	}
]);
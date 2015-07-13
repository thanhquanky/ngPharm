ngPharm.controller('SupportController', ['$scope', '$location',
	function($scope, $location){
		var vm = this;
		vm.submitRequest = function(){
			// console.log(JSON.stringify(vm.request));
			alert('Thank you for your request. We will be in touch soon');
			$location.path('home');
		};
	}
]);
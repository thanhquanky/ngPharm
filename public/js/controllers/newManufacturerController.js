(function() {
    angular.module('ngPharm')
        .controller('NewManufacturerController', ['$modalInstance', '$state', 'Manufacturers', 'toaster',
            function ($modalInstance, $state, Manufacturers, toaster) {
				var vm = this;
                
				vm.manufacturer = {};
                
                vm.ok = function () {
                    var newManufacturer = new Manufacturers(vm.manufacturer);
                    newManufacturer.$save(function(manufacturer) {
                        toaster.pop('success', 'Drug', manufacturer.name + ' has been added');
                        $modalInstance.close(manufacturer);
                    });
                };
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]);
})();
(function() {
    angular.module('ngPharm')
        .controller('NewManufacturerController', ['$modalInstance', '$state', 'Manufacturers', 'toaster', 'manufacturer',
            function ($modalInstance, $state, Manufacturers, toaster, manufacturer) {
				var vm = this;
                
				vm.manufacturer = {};
                if (manufacturer && typeof(manufacturer) == "string") {
                    vm.manufacturer.name = manufacturer;
                    
                }
                vm.ok = function () {
                    var newManufacturer = new Manufacturers(vm.manufacturer);
                    newManufacturer.$save(function(manufacturer) {
                        toaster.pop('success', 'Manufacturer', manufacturer.name + ' has been added');
                        $modalInstance.close(manufacturer);
                    });
                };
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]);
})();
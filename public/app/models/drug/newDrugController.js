(function() {
    angular.module('ngPharm')
        .controller('NewDrugController', ['$modalInstance', '$modal', '$state', 'Manufacturers', 'Drugs', 'toaster', 'drug',
            function ($modalInstance, $modal, $state, Manufacturers, Drugs, toaster, drug) {
                var vm = this;
                vm.drug = {
                    name: ""
                };
                vm.drugs = Drugs.query();
                vm.manufacturers = Manufacturers.query();
                
                if ($state.params.drug !== "") {
                    vm.drug.name = $state.params.drug;
                }
                if (null === drug) {
                    vm.drug.name = "";
                }
                if (drug && typeof(drug) == "string") {
                    vm.drug.name = drug;
                    
                }
                console.log(typeof(drug));
                vm.ok = function () {
                    if (typeof(vm.drug.Manufacturer) === "string") {
                        vm.newManufacturerForm.open();
                    }
                    else {
                        if (typeof(vm.drug.name) == 'object') {
                            var drugName = vm.drug.name.name;
                            toaster.pop('error', 'Drug', drugName + ' exists');
                            $modalInstance.close(null);
                        }
                        else {
                            var newDrug = new Drugs(vm.drug);
                            newDrug.$save(function(drug) {
                                toaster.pop('success', 'Drug', drug.name + ' has been added');
                                $modalInstance.close(drug);
                            });
                        }
                    }
                };
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                
                vm.newManufacturerForm = {
                    open: function(size){
                        var modalInstance = $modal.open({
                            templateUrl: 'app/models/manufacturer/newManufacturer.html',
                            controller: 'NewManufacturerController as NewManufacturerCtrl',
                            resolve: {
                                manufacturer: function() {
                                    return vm.drug.Manufacturer;
                                }
                            }
                        });
        
                        modalInstance.result.then(function(manufacturer) {
                            vm.drug.Manufacturer = manufacturer;
                        });
                    }
                };
            }
        ]);
})();
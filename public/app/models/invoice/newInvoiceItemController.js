/**
 * Created by thanhquanky on 4/21/15.
 */
angular.module('ngPharm')
    .controller('NewInvoiceItemController', function ($scope, $modalInstance, Drugs, Units, $modal, $state, $filter) {
        var vm = this;
        vm.drugs = Drugs.query();
        vm.units = Units.query();
        vm.invoiceItem = {};
        vm.ok = function () {
            if (typeof(vm.invoiceItem.Drug) === "string") {
                var modalInstance = vm.newDrugForm.open();
            }
            else {
                $modalInstance.close(vm.invoiceItem);
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.manufactureDatePicker = {
            configs: {
                dropdownSelector: '#manufactureDateDropDown',
                minView: 'month',
                startView: 'month'
            }
        };

        vm.expirationDatePicker = {
            configs: {
                dropdownSelector: '#expirationDateDropDown',
                minView: 'month',
                startView: 'month'
            }
        };

        $scope.$watch('NewInvoiceItemCtrl.invoiceItem.expirationDate', function(newValue) {
            vm.invoiceItem.expirationDate = $filter('date')(newValue, 'MM/yyyy'); // Or whatever format your input should use
        })
        $scope.$watch('NewInvoiceItemCtrl.invoiceItem.manufactureDate', function(newValue) {
            vm.invoiceItem.manufactureDate = $filter('date')(newValue, 'MM/yyyy'); // Or whatever format your input should use
        })
        
        moment.locale('vi');

        vm.newDrugForm = {
            open: function(size){
                console.log("Drug form opened");
                var modalInstance = $modal.open({
                    templateUrl: 'app/models/drug/newDrug.html',
                    controller: 'NewDrugController as NewDrugCtrl',
                    size: size,
                    resolve: {
                        drug: function() {
                            return vm.invoiceItem.Drug;
                        }
                    }
                });

                modalInstance.result.then(function(drug) {
                    vm.invoiceItem.Drug = drug;
                });
            }
        };
    });

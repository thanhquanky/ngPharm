// TODO Typeahead for manufacturer
ngPharm.controller('DrugController', ['$scope', 'Drugs','Manufacturers','$modal', function($scope, Drugs, Manufacturers, $modal){
    var vm = this;
    vm.manufacturers = Manufacturers.query();
    
    vm.drugs = Drugs.query();
    vm.gridOptions = {
        enableFiltering: true,
        columnDefs: [{
            name: 'Name',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'name'
        }, {
            name: 'Use',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'use'
        }, {
            name: 'Manufacturer',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'Manufacturer.name'
        }],
        data: vm.drugs
    };
    vm.newDrugForm = {
        open: function(size){
            console.log("Drug form opened");
            var modalInstance = $modal.open({
                templateUrl: 'app/models/drug/newDrug.html',
                controller: 'NewDrugController as NewDrugCtrl',
                size: size,
                resolve: {
                    drug: function() {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function(drug) {
                vm.drugs.push(drug);
            });
        }
    };
}]);


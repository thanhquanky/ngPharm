// TODO Typeahead for manufacturer
ngPharm.controller('DrugController', ['$scope', 'Drugs','Manufacturers','$modal', function($scope, Drugs, Manufacturers, $modal){
    var that = this;
    this.manufacturers = Manufacturers.query();
    console.log(this.manufacturers);
    this.drugs = Drugs.query();
    this.gridOptions = {
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
        data: this.drugs
    };
    this.newDrugForm = {
        open: function(size){
            console.log("Drug form opened"); 
            var modalInstance = $modal.open({
                templateUrl: 'partials/newDrug.html',
                controller: 'NewDrugController as NewDrugCtrl',
                size: size,
                resolve: {
                    drug: function() {
                        return "";
                    },
                    manufacturers: function() {
                        return that.manufacturers;
                    }
                }
            });

            modalInstance.result.then(function(drug) {
                that.drugs.push(drug);
            });
        }
    };
}]);


// TODO Typeahead for manufacturer
ngPharm.controller('DrugController', ['$scope', 'Drugs','Manufacturers','$modal', function($scope, Drugs, Manufacturers, $modal){
    var that = this;
    this.manufacturers = Manufacturers.query();
    console.log(this.manufacturers);
    this.myData = Drugs.query();
    this.gridOptions = {
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
            field: 'manufacturer',
        }],
        data: this.myData
    };
    this.newDrugForm = {
        open: function(size){
            console.log("Drug form opened"); 
            var modalInstance = $modal.open({
                templateUrl: 'partials/newDrug.html',
                controller: 'NewDrugController as NewDrugCtrl',
                size: size,
                resolve: {
                    items: function(){
                        console.log($scope.drug);
                        return $scope.drug;
                    },
                    manufacturers: function() {
                        return that.manufacturers;
                    }
                }
            });

            modalInstance.result.then(function(drug) {
                var newDrug = new Drugs(drug);
                newDrug.$save(function(u, headers) {
                    that.myData.push(u);
                })
            });
        }
    };
}]);

ngPharm.controller('NewDrugController', ['$scope','$modalInstance','items', 'manufacturers', 'Drugs', function($scope, $modalInstance, items, manufacturers, Drugs){
    this.manufacturers = manufacturers;
    this.ok = function(){
        $modalInstance.close(this.drug);
    };
    this.cancel = function(){
        $modalInstance.dismiss('cancel');
    };
}]);
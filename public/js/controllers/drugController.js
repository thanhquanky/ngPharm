// TODO Typeahead for manufacturer
ngPharm.controller('DrugController', ['$scope', 'Drugs','$modal', function($scope, Drugs, $modal){
    $scope.myData = Drugs.query();
    $scope.gridOptions = {
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
        data: $scope.myData
    };
    $scope.newDrugForm = {
        open: function(size){
            console.log("Drug form opened"); 
            var modalInstance = $modal.open({
                templateUrl: 'newDrug.html',
                controller: 'NewDrugCtrl',
                size: size,
                resolve: {
                    items: function(){
                        console.log($scope.drug);
                        return $scope.drug;
                    }
                }
            });

            modalInstance.result.then(function(drug) {
                var newDrug = new Drugs(drug);
                newDrug.$save(function(u, headers) {
                    $scope.myData.push(u);
                })
            });
        }
    };
}]);
ngPharm.controller('NewDrugCtrl', ['$scope','$modalInstance','items', 'Drugs', function($scope, $modalInstance, items, Drugs){
    $scope.ok = function(){
        //console.log($scope.drug);
        $modalInstance.close($scope.drug);
    };
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };
}]);
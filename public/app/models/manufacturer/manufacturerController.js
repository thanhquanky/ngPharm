
ngPharm.controller('ManufacturerController', ['$scope', 'Manufacturers','$modal', function($scope, Manufacturers, $modal){
    var vm = this;
    
	vm.manufacturers = Manufacturers.query();
    
	this.gridOptions = {
        enableFiltering: true,
        columnDefs: [{
            name: 'Name',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'name'
        }],
        data: this.manufacturers
    };
    this.newManufacturerForm = {      
        open: function(size){
            var modalInstance = $modal.open({
                templateUrl: 'app/models/manufacturer/newManufacturer.html',
                controller: 'NewManufacturerController as NewManufacturerCtrl',
                size: size,
                resolve: {
                    manufacturer: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function(manufacturer) {
                vm.manufacturers.push(manufacturer);
            });
        }
    };
}]);


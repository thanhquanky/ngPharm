ngPharm.controller('VendorController', ['$scope', '$modal', 'Vendors',function($scope, $modal, Vendors){
	//console.log("Print out vendor");
	
	$scope.myData = Vendors.query();
	$scope.gridOptions = {
		showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
		columnDefs: [{
            name: 'Name',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'name',
            //width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
        	name: 'Email',
        	enableCellEdit: true,
        	enableCellEditOnFocus: true,
        	field: 'email',
        	footerCellTemplate: '<div></div>'
        }, {
        	name: 'Telephone',
        	enableCellEdit: true,
        	enableCellEditOnFocus: true,
        	field: 'telephone',
        	footerCellTemplate: '<div></div>'
        }, {
        	name: 'Address',
        	enableCellEdit: true,
        	enableCellEditOnFocus: true,
        	field: 'address'
        }],
		data: $scope.myData
	};
    $scope.newVendorForm = {
        open: function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'newVendor.html',
                controller: 'NewVendorCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.vendor;
                    }
                }
            });
        }
    };
}]);
ngPharm.controller('NewVendorCtrl', function ($scope, $modalInstance, items) {

    $scope.ok = function () {
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

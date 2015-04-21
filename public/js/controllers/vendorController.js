ngPharm.controller('VendorController', ['$scope', '$modal', 'Vendors',function($scope, $modal, Vendors){
	//console.log("Print out vendor");
	
	$scope.myData = Vendors.query(); // query is from ngResource.
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
            modalInstance.result.then(function(vendor, header) {
                $scope.myData.push(vendor);
            });
        }
    };
}]);
ngPharm.controller('NewVendorCtrl',  function ($scope, $modalInstance, items, Vendors) {
    
    $scope.ok = function () {
        //console.log(Vendors.query());
        //console.log($scope.vendor.email);
        Vendors.save($scope.vendor);
        $modalInstance.close($scope.items);        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

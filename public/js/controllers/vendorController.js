ngPharm.controller('VendorController', ['$scope', '$modal', 'Vendors',function($scope, $modal, Vendors){
	//console.log("Print out vendor");
	var vm = this;
	vm.vendors = Vendors.query({}, function(vendors) {
		vm.gridOptions.data = vendors;
    }); // query is from ngResource.

	vm.gridOptions = {
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
		data: []
	};
	vm.newVendorForm = {
        open: function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/newVendor.html',
                controller: 'NewVendorController as NewVendorCtrl',
                size: size
            });
            modalInstance.result.then(function(vendor) {
                vm.vendors.push(vendor);
            });
        }
    };
}]);

ngPharm.controller('VendorController', ['$scope', '$modal', 'Vendors',function($scope, $modal, Vendors){
	//console.log("Print out vendor");
	var that = this;
	this.vendors = Vendors.query({}, function(vendors) {
        that.gridOptions.data = vendors;
    }); // query is from ngResource.

	this.gridOptions = {
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
    this.newVendorForm = {
        open: function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/newVendor.html',
                controller: 'NewVendorController as NewVendorCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.vendor;
                    }
                }
            });
            modalInstance.result.then(function(vendor) {
                var newVendor = new Vendors(vendor);
                newVendor.$save(function(addedVendor, headers) {
                    that.vendors.push(addedVendor);
                });
            });
        }
    };
}]);

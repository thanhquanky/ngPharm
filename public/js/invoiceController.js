ngPharm.controller('InvoiceController', ['$scope', '$stateParams', '$modal', 'Invoices',
    function ($scope, $stateParams, $modal, Invoices) {
        $scope.vm = this;

		vm.invoice = Invoices.get({invoiceId: $stateParams.invoiceId});

		vm.gridOptions = {
			showGridFooter: true,
			enableFiltering: true,
			columnDefs: [{
				name: 'Name',
				enableCellEdit: true,
				enableCellEditOnFocus: true,
				field: 'Drug.name'
        }, {
				name: "Unit",
				field: 'Unit.name',
				width: '13%'
        }, {
				name: "Quantity",
				field: 'quantity'
        }, {
				name: "Manufacture Date",
				field: 'manufactureDate',
				cellFilter: 'date'
        }, {
				name: "Expiration Date",
				field: 'expirationDate',
				cellFilter: 'date'
        },{
				name: 'Price',
				field: 'price'
        }],
			data: 'invoice.InvoiceItems'
		};

		$scope.newItemForm = {
			open: function (size) {
				var modalInstance = $modal.open({
					templateUrl: 'newItem.html',
					controller: 'NewItemCtrl',
					size: size,
					resolve: {
						items: function () {
							return $scope.item;
						}
					}
				});
			}
		};
		vm.addNewItem = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'newItem.html',
				controller: 'NewItemCtrl',
				size: size,
				resolve: {
					items: function () {
						return $scope.item;
					}
				}
			});
			modalInstance.result.then(function (newItem) {
				console.log($scope.invoice);
				Invoices.addItem($scope.invoice.$id, newItem);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		vm.hasSelectedInvoice = function () {
			return !angular.isUndefined(vm.invoice.number) && !angular.isNull(vm.invoice.number);
		};
}]);
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

ngPharm.controller('NewItemCtrl', function ($scope, $modalInstance, items) {

	$scope.ok = function () {
		$modalInstance.close($scope.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

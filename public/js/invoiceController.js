ngPharm.controller('InvoiceController', ['$scope', '$stateParams', '$modal', '$log', 'Invoices', 'InvoiceItems',
    function ($scope, $stateParams, $modal, $log, Invoices, InvoiceItems) {
		var invoiceName = $stateParams.invoice_id;
		var invoice = null;
		angular.forEach($scope.invoices, function (currentInvoice, key) {
			console.log(currentInvoice);
			if (currentInvoice.name === invoiceName) {
				invoice = currentInvoice;
				$scope.items = InvoiceItems.fromInvoice(invoice.$id);
			}
		});
		$scope.invoice = invoice;

		$scope.gridOptions = {
			showGridFooter: true,
			enableFiltering: true,
			columnDefs: [{
				name: 'Name',
				enableCellEdit: true,
				enableCellEditOnFocus: true,
				field: 'name'
        }, {
				name: "Unit",
				field: 'unit',
				width: '13%'
        }, {
				name: "Quantity",
				field: 'quantity'
        }, {
				name: "Expiration Date",
				field: 'expiration_date',
				cellFilter: 'date'
        }, {
				name: 'Price',
				field: 'price'
        }],
			data: 'items'
		};

		$scope.open = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				controller: 'NewItemCtrl',
				size: size,
				resolve: {
					items: function () {
						return $scope.item;
					}
				}
			});
		};
		$scope.addNewItem = function (size) {
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
		$scope.hasSelectedInvoice = function () {
			return !angular.isUndefined($scope.invoice.name) && !angular.isNull($scope.invoice.name);
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

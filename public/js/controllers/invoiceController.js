ngPharm.controller('InvoiceController', ['$scope', '$stateParams', '$modal', 'Invoices',
    function ($scope, $stateParams, $modal, Invoices) {

		$scope.invoice = Invoices.get({invoiceId: $stateParams.invoiceId});

		$scope.gridOptions = {
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


}]);

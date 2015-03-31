ngPharm.controller('InvoiceController', ['$scope', '$stateParams', function($scope, $stateParams) {
    var invoiceName = $stateParams.invoice_id;
    var invoice = null;
    angular.forEach($scope.invoices, function(currentInvoice, key) {
        console.log(currentInvoice);
        if (currentInvoice.name === invoiceName) {
            invoice = currentInvoice;
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
            field: 'name',
            width: '13%'
        }, {
            name: "Unit",
            field: 'unit',
            width: '13%'
        }, {
            name: "Quantity",
            field: 'quantity',
            width: '13%'
        }, {
            name: "Expiration Date",
            field: 'expiration_date',
            width: '13%',
            cellFilter: 'date'
        }, {
            name: 'Price',
            field: 'price',
            width: '20%'
        }],
        data: 'invoice.items'
    };
}]);

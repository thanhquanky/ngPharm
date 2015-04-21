ngPharm.controller('InvoiceController', ['$scope', '$stateParams', '$modal', 'Invoices', 'uiGridConstants',
    function ($scope, $stateParams, $modal, Invoices, uiGridConstants) {
        var that = this;
        this.invoice = Invoices.get({invoiceId: $stateParams.invoiceId}, function (data) {
            angular.forEach(data.InvoiceItems, function(invoiceItem) {
                invoiceItem.getTotal = function() {
                    return invoiceItem.price * invoiceItem.quantity;
                }
            });
            that.gridOptions.data = data.InvoiceItems;
        });

        this.gridOptions = {
            showGridFooter: true,
            showColumnFooter: true,
            enableFiltering: true,
            columnDefs: [{
                name: 'Name',
                enableCellEdit: true,
                enableCellEditOnFocus: true,
                field: 'Drug.name'
            },
            {
                name: "Manufacture Date",
                field: 'manufactureDate',
                cellFilter: 'date'
            }, {
                name: "Expiration Date",
                field: 'expirationDate',
                cellFilter: 'date'
            },{
                name: "Unit",
                field: 'Unit.name',
                width: '13%'
            }, {
                name: "Quantity",
                field: 'quantity'
            }, {
                name: 'Price',
                field: 'price'
            },
                {
                    name: 'Total',
                    field: 'getTotal()',
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    type: 'number'
                }],
            data: []
        };


        console.log(this.gridOptions.data);
    }]);

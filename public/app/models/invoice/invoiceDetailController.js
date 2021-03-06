ngPharm.controller('InvoiceDetailController', ['$scope', '$stateParams', '$modal', 'Invoices', 'uiGridConstants',
    function ($scope, $stateParams, $modal, Invoices, uiGridConstants) {
        var that = this;
        this.invoice = Invoices.get({invoiceId: $stateParams.invoiceId}, function (data) {
            angular.forEach(data.InvoiceItems, function(invoiceItem) {
                invoiceItem.getTotal = function() {
                    return invoiceItem.price * invoiceItem.quantity;
                }
            });

            /*
            var n = data.InvoiceItems.length;
            for (var i=0; i<n; i++) {
                data.InvoiceItems[i].manufactureDate = new Date(data.InvoiceItems[i].manufactureDate);
                data.InvoiceItems[i].expirationDate = new Date(data.InvoiceItems[i].expirationDate);
            }
            */

            that.gridOptions.data = data.InvoiceItems;
        });

        this.gridOptions = {
            showGridFooter: true,
            showColumnFooter: true,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: true,
            enableRowHeaderSelection: true, 
            selectionRowHeaderWidth: 35,
            columnDefs: [
            {   name: 'Name',        enableCellEdit: true,
                enableCellEditOnFocus: true,
                field: 'Drug.name'                                  }, 
            {   name: "Unit",        field: 'Unit.name'             }, 
            {   name: "Sku",         field: 'sku'                   },
            {   name: "Quantity",    field: 'quantity'              },
            {   name: "MFD",         field: 'manufactureDate',
                type: 'date',        cellFilter: 'date:"MM/yyyy"'   }, 
            {   name: "EXP",         field: 'expirationDate',
                type: 'date',        cellFilter: 'date:"MM/yyyy"'   }, 
            {   name: 'Price',       field: 'price'                 },
            {   name: 'Total',       field: 'getTotal()',
                aggregationType: uiGridConstants.aggregationTypes.sum,
                type: 'number'                                      }
            ],
            data: []
        };


        console.log(this.gridOptions.data);
    }]);

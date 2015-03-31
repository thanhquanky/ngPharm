ngPharm.config(function($stateProvider, $urlRouterProvider, $resourceProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/home.html"
        })
        .state('invoice', {
            url: "/invoice",
            templateUrl: "partials/invoice.html",
            controller: "InvoiceController"
        })
        .state('invoice.item', {
            url: "/:invoice_id",
            templateUrl: "partials/invoice_item.html",
            controller: function($scope, $stateParams) {
                var invoiceName = $stateParams.invoice_id;
                var invoice =  null;
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
            }
        })
        .state('sales', {
          url: "/sales",
          templateUrl: "partials/sales.html",
          controller: "SalesController"
        })
        // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

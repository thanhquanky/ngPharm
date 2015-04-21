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
            templateUrl: "partials/invoices.html",
            controller: "InvoicesController as InvoicesCtrl"
        })
        .state('invoice.item', {
            url: "/{invoiceId:[0-9]+}",
            templateUrl: "partials/invoice.html",
            controller: "InvoiceController as InvoiceCtrl"
        })
        .state('invoice.create', {
            url: "/create",
            templateUrl: "partials/newInvoice.html",
            controller:  "InvoiceCreateController as InvoiceCreateCtrl"
        })
        .state('sales', {
          url: "/sales",
          templateUrl: "partials/sales.html",
          controller: "SalesController"
        })
        .state('vendor', {
           url: "/vendor",
           templateUrl: "partials/vendor.html",
           controller: "VendorController as VendorCtrl"
        }).state('drug', {
            url: "/drug",
            templateUrl: "partials/drug.html",
            controller: "DrugController as DrugCtrl"
        });
        // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

ngPharm.config(function($stateProvider, $urlRouterProvider, $resourceProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/home.html",
            controller: "HomeController as HomeCtrl"
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
        .state('invoice.newinvoice', {
            parent: "invoice",
            templateUrl: "partials/newInvoice.html",
            controller:  "NewInvoiceController as NewInvoiceCtrl"
        })
        .state('invoice.newinvoice.newinvoiceitem', {
            url: '/newInvoiceItem/:drug',
            parent: 'invoice.newinvoice',
            onEnter: ['$modal', '$state', function($modal, $state) {
                console.log('Open new invoice item modal');
                $modal.open({
                    controller: 'NewInvoiceItemController as NewInvoiceItemCtrl',
                    templateUrl: 'partials/newInvoiceItem.html'
                })
                .result.finally(function() {
                    $state.go('^');
                });
            }]
        })
        .state('invoice.newinvoice.newinvoiceitem.newdrug', {
            url: '/newDrug/:drug',
            parent: 'invoice.newinvoice.newinvoiceitem',
            onEnter: ['$modal', '$state', function($modal, $state) {
                console.log('Open new drug modal');
                var modalInstance = $modal.open({
                    controller: 'NewDrugController as NewDrugCtrl',
                    templateUrl: 'partials/newDrug.html'
                })
                modalInstance.result.then(function(drug) {
                    modalInstance.close(drug);
                });
            }]
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
        })
        .state('drug', {
            url: "/drug",
            templateUrl: "partials/drug.html",
            controller: "DrugController as DrugCtrl"
        })
        .state('item-lookup', {
            url: "/item-lookup",
            templateUrl: "partials/itemLookup.html",
            controller: "ItemLookupController as ItemLookupCtrl"
        })
        // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

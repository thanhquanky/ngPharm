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
        .state('support', {
            url: '/support',
            templateUrl: 'partials/support.html',
            controller: 'SupportController as SupportCtrl'
        })
        .state('login', {
            url: "/login",
            templateUrl: "partials/login.html",
            controller: "LoginController as LoginCtrl"
        })
        .state('invoice', {
            url: "/invoice",
            templateUrl: "app/invoice/invoice.html",
            controller: "InvoiceController as InvoiceCtrl"
        })
        .state('invoice.item', {
            url: "/{invoiceId:[0-9]+}",
            templateUrl: "app/invoice/invoice-detail.html",
            controller: "InvoiceDetailController as InvoiceDetailCtrl"
        })
        .state('invoice.newinvoice', {
            url: '/new',
            parent: 'invoice',
            templateUrl: "app/invoice/newInvoice.html",
            controller:  "NewInvoiceController as NewInvoiceCtrl"
        })
        .state('manufacturer', {
            url: '/manufacturer',
            templateUrl: "app/manufacturer/manufacturer.html",
            controller: "ManufacturerController as ManufacturerCtrl"
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            controller: 'AboutController as AboutCtrl'
        })
        .state('sales', {
          url: "/sales",
          templateUrl: "partials/sales.html",
          controller: "SalesController"
        })
        .state('vendor', {
           url: "/vendor",
           templateUrl: "app/vendor/vendor.html",
           controller: "VendorController as VendorCtrl"
        })
        .state('drug', {
            url: "/drug",
            templateUrl: "app/drug/drug.html",
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

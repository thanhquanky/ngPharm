ngPharm.config(function($stateProvider, $urlRouterProvider) {
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
    .state('sales', {
      url: "/sales",
      templateUrl: "partials/sales.html",
      //controller: "InvoiceController"
    })
});

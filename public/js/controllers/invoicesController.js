ngPharm.controller('InvoicesController', ['Invoices', function(Invoices) {
    this.invoices = Invoices.query();
}]);

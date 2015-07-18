ngPharm.controller('InvoiceController', ['Invoices', function(Invoices) {
    this.invoices = Invoices.query();
}]);

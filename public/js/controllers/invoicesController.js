ngPharm.controller('InvoicesController', ['Invoices', '$scope', function(Invoices, $scope) {
    $scope.invoices = Invoices.query();
    console.log($scope.invoices);
}]);

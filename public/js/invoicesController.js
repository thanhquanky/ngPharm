ngPharm.controller('InvoicesController', ['uiGridConstants', 'Invoices', '$scope', function(uiGridConstants, Invoices, $scope) {
    $scope.invoices = Invoices.query();
    console.log($scope.invoices);
}]);

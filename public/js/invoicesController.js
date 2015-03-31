ngPharm.controller('InvoicesController', ['uiGridConstants', '$firebaseArray', '$scope', function(uiGridConstants, $firebaseArray, $scope) {
    var invoiceRef = new Firebase("https://amber-inferno-7229.firebaseio.com/invoices");
    $scope.invoices = $firebaseArray(invoiceRef);
}]);

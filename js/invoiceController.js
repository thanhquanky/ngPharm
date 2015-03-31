ngPharm.controller('InvoiceController', ['$scope', '$stateParams', function($scope, $stateParams) {
    var invoiceName = $stateParams.invoice_id;
    var invoice = null;
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
            field: 'name'
        }, {
            name: "Unit",
            field: 'unit',
            width: '13%'
        }, {
            name: "Quantity",
            field: 'quantity'
        }, {
            name: "Expiration Date",
            field: 'expiration_date',
            cellFilter: 'date'
        }, {
            name: 'Price',
            field: 'price'
        }],
        data: 'invoice.items'
    };
}]);

// Modal controller
ngPharm.controller('ModalDemoCtrl', function ($scope, $modal, $log) {
 // Create item to display
  $scope.items = ['item1', 'item2', 'e'];
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

ngPharm.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    // Do some form validation
    
    $modalInstance.close($scope.selected.item);
    console.log($scope.newItem.email.$viewValue);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
// Ends modal controller
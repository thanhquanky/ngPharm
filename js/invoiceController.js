ngPharm.controller('InvoiceController',
    ['$scope', function($scope) {
         $scope.myData = [{name: "Hydrocodone", unit: "bottle", quantity: 1, expiration_date: "2015/10/04", Price: 1.65},
                          {name: "Generic Zocor ", unit: "bottle", quantity: 3, expiration_date: "2015/09/04", Price: 2.65},
                          {name: "Lisinopril", unit: "pill", quantity: 5, expiration_date: "2015/08/04", Price: 3.65},
                          {name: "Generic Synthroid", unit: "pill", quantity: 7, expiration_date: "2015/07/04", Price: 4.65},
                          {name: "Generic Norvasc", unit: "bottle", quantity: 9, expiration_date: "2015/06/04", Price: 5.65},
                          {name: "Amoxicillin ", unit: "bottle", quantity: 13, expiration_date: "2015/05/04", Price: 6.65}];
         $scope.gridOptions = { data: $scope.myData };
    }]);

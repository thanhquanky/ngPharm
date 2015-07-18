ngPharm.controller('SalesController',
    ['uiGridConstants', '$scope', '$modal', '$log', function(uiGridConstants, $scope, $modal, $log) {
        $scope.myData = [{
        name: "Hydrocodone",
        total_sales: 1000,
        total_volume: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Generic Zocor ",
        total_sales: 1000,
        total_volume: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Lisinopril",
        total_sales: 1000,
        total_volume: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Generic Synthroid",
        total_sales: 1000,
        total_volume: 100,
        average_price: 1.65,
        average_profit: 0.65
    }];
        var numOfColumns = Object.keys($scope.myData[0]).length;
        var columnWidthStr = (100 / numOfColumns) + "%";
        //console.log(columnWidthStr);
        $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [{
            name: 'Name',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'name',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Total Sales',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'total_sales',
            width: columnWidthStr,
            aggregationType: uiGridConstants.aggregationTypes.sum
        }, {
            name: 'Total Volumes Sold',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'total_volume',
            width: columnWidthStr,
            aggregationType: uiGridConstants.aggregationTypes.sum
        }, {
            name: 'Average sold price per unit',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'average_price',
            width: columnWidthStr,
            aggregationType: uiGridConstants.aggregationTypes.sum
        }, {
            name: 'Average Profit per unit',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'average_profit',
            width: columnWidthStr,
            aggregationType: uiGridConstants.aggregationTypes.sum
        }],
        data: $scope.myData
    };
    $scope.addNewSales = function(){
        var modalInstance = $modal.open({
            templateUrl: 'newSalesItem.html',
            controller: 'NewSalesCtrl',
            resolve: {
                items: function(){
                    return $scope.item;
                }
            }
        });
        modalInstance.result.then(function(newItem){
            $scope.myData.push(newItem);
        }, function(){
            $log.info('Modal dismissed at ' + new Date());
        });
    };
}]);
ngPharm.controller('NewSalesCtrl', function($scope, $modalInstance, items){
    $scope.ok = function(){
        $modalInstance.close($scope.item);
    };
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };
});
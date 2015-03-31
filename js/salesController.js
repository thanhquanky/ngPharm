ngPharm.controller('SalesController',
    ['uiGridConstants', '$scope', function(uiGridConstants, $scope) {
        $scope.myData = [{
        name: "Hydrocodone",
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Generic Zocor ",
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Lisinopril",
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65
    }, {
        name: "Generic Synthroid",
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65
    }];
        var numOfColumns = Object.keys($scope.myData[0]).length;
        var columnWidthStr = (100 / numOfColumns) + "%";
        console.log(columnWidthStr);
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
            field: 'total',
            width: columnWidthStr,
            aggregationType: uiGridConstants.aggregationTypes.sum
        }, {
            name: 'Total Volumes Sold',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'volumes',
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
    
        $scope.addSales = function(){
            $scope.myData.push({
                name: "Some random drugs",
                total: 1000,
                volumes: 100,
                average_price: 1.65,
                average_profit: 0.65
            });
        };
}]);

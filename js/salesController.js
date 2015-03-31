ngPharm.controller('SalesController',
    ['$scope', function($scope) {
        $scope.myData = [{
        quarter: 1,
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65,
    }, {
        quarter: 1,
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65,
    }, {
        quarter: 1,
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65,
    }, {
        quarter: 1,
        total: 1000,
        volumes: 100,
        average_price: 1.65,
        average_profit: 0.65,
    }];
        var numOfColumns = Object.keys($scope.myData[0]).length;
        var columnWidthStr = (100 / numOfColumns) + "%";
        console.log(columnWidthStr);
        $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [{
            name: 'Quarter',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'quarter',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Total Sales',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'total',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Total Volumes Sold',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'Volumes',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Average sold price per unit',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'average_price',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Average Profit per unit',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'average_profit',
            width: columnWidthStr,
            footerCellTemplate:'<div></div>'
        }],
        data: $scope.myData
    };
}]);

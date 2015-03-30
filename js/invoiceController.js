ngPharm.controller('InvoiceController', ['uiGridConstants', '$scope', function(uiGridConstants, $scope) {
    $scope.myData = [{
        name: "Hydrocodone",
        unit: "bottle",
        quantity: 1,
        expiration_date: "2015/10/04",
        price: 1.65
    }, {
        name: "Generic Zocor ",
        unit: "bottle",
        quantity: 3,
        expiration_date: "2015/09/04",
        price: 2.65
    }, {
        name: "Lisinopril",
        unit: "pill",
        quantity: 5,
        expiration_date: "2015/08/04",
        price: 3.65
    }, {
        name: "Generic Synthroid",
        unit: "pill",
        quantity: 7,
        expiration_date: "2015/07/04",
        price: 4.65
    }, {
        name: "Generic Norvasc",
        unit: "bottle",
        quantity: 9,
        expiration_date: "2015/06/04",
        price: 5.65
    }, {
        name: "Amoxicillin ",
        unit: "bottle",
        quantity: 13,
        expiration_date: "2015/05/04",
        price: 6.65
    }];
    $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [{
            name: 'Name',
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            field: 'name',
            width: '13%',
            footerCellTemplate:'<div></div>'
        }, {
            name: "Unit",
            field: 'unit',
            width: '13%',
            footerCellTemplate:'<div></div>'
        }, {
            name: "Quantity",
            field: 'quantity',
            width: '13%',
            aggregationType: uiGridConstants.aggregationTypes.max
        }, {
            name: "Expiration Date",
            field: 'expiration_date',
            width: '13%',
            cellFilter: 'date',
            footerCellFilter: 'date',
            footerCellTemplate:'<div></div>'
        }, {
            name: 'Price',
            field: 'price',
            width: '20%',
            aggregationType: uiGridConstants.aggregationTypes.sum
        }],
        data: $scope.myData
    };
}]);

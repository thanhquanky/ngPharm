(function() {
    angular.module('ngPharm')
        .controller('ItemLookupController', ['InvoiceItems', 'Drugs', 'uiGridConstants', '$scope',
            function(InvoiceItems, Drugs, uiGridConstants, $scope) {
                var vm = this;

                vm.drugs = Drugs.query();

                vm.gridOptions = {
                    showGridFooter: true,
                    showColumnFooter: true,
                    enableFiltering: true,

                    columnDefs: [{
                        name: 'Name',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true,
                        field: 'Drug.name'
                    },
                    {
                        name: "Manufacture Date",
                        field: 'manufactureDate',
                        cellFilter: 'date:"yyyy-MM-dd"',
                        type: 'date'
                    }, {
                        name: "Expiration Date",
                        field: 'expirationDate',
                        type: 'date',
                        cellFilter: 'date:"yyyy-MM-dd"'
                    },{
                        name: "Unit",
                        field: 'Unit.name',
                        width: '13%'
                    }, {
                        name: "Quantity",
                        field: 'quantity'
                    }, {
                        name: 'Price',
                        field: 'price'
                    },
                    {
                        name: 'Total',
                        field: 'getTotal()',
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        type: 'number'
                    }]
                };

                vm.findPrice = function(drugName) {
                    vm.gridOptions.data = InvoiceItems.get({name: drugName});
                }
        }]);

})();

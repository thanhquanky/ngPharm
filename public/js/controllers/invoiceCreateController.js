/**
 * Created by thanhquanky on 4/14/15.
 */

(function() {
    angular.module('ngPharm')
        .controller('InvoiceCreateController', ['$modal', 'Vendors', '$log', function($modal, Vendors, $log) {
            this.vendors = Vendors.query();

            this.invoice = {
                items: []
            };

            this.gridOptions = {
                showGridFooter: true,
                enableFiltering: true,
                columnDefs: [{
                    name: 'Name',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true,
                    field: 'Drug.name'
                }, {
                    name: "Unit",
                    field: 'Unit.name',
                    width: '13%'
                }, {
                    name: "Quantity",
                    field: 'quantity'
                }, {
                    name: "Manufacture Date",
                    field: 'manufactureDate',
                    cellFilter: 'date'
                }, {
                    name: "Expiration Date",
                    field: 'expirationDate',
                    cellFilter: 'date'
                },{
                    name: 'Price',
                    field: 'price'
                }],
                data: this.invoice.items
            };

            this.newItemForm = {
                open: function (size) {
                    var modalInstance = $modal.open({
                        templateUrl: 'partials/new_item.html',
                        controller: 'NewItemController as NewItemCtrl',
                        size: size,
                        resolve: {
                            items: function () {
                                return this.item;
                            }
                        }
                    });
                    modalInstance.result.then(function (newItem) {
                        console.log($scope.invoice);
                        Invoices.addItem($scope.invoice.$id, newItem);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });

                }
            };
        }]);
}());


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
(function() {
    angular.module('ngPharm')
        .controller('NewItemController', function ($modalInstance, items) {

            this.ok = function () {
                $modalInstance.close(this.item);
            };

            this.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            this.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

            this.manufactureDatePicker = {
                open:function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    this.opened = true;
                },

                dateOptions: {
                    formatYear: 'yy',
                    startingDay: 1
                },

                format: this.dateFormats[0],

                disabled: function(date, mode) {
                    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                }
            };

            this.expirationDatePicker = {
                open:function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    this.opened = true;
                },

                dateOptions: {
                    formatYear: 'yy',
                    startingDay: 1
                },

                format: this.dateFormats[0],

                disabled: function(date, mode) {
                    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                }
            };


    });

}());

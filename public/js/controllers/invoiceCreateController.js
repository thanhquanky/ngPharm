/**
 * Created by thanhquanky on 4/14/15.
 */

(function() {
    angular.module('ngPharm')
        .controller('InvoiceCreateController', ['$modal', 'Vendors', '$log', function($modal, Vendors, $log) {
            var that = this;
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
                        templateUrl: 'partials/newInvoiceItem.html',
                        controller: 'NewInvoiceItemController as NewInvoiceItemCtrl',
                        size: size,
                        resolve: {
                            items: function () {
                                return this.items;
                            }
                        }
                    });
                    modalInstance.result.then(function (newInvoiceItem) {
                        that.invoice.items.push(newInvoiceItem);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date ());
                    });

                }
            };
        }]);
}());


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
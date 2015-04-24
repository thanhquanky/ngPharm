/**
 * Created by thanhquanky on 4/14/15.
 */

(function() {
    angular.module('ngPharm')
        .controller('NewInvoiceController', ['$modal', '$state', 'Vendors', 'Drugs', 'Units', 'Invoices', 'toaster','$log',
            function($modal, $state, Vendors, Drugs, Units, Invoices, toaster, $log) {
                var that = this;

                // Query the vendor list
                this.vendors = Vendors.query();

                // Query the drugs list
                this.drugs = Drugs.query();

                // Query the units list
                this.units = Units.query();

                // Initialize invoice
                this.invoice = {
                    items: []
                };

                this.submit = function() {
                    that.newInvoiceForm.disabled = true;
                    var newInvoice = new Invoices(that.invoice);
                    newInvoice.$save(
                        function(addedInvoice) {
                            toaster.pop('success', 'Invoice', 'Invoice has been added');
                            $state.go('invoice', {}, {reload: true});
                        },
                        function(err) {
                            toaster.pop('error', 'Invoice', 'Cannot add invoice. Please try again');
                            that.newInvoiceForm.disabled = false;
                        });
                }

                //ng-grid configuration for invoice items table
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

                this.newInvoiceForm = {
                    open: function (size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newInvoiceItem.html',
                            controller: 'NewInvoiceItemController as NewInvoiceItemCtrl',
                            size: size
                        });
                        modalInstance.result.then(function (newInvoiceItem) {
                            that.invoice.items.push(newInvoiceItem);
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date ());
                        });

                    },
                    disabled: false
                };
            }
        ]);
    }
)();


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
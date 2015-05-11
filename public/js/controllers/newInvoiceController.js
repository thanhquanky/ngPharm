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
                    items: [],
                    subtotal: 0,
                    tax: 0,
                    total: 0
                };
                this.taxPercentage = 0.05;

                this.calculateSubtotal = function() {
                    var s = 0;
                    if (that.invoice.items.length > 0) {
                        angular.forEach(that.invoice.items, function(invoiceItem) {
                            s += invoiceItem.price * invoiceItem.quantity;
                        });
                    }
                    that.invoice.subtotal = s;
                    return s;
                }

                this.calculateTax = function() {
                    var tax = this.invoice.subtotal * this.taxPercentage;
                    this.invoice.tax = tax;
                    return tax;
                }

                this.calculateTotal = function() {
                    var total = this.invoice.subtotal + this.invoice.tax;
                    this.invoice.total = total;
                    return total;
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
                    }, {
                        name: 'Price',
                        field: 'price'
                    }],
                    data: this.invoice.items
                };

                this.newVendorForm = {
                    open: function (size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newVendor.html',
                            controller: 'NewVendorController as NewVendorCtrl',
                            size: size
                        });

                        // After returning from the modal
                        modalInstance.result.then(function (newVendor) {
                            that.invoice.Vendor = newVendor;
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });

                    },
                    disabled: false,

                    submit: function () {
                        that.newVendorForm.disabled = true;
                        var newVendor = new Vendors(that.vendor);
                        newVendor.$save(
                            function () {
                                toaster.pop('success', 'Vendor', 'Vendor has been added');
                            },
                            function (err) {
                                toaster.pop('error', 'Vendor', 'Cannot add vendor. Please try again');
                                that.newVendorForm.disabled = false;
                            });

                    }
                };

                this.newInvoiceItemForm = {
                    open: function (size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newInvoiceItem.html',
                            controller: 'NewInvoiceItemController as NewInvoiceItemCtrl',
                            size: size
                        });
                        modalInstance.result.then(function (newInvoiceItem) {
                            that.invoice.items.push(newInvoiceItem);
                            that.calculateSubtotal();
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });

                    }
                };

                this.newInvoiceForm = {
                    submit: function () {
                        that.newInvoiceForm.disabled = true;
                        var newInvoice = new Invoices(that.invoice);
                        newInvoice.$save(
                            function () {
                                toaster.pop('success', 'Invoice', 'Invoice has been added');
                                $state.go('invoice', {}, {reload: true});
                            },
                            function (err) {
                                toaster.pop('error', 'Invoice', 'Cannot add invoice. Please try again');
                                that.newInvoiceForm.disabled = false;
                            });

                    },

                    disabled: false
                }
            }
        ])
    })();


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

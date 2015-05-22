/**
 * Created by thanhquanky on 4/14/15.
 */

(function() {
    angular.module('ngPharm')
        .controller('NewInvoiceController', ['$modal', '$state', 'Vendors', 'Drugs', 'Units', 'Invoices', 'toaster','$log',
            function($modal, $state, Vendors, Drugs, Units, Invoices, toaster, $log) {
                var vm = this;

                // Query the vendor list
                vm.vendors = Vendors.query();

                // Query the drugs list
                vm.drugs = Drugs.query();

                // Query the units list
                vm.units = Units.query();

                // Initialize invoice
                vm.invoice = {
                    InvoiceItems: [],
                    subtotal: 0,
                    tax: 0,
                    total: 0
                };
                vm.taxPercentage = 0.05;

                vm.calculateSubtotal = function() {
                    var s = 0;
                    if (vm.invoice.InvoiceItems.length > 0) {
                        angular.forEach(vm.invoice.InvoiceItems, function(invoiceItem) {
                            s += invoiceItem.price * invoiceItem.quantity;
                        });
                    }
                    vm.invoice.subtotal = s;
                    return s;
                }

                vm.calculateTax = function() {
                    var tax = vm.invoice.subtotal * vm.taxPercentage;
                    vm.invoice.tax = tax;
                    return tax;
                }

                vm.calculateTotal = function() {
                    var total = vm.invoice.subtotal + vm.invoice.tax;
                    vm.invoice.total = total;
                    return total;
                }

                //ng-grid configuration for invoice items table
                vm.gridOptions = {
                    showGridFooter: true,
                    enableFiltering: true,
                    enableRowSelection: true,
                    enableRowHeaderSelection: true,
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
                        cellFilter: 'date:"MM/yyyy"'
                    }, {
                        name: "Expiration Date",
                        field: 'expirationDate',
                        cellFilter: 'date:"MM/yyyy"'
                    }, {
                        name: 'Price',
                        field: 'price'
                    }],
                    data: vm.invoice.InvoiceItems
                };

                vm.newVendorForm = {
                    open: function (size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newVendor.html',
                            controller: 'NewVendorController as NewVendorCtrl',
                            size: size
                        });

                        // After returning from the modal
                        modalInstance.result.then(function (newVendor) {
                            vm.invoice.Vendor = newVendor;
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });

                    },
                    disabled: false,

                    submit: function () {
                        vm.newVendorForm.disabled = true;
                        var newVendor = new Vendors(vm.vendor);
                        newVendor.$save(
                            function () {
                                toaster.pop('success', 'Vendor', 'Vendor has been added');
                            },
                            function (err) {
                                toaster.pop('error', 'Vendor', 'Cannot add vendor. Please try again');
                                vm.newVendorForm.disabled = false;
                            });

                    }
                };

                vm.newInvoiceItemForm = {
                    open: function (size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newInvoiceItem.html',
                            controller: 'NewInvoiceItemController as NewInvoiceItemCtrl',
                            size: size
                        });
                        modalInstance.result.then(function (newInvoiceItem) {
                            vm.invoice.InvoiceItems.push(newInvoiceItem);
                            vm.calculateSubtotal();
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });

                    }
                };
                
                vm.newVendorForm = {
                    open: function(size) {
                        var modalInstance = $modal.open({
                            templateUrl: 'partials/newVendor.html',
                            controller: 'NewVendorController as NewVendorCtrl',
                            size: size,
                            resolve: { 
                                vendor: function() {
                                    return vm.invoice.Vendor;
                                }
                            }
                        });
                        modalInstance.result.then(function(vendor) {
                            vm.invoice.Vendor = vendor;
                            vm.newInvoiceForm.submit();
                        });
                    }
                };

                vm.newInvoiceForm = {
                    submit: function () {
                        // If vendor is not registered, ask user to register vendor
                        if (typeof(vm.invoice.Vendor) == 'string') {
                            vm.newVendorForm.open();
                        }
                        else {
                            // then proceed invoice submission
    
                            vm.newInvoiceForm.disabled = true;
                            /*
                            var invoice = angular.copy(vm.invoice);
                            var n = invoice.items.length;
                            for (var i=0; i<n; i++) {
                                invoice.items[i].expirationDate = moment(invoice.items[i].expirationDate, 'MM/YYYY');
                                invoice.items[i].manufactureDate = moment(invoice.items[i].manufactureDate, 'MM/YYYY');
                            }
                            */
                         
                            Invoices.save(vm.invoice).$promise
                                .then(
                                    function () {
                                        toaster.pop('success', 'Invoice', 'Invoice ' + vm.invoice.number + ' from ' + vm.invoice.Vendor.name + ' has been added');
                                        $state.go('invoice', {}, {reload: true});
                                    }, 
                                    function (err) {
                                        toaster.pop('error', 'Invoice', 'Cannot add invoice. Please try again');
                                        vm.newInvoiceForm.disabled = false;
                                    }
                                );
                        }
                    },

                    disabled: false
                }
            }
        ])
    })();


// Please note vm $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

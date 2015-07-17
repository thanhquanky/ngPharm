/**
 * Created by thanhquanky on 4/21/15.
 */
 
(function() {
   angular.module('ngPharm')
       .controller('NewVendorController',  ['Vendors', '$modalInstance', 'toaster', 'vendor',
            function (Vendors, $modalInstance, toaster, vendor) {
                var vm = this;
                vm.vendor = {};
                if (vendor && typeof(vendor) == "string") {
                    vm.vendor.name = vendor;
                }
                vm.ok = function () {
                        var newVendor = new Vendors(vm.vendor);
                        newVendor.$save(function(vendorModel) {
                            toaster.pop('success', 'Vendor', vendorModel.name + ' has been added');
                            $modalInstance.close(vendorModel);
                        });
                    }
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                }
            }
        ]);
})();
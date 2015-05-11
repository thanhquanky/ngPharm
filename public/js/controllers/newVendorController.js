/**
 * Created by thanhquanky on 4/21/15.
 */
ngPharm.controller('NewVendorController',  ['Vendors', '$modalInstance', 'toaster', function (Vendors, $modalInstance, toaster) {
    var vm = this;
    vm.newVendorForm = {

        ok: function () {
            var newVendor = new Vendors(vm.vendor);
            newVendor.$save(function(vendorModel) {
                toaster.pop('success', 'Vendor', vendorModel.name + ' has been added');
                $modalInstance.close(vendorModel);
            });
        },

        cancel: function () {
            $modalInstance.dismiss('cancel');
        }
    };
}]);

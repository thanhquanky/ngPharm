/**
 * Created by thanhquanky on 4/21/15.
 */
ngPharm.controller('NewVendorController',  function ($modalInstance) {
    this.ok = function () {
        $modalInstance.close(this.vendor);
    };

    this.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

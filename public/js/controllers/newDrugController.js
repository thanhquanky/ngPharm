(function() {
    angular.module('ngPharm')
        .controller('NewDrugController', ['$modalInstance', '$state', 'Manufacturers', 'Drugs', 'toaster', 'drug',
            function ($modalInstance, $state, Manufacturers, Drugs, toaster, drug) {
                this.drug = {};
                if ($state.params.drug !== "") {
                    this.drug.name = $state.params.drug;
                }
                if (drug) {
                    this.drug.name = drug;
                }
                this.manufacturers = Manufacturers.query();
                this.ok = function () {
                    var newDrug = new Drugs(this.drug);
                    newDrug.$save(function(drugModel) {
                        toaster.pop('success', 'Drug', drugModel.name + ' has been added');
                        $modalInstance.close(drugModel);
                    });
                };
                this.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]);
})();
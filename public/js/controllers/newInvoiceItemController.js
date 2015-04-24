/**
 * Created by thanhquanky on 4/21/15.
 */
angular.module('ngPharm')
    .controller('NewInvoiceItemController', function ($scope, $modalInstance, Drugs, Units, $modal, $state) {
        var that = this;
        this.drugs = Drugs.query();
        this.units = Units.query();

        this.ok = function () {
            if (typeof(that.invoiceItem.Drug) === "string") {
                var modalInstance = that.newDrugForm.open();
            }
            else {
                $modalInstance.close(this.invoiceItem);
            }
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

        this.newDrugForm = {
            open: function(size){
                console.log("Drug form opened");
                var modalInstance = $modal.open({
                    templateUrl: 'partials/newDrug.html',
                    controller: 'NewDrugController as NewDrugCtrl',
                    size: size,
                    resolve: {
                        drug: function() {
                            return that.invoiceItem.Drug;
                        }
                    }
                });

                modalInstance.result.then(function(drug) {
                    that.invoiceItem.Drug = drug;
                });
            }
        };

    });

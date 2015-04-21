/**
 * Created by thanhquanky on 4/21/15.
 */
angular.module('ngPharm')
    .controller('NewInvoiceItemController', function ($modalInstance, drugs, units) {

        this.drugs = drugs;

        this.units = units;

        this.ok = function () {
            $modalInstance.close(this.invoiceItem);
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

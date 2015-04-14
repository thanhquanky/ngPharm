/**
 * Created by thanhquanky on 4/10/15.
 */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-resource.d.ts"/>
var ngPharm;
(function (ngPharm) {
    var Services;
    (function (Services) {
        var InvoiceService = (function () {
            function InvoiceService($resource) {
            }
            InvoiceService.$inject = ['$resource'];
            return InvoiceService;
        })();
        Services.InvoiceService = InvoiceService;
    })(Services = ngPharm.Services || (ngPharm.Services = {}));
})(ngPharm || (ngPharm = {}));
//# sourceMappingURL=invoiceService.js.map
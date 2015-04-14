/**
 * Created by thanhquanky on 4/8/15.
 */

angular.module('ngPharm.services', ['ngResource'])
    .factory('Invoices', ['ServerInfo', '$resource', function(ServerInfo, $resource) {
        return $resource("/invoice/:invoiceId", {});
    }])
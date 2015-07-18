/**
 * Created by thanhquanky on 4/21/15.
 */
(function() {
    angular.module('ngPharm.services')
        .service('Units', ['ServerInfo', '$resource', function(ServerInfo, $resource) {
            return $resource('/unit/:unitId', {});
        }]);
})();
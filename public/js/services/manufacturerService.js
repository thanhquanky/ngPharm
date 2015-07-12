(function(){
    angular.module('ngPharm.services')
        .service('Manufacturers',['ServerInfo', '$resource', function(ServerInfo, $resource){
            return $resource('/manufacturer/:manufacturerId', {});
        }]);
})();


var ngPharm = angular.module('ngPharm',
    [
        'ui.bootstrap', 'ui.bootstrap.datetimepicker',
        'ui.router',
        'ui.grid', 'ui.grid.edit','ui.grid.selection', 
        'toaster', 
        'ngResource',
        'ngPharm.services',
        'authService'
]).config(['$httpProvider', 
    function($httpProvider) {
        $httpProvider.interceptors.push(function($q) {
            return {
                'request': function(config) {
                    return config || $q.when(config);
                },
                'requestError': function(rejection) {
                    if(rejection.status === 404) {
                        window.location = "/";
                        //throw a error dialog or redirect to a  401 page etc
                    }
                    return $q.reject(rejection);
                },
                'response': function(response) {
                    return response || $q.when(response);
                },
                'responseError': function(rejection) {
                    if(rejection.status === 404) {
                        window.location = "/";
                        //throw a error dialog or redirect to a  401 page etc

                    }
                    return $q.reject(rejection);
                }
            }
        });
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);
ngPharm.constant('ServerInfo', {
    'host': '52.5.44.90',
    'post': '80'
});

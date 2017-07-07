/**
 * Created by JoffZhang on 2017/6/15.
 */
(function(angular){
    'use strict';
    angular.module('TimetableApp').factory('authInterceptorService',['$log','$q','$injector','$location',authInterceptorService]);

    function authInterceptorService($log,$q,$injector,$location){
        $log.info('--------authInterceptor'+$location);
        //var authService = $injector.get('authService');
        //$log.info(authService);
        
        
        /*var authInterceptorServices = {
            request: request,
            responseError: responseError
        };

        return authInterceptorServices;

        function request(config){
            var authParams = authService.getAuthenticationParams();
            config.headers = config.headers || {};
            if(authParams.authtoken) config.headers.authtoken = authParams.authtoken;
            return config || $q.when(config);
        }

        function responseError(rejection) {// 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
            if (rejection.status === 401) {
                authService.logout();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }*/
    }

   /* angular.module('TimetableApp').config(['$httpProvider',function($httpProvider){
        $httpProvider.interceptors.push('authInterceptorService');
    }]);*/
})(angular);

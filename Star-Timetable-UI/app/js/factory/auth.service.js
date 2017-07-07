/**
 * Created by JoffZhang on 2017/6/15.
 */
(function(angular){
    'use strict';

    angular.module('TimetableApp').factory('authService',['$rootScope','$http','$log','$q','$window','timetableManagerConfig','$location',authService]);

    function authService($rootScope,$http,$log,$q,$window,timetableManagerConfig,$location){
        var localStorage = $window.localStorage;
        var apiUserPermission = timetableManagerConfig.baseUrl + 'user/permission';
        var authServices = {
            login:login,
            logout:logout,
            getAuthenticationParams: getAuthenticationParams,
            checkAuthentication:checkAuthentication
        };
        return authServices;

        /**
         * 定义处理错误函数，私有函数。
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        function handleError(name, error) {
            return $log.error('XHR Failed for ' + name + '.\n', angular.toJson(error, true));
        }

        /**
         * 定义login函数，公有函数。
         * 若登录成功，把服务器返回的token存入localStorage。
         * @param {type} xxx
         * @returns {*}
         * @public
         */
        function login(loginData){
            var apiLoginUrl = timetableManagerConfig.loginUrl;
            return $http({
                method:'POST',
                url:apiLoginUrl,
                params:{registerName:loginData.username,registerpwd:loginData.password}
            }).then(loginComplete);//.catch(loginFailed);


            function  loginComplete(response){
                $log.info(response);
                if(response.status === 200 && response.data.authorities.includes('timetable')){
                    //将token存入localStorage

                    //localStorage.authtoken = response.headers().authtoken;
                    localStorage.authtoken = angular.toJson(response.data);
                    setAuthenticationParams(true);
                    $location.path('/home');
                }else{
                    localStorage.authtoken = '';
                    setAuthenticationParams(false);
                }
            }
        /*    function loginFailed(error){
                handleError('login()',error);
            }*/
        }
        /**
         * 定义logout函数，公有函数。
         * 清除localStorage中的数据。
         * @public
         */
        
        function logout(){
            localStorage.clear();
            $location.path('/login');
        }
        /**
         * 定义传递数据的setter函数，私有函数。
         * 用于设置isAuth参数。
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        function setAuthenticationParams(param) {
            localStorage.isAuth = param;
        }

        /**
         * 定义获取数据的getter函数，公有函数。
         * 用于获取isAuth和token参数。
         * 通过setter和getter函数，可以避免使用第四种方法所提到的$watch变量。
         * @param {type} xxx
         * @returns {*}
         * @public
         */
        function getAuthenticationParams() {
            var authParams = {
                isAuth: localStorage.isAuth,
                authtoken: localStorage.authtoken
            };
            return authParams;
        }

        function checkAuthentication(){
            var deferred = $q.defer();
            $http.get(apiUserPermission).then(function(response){
                if(response.status === '200'){
                    if(response.data.authorities.includes('timetable')){
                        deferred.resolve(true);
                    }else{
                        deferred.resolve(false);
                    }
                }else{
                    handleError('checkAuthentication()', response);
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        }
    }
})(angular);
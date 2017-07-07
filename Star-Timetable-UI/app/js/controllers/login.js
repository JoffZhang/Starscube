/**
 * Created by JoffZhang on 2017/6/2.
 */
(function (angular) {
    'use strict';

    
    angular.module('TimetableApp').controller('loginCtrl', ['$log', '$scope', 'authService', function ($log, $scope, authService) {
        $scope.userInfo = {username:'',password:''};
        $scope.userLogin = function(isValid){
                if(isValid){
                    // authService.login($scope.userInfo);
                    authService.login($scope.userInfo);
                 }
        };
    }]);
})(angular);
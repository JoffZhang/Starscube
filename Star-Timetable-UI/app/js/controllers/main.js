/**
 * Created by JoffZhang on 2017/5/24.
 */
(function(angular,$) {
    'use strict';

    angular.module('TimetableApp').controller('timetableCtrl',[
        '$log','$scope','$rootScope','$window','$translate','timetableManagerConfig','authService',
        function ($log,$scope, $rootScope, $window, $translate, timetableManagerConfig,authService) {
            var $storage = $window.localStorage;
            $rootScope.userinfo = angular.fromJson($storage.authtoken);
            $scope.schoolId = $rootScope.userinfo.agencyName;
            $scope.schoolUUID = $rootScope.userinfo.agency;
            $scope.schoolInfoBean = $rootScope.userinfo.schoolInfoBean;
            $scope.config = timetableManagerConfig;
            $scope.viewTemplate = $storage.getItem('viewTemplate') || 'content.html';
            $scope.modalTypes = {type:'',types:{danger:'modal-danger',success: 'modal-success',warning:'model-warning'},sureClick:function(){}};

            $scope.logout = function(){
                authService.logout();
            };
            $scope.setTemplate = function(name){
                $storage.setItem('viewTemplate',name);
                $scope.viewTemplate = name;
                $.toString();
            };
            $scope.modal = function(id,hide,sureClick,type,returnElement){
                var element = $('#'+id);
                element.modal(hide?'hide':'show');
                $scope.modalTypes.type=type;
                $scope.modalTypes.sureClick = sureClick?sureClick:function(){};
                return returnElement?element:true;
            };
            $scope.changeLanguage = function (locale) {
                if (locale) {
                    $storage.setItem('language', locale);
                    return $translate.use(locale);
                }
                $translate.use($storage.getItem('language') || timetableManagerConfig.defaultLang);
            };

           /* $scope.numberFormat = function(obj,attr){
              obj[attr] = obj[attr].replace(/\D/g,'');
              obj[attr] = obj[attr].replace(/^[6-9]/g,'');
              obj[attr] = obj[attr].length > 1?obj[attr].substr(0,1):obj[attr];
            };*/

           var a = $.AdminLTE.options;
            $('body').removeClass('hold-transition');
            $.AdminLTE.layout.activate();
            $.AdminLTE.tree('.sidebar');
            a.sidebarPushMenu && $.AdminLTE.pushMenu.activate(a.sidebarToggleSelector);
            $('#myModal').modal('hide');
           
        }
    ]);


  /*  angular.element(window).bind('load', function () {
        var a = $.AdminLTE.options;
        $('body').removeClass('hold-transition');
        $.AdminLTE.layout.activate();
        $.AdminLTE.tree('.sidebar');
        a.sidebarPushMenu && $.AdminLTE.pushMenu.activate(a.sidebarToggleSelector);
        $('#myModal').modal('hide');
        alert('main --- load ');
    });*/

})(angular,jQuery);
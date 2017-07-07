/**
 * Created by JoffZhang on 2017/6/5.
 */
(function (angular) {
    'use strict';
    angular.module('TimetableApp').service('apiHandler', ['$log','$http', '$q', '$window', '$translate', function ($log,$http, $q, $window, $translate) {

        //$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        var ApiHandler = function(){
            this.inprocess = false;
            this.asyncSuccess = false;
            this.error = '';
        };
        ApiHandler.prototype.deferredHandler = function(data, deferred, code, defaultMsg) {
            if (!data || typeof data !== 'object') {
                this.error = 'Error %s - Bridge response error, please check the API docs or this ajax response.'.replace('%s', code);
            }
            if (code == 404) {
                this.error = 'Error 404 - Backend bridge is not working, please check the ajax response.';
            }
            if (data.result && data.result.error) {
                this.error = data.result.error;
            }
            if (!this.error && data.error) {
                this.error = data.error.message;
            }
            if (!this.error && defaultMsg) {
                this.error = defaultMsg;
            }
            if (this.error) {
                return deferred.reject(data);
            }
            return deferred.resolve(data);
        };

        /**
         //要通过post传递的参数
         var data = {
    pageindex: 1,
    pagesize: 8,
},
         //post请求的地址
         url = "/admin/KeyValue/GetListByPage",
         //将参数传递的方式改成form
         postCfg = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: function (data) {//transformRequest是用来转换请求参数的数据格式，data为参数对象
        return $.param(data);
    }
};
         //发送post请求，获取数据
         $http.post(url, data, postCfg)
         .success(function (response) {
        alert("aa");
    });*/
        ApiHandler.prototype.delTimetable = function (apiUrl, items,schoolId) {
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            var data = {id:items,schoolId:schoolId};
            $http.post(apiUrl,data).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_saveTemps'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.saveTemps = function (apiUrl, items,schoolId) {
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            $http.post(apiUrl,{temps:angular.toJson(items),schoolId:schoolId}).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_saveTemps'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.saveTimeTable = function(apiUrl,baseInfo,info,userInfo,schoolInfoBean){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            var datas = {baseInfo:baseInfo,info:info,userInfo:userInfo,schoolInfoBean:schoolInfoBean,schoolId:schoolInfoBean.schoolId};
            $http({
                method:'post',
                url:apiUrl,
                data:datas
            }).then(function(response) {
                $log.info(response);
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_saveTemps'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.getTimetableList=function(apiUrl,pageIndex,pageSize,type,schoolId,stageId,gradeId){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            var params = {pageIndex:pageIndex,pageSize:pageSize,type:type,schoolId:schoolId,stagesId:stageId,gradeId:gradeId};
            $http.get(apiUrl,{params:params}).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_getTimetableTempList'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.getTimetableTempList=function(apiUrl,schoolId){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            $http.get(apiUrl+'?schoolId='+schoolId).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_getTimetableTempList'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.getTimetable=function(apiUrl,timetableId){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            $http.get(apiUrl+'?id='+timetableId).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_getTimetableTempList'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.getBasedata=function(apiUrl,type){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            $http.get(apiUrl+'?type='+type).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_getBasedata'));
            });
            return deferred.promise;
        };
        ApiHandler.prototype.getClassList=function(apiUrl,schoolId){
            var self = this;
            var deferred = $q.defer();
            self.inprocess =true;
            self.error='';
            $http.get(apiUrl+'?schoolId='+schoolId).then(function(response) {
                self.deferredHandler(response,deferred);
            },function (response,code) {
                self.deferredHandler(response, deferred, code, $translate.instant('error_getClassList'));
            });
            return deferred.promise;
        };
        return ApiHandler;
    }]);
})(angular);
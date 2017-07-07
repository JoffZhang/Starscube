/**
 * Created by JoffZhang on 2017/6/5.
 */
(function(angular){
    'use strict';
    angular.module('TimetableApp').service('apiMiddleware',['$window','timetableManagerConfig','apiHandler',function($window,timetableManagerConfig,ApiHandler){
        var ApiMiddleware = function () {
            this.apiHandler = new ApiHandler();
        };
        
        ApiMiddleware.prototype.delTimetable = function (id,schoolId) {
            return this.apiHandler.delTimetable(timetableManagerConfig.delTimetableUrl,id,schoolId);
        };
        ApiMiddleware.prototype.getTimetableList = function (pageIndex,pageSize,type,schoolId,stageId,gradeId) {
            return this.apiHandler.getTimetableList(timetableManagerConfig.timetableListUrl,pageIndex,pageSize,type,schoolId,stageId,gradeId);
        };
        ApiMiddleware.prototype.getTimetableTemp = function (schoolId) {
            return this.apiHandler.getTimetableTempList(timetableManagerConfig.tempListUrl,schoolId);
        };
        ApiMiddleware.prototype.saveTemps = function(temp,schoolId){
            return this.apiHandler.saveTemps(timetableManagerConfig.saveTempsUrl,temp,schoolId);
        };

        ApiMiddleware.prototype.saveTimeTable = function(baseInfo,info,userInfo,schoolInfoBean){
            return this.apiHandler.saveTimeTable(timetableManagerConfig.saveTimeTableUrl,baseInfo,info,userInfo,schoolInfoBean);
        };

        ApiMiddleware.prototype.getTimetable = function(timetableId){
            return this.apiHandler.getTimetable(timetableManagerConfig.timeTableUrl,timetableId);
        };

        ApiMiddleware.prototype.getBasedata = function(parentId,type){
            return this.apiHandler.getBasedata(timetableManagerConfig.basedataUrl+'/'+parentId,type);
        };
        ApiMiddleware.prototype.getClasses = function(schoolId){
            return this.apiHandler.getClassList(timetableManagerConfig.classListUrl,schoolId);
        };

        return ApiMiddleware;
    }]);
})(angular);
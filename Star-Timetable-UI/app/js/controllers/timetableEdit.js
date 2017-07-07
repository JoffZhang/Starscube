/**
 * Created by JoffZhang on 2017/6/2.
 */
(function (angular) {
    'use strict';

    angular.module('TimetableApp').controller('timetableEditCtrl', ['$log', '$scope', 'apiMiddleware', '$filter','timetableService', function ($log, $scope, ApiMiddleware, $filter,timetableService) {
        $scope.noonNums = {forenoonNum: '', afternoonNum: ''};
        $scope.timeTemp = [];
        $scope.temps = {fore: [], after: []};
        $scope.currentSelects = {
            stageId: 0,
            gradeId: 0,
            classId: 0,
            timePicker: {
                startDate: '',
                endDate: ''
            },
            baseId:0
        };
        $scope.callout = false;
        var defaultSelect = [{id: 0, title: '请选择'}];
        $scope.stages = [{id: 0, title: '请选择'}];//学段
        $scope.grades = [{id: 0, title: '请选择'}];//年级
        $scope.subjects = [{id: 0, title: '请选择'}];
        $scope.classes = [{id: 0, title: '请选择'}];
        $scope.apiMiddleware = new ApiMiddleware();
        $scope.timetable = {subjects: [], users: []};
        $scope.submitForm = function (isValid) {
            if (isValid) {
                var info = [],userInfo=[],baseInfo={};
                $scope.timetable.subjects.forEach(function (value) {
                    info.push(value);
                });
                $scope.timetable.users.forEach(function (value) {
                    userInfo.push(value);
                });
                baseInfo={
                    id:$scope.currentSelects.baseId,
                    stagesId: $scope.currentSelects.stageId,
                    gradeId: $scope.currentSelects.gradeId,
                    classId: $scope.currentSelects.classId,
                    startDate: $scope.currentSelects.timePicker.startDate,
                    endDate: $scope.currentSelects.timePicker.endDate,
                    schoolId:$scope.schoolId
                };
                $scope.apiMiddleware.saveTimeTable(baseInfo,info,userInfo,$scope.schoolInfoBean).then(function (resp) {
                    if (resp.status == 200) {
                        $scope.callout = true;
                    }
                    $log.info(resp);
                });
            }
        };

        $scope.searchStage = function (parentId) {
            parentId = parentId || 0;
            var type = 3;
            clearSelect();
            $scope.apiMiddleware.getBasedata(parentId, type).then(function (datas) {
                if (datas.status == 200)
                    $scope.stages = defaultSelect.concat(datas.data);
            });
        };

        $scope.searchSubjects = function (parentId) {
            var type = 3;
            clearSubjects();
            $scope.apiMiddleware.getBasedata(parentId, type).then(function (datas) {
                if (datas.status == 200)
                    $scope.subjects = defaultSelect.concat(datas.data);
            });
        };

        var searchClasses = function () {
            $scope.apiMiddleware.getClasses($scope.schoolUUID).then(function (datas) {
                if (datas.status == 200) {
                    var classes = [];
                    angular.forEach(datas.data, function (v) {
                        classes.push({id: v.id, title: v.className});
                    });
                    $scope.classes = defaultSelect.concat(classes);
                }
            });
        };
        var clearSelect = function () {
            clearGrades();
            clearSubjects();
        };
        var clearSubjects = function () {
            for (var i = 0; i < parseInt($scope.noonNums.forenoonNum) + parseInt($scope.noonNums.afternoonNum); i++) {
                $scope.timetable.subjects[i].mon = 0;
                $scope.timetable.subjects[i].tue = 0;
                $scope.timetable.subjects[i].wed = 0;
                $scope.timetable.subjects[i].thur = 0;
                $scope.timetable.subjects[i].fri = 0;
            }
            $scope.subjects = defaultSelect;
        };
        var clearGrades = function () {
            $scope.currentSelects.gradeId = 0;
            $scope.grades = defaultSelect;
        };
        $scope.searchGrades = function (parentId) {
            parentId = parentId || 0;
            var type = 6;
            clearGrades();
            $scope.apiMiddleware.getBasedata(parentId, type).then(function (datas) {
                if (datas.status == 200)
                    $scope.grades = defaultSelect.concat(datas.data);
            });
        };
        var compareTime = function (time1, time2) {
            var date1 = new Date('2017-01-01 ' + time1);
            var date2 = new Date('2017-01-01 ' + time2);
            if (date1.getTime() > date2.getTime()) {
                return false;
            } else {
                return true;
            }
        };
        var initTimetablSelect = function (item, tempId) {
            var defualtSubjectSelect = {tempId: 0, mon: 0, tue: 0, wed: 0, thur: 0, fri: 0};
            item = item || defualtSubjectSelect;
            if (tempId) {
                item.tempId = tempId;
            }
            $scope.timetable.subjects.push(item);
            $scope.timetable.users.push({mon: '', tue: '', wed:'', thur: '', fri: ''});
        };
        var searchTemp = function () {
            $scope.apiMiddleware.getTimetableTemp($scope.schoolId).then(function (datas) {
                var forenoonNum = 0, afternoonNum = 0;
                if (datas.status == 200) {
                    angular.forEach(datas.data, function (data, index, array) {
                        data.startTime = array[index].startTime.substr(0, 5);
                        data.endTime = array[index].endTime.substr(0, 5);
                        if (compareTime(data.startTime, '12:00')) {
                            forenoonNum++;
                            $scope.temps.fore.push(data);
                        } else {
                            afternoonNum++;
                            $scope.temps.after.push(data);
                        }
                        initTimetablSelect(null, data.id);
                    });
                }
                $scope.noonNums = {forenoonNum: forenoonNum, afternoonNum: afternoonNum};
                $scope.timeTemp = $scope.temps.fore.concat($scope.temps.after);
                var timetableId = timetableService.get().timetableId == null ?0 : timetableService.get().timetableId;
                if(timetableId != null && timetableId != 0){
                    initTimetable(timetableId);
                }
            });
        };
        var initTimetable = function (timetableId) {
            $scope.apiMiddleware.getTimetable(timetableId).then(function (datas) {
                if(datas.status == 200) {
                    var timetable = datas.data;
                    if(timetable != null){
                        //初始化基础

                        if(timetable.stagesId != null && timetable.stagesId != 0){
                            $scope.searchGrades(timetable.stagesId);
                            $scope.searchSubjects(timetable.stagesId);
                        }
                        //初始化表单
                        angular.forEach(timetable.infoList , function(data,index){
                            $scope.timetable.subjects[index].id=data.id;
                            $scope.timetable.subjects[index].tempId=data.tempId;
                            $scope.timetable.subjects[index].mon=data.mon;
                            $scope.timetable.subjects[index].tue=data.tue;
                            $scope.timetable.subjects[index].wed=data.wed;
                            $scope.timetable.subjects[index].thur=data.thur;
                            $scope.timetable.subjects[index].fri=data.fri;
                            var user = {infoId:data.infoUser.infoId, mon: data.infoUser.mon, tue: data.infoUser.tue, wed: data.infoUser.wed, thur: data.infoUser.thur, fri: data.infoUser.fri};
                            $scope.timetable.users[index]=user;
                        });
                        $scope.currentSelects.stageId=timetable.stagesId ==null?0:timetable.stagesId;
                        $scope.currentSelects.gradeId=timetable.gradeId ==null?0:timetable.gradeId;
                        $scope.currentSelects.classId=timetable.classId ==null?0:timetable.classId;
                        $scope.currentSelects.baseId=timetable.id ==null?0:timetable.id;
                        var startDate = $filter('date')(timetable.startDate, 'yyyy-MM-dd');
                        var endDate = $filter('date')(timetable.endDate, 'yyyy-MM-dd');
                        if(timetable.startDate != null && timetable.endDate  != null){
                            $scope.currentSelects.timePicker.startDate = startDate;
                            $scope.currentSelects.timePicker.endDate = endDate;
                        }
                    }
                }
            });
        };

        var initData = function () {
            var currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.currentSelects.timePicker.startDate = currentDate;
            $scope.currentSelects.timePicker.endDate = currentDate;
            searchClasses();
            $scope.searchStage();
            searchTemp();
        };
        initData();
    }]);
})(angular);
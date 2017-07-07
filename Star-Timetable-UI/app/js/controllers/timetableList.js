/**
 * Created by JoffZhang on 2017/6/2.
 */
(function (angular,$) {
    'use strict';

    angular.module('TimetableApp').controller('timetableListCtrl', ['$log', '$scope', 'apiMiddleware', 'timetableService', function ($log, $scope, ApiMiddleware, timetableService) {
        $scope.apiMiddleware = new ApiMiddleware();
        //设置分页的参数
        $scope.option = {
            curr: 0,  //当前页数
            all: 0,  //总页数
            count: 10,  //最多显示的页数，默认为10
            click: function (page) {
                $log.info(page);
                $scope.loadTimetableList(page - 1);
            }
        };
        var defaultSelect = [{id: 0, title: '请选择'}];
        $scope.stages = [{id: 0, title: '请选择'}];//学段
        $scope.grades = [{id: 0, title: '请选择'}];//年级
        $scope.currentSelects = {gradeId: 0, stageId: 0};
        $scope.dataList = [];
        $scope.listIndex = 0;
        $scope.tabsActive = 1;


        $scope.searchStage = function (parentId) {
            parentId = parentId || 0;
            var type = 3;
            clearGrades();
            $scope.apiMiddleware.getBasedata(parentId, type).then(function (datas) {
                if (datas.status == 200)
                    $scope.stages = defaultSelect.concat(datas.data);
            });
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
        //返回页数范围（用来遍历）
        var getRange = function (curr, all, count) {
            //计算显示的页数
            var range = [];
            curr = parseInt(curr);
            all = parseInt(all);
            count = parseInt(count);
            if (all == 0) {
                return range;
            }
            var from = curr - parseInt(count / 2);
            var to = curr + parseInt(count / 2) + (count % 2) - 1;
            //显示的页数容处理
            if (from <= 0) {
                from = 1;
                to = from + count - 1;
                if (to > all) {
                    to = all;
                }
            }
            if (to > all) {
                to = all;
                from = to - count + 1;
                if (from <= 0) {
                    from = 1;
                }
            }
            for (var i = from; i <= to; i++) {
                range.push(i);
            }
            range.push('»');
            range.unshift('«');
            return range;
        };
        $scope.loadTimetableList = function (pageIndex, pageSize) {
            pageIndex = pageIndex || 0;
            pageSize = pageSize || 10;
            $scope.apiMiddleware.getTimetableList(pageIndex, pageSize, $scope.tabsActive, $scope.schoolId, $scope.currentSelects.stageId, $scope.currentSelects.gradeId).then(function (resp) {
                if (resp.status == 200) {
                    var pageBean = resp.data;
                    $scope.option.curr = pageBean.pageIndex + 1;
                    $scope.option.all = pageBean.totalPages;
                    $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                    $scope.dataList = pageBean.list;
                    $scope.listIndex = ($scope.option.curr - 1) * pageSize;
                }
            });
        };
        $scope.viewShow = {};
        $scope.showView = function (index) {
            $scope.viewShow = {};
            $scope.viewShow = $scope.dataList[index];
            $('#showView').modal('show');
            $scope.apiMiddleware.getBasedata($scope.viewShow.stagesId, 3).then(function (datas) {
                if (datas.status == 200){
                    var subjects = datas.data;
                    $scope.apiMiddleware.getTimetable($scope.viewShow.id).then(function (datass) {
                        if (datass.status == 200){
                            var timetable = datass.data;
                            if (timetable.infoList != null) {
                                var infoList = [];
                                angular.forEach(timetable.infoList , function(data){
                                    var empty = '';
                                    var mon=empty.concat(selectSubject(subjects,data.mon).title ,'(',data.infoUser.mon == null?'':data.infoUser.mon,')').replace('()','');
                                    var tue=empty.concat(selectSubject(subjects,data.tue).title ,'(',data.infoUser.tue == null?'':data.infoUser.tue,')').replace('()','');
                                    var wed=empty.concat(selectSubject(subjects,data.wed).title ,'(',data.infoUser.wed == null?'':data.infoUser.wed,')').replace('()','');
                                    var thur=empty.concat(selectSubject(subjects,data.thur).title,'(',data.infoUser.thur == null?'':data.infoUser.thur,')').replace('()','');
                                    var fri=empty.concat(selectSubject(subjects,data.fri).title ,'(',data.infoUser.fri == null?'':data.infoUser.fri,')').replace('()','');
                                    var user = { mon:mon, tue: tue, wed: wed, thur: thur, fri: fri};
                                    infoList.push(user);
                                });
                                $scope.viewShow.datas = infoList;
                            }
                        }
                    });
                }
            });

        };
        var selectSubject = function(datas,id){
            if(id == null || id == 0 )return {title:''};
            var result;
            angular.forEach(datas , function(data){
               if(data.id==id){
                   result = data;
                   return ;
               }
            });
            return result;
        };
        $scope.editTimetable = function (id) {

            if (id == null) {
                timetableService.set({});
            } else {
                timetableService.set({'timetableId': id});
            }
            $scope.setTemplate('timetable_edit.html');
        };
        $scope.delTimetable = function (deleteId) {
            if (deleteId != null && deleteId != 0) {
                $scope.modal('myModal', false,
                    function () {
                        $scope.apiMiddleware.delTimetable(deleteId, $scope.schoolId).then(function (datas) {
                            if (datas.status == 200)
                                $scope.loadTimetableList();
                            $scope.modal('myModal', true);
                        });
                    }
                    , $scope.modalTypes.types.danger);
            } else {
                $scope.modal('myModal', true);
            }
        };

        $scope.noonNums = {forenoonNum: '', afternoonNum: ''};
        $scope.timeTemp = [];
        var compareTime = function(time1,time2){
            var date1 = new Date('2017-01-01 '+time1);
            var date2 = new Date('2017-01-01 '+time2);
            if(date1.getTime() > date2.getTime()){
                return false;
            }else{
                return true;
            }
        };
        $scope.temps ={fore:[],after:[],version:0} ;
        var searchTemp = function(){
            $scope.apiMiddleware.getTimetableTemp($scope.schoolId).then(function(datas){
                var forenoonNum = 0 , afternoonNum = 0;
                angular.forEach(datas.data,function(data,index,array){
                    data.startTime = array[index].startTime.substr(0,5);
                    data.endTime = array[index].endTime.substr(0,5);
                    if(compareTime(data.startTime,'12:00')){
                        forenoonNum++;
                        $scope.temps.fore.push(data);
                    }else{
                        afternoonNum++;
                        $scope.temps.after.push(data);
                    }
                    $scope.temps.version = data.version;
                });
                $scope.noonNums = {forenoonNum: forenoonNum, afternoonNum: afternoonNum};
                $scope.timeTemp = $scope.temps.fore.concat($scope.temps.after);

            });
        };
        var initCtrl = function () {
            $('#showView').modal('hide');
            $scope.loadTimetableList();
            $scope.searchStage();
            searchTemp();
        };
        initCtrl();


    }]);
})(angular,jQuery);
/**
 * Created by JoffZhang on 2017/6/2.
 */
(function (angular, $) {
    'use strict';

    angular.module('TimetableApp').controller('timetableTempCtrl', ['$scope', 'apiMiddleware',function ($scope, ApiMiddleware) {
        $scope.noonNums = {forenoonNum: '', afternoonNum: ''};
        $scope.timeTemp = [];
        $scope.temps ={fore:[],after:[],version:0} ;
        $scope.apiMiddleware = new ApiMiddleware();
        $scope.callout = false;
        $scope.submitForm = function (isValid) {
            if(isValid){
                var data = [];
                var version = $scope.temps.version + 1;
                $scope.timeTemp.forEach(function(value,index,arr){
                    data.push({startTime:arr[index].startTime+':00',endTime:arr[index].endTime+':00',version:version,schoolId:$scope.schoolId});
                });
                $scope.apiMiddleware.saveTemps(data,$scope.schoolId).then(function(resp){
                    if(resp.status == 200){
                        $scope.callout = true;
                    }
                });
            }
        };

        $scope.$watch('noonNums.forenoonNum', function (newValue,oldValue) {
             if(oldValue !== ''){
                 $scope.timeTemp = [];
                 for (var i = 0; i < parseInt($scope.noonNums.forenoonNum) + parseInt($scope.noonNums.afternoonNum) ; i++) {
                    $scope.timeTemp.push({id:'',startTime:'',endTime:''});
                }
            }
        });
        $scope.$watch('noonNums.afternoonNum', function (newValue,oldValue) {
            if(oldValue !== ''){
                $scope.timeTemp = [];
                for (var i = 0; i < parseInt($scope.noonNums.forenoonNum) + parseInt($scope.noonNums.afternoonNum) ; i++) {
                    $scope.timeTemp.push({id:'',startTime:'',endTime:''});
                }
            }
        });
        $scope.renderFinish = function () {
            $scope.timeTemp.forEach(function (item) {
                    $('#start' + item.id).timepicker({
                        minuteStep: 5,
                        showInputs: false,
                        disableFocus: true,
                        showMeridian: false
                    });
                    $('#end' + item.id).timepicker({
                        minuteStep: 5,
                        showInputs: false,
                        disableFocus: true,
                        showMeridian: false
                    });
                }
            );
        };
        var compareTime = function(time1,time2){
            var date1 = new Date('2017-01-01 '+time1);
            var date2 = new Date('2017-01-01 '+time2);
            if(date1.getTime() > date2.getTime()){
                return false;
            }else{
                return true;
            }
        };
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
        $scope.parseInt = parseInt;

        searchTemp();
    }]);
})(angular, jQuery);
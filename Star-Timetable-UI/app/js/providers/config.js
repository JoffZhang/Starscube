/**
 * Created by JoffZhang on 2017/5/24.
 */
(function(angular){
   'use strict';

    angular.module('TimetableApp').provider('timetableManagerConfig',function(){
        var values ={
            appName: 'timetable v0.0.1',
            defaultLang: 'en',
            tplPath: 'src/templates',

            tempListUrl: 'timetable/tempList',
            timetableListUrl:'timetable/timetables',
            delTimetableUrl:'timetable/delete',
            saveTempsUrl: 'timetable/saveTemp',
            saveTimeTableUrl:'timetable/save',
            timeTableUrl:'timetable/list',
            basedataUrl:'basedata',
            classListUrl:'schools/classes',
            loginUrl:'http://localhost:8080/CloudPlatform/userCrossLogin.do'
        };

        return {
            $get:function () {
                return values;
            },
            set:function(constants){
                angular.extend(values,constants);
            }
        };
    });

})(angular);
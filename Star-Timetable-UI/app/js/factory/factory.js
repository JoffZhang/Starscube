/**
 * Created by JoffZhang on 2017/6/14.
 */
(function (angular) {
    'use strict';

    var app = angular.module('TimetableApp');

    app.factory('timetableService', function () {
        var myServices  = {};
        var myObject = {};
        var _set = function (data) {
            myObject = data;
        };
        var _get = function () {
            return myObject;
        };
        myServices.set =_set;
        myServices.get = _get;

        return myServices;
    });

})(angular);
/**
 * Created by JoffZhang on 2017/5/24.
 */
(function (angular, $) {
    'use strict';

    var app = angular.module('TimetableApp');

    app.directive('myPagination',['$log',function ($log) {
        return {
            restrict:'EA',
            replace: true,
            template:'<ul class="pagination">'+
                '<li class="paginate_button {{option.curr==p?\'active\':\'\'}}" ng-click="pageClick(p)" ng-repeat="p in page"><a href="javascript:;" aria-controls="example2" data-dt-idx="{{p}}" tabindex="0">{{p}}</a></li>'+
                '</ul>',
            link:function($scope){
                $log.info($scope);
                //容错处理
                if (!$scope.option.curr || isNaN($scope.option.curr) || $scope.option.curr < 1) $scope.option.curr = 1;
                if (!$scope.option.all || isNaN($scope.option.all) || $scope.option.all < 0) $scope.option.all = 0;
                if ($scope.option.curr > $scope.option.all) $scope.option.curr = $scope.option.all;
                if (!$scope.option.count || isNaN($scope.option.count) || $scope.option.count < 1) $scope.option.count = 10;
                //得到显示页数的数组
                $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                //绑定点击事件
                $scope.pageClick = function (page) {
                    if (page == '«') {
                        page = parseInt($scope.option.curr) - 1;
                    } else if (page == '»') {
                        page = parseInt($scope.option.curr) + 1;
                    }
                    if (page < 1) page = 1;
                    else if (page > $scope.option.all) page = $scope.option.all;
                    //点击相同的页数 不执行点击事件
                    if (page == $scope.option.curr) return;
                    if ($scope.option.click && typeof $scope.option.click === 'function') {
                        $scope.option.click(page);
                        $scope.option.curr = page;
                        $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                    }
                };

                //返回页数范围（用来遍历）
                function getRange(curr, all, count) {
                    //计算显示的页数

                    var range = [];
                    curr = parseInt(curr);
                    all = parseInt(all);
                    count = parseInt(count);
                    if(all == 0){
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
                }
            }
           /* <li class="paginate_button previous disabled" id="example2_previous"><a href="#"
        aria-controls="example2"
        data-dt-idx="0"
        tabindex="0">Previous</a>
            </li>
            <li class="paginate_button active"><a href="#" aria-controls="example2" data-dt-idx="1"
        tabindex="0">1</a></li>
            <li class="paginate_button "><a href="#" aria-controls="example2" data-dt-idx="2"
        tabindex="0">2</a></li>
            <li class="paginate_button "><a href="#" aria-controls="example2" data-dt-idx="3"
        tabindex="0">3</a></li>
            <li class="paginate_button "><a href="#" aria-controls="example2" data-dt-idx="4"
        tabindex="0">4</a></li>
            <li class="paginate_button "><a href="#" aria-controls="example2" data-dt-idx="5"
        tabindex="0">5</a></li>
            <li class="paginate_button "><a href="#" aria-controls="example2" data-dt-idx="6"
        tabindex="0">6</a></li>
            <li class="paginate_button next" id="example2_next"><a href="#" aria-controls="example2"
        data-dt-idx="7" tabindex="0">Next</a>
            </li>
            </ul>'*/
        };
    }]);
    
/*    app.directive('timetableManager', ['$log', '$parse', 'timetableManagerConfig', function ($log, $parse, timetableManagerConfig) {
        return {
            restrict: 'EA',
            templateUrl: timetableManagerConfig.tplPath + '/main.html'
        };
    }]);*/

    app.directive('timepicker', [function () {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, ele, attr, ctrl) {
                $(ele).timepicker({
                    minuteStep: 5,
                    showInputs: false,
                    disableFocus: true,
                    showMeridian: false
                }).on('hide.timepicker', function (e) {
                    scope.$apply(function () {
                        if (e.time.value != '00:00')
                            ctrl.$setViewValue(e.time.value);
                    });
                });
            }
        };
    }]);

    app.directive('daterangepicker', ['$window','$log',function ($window,$log) {
        var moment = $window.moment;
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, ele, attr, ctrl) {
                var _picker,el = $(ele),_init,_formatted,clear,
                startDate = scope.currentSelects.timePicker.startDate,
                endDate = scope.currentSelects.timePicker.endDate,
                opts = {dateLimit: {days: 7 * 30},locale: {format: 'YYYY-MM-DD'},separator:' - '};
                if(startDate != '') opts.startDate = startDate;
                if(endDate != '') opts.endDate = endDate;
                clear = function() {
                    _picker.setStartDate();
                    _picker.setEndDate();
                    return el.val('');
                };
                _formatted = function(viewVal) {
                    var f = function(date){
                        if(!moment.isMoment(date)){
                            return moment(date).format(opts.locale.format);
                        }
                        return date.format(opts.format);
                    };
                    if (opts.singleDatePicker) {
                        return f(viewVal.startDate);
                    } else {
                        return [f(viewVal.startDate), f(viewVal.endDate)].join(opts.separator);
                    }
                };
                ctrl.$render = function(){
                    if (!ctrl.$modelValue) {
                        return el.val('');
                    }
                    if (ctrl.$modelValue.startDate === undefined) {
                        return clear();
                    }
                    return el.val(_formatted(ctrl.$modelValue));
                };
                _init = function(){
                    el.daterangepicker(opts,function(start,end){
                        $log.info('start-end');
                        $log.info(start);
                        $log.info(end);

                        $log.info(ctrl.$modelValue);
                        ctrl.$setViewValue({
                            startDate:start.format(opts.locale.format),
                            endDate:end.format(opts.locale.format)
                        });
                        ctrl.$render();
                    }).on('hide.daterangepicker',function(){
                        if(typeof(ctrl.$modelValue) == 'string'){
                            ctrl.$render();
                        }
                    });
                    _picker = el.data('daterangepicker');
                };
                _init();
            }
        };
    }]);
    /*app.directive('repeatFinish',function () {
     return {
     link : function (scope, element, attr) {
     if(scope.$last == true){
     scope.$eval(attr.repeatFinish);
     }
     }
     };
     });*/
})(angular, jQuery);
/**
 * Created by joffzhang on 2017/5/24.
 */
(function (window, angular, $) {
    'use strict';

    angular.module('TimetableApp', ['pascalprecht.translate','ngRoute']);

    /**
     * jQuery inits
     */
    if ('undefined' == typeof jQuery)throw new Error('AdminLTE requires jQuery');
    $.AdminLTE = {}, $.AdminLTE.options = {
        navbarMenuSlimscroll: !0,
        navbarMenuSlimscrollWidth: '3px',
        navbarMenuHeight: '200px',
        animationSpeed: 500,
        sidebarToggleSelector: '[data-toggle="offcanvas"]',
        sidebarPushMenu: !0,
        sidebarSlimScroll: !0,
        sidebarExpandOnHover: !1,
        enableBoxRefresh: !0,
        enableBSToppltip: !0,
        BSTooltipSelector: '[data-toggle="tooltip"]',
        enableFastclick: !1,
        enableControlSidebar: !0,
        controlSidebarOptions: {
            toggleBtnSelector: '[data-toggle="control-sidebar"]',
            selector: '.control-sidebar',
            slide: !0
        },
        enableBoxWidget: !0,
        boxWidgetOptions: {
            boxWidgetIcons: {collapse: 'fa-minus', open: 'fa-plus', remove: 'fa-times'},
            boxWidgetSelectors: {remove: '[data-widget="remove"]', collapse: '[data-widget="collapse"]'}
        },
        directChat: {enable: !0, contactToggleSelector: '[data-widget="chat-pane-toggle"]'},
        colors: {
            lightBlue: '#3c8dbc',
            red: '#f56954',
            green: '#00a65a',
            aqua: '#00c0ef',
            yellow: '#f39c12',
            blue: '#0073b7',
            navy: '#001F3F',
            teal: '#39CCCC',
            olive: '#3D9970',
            lime: '#01FF70',
            orange: '#FF851B',
            fuchsia: '#F012BE',
            purple: '#8E24AA',
            maroon: '#D81B60',
            black: '#222222',
            gray: '#d2d6de'
        },
        screenSizes: {xs: 480, sm: 768, md: 992, lg: 1200}
    };


    function _init() {
        'use strict';
        $.AdminLTE.layout = {
            activate: function () {
                var a = this;
                a.fix(), a.fixSidebar(), $(window, '.wrapper').resize(function () {
                    a.fix(), a.fixSidebar();
                });
            }, fix: function () {
                var a = $('.main-header').outerHeight() + $('.main-footer').outerHeight(), b = $(window).height(), c = $('.sidebar').height();
                if ($('body').hasClass('fixed'))$('.content-wrapper, .right-side').css('min-height', b - $('.main-footer').outerHeight()); else {
                    var d;
                    b >= c ? ($('.content-wrapper, .right-side').css('min-height', b - a), d = b - a) : ($('.content-wrapper, .right-side').css('min-height', c), d = c);
                    var e = $($.AdminLTE.options.controlSidebarOptions.selector);
                    'undefined' != typeof e && e.height() > d && $('.content-wrapper, .right-side').css('min-height', e.height());
                }
            }, fixSidebar: function () {
                return $('body').hasClass('fixed') ? ('undefined' == typeof $.fn.slimScroll && window.console && window.console.error('Error: the fixed layout requires the slimscroll plugin!'), void($.AdminLTE.options.sidebarSlimScroll && 'undefined' != typeof $.fn.slimScroll && ($('.sidebar').slimScroll({destroy: !0}).height('auto'), $('.sidebar').slimscroll({
                    height: $(window).height() - $('.main-header').height() + 'px',
                    color: 'rgba(0,0,0,0.2)',
                    size: '3px'
                })))) : void('undefined' != typeof $.fn.slimScroll && $('.sidebar').slimScroll({destroy: !0}).height('auto'));
            }
        },
            $.AdminLTE.pushMenu = {
                activate: function (a) {
                    var b = $.AdminLTE.options.screenSizes;
                    $(document).on('click', a, function (a) {
                        a.preventDefault(), $(window).width() > b.sm - 1 ? $('body').hasClass('sidebar-collapse') ? $('body').removeClass('sidebar-collapse').trigger('expanded.pushMenu') : $('body').addClass('sidebar-collapse').trigger('collapsed.pushMenu') : $('body').hasClass('sidebar-open') ? $('body').removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu') : $('body').addClass('sidebar-open').trigger('expanded.pushMenu');
                    }), $('.content-wrapper').click(function () {
                        $(window).width() <= b.sm - 1 && $('body').hasClass('sidebar-open') && $('body').removeClass('sidebar-open');
                    }), ($.AdminLTE.options.sidebarExpandOnHover || $('body').hasClass('fixed') && $('body').hasClass('sidebar-mini')) && this.expandOnHover();
                }, expandOnHover: function () {
                    var a = this, b = $.AdminLTE.options.screenSizes.sm - 1;
                    $('.main-sidebar').hover(function () {
                        $('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-collapse') && $(window).width() > b && a.expand();
                    }, function () {
                        $('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-expanded-on-hover') && $(window).width() > b && a.collapse();
                    });
                }, expand: function () {
                    $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
                }, collapse: function () {
                    $('body').hasClass('sidebar-expanded-on-hover') && $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
                }
            },
            $.AdminLTE.tree = function (a) {
                var b = this, c = $.AdminLTE.options.animationSpeed;
                $(document).off('click', a + ' li a').on('click', a + ' li a', function (a) {
                    var d = $(this), e = d.next();
                    if (e.is('.treeview-menu') && e.is(':visible') && !$('body').hasClass('sidebar-collapse'))e.slideUp(c, function () {
                        e.removeClass('menu-open');
                    }), e.parent('li').removeClass('active'); else if (e.is('.treeview-menu') && !e.is(':visible')) {
                        var f = d.parents('ul').first(), g = f.find('ul:visible').slideUp(c);
                        g.removeClass('menu-open');
                        var h = d.parent('li');
                        e.slideDown(c, function () {
                            e.addClass('menu-open'), f.find('li.active').removeClass('active'), h.addClass('active'), b.layout.fix();
                        });
                    }
                    e.is('.treeview-menu') && a.preventDefault();
                });
            },
            $.AdminLTE.controlSidebar = {
                activate: function () {
                    var a = this, b = $.AdminLTE.options.controlSidebarOptions, c = $(b.selector), d = $(b.toggleBtnSelector);
                    d.on('click', function (d) {
                        d.preventDefault(), c.hasClass('control-sidebar-open') || $('body').hasClass('control-sidebar-open') ? a.close(c, b.slide) : a.open(c, b.slide);
                    });
                    var e = $('.control-sidebar-bg');
                    a._fix(e), $('body').hasClass('fixed') ? a._fixForFixed(c) : $('.content-wrapper, .right-side').height() < c.height() && a._fixForContent(c);
                }, open: function (a, b) {
                    b ? a.addClass('control-sidebar-open') : $('body').addClass('control-sidebar-open');
                }, close: function (a, b) {
                    b ? a.removeClass('control-sidebar-open') : $('body').removeClass('control-sidebar-open');
                }, _fix: function (a) {
                    var b = this;
                    if ($('body').hasClass('layout-boxed')) {
                        if (a.css('position', 'absolute'), a.height($('.wrapper').height()), b.hasBindedResize)return;
                        $(window).resize(function () {
                            b._fix(a);
                        }), b.hasBindedResize = !0;
                    } else a.css({position: 'fixed', height: 'auto'});
                }, _fixForFixed: function (a) {
                    a.css({position: 'fixed', 'max-height': '100%', overflow: 'auto', 'padding-bottom': '50px'});
                }, _fixForContent: function (a) {
                    $('.content-wrapper, .right-side').css('min-height', a.height());
                }
            },
            $.AdminLTE.boxWidget = {
                selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
                icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
                animationSpeed: $.AdminLTE.options.animationSpeed,
                activate: function (a) {
                    var b = this;
                    a || (a = document), $(a).on('click', b.selectors.collapse, function (a) {
                        a.preventDefault(), b.collapse($(this));
                    }), $(a).on('click', b.selectors.remove, function (a) {
                        a.preventDefault(), b.remove($(this));
                    });
                },
                collapse: function (a) {
                    var b = this, c = a.parents('.box').first(), d = c.find('> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer');
                    c.hasClass('collapsed-box') ? (a.children(':first').removeClass(b.icons.open).addClass(b.icons.collapse), d.slideDown(b.animationSpeed, function () {
                        c.removeClass('collapsed-box');
                    })) : (a.children(':first').removeClass(b.icons.collapse).addClass(b.icons.open), d.slideUp(b.animationSpeed, function () {
                        c.addClass('collapsed-box');
                    }));
                },
                remove: function (a) {
                    var b = a.parents('.box').first();
                    b.slideUp(this.animationSpeed);
                }
            };
    }


    _init();

  /*  angular.element(window).bind('load', function () {
        var a = $.AdminLTE.options;
        $('body').removeClass('hold-transition');
        $.AdminLTE.layout.activate();
        $.AdminLTE.tree('.sidebar');
        a.sidebarPushMenu && $.AdminLTE.pushMenu.activate(a.sidebarToggleSelector);
        $('#myModal').modal('hide');
    });*/


    /*angular.module('TimetableApp').config(['$httpProvider',function($httpProvider){
     $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
     $httpProvider.defaults.transformRequest = [function(data){
     var param = function (obj) {
     var query = '';
     var name,value,fullSubName,subName,subValue,innerObj,i;
     for (name in obj){
     value = obj[name];
     if(value instanceof Array){
     for(i=0;i<value.length;i++){
     subValue = value[i];
     fullSubName = name+'[]';
     innerObj = {};
     innerObj[fullSubName] = subValue;
     query+=param(innerObj)+'&';
     }
     }else if(value instanceof  Object){
     for(subName in value){
     subValue = value[subName];
     fullSubName = subName;
     innerObj={};
     innerObj[fullSubName] = subValue;
     query +=param(innerObj)+'&';
     }
     }else if(value !=undefined && value != null){
     query+=encodeURIComponent(name)+'='+encodeURIComponent(value)+'&';
     }
     }
     return query.length?query.substr(0,query.length-1):query;
     };
     return angular.isObject(data)&& String(data) !=='[object File]'?param(data):data;
     }];
     }]);*/
})(window, angular, jQuery);
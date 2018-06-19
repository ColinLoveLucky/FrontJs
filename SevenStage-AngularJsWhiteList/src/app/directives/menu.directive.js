/**
 * Created by HuaWang on 2017/11/6.
 */

angular.module('directives')
    .directive('menuList', ["MenuService","$rootScope",function (MenuService,$rootScope) {
        return {
            restrict: 'A',
            replace: true,
            template:'<nav class="menu"><ul class="nav metismenu"' +
                        '<li ng-repeat="menu in menus" ui-sref-active="submenuActive" ng-class="{true:active}"' +
                            '<a ui-sref="{{menu.URL}}">{{menu.Key | translate}}</a>'+
                            '<ul aria-expanded="true">'+
                                '<li ui-sref-active="submenuActive" ng-repeat="child in menu.ChildMenus">'+
                                    '<a ui-sref="{{child.URL}}">{{ child.Key | translate }}</a>'+
                                '</li>'+
                           '</ul>'+
                        '</li></ul></nav>',
            link:function (scope) {
                scope.menus=MenuService.getMenusByRole($rootScope.role);
            }
        }
    }])
    .directive('hasOp',["MenuService", "$rootScope", function (MenuService, $rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            template:'',
            scope: {
                menuKey:'@menuKey',
                operatorKey:'@operatorKey',
            },
            link:function (scope, element) {
                scope.keys=MenuService.getOperatorsByRoleMenuKey($rootScope.role, scope.menuKey);
                scope.hasKey = scope.keys.findIndex(key => key == scope.operatorKey) != -1 ;
                if(!scope.hasKey){
                    //element[0].style.display = "blcok";
                    $(element[0]).remove();
                }else{
                    //element[0].style.display = "none";
                    // Do Nothing
                }
            }
        }
}]);
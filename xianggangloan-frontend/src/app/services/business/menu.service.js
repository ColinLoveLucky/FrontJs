/**
 * Created by HuaWang on 2017/11/3.
 */
import Menu from '../../../lib/menu';

angular.module('biz-services').factory("MenuService", function ($http) {
    var menu = new Menu();
    var service = {
        getMenusByRole: function(role, orderType = "asc"){
            return menu.getMenusByRole(role, orderType);
        },
        getOperatorsByRoleMenuKey:function (role, menuKey) {
            return menu.getOperatorsByRoleMenuKey(role, menuKey);
        }

    };
    return service;
});
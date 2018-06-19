/**
 * Created by HuaWang on 2017/11/3.
 */

import MenuSource from '../dbfiles/Menu.json';
import MRSource from '../dbfiles/MenuRoleMapping.json';
import OperatorSource from '../dbfiles/Operator.json';
import ORSource from '../dbfiles/OperatorRoleMapping.json';
import RoleSource from '../dbfiles/Role.json';

export default  class Menu{
    constructor(){
        // Do Nothing
    }

    getRoleIdByRole(role) {
        var roleEntity = RoleSource.find(r => r.IsEnable && r.Role == role);
        if (!Object.is(roleEntity, null) && !Object.is(roleEntity, undefined)) {
            var roleId = roleEntity.Id;
            return roleId;
        }
    }

    getMenuIdsByRoleId(roleId) {
        var mrEntity = MRSource.find(mr => mr.RoleId == roleId);
        if (!Object.is(mrEntity, null) && !Object.is(mrEntity, undefined)) {
            var menuIds = mrEntity.MenuIds;
            return menuIds;
        }
    }

    getOperatorIdsByRoleIdMenuId(roleId, menuId) {
        var orEntity = ORSource.find(or => or.RoleId == roleId && or.MenuId == menuId);
        if (!Object.is(orEntity, null) && !Object.is(orEntity, undefined)) {
            var operatorIds = orEntity.OperatorIds;
            return operatorIds;
        }
    }

    getMenuById(id) {
        var menuEntity = MenuSource.find(m => m.IsEnable && m.Id == id);
        if (!Object.is(menuEntity, null) && !Object.is(menuEntity, undefined)) {
            return menuEntity;
        }
    }

    getMenusByIds(menuIds) {
        var menus = [];
        if (menuIds != null) {
            for (var index in menuIds) {
                var menuId = menuIds[index]
                var menu = this.getMenuById(menuId);
                if (menu != null && menu != undefined) {
                    menus.push(menu);
                }
            }
        }
        return menus;
    }

    getMenuIdByKey(key) {
        var menuEntity = MenuSource.find(m => m.IsEnable && m.Key == key);
        if (!Object.is(menuEntity, null) && !Object.is(menuEntity, undefined)) {
            var menuId = menuEntity.Id;
            return menuId;
        }
    }

    getOperatorKeyById(id) {
        var operatorEntity = OperatorSource.find(o => o.IsEnable && o.Id == id);
        if (!Object.is(operatorEntity, null) && !Object.is(operatorEntity, undefined)) {
            var key = operatorEntity.Key;
            return key;
        }
    }

    getOperatorKeysByIds(operatorIds) {
        var keys = [];
        if (operatorIds != null) {
            for (var index in operatorIds) {
                var id = operatorIds[index]
                var key = this.getOperatorKeyById(id);
                if (key != null && key != undefined) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }

    getMainMenus(menus, orderType) {
        var results = [];
        if (menus != null && menus != undefined) {
            for (var index in menus) {
                var menu = menus[index];
                if (menu.IsEnable && menu.ParentId == 0) {
                    results.push(menu);
                }
            }
            results.sort((a, b) => orderType == "desc" ? a.Order < b.Order : a.Order > b.Order);
        }
        return results;
    }

    getChildMenus(parentMenus, menus, orderType) {
        var result = [];
        for (var index in parentMenus) {
            var parentMenu = parentMenus[index];
            parentMenu.ChildMenus = [];
            for (var idx in menus) {
                var menu = menus[idx];
                if (parentMenu.Id == menu.ParentId) {
                    parentMenu.ChildMenus.push(menu);
                }
            }
            if (parentMenu.ChildMenus.length > 0) {
                parentMenu.ChildMenus.sort((a, b) => orderType == "desc" ? a.Order < b.Order : a.Order > b.Order);
                result.push(parentMenu);
                this.getChildMenus(parentMenu.ChildMenus, menus, orderType);
            } else {
                result.push(parentMenu);
            }
        }
        return result;
    }

    orderMenus(menus, orderType) {
        var mainMenus = this.getMainMenus(menus, orderType);
        var allMenus = this.getChildMenus(mainMenus, menus, orderType);
        return allMenus;
    }

    getMenusByRole(role, orderType = "asc") {
        var roleId = this.getRoleIdByRole(role);
        var menudIds = this.getMenuIdsByRoleId(roleId);
        var menus = this.getMenusByIds(menudIds);
        var results = this.orderMenus(menus, orderType);
        return results;
    }

    getOperatorsByRoleMenuKey(role, menuKey) {
        var roleId = this.getRoleIdByRole(role);
        var menuId = this.getMenuIdByKey(menuKey);
        var operatorIds = this.getOperatorIdsByRoleIdMenuId(roleId, menuId);
        var keys = this.getOperatorKeysByIds(operatorIds);
        return keys;
    }
}

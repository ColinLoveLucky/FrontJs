HomeController.$inject = ['$scope', '$location', 'permissions', '$cookieStore', '$http', '$q'];

class Menu {
    constructor(title, url, permission, icon) {
        this.title = title;
        this.url = url;
        this.icon = icon;
        this.permission = permission;
        this.isNavCollapsed = false;
        this.childrens = [];
    }
    addChildren(obj) {
        this.childrens.push(obj);
    }
}

function HomeController($scope, $location, permissions, $cookieStore, $http, $q) {
    $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        /*  let permission = toState.permission;
          var currentuser = $cookieStore.get('currentuser');
          if (currentuser == undefined) {
              $location.path('/main/login');
          }
          if (_.isString(permission) && !permissions.hasPermission(currentuser, permission)) {
              $location.path('/main/unauthorized');
          }*/
        console.log("路由跳转");
    });

    $scope.isNavCollapsed = false;

    $scope.toggle = function (type) {
        if (type == "qone") {
            $scope.menus = QoneSideBarMenu();
        }
        if (type == "qyj") {
            $scope.menus = QyjSideBarMenu();
        }
    };


    //退出系统清空数据
    $scope.Logout = function () {
        $cookieStore.remove('currentuser');
        $location.path('/main/login');
    }

    $scope.initPage = function () {
        var user = $cookieStore.get('currentuser_obj');
        $scope.viewModel = {
            // userName: user.displayName
            userName:""
        };

        let menus = [];
        $scope.menus = menus;
        $scope.menus = QoneSideBarMenu();


    }

    // Q 易借菜单
    let QyjSideBarMenu = function () {
        let menus = [];
        menus.push(new Menu("Q易借控制台", "main.portal", "dashboard", "icon-icon-dashboard"));
        menus.push(new Menu("用户管理", "", "qyj_user_manage", "icon-icon-user-checked"));
        menus[1].addChildren(new Menu("用户信息", "main.searchUserInfo", "qyj_search_userinfo_page", ""));
        menus[1].addChildren(new Menu("用户解锁", "main.modifiUser", "qyj_modifiuser_page", ""));
        menus[1].addChildren(new Menu("登录日志", "main.searchLog", "qyj_searchlog_page", ""));

        // menus.push(new Menu("进件查询", "", "qyj_search_sale", "icon-icon-channel"));
        // menus[2].addChildren(new Menu("进件查询", "main.searchSaleRecord", "qyj_searchsale_page", ""));
        // menus[2].addChildren(new Menu("合同查询", "main.searchCompact", "qyj_searchcompact_page", ""));
        //
        // menus.push(new Menu("运营管理", "", "qyj_operations_manage", "fa fa-filter"));
        // menus[3].addChildren(new Menu("广告管理", "main.bannerimage", "qyj_banner_page", ""));
        // menus[3].addChildren(new Menu("渠道管理", "main.channelmgr", "qyj_channelmgr_page", ""));
        // menus[3].addChildren(new Menu("消息中心", "main.messageCenter", "qyj_message_page", ""));
        //
        // menus.push(new Menu("系统配置", "", "qyj_system_config", "icon-icon-settings"));
        // menus[4].addChildren(new Menu("批量管理", "main.batchmgr", "qyj_batchmgr_page", ""));
        // menus[4].addChildren(new Menu("字典管理", "main.globalSetting", "qyj_globalsetting_page", ""));
        return menus;
    }

    // Qone 菜单
    let QoneSideBarMenu = function () {
        let menus = [];
        menus.push(new Menu("Q-ONE控制台", "main.portal", "dashboard", "icon-icon-dashboard"));
        menus.push(new Menu("qo_仪表盘", "main.dashBoard", "dashboard", "fa fa-dashboard"));
        menus.push(new Menu("qo_客户管理", "main.customer", "dashboard", "fa fa-suitcase"));
        menus.push(new Menu("qo_预申请管理", "main.preapply", "dashboard", "fa fa-magic"));
        // menus.push(new Menu("qo_产品管理", "main.promanage", "dashboard", "fa fa-reorder"));
        // menus.push(new Menu("qo_部门管理", "main.departments", "dashboard", "fa fa-space-shuttle"));
        //
        // menus.push(new Menu("qo_用户管理", "", "dashboard", "fa fa-user"));
        //
        // menus[6].addChildren(new Menu("qo_用户管理", "main.userManagement", "qyj_batchmgr_page", ""));
        // menus[6].addChildren(new Menu("qo_HRM用户管理", "main.hrmUserManagement", "qyj_batchmgr_page", ""));
        //
        // menus.push(new Menu("qo_通用管理", "", "dashboard", "fa fa-flask"));
        // menus[7].addChildren(new Menu("qo_广告管理", "main.advertList", "qyj_batchmgr_page", ""));
        // menus[7].addChildren(new Menu("qo_常用地址", "main.commonlinks", "qyj_batchmgr_page", ""));
        //
        // menus.push(new Menu("qo_系统配置", "", "dashboard", "fa fa-cog"));
        // menus[8].addChildren(new Menu("qo_进件状态", "main.cobrastatusmap", "qyj_batchmgr_page", ""));
        // menus[8].addChildren(new Menu("qo_工作日历", "main.calendar", "qyj_batchmgr_page", ""));
        //
        // menus[8].addChildren(new Menu("qo_系统配置", "main.qo_globalsetting", "qyj_batchmgr_page", ""));
        //
        //
        // menus.push(new Menu("qo_意见反馈", "main.feedback", "dashboard", "fa fa-comments-o"));

        return menus;
    };
}

angular.module('controller').controller("HomeController", HomeController);

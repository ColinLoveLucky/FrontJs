HomeController.$inject = ['$scope', '$location', 'permissions', '$rootScope', '$http', '$q'];

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

function HomeController($scope, $location, permissions, $rootScope, $http, $q) {
    $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        console.log("路由跳转");
    });

    $scope.isNavCollapsed = false;


    $scope.initPage = function () {
        let menus = [];
        menus.push(new Menu("主页", "main.portal", "dashboard", "icon-icon-dashboard"));
        menus.push(new Menu("管控管理", "", "channel_manage", "icon-icon-channel"));
        menus[1].addChildren(new Menu("页面1", "main.page1", "channel_page", ""));

        $scope.menus = menus;
    };
}

angular.module('controller').controller("HomeController", HomeController);
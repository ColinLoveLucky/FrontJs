function MainController($scope,$translate,LoginService,$window, $location,) {
    $scope.menu = [{
        name: "HEADLINE",
        url: "main.customerManager"
    }, {
        name: "PARAGRAPH",
        url: "main.userManager"
    }];
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
    $scope.logout=function () {
        LoginService.Logout().then(function (rsp) {
            $location.path("/login");
        },function (rsp) {
            console.log("error"+rsp.data);
        });
    }
}
MainController.$inject = ['$scope',"$translate","LoginService","$window", "$location"];
angular.module("controller").controller('MainController', MainController);
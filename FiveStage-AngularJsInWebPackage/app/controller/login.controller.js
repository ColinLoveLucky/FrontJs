function LoginController($scope, $window, $location, LoginService) {
    $scope.viewModel = {
        account: 'tom001',
        password: "passw0rd"
    };
    $scope.login = function () {
        var data = {
            userName: $scope.viewModel.account,
            password: $scope.viewModel.password
        }
        LoginService.ChkUsr(data.userName, data.password).then(function (rsp) {
            $window.alert("Success");
            $location.path("/main");
        },function (rsp) {
            console.log("error"+rsp.data);
        });
    };
}

LoginController.$inject = ['$scope', '$window', '$location', 'LoginService'];
angular.module("controller", []).controller('LoginController', LoginController);
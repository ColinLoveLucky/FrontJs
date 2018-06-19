function LoginController($scope, $window, $location) {
    $scope.viewModel = {
        account: 'haihuahuang',
        password: "Password@01"
    };
    $scope.login = function () {
        var data = {
            userName: $scope.viewModel.account,
            password: $scope.viewModel.password
        }
        $window.alert("Success");
        $location.path("/main");
    }
}

LoginController.$inject = ['$scope', '$window', '$location'];
angular.module('controller', []).controller('LoginController', LoginController);


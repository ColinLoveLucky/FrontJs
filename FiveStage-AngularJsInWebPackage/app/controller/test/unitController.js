function UnitController($scope, $http) {
    $scope.name = "william wood";
    //通过http请求得到user
    $scope.GetUser = function () {
        $http.get('/auth.py').then(function (response) {
            $scope.user = response.data;
        });
    };
}
UnitController.$inject = ['$scope', '$http'];
angular.module("controller",).controller('UnitController', UnitController);
app.controller("watchCtr", function ($scope) {
    $scope.name = "zhangsan";
    $scope.count = 0;
    $scope.$watch('name', function (newValue, oldValue) {
        ++$scope.count;
        if ($scope.count > 2) {
            $scope.name = '已经大于2次';
        }
    });
})
app.controller("MessageController", function ($scope, $timeout) {
    $scope.getMessage = function () {
        setTimeout(function () {
            $scope.message = "Fetched after 3 seconds";
        }, 2000);
    }
    $scope.getMessage();

    setTimeout(function () {
        $scope.$apply(function () {
            $scope.name = "李四";
        })
    }, 2000);
    $scope.name = "张三";
    $scope.age = '10';
    $scope.show = function () {
        $scope.name = '点击后的name';
    }
    $timeout(function () {
        $scope.age = '50';
    }, 2000);

    $scope.a = 1;
    $scope.b = 2;
})
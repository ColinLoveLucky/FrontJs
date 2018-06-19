app.controller("timeoutCtrl", function ($scope, $timeout) {
    $scope.myHeader = "Hello World";
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
})
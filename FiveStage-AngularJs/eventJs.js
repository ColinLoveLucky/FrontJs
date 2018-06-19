app.controller("ClikCtr", function ($scope) {
    $scope.count = 0;
    $scope.firstName="John";
    $scope.lastName="Doe";
    $scope.myVar=false;
    $scope.toggle=function () {
        $scope.myVar=!$scope.myVar;
    }
})
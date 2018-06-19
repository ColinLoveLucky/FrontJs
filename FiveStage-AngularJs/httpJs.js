app.controller("httpCtrl", function ($scope, $http) {
    $http.get("data.json").then(function (response) {
        $scope.myWelcome = response.data.data;
    })
})
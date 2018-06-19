app.controller("ResverCtr", function ($scope) {
    $scope.msg = "Runnoob";
})
app.filter('reverse', function () {
    return function (text) {
        return text.split("").reverse().join("");
    }
})
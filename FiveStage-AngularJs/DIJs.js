app.value("defaultInput", 5);
app.factory("MathService", function () {
    return {
        multiply: function (a, b) {
            return a * b;
        }
    }
});
app.service("CalcService", function (MathService) {
    this.square = function (a) {
        return MathService.multiply(a, a);
    }
})

app.config(function ($provide) {
    $provide.provider('Math', function () {
        this.$get = function () {
            return {
                add: function (a, b) {
                    return a + b;
                }
            }
        }
    })
});

app.constant("configParam", "constant value");

app.controller("DICtr", function ($scope, defaultInput, CalcService, Math, configParam) {
    $scope.number = defaultInput;
    $scope.factoryValue = CalcService.square(10);
    $scope.addProvider = Math.add(1, 9);
    $scope.constValue = configParam;
})

app.controller("ComputerCte",function ($scope,$route) {
   // $scope.$route=$route;
    $scope.Name="Lenoveo";
    $scope.Time="2017/10/1";
}).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/", {
        template: "这是首页"
    }).when("/computers",{
        templateUrl:"computer.html",
        controller:"ComputerCte"
    }).when('/printers',{
        template:"这是打印机页面"
    }).when("/About",{
        templateUrl:"embedded.about.html"
    }).when("/Home",{
        templateUrl:"embedded.home.html"
    }).otherwise({
        redirectTo:"/"
    });
}])
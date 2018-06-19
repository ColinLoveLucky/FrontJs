app.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {

        $scope.gotoBottom = function () {
            // 将location.hash的值设置为
            // 你想要滚动到的元素的id
         //   $location.hash('bottom');
            // 调用 $anchorScroll()
            $anchorScroll('bottom');
        };
    }]);
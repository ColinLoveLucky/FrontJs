app.controller("MyController", function ($scope, $compile) {
    var vm = this;
    vm.msg = 'hello';
    var compiledFn = $compile('<div>{{appCtrl.msg}}</div>');
    var $dom = compiledFn($scope);
    angular.element("#divController").append($dom);



    vm.html = '<h1>{{title}}</h1>\
                            <ul>\
                                <li ng-repeat="item in items">{{item}}</li>\
                            </ul>';

}).directive('compile', function ($compile) {
    return {
        scope: {
            compile: '='
        },
        link: function (scope, elem, attrs) {
            scope.title = 'list';
            scope.items = ['list1', 'list2', 'list3'];
            elem.html($compile(scope.compile)(scope))
        }
    }
})
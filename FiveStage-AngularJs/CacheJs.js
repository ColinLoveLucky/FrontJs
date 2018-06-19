app.controller("cacheCtr",function ($scope,$cacheFactory) {
    var cache=$cacheFactory('cache01');
    cache.put('cacheValue','zhangsan');
    $scope.cacheValue=cache.get('cacheValue');
}).controller("cache2Ctr",function ($scope,$cacheFactory) {
    var cache=$cacheFactory.get("cache01");
    $scope.cacheValue=cache.get("cacheValue");
})


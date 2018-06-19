app.directive('myDirective',function($log,$parse){
    return function(scope,elem,attrs){
        //解析"my-attr属性值到一个函数中"
        var model = $parse(attrs.myAttr);
        //model现在是一个函数，可以调用它来获取表达式的值
        //下面这行代码将会输出作用域中obj.name的值
        model.assign(scope,'New name');
        $log.log(model(scope));
        // elem.bind('click',function(){
        //     //'model.assign'也是一个函数，它用来更新表达式的值
        //     model.assign(scope,'New name');
        //     scope.$apply();
        // })
    }
});
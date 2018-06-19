$(function () {
    var Waiter = function () {
        //注册等待对象
        var dfd = [],
            doneArr = [],
            failArr = [],
            slice = Array.prototype.slice,
            that = this;
        //监控对象
        var Primise = function () {
            this.resolved = false;
            this.rejected = false;
        }
        Primise.prototype = {
            resolve: function () {
                this.resolved = true;
                if (!dfd.length)
                    return;
                for (var i = dfd.length - 1; i > 0; i--) {
                    if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
                        return;
                    }
                    dfd.splice(i, 1);
                }
                _exec(doneArr);
            },
            reject: function () {
                this.rejected = true;
                if (!dfd.length)
                    return;
                dfd.splice(0);
                _exec(failArr);
            }
        }
        //创建监控对象
        that.Deferred = function () {
            return new Primise();
        }

        //回调执行方法
        function _exec(arr) {
            var i = 0, len = arr.length;
            for (; i < len; i++) {
                try {
                    arr[i] && arr[i]();
                } catch (e) {

                }
            }
        }

        //监控异步方法
        that.when = function () {
            dfd = slice.call(arguments);
            var i = dfd.length;
            for (--i; i >= 0; i--) {
                if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise)
                    dfd.splice(i, 1);
            }
            return that;
        }
        //解决成功回调
        that.done = function () {
            doneArr = doneArr.concat(slice.call(arguments));
            return that;
        }
        //解决失败回调方法
        that.fail = function () {
            failArr = failArr.concat(slice.call(arguments));
            return that;
        }
    }

    var waiter = new Waiter();
    var first = function () {
        var dtd = waiter.Deferred();
        setTimeout(function () {
            console.log('first finish');
            dtd.resolve();
        }, 5000);
        return dtd;
    }();

    var second = function () {
        var dtd = waiter.Deferred();
        setTimeout(function () {
            console.log('second finish');
            dtd.resolve();
        }, 10000);
        return dtd;
    }();

    waiter.when(first, second).done(function () {
        console.log('success');
    }, function () {
        console.log('success again');
    }).fail(function () {
        console.log('fail');
    })
})
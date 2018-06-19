$(function () {

    var proxy = new Proxy({}, {
        get: function (target, property) {
            return 35;
        }
    });

    console.log(proxy.time);

    var person = {
        name: "zhangsan"
    };
    var proxyPerson = new Proxy(person, {
        get: function (target, property) {
            if (property in target)
                return target[property];
            else
                return "not In Property";
        }
    });

    console.log(proxyPerson.name);

    function createArray(...elements) {
        let handler = {
            get (target, propkey, receiver) {
                let index = Number(propkey);
                if (index < 0)
                    propkey = String(target.length + index);
                return Reflect.get(target, propkey, receiver);
            }
        };

        let target = [];
        target.push(...elements);
        return new Proxy(target, handler);
    };

    let arr = createArray('a', 'b', 'c');

    console.log(arr[-1]);


    let validator = {
        set: function (target, key, value) {
            if (key === 'age') {
                if (!Number.isInteger(value)) {
                    return "not is Interger";
                }
                if (value > 200) {
                    return Reflect.set(target, key, "big is max 200");
                }
            }
            return Reflect.set(target, key, value);
        }
    };
    let personA = new Proxy({}, validator);
    personA.age = 100;
    console.log(personA.age);
    personA.age = 1000;
    console.log(personA.age);

    var handlerApply = {
        apply: function () {
            return "I'm the proxy";
        }
    }
    var pApply = new Proxy(function () {
        return "I'm the targer";
    }, handlerApply);
    console.log(pApply());
    var twice = {
        apply(target, ctx, args) {
            return Reflect.apply(...arguments) * 2;
        }
    }
    function sum(left, right) {
        return left + right;
    }
    var proxySum = new Proxy(sum, twice);
    console.log(proxySum(1, 2));
    console.log(proxySum.call(null, 5, 6));
    console.log(proxySum.apply(null, [5, 6]));
    var handlerHas = {
        has(target, key) {
            if (key[0] === '_') {
                return false;
            }
            return key in target;
        }
    }

    var targetHas = {_prop: 'foo', prop: 'foo'};

    var proxyHas = new Proxy(targetHas, handlerHas);

    console.log('_prop' in proxyHas);

    let stu1 = {name: 'zhangsan', score: 59};
    let stu2 = {name: 'lisi', socre: 99};
    let handlerScore = {
        has(target, prop) {
            if (prop === 'score' && target[prop] < 60) {
                console.log(`${target.name} not dabiao`);
                return false;
            }
            return prop in target;
        }
    }

    let oproxy1 = new Proxy(stu1, handlerScore);
    let oproxy2 = new Proxy(stu2, handlerScore);

    'score' in oproxy1;
    console.log('score' in oproxy2);
    for (let a in oproxy1) {
        console.log(oproxy1[a]);
    }
    for (let b in oproxy2) {
        console.log(oproxy2[b]);
    }
    var p = new Proxy(function () {
    }, {
        construct: function (target, args) {
            console.log('called' + args.join(','));
            return {value: args[0] * 10};
        }
    });
    (new p(1)).value;
    var handlerDelete = {
        deleteProperty(target, key) {
            console.log('delete' + key);
            return Reflect.deleteProperty(target, key);
        }
    };
    var targetHandler = {_prop: "foo", prop: 'foo2'};
    var proxyDelete = new Proxy(targetHandler, handlerDelete);
    delete proxyDelete._prop;
    console.log(proxyDelete.prop);
    var handlerDefine={
        defineProperties(target,key,description){
            return false;
        }
    };
    var targetDefine={};
    var proxyDefine=new Proxy(targetDefine,handlerDefine);
    proxyDefine.foo='bar';
    
})
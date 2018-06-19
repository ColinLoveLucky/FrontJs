$(function () {
    function log(x, y = "world") {
        x = x || 'Hello';
        console.log(x, y);
    }

    log();

    function foo2({x, y = 5}) {
        console.log(x, y);
    }

    foo2({x: 1});

    function fetch(url, {method = 'Get'} = {}) {
        console.log(method);
    }

    fetch("http://example.com", {});

    fetch("http://example.com");

    function m1({x, y} = {x: 0, y: 0}) {
        return [x, y];
    }

    var mValue = m1();
    console.log(mValue);
    console.log(mValue);

    function f(x = 1, y) {
        return [x, y];
    }

    console.log(f().join(","));
    console.log(f(2));
    console.log(f(undefined, 1));

    console.log((function (a) {
    }).length);

    console.log((function (a = 5) {
    }).length);

    function throwIfMissing() {
        throw new Error('Missing Parameter');
    }

    function fd(mustBeProvider = throwIfMissing()) {
        return mustBeProvider;
    }

    fd(2);

    var dd = 10;
    console.log(dd);

    var a = function () {

    };
    console.log("aaaaaa" + a);
    console.log(a.toString());
    console.log(a);

    function add(...values) {
        let sum = 0;
        for (var val of values) {
            sum += val;
        }
        return sum;
    }

    var valueSum = add(2, 3, 5);
    console.log(`sum${valueSum}`);
    const sortNumbers = (...numbers) => numbers.sort();
    console.log(sortNumbers(10, 9, 28, 33).join(","));

    function push(array, ...items) {
        items.forEach(item => array.push(item));
        console.log(array.sort().join(","));
    }

    push([], 19, 2, 13);

    function fooName() {

    }

    console.log(fooName.name);
    console.log((new Function).name);
    var foo3 = new Function('var temp = 100; this.temp = 200; return temp + this.temp;');
    console.log(foo3());

    function add(a, b) {
        console.log(a + b);
    }

    function sub(a, b) {
        console.log(a - b);
    }

    console.log(typeof  sub);
    add.call(sub, 3, 1);
    var addObj = {
        add: function (...values) {
            var sum = 0;
            values.forEach(item => sum += item);
            console.log(sum);
        }
    }
    var subObj = {
        sub: function (...values) {
            var sum = 0;
            values.forEach(item => sum += item);
            console.log(sum);
        }
    }
    console.log(subObj.sub);
    addObj.add.call(subObj.sub, 1, 3);

    var nullObj = {};

    nullObj["fw"] = "hello";

    for (var index in nullObj) {
        console.log(nullObj[index]);
    }

    nullObj["fw"] = "world";
    nullObj["fq"] = "kick";

    for (var index in nullObj) {
        console.log(nullObj[index]);
    }

    console.log(nullObj.fw);

    function FAB() {
        var s="Hello";
    }

    console.log(Object.constructor);
    console.log(FAB.prototype.constructor);

    var aNew=new Object();
    console.log(aNew.constructor);
});

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$(function () {
    function log(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "world";

        x = x || 'Hello';
        console.log(x, y);
    }

    log();

    function foo2(_ref) {
        var x = _ref.x,
            _ref$y = _ref.y,
            y = _ref$y === undefined ? 5 : _ref$y;

        console.log(x, y);
    }

    foo2({ x: 1 });

    function fetch(url) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$method = _ref2.method,
            method = _ref2$method === undefined ? 'Get' : _ref2$method;

        console.log(method);
    }

    fetch("http://example.com", {});

    fetch("http://example.com");

    function m1() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
            x = _ref3.x,
            y = _ref3.y;

        return [x, y];
    }

    var mValue = m1();
    console.log(mValue);
    console.log(mValue);

    function f() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var y = arguments[1];

        return [x, y];
    }

    console.log(f().join(","));
    console.log(f(2));
    console.log(f(undefined, 1));

    console.log(function (a) {}.length);

    console.log(function () {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    }.length);

    function throwIfMissing() {
        throw new Error('Missing Parameter');
    }

    function fd() {
        var mustBeProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwIfMissing();

        return mustBeProvider;
    }

    fd(2);

    var dd = 10;
    console.log(dd);

    var a = function a() {};
    console.log("aaaaaa" + a);
    console.log(a.toString());
    console.log(a);

    function add() {
        var sum = 0;

        for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
            values[_key] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var val = _step.value;

                sum += val;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return sum;
    }

    var valueSum = add(2, 3, 5);
    console.log('sum' + valueSum);
    var sortNumbers = function sortNumbers() {
        for (var _len2 = arguments.length, numbers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            numbers[_key2] = arguments[_key2];
        }

        return numbers.sort();
    };
    console.log(sortNumbers(10, 9, 28, 33).join(","));

    function push(array) {
        for (var _len3 = arguments.length, items = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            items[_key3 - 1] = arguments[_key3];
        }

        items.forEach(function (item) {
            return array.push(item);
        });
        console.log(array.sort().join(","));
    }

    push([], 19, 2, 13);

    function fooName() {}

    console.log(fooName.name);
    console.log(new Function().name);
    var foo3 = new Function('var temp = 100; this.temp = 200; return temp + this.temp;');
    console.log(foo3());

    function add(a, b) {
        console.log(a + b);
    }

    function sub(a, b) {
        console.log(a - b);
    }

    console.log(typeof sub === 'undefined' ? 'undefined' : _typeof(sub));
    add.call(sub, 3, 1);
    var addObj = {
        add: function add() {
            var sum = 0;

            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                values[_key4] = arguments[_key4];
            }

            values.forEach(function (item) {
                return sum += item;
            });
            console.log(sum);
        }
    };
    var subObj = {
        sub: function sub() {
            var sum = 0;

            for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                values[_key5] = arguments[_key5];
            }

            values.forEach(function (item) {
                return sum += item;
            });
            console.log(sum);
        }
    };
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
        var s = "Hello";
    }

    console.log(Object.constructor);
    console.log(FAB.prototype.constructor);

    var aNew = new Object();
    console.log(aNew.constructor);
});

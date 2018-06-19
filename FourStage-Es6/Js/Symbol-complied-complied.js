"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

$(function () {
    var _objOwnKey;

    var s1 = Symbol("foo");
    console.log(s1.toString());

    var a = {};
    var mySymbol = Symbol();
    a[mySymbol] = "Hello";
    console.log(a[mySymbol]);
    var s = Symbol();
    var b = _defineProperty({}, s, function (arg) {
        console.log(arg);
    });

    b[s](123);

    var shapeType = {
        triangle: Symbol()
    };

    function getArea(shape, options) {
        var area = 0;
        switch (shape) {
            case shapeType.triangle:
                area = .5 * options.width * options.height;
                break;
        }
        return area;
    }
    console.log(getArea(shapeType.triangle, { width: 100, height: 200 }));

    var objSymbol = {};
    var aSy = Symbol("a");
    var bSy = Symbol("b");
    objSymbol[aSy] = 'Hello';
    objSymbol[bSy] = 'World';
    var objectSymbols = Object.getOwnPropertySymbols(objSymbol);
    console.log(objectSymbols);

    var objOwnKey = (_objOwnKey = {}, _defineProperty(_objOwnKey, Symbol('my_key'), 1), _defineProperty(_objOwnKey, "enum", 2), _defineProperty(_objOwnKey, "nonEnum", 3), _objOwnKey);
    console.log(Reflect.ownKeys(objOwnKey));

    var s11 = Symbol.for("foo");
    var s12 = Symbol.for("foo");
    console.log(Object.is(s11, s12));

    console.log(Symbol.keyFor(s11));

    var MyClass = function () {
        function MyClass() {
            _classCallCheck(this, MyClass);
        }

        _createClass(MyClass, [{
            key: Symbol.hasInstance,
            value: function value(foo) {
                return foo instanceof Array;
            }
        }]);

        return MyClass;
    }();

    console.log([1, 2] instanceof new MyClass());
});

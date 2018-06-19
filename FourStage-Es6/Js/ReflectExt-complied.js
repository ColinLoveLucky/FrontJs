'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
    var _myObjectOwinKey;

    var myObject = {
        foo: 1,
        bar: 2,
        get baz() {
            return this.foo + this.bar;
        }
    };

    console.log(Reflect.get(myObject, 'foo'));

    var myObject2 = {
        foo: 1,
        set bar(value) {
            return this.foo = value;
        }
    };

    Reflect.set(myObject2, "foo", 2);
    console.log(myObject2.foo);
    Reflect.set(myObject2, 'bar', "3");
    console.log(myObject2.foo);

    var myObject3 = {
        foo: 1
    };

    console.log(Reflect.has(myObject3, 'foo'));

    function Greeting(name) {
        this.name = name;
        console.log(this.name);
    }

    var instance = Reflect.construct(Greeting, ["zhsangsan"]);

    function Pasta(grain, width) {
        this.grain = grain;
        this.width = width;
    }

    var spaghetti = new Pasta("wheat", "0.2");
    var proto = Object.getPrototypeOf(spaghetti);
    proto.foodgroup = 'carbo';
    console.log(proto.foodgroup);
    console.log(proto === Pasta.prototype);
    console.log(spaghetti.foodgroup);
    console.log(spaghetti.__proto__.foodgroup);
    console.log(Reflect.getPrototypeOf(spaghetti).foodgroup);
    console.log(Reflect.getPrototypeOf(spaghetti) === Pasta.prototype);

    function A() {}

    A.prototype.SayHi = function () {
        return "Say Hi";
    };

    Object.setPrototypeOf(spaghetti, A.prototype);
    console.log(spaghetti.SayHi());

    var ages = [11, 33, 12, 54];
    var youngest = Reflect.apply(Math.min, Math, ages);
    console.log(youngest);
    var oldest = Reflect.apply(Math.max, Math, ages);
    console.log(oldest);

    function MyDate() {}

    Reflect.defineProperty(MyDate, "now", {
        value: function value() {
            return Date.now();
        }
    });

    console.log(MyDate.now());

    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    Shape.prototype.move = function () {
        this.x += x;
        this.y += y;
    };

    function Rectangle() {
        Shape.call(this);
    }

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    var rect = new Rectangle();
    console.log(rect instanceof Rectangle);
    console.log(rect instanceof Shape);
    console.log(rect);
    var objCreate = {};
    var newObjCreate = Object.create(objCreate, {
        t1: {
            value: 'yupeng',
            writable: true
        },
        bar: {
            configurable: true,
            get: function get() {
                return this.t1;
            },
            set: function set(value) {
                this.t1 = value;
            }
        }
    });
    console.log(newObjCreate.t1);
    newObjCreate.t1 = "Hello Hi";
    console.log(newObjCreate.t1);
    newObjCreate.bar = "Say Hi";
    console.log(newObjCreate.bar);

    var myObjectExt = {};

    Reflect.preventExtensions(myObjectExt);
    if (Reflect.isExtensible(myObjectExt)) {
        myObjectExt.say = "dd";
        console.log(myObjectExt.say);
    }

    var myObjectOwinKey = (_myObjectOwinKey = {
        foo: 1,
        bar: 2
    }, _defineProperty(_myObjectOwinKey, Symbol.for('baz'), 3), _defineProperty(_myObjectOwinKey, Symbol.for('bing'), 4), _myObjectOwinKey);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Reflect.ownKeys(myObjectOwinKey)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            console.log(item);
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
});

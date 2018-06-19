'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var Point = function () {
        function Point(x, y) {
            _classCallCheck(this, Point);

            this.x = x;
            this.y = y;
        }

        _createClass(Point, [{
            key: 'toString',
            value: function toString() {
                return 'this.x:' + this.x + ' this.y' + this.y;
            }
        }]);

        return Point;
    }();

    var p = new Point(1, 2);
    console.log(p.toString());

    var Foo = function Foo() {
        _classCallCheck(this, Foo);

        return Object.create(null);
    };

    function FooConstructor() {
        this.name = 'zhangsan';
    }

    //  console.log(new FooConstructor().constructor);
    console.log(Object.constructor instanceof Object);
    console.log(FooConstructor.constructor instanceof Object);
    console.log(Object);
    console.log(new FooConstructor());
    console.log(FooConstructor.prototype === new FooConstructor().__proto__);

    var Widget = function () {
        function Widget() {
            _classCallCheck(this, Widget);
        }

        _createClass(Widget, [{
            key: 'foo',
            value: function foo(baz) {
                bar.call(this, baz);
            }
        }]);

        return Widget;
    }();

    function bar(baz) {
        return this.snag = baz;
    }

    var barSymbol = Symbol('bar');
    var snafSymbol = Symbol("snaf");

    var myCLass = function () {
        function myCLass() {
            _classCallCheck(this, myCLass);
        }

        _createClass(myCLass, [{
            key: 'foo',
            value: function foo(baz) {
                this[barSymbol](baz);
            }
        }, {
            key: barSymbol,
            value: function value(baz) {
                return this[snafSymbol] = baz;
            }
        }]);

        return myCLass;
    }();

    var StaticFoo = function () {
        function StaticFoo() {
            _classCallCheck(this, StaticFoo);
        }

        _createClass(StaticFoo, null, [{
            key: 'classMethod',
            value: function classMethod() {
                return "hello";
            }
        }, {
            key: 'bar',
            value: function bar() {
                this.baz();
            }
        }, {
            key: 'baz',
            value: function baz() {
                console.log('hello static');
            }
        }]);

        return StaticFoo;
    }();

    console.log(StaticFoo.classMethod());
    console.log(StaticFoo.bar());

    var FooA = function () {
        function FooA() {
            _classCallCheck(this, FooA);
        }

        _createClass(FooA, null, [{
            key: 'classMethod',
            value: function classMethod() {
                return "Hello FooA";
            }
        }]);

        return FooA;
    }();

    var BarB = function (_FooA) {
        _inherits(BarB, _FooA);

        function BarB() {
            _classCallCheck(this, BarB);

            return _possibleConstructorReturn(this, (BarB.__proto__ || Object.getPrototypeOf(BarB)).apply(this, arguments));
        }

        _createClass(BarB, null, [{
            key: 'classMethod',
            value: function classMethod() {
                return _get(BarB.__proto__ || Object.getPrototypeOf(BarB), 'classMethod', this).call(this) + ",too";
            }
        }]);

        return BarB;
    }(FooA);

    console.log(BarB.classMethod());

    var FooStaticPro = function FooStaticPro() {
        _classCallCheck(this, FooStaticPro);
    };

    FooStaticPro.A = "hello";
    console.log(FooStaticPro.A);

    var AT = function AT() {
        _classCallCheck(this, AT);

        console.log("hello AT");
    };

    ;

    new AT();

    function PersonAB(name) {
        if (new.target !== undefined) {
            this.name = name;
        } else throw new Error("must use new initalize");
    }

    var personA = new PersonAB("zhangsan");

    // var notAPerson = PersonAB.call(personA, "lisi");

    var Shape = function Shape() {
        _classCallCheck(this, Shape);

        if (new.target === Shape) throw new Error("not intalize");
    };

    var Rectangle = function (_Shape) {
        _inherits(Rectangle, _Shape);

        function Rectangle(length, width) {
            _classCallCheck(this, Rectangle);

            return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this));
        }

        return Rectangle;
    }(Shape);

    // var x=new Shape();


    var y = new Rectangle(10, 20);

    var PointAB = function () {
        function PointAB(x, y) {
            _classCallCheck(this, PointAB);

            this.x = x;
            this.y = y;
        }

        _createClass(PointAB, [{
            key: 'toString',
            value: function toString() {
                return 'this.x:' + this.x + ',this.y:' + this.y;
            }
        }]);

        return PointAB;
    }();

    var ColorPoint = function (_Point) {
        _inherits(ColorPoint, _Point);

        function ColorPoint(x, y, color) {
            _classCallCheck(this, ColorPoint);

            var _this3 = _possibleConstructorReturn(this, (ColorPoint.__proto__ || Object.getPrototypeOf(ColorPoint)).call(this, x, y));

            _this3.color = color;
            return _this3;
        }

        _createClass(ColorPoint, [{
            key: 'toString',
            value: function toString() {
                return 'this.color:' + this.color + ' ' + _get(ColorPoint.prototype.__proto__ || Object.getPrototypeOf(ColorPoint.prototype), 'toString', this).call(this);
            }
        }]);

        return ColorPoint;
    }(Point);

    var colorPoint = new ColorPoint(10, 20, "green");

    console.log(colorPoint.toString());

    console.log(Object.getPrototypeOf(ColorPoint) === Point);

    var ABC = function ABC() {
        _classCallCheck(this, ABC);
    };

    ABC.prototype.x = 2;

    var D = function (_ABC) {
        _inherits(D, _ABC);

        function D() {
            _classCallCheck(this, D);

            var _this4 = _possibleConstructorReturn(this, (D.__proto__ || Object.getPrototypeOf(D)).call(this));

            console.log(_get(D.prototype.__proto__ || Object.getPrototypeOf(D.prototype), 'x', _this4));
            return _this4;
        }

        return D;
    }(ABC);

    console.log(new D());

    var AC = function AC() {
        _classCallCheck(this, AC);
    };

    var ACB = function (_AC) {
        _inherits(ACB, _AC);

        function ACB() {
            _classCallCheck(this, ACB);

            return _possibleConstructorReturn(this, (ACB.__proto__ || Object.getPrototypeOf(ACB)).apply(this, arguments));
        }

        return ACB;
    }(AC);

    console.log(AC.prototype);
    console.log(ACB.prototype);
    console.log(typeof AC === 'undefined' ? 'undefined' : _typeof(AC));
    var adder = new Function("a", "b", "return a+b");
    console.log(adder);
    console.log(typeof adder === 'undefined' ? 'undefined' : _typeof(adder));
    console.log(typeof Function === 'undefined' ? 'undefined' : _typeof(Function));
    console.log(adder.prototype);
    console.log(adder.__proto__);
});

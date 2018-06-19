'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

    var arr = ['a', 'b', 'c'];
    var iter = arr[Symbol.iterator]();
    console.log(iter.next().value);

    var RangeIterator = function () {
        function RangeIterator(start, stop) {
            _classCallCheck(this, RangeIterator);

            this.value = start;
            this.stop = stop;
        }

        _createClass(RangeIterator, [{
            key: Symbol.iterator,
            value: function value() {
                return this;
            }
        }, {
            key: 'next',
            value: function next() {
                var value = this.value;
                if (value < this.stop) {
                    this.value++;
                    return { done: false, value: value };
                }
                return { done: true, value: undefined };
            }
        }]);

        return RangeIterator;
    }();

    function range(start, stop) {
        return new RangeIterator(start, stop);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = range(0, 3)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            console.log(value);
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

    function Obj(value) {
        this.value = value;
        this.next = null;
    }

    Obj.prototype[Symbol.iterator] = function () {
        var iterator = { next: next };
        var current = this;

        function next() {
            if (current) {
                var value = current.value;
                current = current.next;
                return { done: false, value: value };
            } else {
                return { done: true };
            }
        }

        return iterator;
    };

    var one = new Obj(1);
    var two = new Obj(2);
    var three = new Obj(3);

    one.next = two;
    two.next = three;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = one[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;

            console.log(i);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var iterable = _defineProperty({
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    }, Symbol.iterator, Array.prototype[Symbol.iterator]);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = iterable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            console.log(item);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    var someString = "hi";
    var iteratorString = someString[Symbol.iterator]();
    console.log(iteratorString.next());

    function readlinesSync(file) {
        return {
            next: function next() {
                return { done: false };
            },
            return: function _return() {
                return { done: true };
            }
        };
    }
});

"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

$(function () {
    var someArray = [1, 2, 3];
    var first = someArray[0],
        second = someArray[1],
        third = someArray[2];

    console.log("jieGou:" + first);
    var foo = 1,
        bar = 2,
        baz = 3;

    console.log("jieGou:" + bar);
    var robotA = { name: "bender" };
    var robotB = { name: "Flexo" };
    var nameA = robotA.name;
    var nameB = robotB.name;

    console.log(nameA);
    console.log(nameB);
    var _foo$bar = { foo: "lorem", bar: "ipsum" },
        foo = _foo$bar.foo,
        bar = _foo$bar.bar;

    console.log(foo);
    var complicatedObj = {
        arrayPro: ["Zapp", { second: "Brannigan" }]
    };

    var _complicatedObj$array = _slicedToArray(complicatedObj.arrayPro, 2),
        first = _complicatedObj$array[0],
        second = _complicatedObj$array[1].second;

    console.log(first);
    console.log(second);

    var _ref = [],
        _ref$ = _ref[0],
        Missing = _ref$ === undefined ? true : _ref$;

    console.log(Missing);

    var _ref2 = {},
        _ref2$message = _ref2.message,
        msg = _ref2$message === undefined ? "Something went wrong" : _ref2$message;

    console.log(msg);

    function returnMultiValues() {
        return [1, 2];
    }

    var _returnMultiValues = returnMultiValues(),
        _returnMultiValues2 = _slicedToArray(_returnMultiValues, 2),
        foo = _returnMultiValues2[0],
        bar = _returnMultiValues2[1];

    console.log(foo);

    var map = new Map();
    map.set("first", "hello");
    map.set("second", "world");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            console.log(key + " is " + value);
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

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {
    var _console, _console2, _console3;

    (_console = console).log.apply(_console, [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 9, 3, 3, 3, 2, 2, 3, 34, 4]);
    function addArray(x, y) {
        return x + y;
    }

    var numbers = [5, 6];

    console.log(addArray.apply(undefined, numbers));

    var arr1 = ['a', 'b'];
    var arr2 = ['c'];
    var arr3 = ['d', 'e'];

    (_console2 = console).log.apply(_console2, arr1.concat(arr2, arr3));

    var first = 1,
        rest = [2, 3, 4, 5, 6];


    (_console3 = console).log.apply(_console3, [first].concat(_toConsumableArray(rest)));

    var arrayLike = {
        '0': '1',
        '1': '2',
        '2': '3',
        length: 3
    };

    console.log(Array.from(arrayLike, function (x) {
        return x * x;
    }).join(','));

    console.log(Array.of(3, 11, 8).join(","));

    console.log([1, 4, -5, 10].find(function (item) {
        return item < 0;
    }));

    console.log(['a', 'b', 'c'].fill(7));
    console.log(['b', '4', '3'].fill(5, 1, 2));

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ['a', 'b'].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var index = _step.value;

            console.log(index);
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = ['a', 'b'].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                _index = _step2$value[0],
                elem = _step2$value[1];

            console.log(_index, elem);
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

    console.log([1, 2, 3].includes(2));
});

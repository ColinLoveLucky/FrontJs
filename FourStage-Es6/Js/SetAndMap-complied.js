"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {
    var _console, _console2, _console3, _console4, _console5, _console6, _console7, _console8;

    var set1 = new Set();
    [2, 3, 4, 5, 6, 7, 4].forEach(function (item) {
        return set1.add(item);
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = set1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            console.log(i);
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

    var items = new Set([1, 2, 3, 4, 5, 5, 5]);
    console.log(items.size);

    console.log(set1.has(2));
    console.log(set1.delete(2));
    console.log(set1.has(2));

    var set2 = new Set([1, 2, 3]);
    set2.forEach(function (value, key) {
        return console.log(value * 2);
    });

    console.log(Array.from(set2));

    (_console = console).log.apply(_console, _toConsumableArray(set2));

    var aSet = new Set([1, 2, 3]);
    var bSet = new Set([4, 3, 2]);
    var union = new Set([].concat(_toConsumableArray(aSet), _toConsumableArray(bSet)));
    (_console2 = console).log.apply(_console2, _toConsumableArray(union));

    var intersect = new Set([].concat(_toConsumableArray(aSet)).filter(function (x) {
        return bSet.has(x);
    }));
    (_console3 = console).log.apply(_console3, _toConsumableArray(intersect));

    var difference = new Set([].concat(_toConsumableArray(aSet)).filter(function (item) {
        return !bSet.has(item);
    }));

    (_console4 = console).log.apply(_console4, _toConsumableArray(difference));

    var mMap = new Map();
    var oMap = { p: "Hello World" };
    mMap.set(oMap, 'content');
    console.log(mMap.get(oMap));
    console.log(mMap.has(oMap));
    mMap.delete(oMap);
    console.log(mMap.has(oMap));

    var arrayMap = new Map([["name", "zhangsan"], ['title', "Author"]]);

    console.log(arrayMap.size);
    console.log(arrayMap.has('name'));
    console.log(arrayMap.get('name'));

    var mapFor = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

    (_console5 = console).log.apply(_console5, _toConsumableArray(mapFor.keys()));
    (_console6 = console).log.apply(_console6, _toConsumableArray(mapFor.values()));
    (_console7 = console).log.apply(_console7, _toConsumableArray(mapFor.entries()));
    (_console8 = console).log.apply(_console8, _toConsumableArray(mapFor));

    function mapToArrayJson(map) {
        return JSON.stringify([].concat(_toConsumableArray(map)));
    }

    var mapJson = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
    console.log(mapToArrayJson(mapJson));
});

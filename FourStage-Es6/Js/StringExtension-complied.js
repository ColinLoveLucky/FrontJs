'use strict';

var _templateObject = _taggedTemplateLiteral(['Hello ', ' world ', ''], ['Hello ', ' world ', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

$(function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = 'foo'[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var codePoint = _step.value;

            console.log(codePoint);
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

    var s = "Hello World!";
    console.log(s.startsWith('Hello'));
    console.log(s.endsWith('!'));
    console.log(s.includes('Hello'));
    console.log('x'.repeat(3));
    var count = 10;
    var sValue = 'There are <b>' + count + '</b> items in you basket';
    console.log(sValue);

    function fn() {
        return "Hello World";
    }

    console.log('foo ' + fn() + ' bar');

    console.log('Hello ' + 'World');

    function tag(s, v1, v2) {
        console.log(s[0]);
        console.log(s[1]);
        console.log(s[2]);
        console.log(v1);
        console.log(v2);
    }

    var a = 5,
        b = 10;
    tag(_templateObject, a + b, a * b);
});

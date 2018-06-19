'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {
    var _marked = /*#__PURE__*/regeneratorRuntime.mark(helloWorldGenerator),
        _marked2 = /*#__PURE__*/regeneratorRuntime.mark(gen),
        _marked3 = /*#__PURE__*/regeneratorRuntime.mark(dataConsumer),
        _marked4 = /*#__PURE__*/regeneratorRuntime.mark(fibonacci),
        _marked5 = /*#__PURE__*/regeneratorRuntime.mark(foo),
        _marked6 = /*#__PURE__*/regeneratorRuntime.mark(genReturn),
        _marked7 = /*#__PURE__*/regeneratorRuntime.mark(fooRef),
        _marked8 = /*#__PURE__*/regeneratorRuntime.mark(barRef),
        _marked9 = /*#__PURE__*/regeneratorRuntime.mark(inorder),
        _marked10 = /*#__PURE__*/regeneratorRuntime.mark(gIterator),
        _marked11 = /*#__PURE__*/regeneratorRuntime.mark(genF);

    function helloWorldGenerator() {
        return regeneratorRuntime.wrap(function helloWorldGenerator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return 'Hello';

                    case 2:
                        _context.next = 4;
                        return 'World';

                    case 4:
                        return _context.abrupt('return', 'ending');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this);
    }

    var hw = helloWorldGenerator();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(hw.next());
    console.log(hw.next());
    console.log(hw.next());
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    function gen() {
        return regeneratorRuntime.wrap(function gen$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return 123 + 456;

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _marked2, this);
    }

    var genValue = gen();
    console.log(genValue.next());

    var arr = [1, [[2, 3], 4], [5, 6]];

    var flat = /*#__PURE__*/regeneratorRuntime.mark(function flat(a) {
        var length, i, item;
        return regeneratorRuntime.wrap(function flat$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        length = a.length;
                        i = 0;

                    case 2:
                        if (!(i < length)) {
                            _context3.next = 13;
                            break;
                        }

                        item = a[i];

                        if (!(typeof item !== 'number')) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.delegateYield(flat(item), 't0', 6);

                    case 6:
                        _context3.next = 10;
                        break;

                    case 8:
                        _context3.next = 10;
                        return item;

                    case 10:
                        i++;
                        _context3.next = 2;
                        break;

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, flat, this);
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = flat(arr)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var f = _step.value;

            console.log(f);
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

    var myIterable = {};
    myIterable[Symbol.iterator] = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return 1;

                    case 2:
                        _context4.next = 4;
                        return 2;

                    case 4:
                        _context4.next = 6;
                        return 3;

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee, this);
    });
    console.log([].concat(_toConsumableArray(myIterable)));

    function dataConsumer() {
        return regeneratorRuntime.wrap(function dataConsumer$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        console.log('Started');
                        _context5.t0 = console;
                        _context5.next = 4;
                        return;

                    case 4:
                        _context5.t1 = _context5.sent;
                        _context5.t2 = '1.' + _context5.t1;

                        _context5.t0.log.call(_context5.t0, _context5.t2);

                        _context5.t3 = console;
                        _context5.next = 10;
                        return;

                    case 10:
                        _context5.t4 = _context5.sent;
                        _context5.t5 = '2.' + _context5.t4;

                        _context5.t3.log.call(_context5.t3, _context5.t5);

                        return _context5.abrupt('return', 'result');

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _marked3, this);
    }

    var genObj = dataConsumer();
    genObj.next();
    genObj.next('a');
    genObj.next('b');

    function fibonacci() {
        var prev, curr, _ref;

        return regeneratorRuntime.wrap(function fibonacci$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        prev = 0, curr = 1;

                    case 1:
                        _ref = [curr, prev + curr];
                        prev = _ref[0];
                        curr = _ref[1];
                        _context6.next = 6;
                        return curr;

                    case 6:
                        _context6.next = 1;
                        break;

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _marked4, this);
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = fibonacci()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var n = _step2.value;

            if (n > 15) break;
            console.log(n);
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

    var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
        return regeneratorRuntime.wrap(function g$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return;

                    case 3:
                        _context7.next = 8;
                        break;

                    case 5:
                        _context7.prev = 5;
                        _context7.t0 = _context7['catch'](0);

                        console.log('inner catch', _context7.t0);

                    case 8:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, g, this, [[0, 5]]);
    });

    var ig = g();
    // ig.next();
    try {
        ig.throw('a');
        ig.throw('b');
    } catch (e) {
        console.log('out catch', e);
    }

    function foo() {
        var x, y;
        return regeneratorRuntime.wrap(function foo$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return 3;

                    case 2:
                        x = _context8.sent;
                        y = x.toUpperCase();
                        _context8.next = 6;
                        return y;

                    case 6:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _marked5, this);
    }

    var it = foo();
    it.next();
    try {
        it.next(42);
    } catch (e) {
        console.log(e);
    }

    function genReturn() {
        return regeneratorRuntime.wrap(function genReturn$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return 1;

                    case 2:
                        _context9.next = 4;
                        return 2;

                    case 4:
                        _context9.next = 6;
                        return 3;

                    case 6:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _marked6, this);
    }

    var gReturn = genReturn();
    console.log(gReturn.next());
    console.log(gReturn.return("foo"));
    console.log(gReturn.next());

    function fooRef() {
        return regeneratorRuntime.wrap(function fooRef$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return 'a';

                    case 2:
                        _context10.next = 4;
                        return 'b';

                    case 4:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _marked7, this);
    }

    function barRef() {
        return regeneratorRuntime.wrap(function barRef$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.next = 2;
                        return 'x';

                    case 2:
                        return _context11.delegateYield(fooRef(), 't0', 3);

                    case 3:
                        _context11.next = 5;
                        return 'y';

                    case 5:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _marked8, this);
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = barRef()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var v = _step3.value;

            console.log(v);
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

    function Tree(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
    }

    function inorder(t) {
        return regeneratorRuntime.wrap(function inorder$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        if (!t) {
                            _context12.next = 5;
                            break;
                        }

                        return _context12.delegateYield(inorder(t.left), 't0', 2);

                    case 2:
                        _context12.next = 4;
                        return t.label;

                    case 4:
                        return _context12.delegateYield(inorder(t.right), 't1', 5);

                    case 5:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _marked9, this);
    };

    function make(array) {
        if (array.length == 1) return new Tree(null, array[0], null);
        return new Tree(make(array[0]), array[1], make(array[2]));
    }

    var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

    var result = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = inorder(tree)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var node = _step4.value;

            result.push(node);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    console.log([].concat(result));

    function gIterator() {
        return regeneratorRuntime.wrap(function gIterator$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _marked10, this);
    }

    gIterator.prototype.hello = function () {
        return 'hi';
    };

    var objIterator = gIterator();
    console.log(objIterator instanceof gIterator);
    console.log(objIterator.hello());

    function genF() {
        return regeneratorRuntime.wrap(function genF$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        this.a = 1;
                        _context14.next = 3;
                        return this.b = 2;

                    case 3:
                        _context14.next = 5;
                        return this.c = 3;

                    case 5:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _marked11, this);
    }

    function F() {
        return genF.call(genF.prototype);
    }

    var f = new F();
    f.next();
    console.log(f.a);

    var clock = /*#__PURE__*/regeneratorRuntime.mark(function clock() {
        return regeneratorRuntime.wrap(function clock$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        if (!true) {
                            _context15.next = 9;
                            break;
                        }

                        console.log("Tick!");
                        _context15.next = 4;
                        return;

                    case 4:
                        console.log("Tock!");
                        _context15.next = 7;
                        return;

                    case 7:
                        _context15.next = 0;
                        break;

                    case 9:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, clock, this);
    });

    var clockF = clock();
    clockF.next();
    clockF.next();

    //var fs = require('fs');
    var readFile = function readFile(fileName) {
        return new Promise(function (resolve, reject) {
            // fs.readFile(fileName, function(error, data) {
            //     if (error) return reject(error);
            //     resolve(data);
            // });
            resolve(fileName);
        });
    };
    var gen = /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        var f1, f2;
        return regeneratorRuntime.wrap(function gen$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.next = 2;
                        return readFile('./Js/posts.json');

                    case 2:
                        f1 = _context16.sent;
                        _context16.next = 5;
                        return readFile('./Js/2.json');

                    case 5:
                        f2 = _context16.sent;

                        console.log(f1.toString());
                        console.log(f2.toString());

                    case 8:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, gen, this);
    });
    // var co = require('co');
    // co(gen);
});

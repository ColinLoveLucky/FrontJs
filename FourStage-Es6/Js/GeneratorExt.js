$(function () {
    function* helloWorldGenerator() {
        yield 'Hello';
        yield 'World';
        return 'ending';
    }

    var hw = helloWorldGenerator();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(hw.next());
    console.log(hw.next());
    console.log(hw.next());
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    function* gen() {
        yield  123 + 456;
    }

    var genValue = gen();
    console.log(genValue.next());

    var arr = [1, [[2, 3], 4], [5, 6]];

    var flat = function* (a) {
        var length = a.length;
        for (var i = 0; i < length; i++) {
            var item = a[i];
            if (typeof  item !== 'number')
                yield* flat(item);
            else
                yield item;
        }
    };

    for (var f of flat(arr)) {
        console.log(f);
    }

    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield  1;
        yield 2;
        yield 3;
    };
    console.log([...myIterable]);

    function* dataConsumer() {
        console.log('Started');
        console.log(`1.${yield }`);
        console.log(`2.${yield }`);
        return 'result';
    }

    let genObj = dataConsumer();
    genObj.next();
    genObj.next('a');
    genObj.next('b');

    function* fibonacci() {
        let [prev, curr] = [0, 1];
        for (; ;) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }

    for (let n of fibonacci()) {
        if (n > 15) break;
        console.log(n);
    }

    var g = function* () {
        try {
            yield;

        } catch (e) {
            console.log('inner catch', e);
        }
    }

    var ig = g();
    // ig.next();
    try {
        ig.throw('a');
        ig.throw('b');
    }
    catch (e) {
        console.log('out catch', e);
    }

    function* foo() {
        var x = yield  3;
        var y = x.toUpperCase();
        yield  y;
    }

    var it = foo();
    it.next();
    try {
        it.next(42);
    } catch (e) {
        console.log(e);
    }

    function* genReturn() {
        yield 1;
        yield 2;
        yield 3;
    }

    var gReturn = genReturn();
    console.log(gReturn.next());
    console.log(gReturn.return("foo"));
    console.log(gReturn.next());

    function* fooRef() {
        yield 'a';
        yield 'b';
    }

    function* barRef() {
        yield 'x';
        yield* fooRef();
        yield 'y';
    }

    for (let v of barRef()) {
        console.log(v);
    }

    function Tree(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
    }

    function* inorder(t) {
        if (t) {
            yield* inorder(t.left);
            yield t.label;
            yield* inorder(t.right);
        }
    };

    function make(array) {
        if (array.length == 1)
            return new Tree(null, array[0], null);
        return new Tree(make(array[0]), array[1], make(array[2]));
    }

    let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

    var result = [];
    for (let node of inorder(tree)) {
        result.push(node);
    }
    console.log([...result]);


    function* gIterator() {

    }

    gIterator.prototype.hello = function () {
        return 'hi';
    }

    let objIterator = gIterator();
    console.log(objIterator instanceof gIterator);
    console.log(objIterator.hello());

    function* genF() {
        this.a = 1;
        yield this.b = 2;
        yield  this.c = 3;
    }

    function F() {
        return genF.call(genF.prototype);
    }

    var f = new F();
    f.next()
    console.log(f.a);

    var clock = function* () {
        while (true) {
            console.log("Tick!");
            yield;
            console.log("Tock!");
            yield;
        }
    }

    var clockF = clock();
    clockF.next();
    clockF.next();

    //var fs = require('fs');
    var readFile = function (fileName) {
        return new Promise(function (resolve, reject) {
            // fs.readFile(fileName, function(error, data) {
            //     if (error) return reject(error);
            //     resolve(data);
            // });
            resolve(fileName);
        });
    };
    var gen = function* () {
        var f1 = yield readFile('./Js/posts.json');
        var f2 = yield readFile('./Js/2.json');
        console.log(f1.toString());
        console.log(f2.toString());
    };
    // var co = require('co');
    // co(gen);
})
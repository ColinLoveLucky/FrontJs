$(function () {
    var s1 = Symbol("foo");
    console.log(s1.toString());

    var a = {};
    var mySymbol = Symbol();
    a[mySymbol] = "Hello";
    console.log(a[mySymbol]);
    let s = Symbol();
    var b = {
        [s]: function (arg) {
            console.log(arg);
        }
    };

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

    console.log(getArea(shapeType.triangle, {width: 100, height: 200}));

    var objSymbol = {};
    var aSy = Symbol("a");
    var bSy = Symbol("b");
    objSymbol[aSy] = 'Hello';
    objSymbol[bSy] = 'World';
    var objectSymbols = Object.getOwnPropertySymbols(objSymbol);
    console.log(objectSymbols);

    let objOwnKey = {
        [Symbol('my_key')]: 1,
        enum: 2,
        nonEnum: 3
    };
    console.log(Reflect.ownKeys(objOwnKey));

    var s11 = Symbol.for("foo");
    var s12 = Symbol.for("foo");
    console.log(Object.is(s11, s12));

    console.log(Symbol.keyFor(s11));

    class MyClass {
        [Symbol.hasInstance](foo) {
            return foo instanceof Array;
        }
    }

    console.log([1, 2] instanceof new MyClass());

    let objConcat = {length: 2, 0: "c", 1: "d"};
    objConcat[Symbol.isConcatSpreadable] = true;
    console.log(['a', 'b'].concat(objConcat, 'e'));

    class MyArray extends Array {
        static get [Symbol.species]() {
            return Array;
        }
    };

    var a = new MyArray(1, 2, 3);
    var mapped = a.map(x => x * x);

    console.log(mapped instanceof Array);

    class MyMatcher {
        [Symbol.match](string) {
            return 'hello world'.indexOf(string);
        }
    }

    console.log('e'.match(new MyMatcher()));

    const xReplace = {};
    xReplace[Symbol.replace] = (...s) => console.log(s);
    console.log('Hello'.replace(xReplace,'world'));

   
})
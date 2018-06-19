$(function () {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return `this.x:${this.x} this.y${this.y}`;
        }
    }

    var p = new Point(1, 2);
    console.log(p.toString());

    class Foo {
        constructor() {
            return Object.create(null);
        }
    }

    function FooConstructor() {
        this.name = 'zhangsan';
    }

    //  console.log(new FooConstructor().constructor);
    console.log(Object.constructor instanceof Object);
    console.log(FooConstructor.constructor instanceof Object);
    console.log(Object);
    console.log(new FooConstructor());
    console.log(FooConstructor.prototype === new FooConstructor().__proto__);

    class Widget {
        foo(baz) {
            bar.call(this, baz);
        }
    }

    function bar(baz) {
        return this.snag = baz;
    }

    const barSymbol = Symbol('bar');
    const snafSymbol = Symbol("snaf");

    class myCLass {
        foo(baz) {
            this[barSymbol](baz);
        }

        [barSymbol](baz) {
            return this[snafSymbol] = baz;
        }
    }

    class StaticFoo {
        static classMethod() {
            return "hello";
        }

        static bar() {
            this.baz();
        }

        static baz() {
            console.log('hello static');
        }
    }

    console.log(StaticFoo.classMethod());
    console.log(StaticFoo.bar());

    class FooA {
        static classMethod() {
            return "Hello FooA";
        }
    }

    class BarB extends FooA {
        static classMethod() {
            return super.classMethod() + ",too";
        }
    }

    console.log(BarB.classMethod());

    class FooStaticPro {
    }

    FooStaticPro.A = "hello";
    console.log(FooStaticPro.A);

    class AT {
        constructor() {
            console.log("hello AT");
        }
    };

    new AT();

    function PersonAB(name) {
        if (new.target !== undefined) {
            this.name = name;
        } else
            throw  new Error("must use new initalize");
    }

    var personA = new PersonAB("zhangsan");

    // var notAPerson = PersonAB.call(personA, "lisi");

    class Shape {
        constructor() {
            if (new.target === Shape)
                throw new Error("not intalize");
        }
    }

    class Rectangle extends Shape {
        constructor(length, width) {
            super();
        }
    }

    // var x=new Shape();
    var y = new Rectangle(10, 20);

    class PointAB {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return `this.x:${this.x},this.y:${this.y}`;
        }
    }

    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y);
            this.color = color;
        }

        toString() {
            return `this.color:${this.color} ` + super.toString();
        }
    }

    var colorPoint = new ColorPoint(10, 20, "green");

    console.log(colorPoint.toString());

    console.log(Object.getPrototypeOf(ColorPoint) === Point);

    class ABC {
    }

    ABC.prototype.x = 2;

    class D extends ABC {
        constructor() {
            super();
            console.log(super.x);
        }
    }

    console.log(new D());

    class AC {

    }

    class ACB extends AC {

    }

    console.log(AC.prototype);
    console.log(ACB.prototype);
    console.log(typeof AC);
    var adder = new Function("a", "b", "return a+b");
    console.log(adder);
    console.log(typeof adder);
    console.log(typeof  Function)
    console.log(adder.prototype);
    console.log(adder.__proto__);


})
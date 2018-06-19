$(function () {

    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();
    console.log(iter.next().value);

    class RangeIterator {
        constructor(start, stop) {
            this.value = start;
            this.stop = stop;
        }

        [Symbol.iterator]() {
            return this
        }

        next() {
            var value = this.value;
            if (value < this.stop) {
                this.value++;
                return {done: false, value: value};
            }
            return {done: true, value: undefined};
        }
    }

    function range(start, stop) {
        return new RangeIterator(start, stop);
    }

    for (var value of range(0, 3)) {
        console.log(value);
    }

    function Obj(value) {
        this.value = value;
        this.next = null;
    }

    Obj.prototype[Symbol.iterator] = function () {
        var iterator = {next: next};
        var current = this;

        function next() {
            if (current) {
                var value = current.value;
                current = current.next;
                return {done: false, value: value}
            }
            else {
                return {done: true};
            }
        }

        return iterator;
    }

    var one = new Obj(1);
    var two = new Obj(2);
    var three = new Obj(3);

    one.next = two;
    two.next = three;
    for (var i of one) {
        console.log(i);
    }

    let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };
    for (let item of iterable) {
        console.log(item);
    }

    var someString = "hi";
    var iteratorString = someString[Symbol.iterator]();
    console.log(iteratorString.next());

    function readlinesSync(file) {
        return {
            next() {
                return {done: false};
            },
            return() {
                return {done: true}
            }
        }
    }
})
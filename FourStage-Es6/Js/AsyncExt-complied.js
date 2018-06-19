'use strict';

$(function () {
    var readFile = function readFile(fileName) {
        return new Promise(function (resolve, reject) {
            resolve(fileName);
        });
    };
    var asyncReadFile = async function asyncReadFile() {
        var f1 = await readFile('./Js/2.json');
        var f2 = await readFile('./Js/3.json');
        console.log(f1.toString());
        console.log(f2.toString());
    };
    asyncReadFile();

    function timeout(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
    }

    asyncPrint('Hello World', 1000);

    async function f() {
        return 'hello world';
    }

    f().then(function (v) {
        return console.log(v);
    });

    async function fw() {
        await Promise.reject('mistake');
    }

    fw().then(function (v) {
        return console.log(v);
    }).catch(function (e) {
        return console.log(e);
    });

    var getFoo = function getFoo() {
        console.log('foo');
    };
    var getBar = function getBar() {
        console.log('bar');
    };
});

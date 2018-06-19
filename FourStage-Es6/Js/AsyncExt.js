$(function () {
    var readFile = function (fileName) {
        return new Promise(function (resolve, reject) {
            resolve(fileName);
        })
    }
    var asyncReadFile = async function () {
        var f1 = await readFile('./Js/2.json');
        var f2 = await  readFile('./Js/3.json');
        console.log(f1.toString());
        console.log(f2.toString());
    };
    asyncReadFile();

    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }

    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
    }

    asyncPrint('Hello World', 1000);

    async function f() {
        return 'hello world';
    }

    f().then(v => console.log(v));

    async function fw() {
        await Promise.reject('mistake');
    }

    fw().then(v => console.log(v)).catch(e => console.log(e));

    var getFoo=function () {
        console.log('foo');
    }
    var getBar=function () {
        console.log('bar');
    }
    

})
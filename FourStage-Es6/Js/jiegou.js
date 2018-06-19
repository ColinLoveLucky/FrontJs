$(function () {
    var someArray = [1, 2, 3];
    var [first, second, third] = someArray;
    console.log("jieGou:" + first);
    var [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log("jieGou:" + bar);
    var robotA = {name: "bender"};
    var robotB = {name: "Flexo"};
    var {name: nameA} = robotA;
    var {name: nameB} = robotB;
    console.log(nameA);
    console.log(nameB);
    var {foo, bar} = {foo: "lorem", bar: "ipsum"};
    console.log(foo);
    var complicatedObj = {
        arrayPro: [
            "Zapp",
            {second: "Brannigan"}
        ]
    };

    var {arrayPro: [first, {second}]} = complicatedObj;

    console.log(first);
    console.log(second);

    var [Missing = true] = [];
    console.log(Missing);

    var {message: msg = "Something went wrong"} = {};
    console.log(msg);

    function returnMultiValues() {
        return [1, 2];
    }

    var [foo, bar] = returnMultiValues();
    console.log(foo);

    var map = new Map();
    map.set("first", "hello");
    map.set("second", "world");
    for (let [key, value] of map) {
        console.log(key + " is "+ value);
    }
})

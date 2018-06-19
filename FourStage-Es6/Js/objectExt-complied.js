"use strict";

$(function () {
    var target = { a: 1 };
    var source1 = { b: 2 };
    var source2 = { c: 3 };
    Object.assign(target, source1, source2);
    console.log(target);

    var proto = {};
    var obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);
    proto.y = 20;
    proto.z = 40;
    console.log(obj.x, obj.y, obj.z);
});

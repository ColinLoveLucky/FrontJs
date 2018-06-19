"use strict";

$(function () {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a[i] = function () {
            return i;
        };
    }
    ;

    var aValue = a[6]();
    var bLet = [];

    var _loop = function _loop(j) {
        bLet[j] = function () {
            return j;
        };
    };

    for (var j = 0; j < 10; j++) {
        _loop(j);
    }
    var bValue = bLet[6]();
    $("#divLet").html("<h1>VarValue:" + aValue + " bLeftValue:" + bValue + "</h1>");
});

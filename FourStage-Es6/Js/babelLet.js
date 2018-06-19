$(function () {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a[i] = function () {
            return i;
        }
    }
    ;

    var aValue = a[6]();
    var bLet = [];
    for (let j = 0; j < 10; j++) {
        bLet[j] = function () {
            return j;
        }
    }
    var bValue = bLet[6]();
    $("#divLet").html("<h1>VarValue:" + aValue + " bLeftValue:" + bValue +"</h1>");
})
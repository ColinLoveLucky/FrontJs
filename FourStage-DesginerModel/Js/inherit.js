$(function () {
    function SuperClass() {
        this.books = ["JavaScript", "html", "css"];
    }

    function SubClass() {

    }

    SubClass.prototype = new SuperClass();

    //上面的这种类继承方式缺点很明显

    function SuperClass2(id) {
        this.books = ["JavaScript", "html", "css"];
        this.id = id;
    }

    SuperClass.prototype.showBooks = function () {
        console.log(this.books);
    }

    function SubClass2(id) {
        SubClass2.call(this, id)
    }

    SubClass2.prototype = new SuperClass2();

    //组合式继承

    function inheritObject(o) {
        function F() {
        };
        F.prototype = o;
        return new F();
    }

    var book3 = {
        name: "jsBooks",
        alikeBook: ["css Book"]
    }
    var newBook = inheritObject(book3);
    newBook.name = "ajaxBook";
    newBook.alikeBook.push("xml Book");
    console.log(newBook.name);
    console.log(newBook.alikeBook.join(","));
    var otherBook = inheritObject(book3);
    console.log(otherBook.name);
    console.log(otherBook.alikeBook.join(','));

    //原型方式继承，属性被赋值，但是引用类型指向同一地址互相影响

    function inheritPrototype(subClass, superClass) {
        var F = function () {
        };
        F.prototype = superClass;
        var o = new F();
        o.constructor = subClass;
        subClass.prototype = o;
    }

    function SuperClass2(name) {
        this.name = name;
        this.colors = ["Red"];
    }

    SuperClass2.prototype.getName = function () {
        console.log(this.name);
    }

    function SubClass2(name, time) {
        SuperClass2.call(this, name);
        this.time = time;
    }

    inheritPrototype(SubClass2, SuperClass2);
    SuperClass2.prototype.getTime = function () {
        console.log(this.time);
    }

    var instance1 = new SubClass2("Js Book", 2015);
    var instance2 = new SubClass2("Css Book", 2017);

    instance1.colors.push("black");
    instance2.colors.push("Yellow");

    console.log(instance1.colors.join(","));
    console.log(instance2.colors.join(","));

    var extend=function (target,source) {
        for(var property in source){
            target[property]=source[property];
        }
        return target;
    }
})

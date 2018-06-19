$(function () {
    var CheckObj = {
        checkName: function () {
            return this;
        },
        checkEmail: function () {
            return this;
        },
        checkPassword: function () {
            return this;
        }
    };
    var CheckObject = function () {
    };
    CheckObject.prototype = {
        checkName: function () {
            return this;
        },
        checkEmail: function () {
            return this;
        },
        checkPassword: function () {
            return this;
        }
    }
    var checkObject = new CheckObject();
    checkObject.checkName().checkEmail().checkPassword();
    Function.prototype.addMethod = function (name, fn) {
        this.prototype[name] = fn;
        return this;
    }
    var methods = function () {
    };
    methods.addMethod('checkName', function () {
        console.log('hello checkName');
        return this;
    }).addMethod("checkEmail", function () {
        console.log('hello checkEmail');
        return this;
    })
    var m = new methods();

    m.checkName().checkEmail();
})
$(function () {

        var Book = function (title) {
            this.title = title
        }
        var book = Book("Javascript");
        console.log(window.title);
        var newBook = function (title, time, type) {
            if (this instanceof newBook) {
                this.title = title;
                this.time = time;
                this.type = type;
            }
            else {
                return new newBook(title, time, type);
            }
        }
        var book2 = newBook('javascript');
        console.log(book2.title);

        var floatValue = 92500 * parseFloat(0.00225);
        console.log(floatValue);
        console.log(floatValue.toFixed(2));
        console.log(floatValue.toFixed(3));

        function decimal(num, v) {
            var vv = Math.pow(10, v);
            return Math.round(num * vv) / vv;
        }

        console.log("208.12499999999997", (208.12499999999997).toFixed(13));
        console.log("12499999999997+1", 12499999999997 + 1);
        // var stValue=floatValue.split('.');
        // if(stValue!=undefined)

        var Fixed = {
            fixLen: function (value) {
                return value != undefined ? value.toString().length : 0;
            },
            getSplitArray: function (value) {
                if (typeof  value == "string") {
                    return value.split('.');
                }
                else
                    return [];
            },
            toFiexd: function (num, digits) {
                if (typeof  num == "number") {
                    var floatValue = num;
                    var valueSplit = this.getSplitArray(num.toString());
                    if (valueSplit.length > 1 && floatValue > 0) {
                        if (valueSplit[1].toString().length < 20) {
                            var fixedLength = this.fixLen(valueSplit[1]);
                            if (fixedLength <= digits) {
                                return floatValue.toFixed(digits);
                            } else {
                                var parseValue = parseFloat(floatValue.toFixed(fixedLength - 1));
                                return this.toFiexd(parseValue, digits);
                            }
                        }
                        else {
                            return floatValue.toFixed(20);
                        }
                    }
                    else
                        return floatValue.toFixed(digits);
                }
                else
                    return num;
            }
        };
        console.log("Fixed:208.12499999999997", Fixed.toFiexd(208.12499999999997, 2));
        console.log("Fixed:208.1243999999999", Fixed.toFiexd(208.1243999999999, 2));
        console.log("Fixed:208.1243999999999", Fixed.toFiexd(208.1243999999999, 2));
        console.log("Fixed:208.1243999999999", Fixed.toFiexd(208.1243999999999, 2));
        console.log("Fixed:208.12491112222", Fixed.toFiexd(208.12491112222, 2));
        console.log("Fixed:208.1249", Fixed.toFiexd(208.1249, 2));
        console.log("Fixed:208.5249", Fixed.toFiexd(208.5249, 2));
        console.log("Fixed:208.5549", Fixed.toFiexd(208.5549, 2));
        console.log("Fixed:208.91", Fixed.toFiexd(208.91, 2));
        console.log("Fixed:1458789258.1223333333", Fixed.toFiexd(1458789258.1223333333, 2));
        console.log("Fixed:1458789258.1263333333", Fixed.toFiexd(1458789258.1263333333, 2));
        console.log("Fixed:1458789258.1223333333", Fixed.toFiexd(1458789258.1223333333, 2));
        console.log("Fixed:208.12499999999997", Fixed.toFiexd(208.12499999999997, 3));
        console.log("Fixed:208.12499999999997", Fixed.toFiexd(208.1244911111, 3));
        console.log("Fixed:208.12499999999997", Fixed.toFiexd(208.1244911111, 0));
        console.log("Fixed:208.91111", Fixed.toFiexd(208.91111, 0));
        console.log("Fixed:208.49111", Fixed.toFiexd(208.49111, 0));
        console.log("Fixed:208.49111", Fixed.toFiexd(208.49111, 4));
        console.log("Fixed:208.49119", Fixed.toFiexd(208.490, 4));
        console.log("Fixed:208", Fixed.toFiexd(208, 4));
        console.log("Fixed:208", Fixed.toFiexd(208, 4));
        console.log("Fixed:208", Fixed.toFiexd("233addf", 4));
    }
)
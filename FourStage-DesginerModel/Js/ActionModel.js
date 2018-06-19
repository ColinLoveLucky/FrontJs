$(function () {

    //Template
    var Alert = function (data) {
        if (!data) {
            return;
        }
        this.content = data.content;
        this.panel = document.createElement("div");
        this.contentNode = document.createElement("p");
        this.confirmBtn = document.createElement("span");
        this.closeBtn = document.createElement("b");
        this.panel.className = 'alert';
        this.closeBtn.className = 'a-close';
        this.confirmBtn.className = 'a-confirm';
        this.confirmBtn.innerHTML = data.confirm || '确认';
        this.contentNode.innerHTML = this.content;
        this.closeBtn.innerHTML = data.close || "关闭";
        this.success = data.success || function () {
        };
        this.fail = data.fail || function () {
        };
    }

    Alert.prototype = {
        init: function () {
            this.panel.appendChild(this.closeBtn);
            this.panel.appendChild(this.contentNode);
            this.panel.appendChild(this.confirmBtn);
            document.body.appendChild(this.panel);
            this.bindEvent();
            this.show();
        },
        bindEvent: function () {
            var me = this;
            this.closeBtn.onclick = function () {
                me.fail();
                me.hide();
            };
            this.confirmBtn.onclick = function () {
                me.success();
                me.hide();
            }
        },
        hide: function () {
            this.panel.style.display = 'none';
        },
        show: function () {
            this.panel.style.display = 'block';
        }
    }

    var TitleAlert = function (data) {
        Alert.call(this, data);
        this.title = data.title;
        this.titleNode = document.createElement('h1');
        this.titleNode.innerHTML = this.title;
    }
    // TitleAlert.prototype = Alert.prototype;
    // TitleAlert.prototype = new Alert();
    var obj = {};
    obj.__proto__ = Alert.prototype;
    obj.__proto__.constructor = Alert;
    Alert.call(obj);
    TitleAlert.prototype = obj;
    TitleAlert.prototype.init = function () {
        this.panel.insertBefore(this.titleNode, this.panel.firstChild);
        Alert.prototype.init.call(this);
    };
    new TitleAlert({
        title: "This is a Title",
        content: 'I Wanna be free!',
        success: function () {
            console.log('ok');
        },
        fail: function () {
            console.log('cancel');
        }
    }).init();

    //Observer

    var Observer = (function () {
        var _message = {};
        return {
            register: function (type, fn) {
                if (typeof  _message[type] === "undefined") {
                    _message[type] = [fn];
                }
                else {
                    _message[type].push(fn);
                }
                return this;
            },
            fire: function (type, args) {
                if (!_message[type]) {
                    return;
                }
                var events = {
                    type: type,
                    args: args || {}
                };
                var i = 0, len = _message[type].length;
                for (; i < len; i++) {
                    _message[type][i].call(this, events);
                }
            },
            remove: function (type, fn) {
                if (_message[type] instanceof Array) {
                    var i = _message[type].length - 1;
                    for (; i >= 0; i--) {
                        _message[type][i] === fn && _message[type].splice(i, 1);
                    }
                }
            }
        }
    })();
    Observer.register('test', function (e) {
        console.log(e.type, e.args.msg);
    });
    Observer.fire('test', {msg: 'args transform'});
    (function () {
        function addMsgItem(e) {
            var text = e.args.text,
                ul = document.getElementById("msg"),
                li = document.createElement('li'),
                span = document.createElement('span');
            span.innerHTML = "删除评论";
            span.style.color = 'Red';
            li.innerHTML = text;
            span.onclick = function () {
                ul.removeChild(li);
                Observer.fire('removeCommentMessage', {
                    num: -1
                });
            }
            li.appendChild(span);
            ul.appendChild(li);
        }

        Observer.register("addCommentMessage", addMsgItem);
    })();
    (function () {
        function changeMsgNum(e) {
            var num = e.args.num;

            $('#msg_num').html(parseInt($("#msg_num").html()) + num);
        }

        Observer.register('addCommentMessage', changeMsgNum).register('removeCommentMessage', changeMsgNum)
    })();
    (function () {
        $("#user_submit").click(function () {
            var text = $("#user_input");
            if (text.val() === "") {
                return;
            }
            ;
            Observer.fire("addCommentMessage", {
                text: text.val(),
                num: 1
            });
            text.val("");
        })
    })();

    //State

    var MarrryState = function () {
        var _cuurentState = {},
            states = {
                jump: function () {
                    console.log("jump");
                },
                move: function () {
                    console.log("move");
                },
                shoot: function () {
                    console.log("shoot");
                },
                squat: function () {
                    console.log("squat");
                }
            };

        var Action = {
            changeState: function () {
                var arg = arguments;
                _cuurentState = {};
                if (arg.length) {
                    for (var i = 0, len = arg.length; i < len; i++) {
                        _cuurentState[arg[i]] = true;
                    }
                }
                return this;
            },
            goes: function () {
                console.log("touch action");
                for (var i in _cuurentState) {
                    states[i] && states[i]();
                }
                return this;
            }
        }
        return {
            change: Action.changeState,
            goes: Action.goes
        }
    }

    MarrryState().change('jump', 'shoot').goes().goes();

    //strategy

    var PirceStrategy = function () {
        var strategy = {
            return30: function (price) {
                return price + (parseInt(price) / 100) * 30;
            },
            return50: function (price) {

                return parseFloat(price) + (parseFloat(price) / 100) * 50;
            },
            percent90: function (price) {
                return price * 100 * 90 / 10000;
            },
            percent80: function (price) {
                return price * 100 * 80 / 10000;
            },
            percent50: function (price) {
                return price * 100 % 50 / 10000;
            }
        };
        return function (alogrithm, price) {
            return strategy[alogrithm] && strategy[alogrithm](price);
        }
    }();
    var price = PirceStrategy('return50', '314.67');
    ;
    console.log(price)

    var inputStrategy = function () {
        var strategy = {
            notNull: function (value) {
                return /\s+/.test(value) ? '请输入内容' : "";
            },
            number: function (value) {
                return /^[0-9]+(\.[0-9]+)?$/.test(value) ? "" : "请输入数字";
            }
        }
        return {
            check: function (type, value) {
                value = value.replace(/^s+|\s+$/g, '');
                return strategy[type] ? strategy[type](value) : "没有策略";
            },
            addStrategy: function (type, fn) {
                strategy[type] = fn;
            }
        }
    }();

    $("#txtNum").click(function () {
        $("#validateSpan").html(inputStrategy.check('number', $(this).val()));
    })

    //chain of Responsibility

    var sendData = function (data, dealType, dom) {
        var xhr = new XMLHttpRequest();
        var url = '1.json';
        xhr.onload = function (event) {
            if ((xhr.status >= 200 && xhr.status < 300) ||
                xhr.status == 304) {
                dealData(xhr.responseText, dealType, dom);
            } else {
                console.log("failure");
            }
        }
        for (var i in data) {
            url += '&' + i + '=' + data[i];
        }
        xhr.open('get', url, true);
        xhr.send(null);
    }

    var dealData = function (data, dealType, dom) {
        var dataType = Object.prototype.toString.call(data);
        switch (dealType) {
            case 'sug':
                if (dataType === "[object Array]") {
                    return createSug(data, dom);
                }
                if (dataType === "[object Object") {
                    var newData = [];
                    for (var i in data) {
                        newData.push(data[i]);
                    }
                    return createSug(newData, dom);
                }
                return createSug([data], dom);
                break;
            case "validate":
                return createValidateResult(data, dom);
                break;
        }
    }

    var createSug = function (data, dom) {
        var i = 0, len = data.length, html = "";
        for (; i < len; i++) {
            html += '<li>' + data[i] + "</li>";
        }
        dom.parentNode.getElementsByTagName("ul")[0].innerHTML = html;
    }

    var createValidateResult = function (data, dom) {
        dom.parentNode.getElementsByName('span')[0].innerHTML = data;
    }

    //command

    var viewCommand = (function () {
        var Action = {
            create: function () {

            },
            display: function () {

            }
        }
        return function execute() {

        }
    })();

    //Vistor

    var Visitor = (function () {
        return {
            splice: function () {
                var args = Array.prototype.splice.call(arguments, 1);
                return Array.prototype.splice.apply(arguments[0], args);
            },
            push: function () {
                var len = arguments[0].length || 0;
                var args = this.splice(arguments, 1);
                arguments[0].length = len + arguments.length - 1;
                return Array.prototype.push.apply(arguments[0], args);
            },
            pop: function () {
                return Array.prototype.pop.apply(arguments[0]);
            }
        }
    })();

    //Mediator

    //Memento
    var Page = function () {
        var cache = {};
        var data = [];
        return function (page, fn) {
            if (cache[page]) {
                showPage(page, cache[page]);
                fn && fn();
            } else {
                showPage(page,data);
                cache[page]=data;
                fn&&fn();
            }
        }
    }

    //Iterator

    //Interpreter



});
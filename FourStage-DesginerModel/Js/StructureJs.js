$(function () {
    ///Facade
    function addEvent(dom, type, fn) {
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
            console.log('addEventListener');
        }
        else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn);
            console.log('attachEvent');
        } else {
            dom['on' + type] = fn;
            console.log('dom ');
        }
    };

    var myInput = document.getElementById('myinput');
    addEvent(myInput, 'click', function () {
        console.log('绑定第一个事件');
    })

    var getEvent = function (event) {
        return event || window.event;
    }

    var getTarget = function (event) {
        var event = getEvent(event);
        return event.target || event.srcElement;
    }

    var preventDefault = function (event) {
        var event = getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else
            event.returnValue = false;
    }

    //adapter

    function doSomething(obj) {
        var _adpater = {
            name: 'colin',
            title: 'designer model',
            age: 24,
            color: 'pink',
            size: 100,
            price: 50
        };

        for (var i in _adpater) {
            _adpater [i] = obj[i] || _adpater[i];
        }
    }

    var arr = ["javascript", "book", "UI Language", "8 month"];

    function arrToObjAdapter(arr) {
        return {
            name: arr[0],
            type: arr[1],
            title: arr[2],
            data: arr[3]
        }
    }

    var adapterData = arrToObjAdapter(arr);
    console.log(adapterData.name);

    var Count = (function () {
        var _img = new Image();
        return function (param) {
            var str = 'http://www.count.com/a.gif?';
            for (var i in param) {
                str += i += '=' + param[i];
            }
        }
        _img.src = str;
    })();


    ///proxy
    var myImage = (function () {
        var imgNode = $("img");
        return {
            setSrc: function (srcs) {
                for (var i = 0; i < imgNode.length; i++) {
                    imgNode[i].src = srcs[i];
                }
            }
        }
    })();

    var proxyImage = (function () {
        var img = new Image();
        var source = [];
        img.onload = function () {
            console.log("loading complete");
            myImage.setSrc(source);
        }
        return {
            setSrc: function () {
                myImage.setSrc(["loading.gif", "loading.gif", "loading.gif"]);
                for (var i = 0; i < arguments.length; i++) {
                    img.src = arguments[i];
                    source.push(arguments[i]);
                }
            }
        }
    })();

    proxyImage.setSrc('http://7xsb8q.com1.z0.glb.clouddn.com/css1.JPG', 'http://7xsb8q.com1.z0.glb.clouddn.com/css2.JPG', 'http://7xsb8q.com1.z0.glb.clouddn.com/css3.JPG');

    ///Decorator
    var decorator = function (input, fn) {
        $("#" + input).bind("click", fn);
    }

    decorator("txtTel", function () {
        alert("我添加了装饰模式电话15821401958");
    })
    decorator("txtPassword", function () {
        alert("我添加了装饰模式密码99999");
    })

    //birdge

    function changeColor(dom, color, bg) {
        $("#" + dom).css({
            'color': color,
            'background-color': bg
        });
    }

    $('#spanA').bind("mouseout", function () {
        changeColor(this.id, 'red', "#ddd")
    }).bind("mousemove", function () {
        changeColor(this.id, 'Yellow', "#e0e0e0")
    });

    function Speed(x, y) {
        this.x = x;
        this.y = y;
    }

    Speed.prototype.run = function () {
        console.log("Go Run");
    }

    function Color(cl) {
        this.color = cl;
    }

    Color.prototype.draw = function () {
        console.log("Drwa Color");
    }

    function Shape(sp) {
        this.shape = sp;
    }

    Shape.prototype.change = function () {
        console.log("change shape");
    }

    function Speek(wd) {
        this.word = wd;
    }

    Speek.prototype.say = function () {
        console.log("writing");
    }

    function Ball(x, y, c) {
        this.speed = new Speed(x, y);
        this.color = new Color(c);
    }

    Ball.prototype.init = function () {
        this.speed.run();
        this.color.draw();
    }

    function People(x, y, f) {
        this.speed = new Speed(x, y);
        this.font = new Speek(f);
    }

    People.prototype.init = function () {
        this.speed.run();
        this.font.say();
    }

    function Spirite(x, y, c, s) {
        this.speed = new Speed(x, y);
        this.color = new Color(c);
        this.shape = new Shape(s);
    }

    Spirite.prototype.init = function () {
        this.speed.run();
        this.color.draw();
        this.shape.change();
    }

    var p = new People(10, 12, 16);
    p.init();

    //Composite

    function inheritPrototype(subClass, superClass) {
        var F = function () {
        };
        F.prototype = superClass;
        var o = new F();
        o.constructor = subClass;
        subClass.prototype = o;
    }


    var News = function () {
        this.chiildren = [];
        this.element = null;
    }
    News.prototype = {
        init: function () {
            throw new Error("overwrite you method");
        },
        add: function () {
            throw new Error("overwrite you method");
        },
        getElement: function () {
            throw new Error("overwrite you method");
        }
    };
    var Container = function (id, parent) {
        News.call(this);
        this.id = id;
        this.parent = parent;
        this.init();
    }
    inheritPrototype(Container, News);
    Container.prototype.init = function () {
        this.element = document.createElement('ul');
        this.element.id = this.id;
        this.element.className = 'new-container';
    }
    Container.prototype.add = function (child) {
        this.chiildren.push(child);
        this.element.appendChild(child.getElement());
        return this;
    }
    Container.prototype.getElement = function () {
        return this.element;
    }
    Container.prototype.show = function () {
        this.parent.appendChild(this.element);
    }

    var Item = function (classname) {
        News.call(this);
        this.classname = classname || "";
        this.init();
    }
    inheritPrototype(Item, News);
    Item.prototype.init = function () {
        this.element = document.createElement("li");
        this.element.className = this.classname;
    }
    Item.prototype.add = function (child) {
        this.chiildren.push(child);
        this.element.appendChild(child.getElement());
        return this;
    }
    Item.prototype.getElement = function () {
        return this.element;
    }

    var NewsGroup = function (classname) {
        News.call(this);
        this.classname = classname || "";
        this.init();
    }
    inheritPrototype(NewsGroup, News);
    NewsGroup.prototype.init = function () {
        this.element = document.createElement("div");
        this.element.className = this.classname;
    }
    NewsGroup.prototype.add = function (child) {
        this.chiildren.push(child);
        this.element.appendChild(child.getElement());
        return this;
    }
    NewsGroup.prototype.getElement = function () {
        return this.element;
    }

    var ImagesNews = function (url, href, classname) {
        News.call(this);
        this.url = url || "";
        this.href = href || "#";
        this.classname = classname || 'normal';
        this.init();
    }
    inheritPrototype(ImagesNews, News);
    ImagesNews.prototype.init = function () {
        this.element = document.createElement("a");
        var img = new Image();
        img.src = this.url;
        this.element.appendChild(img);
        this.element.className = 'image-news ' + this.classname;
        this.element.href = this.href;
    }
    ImagesNews.prototype.add = function () {
    }
    ImagesNews.prototype.getElement = function () {
        return this.element;
    }

    var IconNews = function (text, href, type) {
        News.call(this);
        this.text = text || "";
        this.href = href || "#";
        this.type = type || 'video';
        this.init();
    }
    inheritPrototype(IconNews, News);
    IconNews.prototype.init = function () {
        this.element = document.createElement("a");
        this.element.innerHTML = this.text;
        this.element.href = this.href;
        this.element.className = 'icon ' + this.type;
    }
    IconNews.prototype.add = function () {
    }
    IconNews.prototype.getElement = function () {
        return this.element;
    }

    var EasyNews = function (text, href) {
        News.call(this);
        this.text = text || '';
        this.href = href || '#';
        this.init();
    }
    inheritPrototype(EasyNews, News);
    EasyNews.prototype.init = function () {
        this.element = document.createElement("a");
        this.element.innerHTML = this.text;
        this.element.href = this.href;
        this.element.className = 'text';
    }
    EasyNews.prototype.add = function () {
    }
    EasyNews.prototype.getElement = function () {
        return this.element;
    }

    var TypeNews = function (text, href, type, pos) {
        News.call(this);
        this.text = text || "";
        this.href = href || '#';
        this.type = type || "";
        this.pos = pos || 'left';
        this.init();
    }
    inheritPrototype(TypeNews, News);
    TypeNews.prototype.init = function () {
        this.element = document.createElement("a");
        if (this.pos === 'left') {
            this.element.innerHTML = '[' + this.type + ']' + this.text;
        }
        else {
            this.element.innerHTML = this.text + '[' + this.type + ']';
        }
        this.element.href = this.href;
        this.element.className = 'text';
    }
    TypeNews.prototype.add = function () {
    }
    TypeNews.prototype.getElement = function () {
        return this.element;
    }

    var news1 = new Container('news', document.body);
    news1.add(new Item('normal').add(
        new IconNews('梅西不拿金球奖也伟大', '#', 'video')
    )).add(new Item('normal').add(
        new IconNews('保护国加强队用意明显', '#', 'live')
    )).add(
        new Item("normal").add(
            new NewsGroup('has-img').add(
                new ImagesNews('1.jpg', '#', 'small')
            ).add(
                new EasyNews('从240斤胖子变成型男', '#')
            ).add(
                new EasyNews('五大雷人跑步机', '#')
            )
        )
    ).add(
        new Item('normal').add(
            new TypeNews('AK47 不愿为费城打球', '#', 'NBA', 'left')
        )
    ).add(
        new Item('normal').add(
            new TypeNews('火炮飙6三分创新高', '#', 'CBA', 'right')
        )
    ).show();


    //FlyWeight

    var Flyweight = (function () {
        var created = [];

        function create() {
            var dom = document.createElement('div');
            document.getElementById('container').appendChild(dom);
            created.push(dom);
            return dom;
        }

        return {
            getDiv: function () {
                if (created.length < 5) {
                    return create();
                } else {
                    var div = created.shift();
                    created.push(div);
                    return div;
                }
            }
        }
    })();

    var article = ["第1条新闻", "第2条新闻",
        "第3条新闻", "第4条新闻", "第5条新闻", "第6条新闻", "第7条新闻"
        , "第8条新闻", "第9条新闻", "第10条新闻", "第11条新闻"];
    var paper = 0, num = 5, len = article.length;
    for (var i = 0; i < 5; i++) {
        if (article[i]) {
            Flyweight.getDiv().innerHTML = article[i];
        }
    }

    $("#next_page").click(function () {
        if (article.length < 5)
            return;
        var n = ++paper * num % len, j = 0;
        for (; j < 5; j++) {
            if (article[n + j]) {
                Flyweight.getDiv().innerHTML = article[n + j];
            } else if (article[n + j - len]) {
                Flyweight.getDiv().innerHTML = [n + j - len];
            }
            else
                Flyweight.getDiv().innerHTML = "";
        }
    });
});


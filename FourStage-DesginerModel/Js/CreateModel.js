$(function () {

    //简单工厂
    var Basketball = function () {
        this.intro = "from in america";
    }
    Basketball.prototype = {
        getMember: function () {
            console.log("five person part in");
        },
        getBallSize: function () {
            console.log("is Bigger");
        }
    }
    var FootBall = function () {
        this.intro = "from all over the world";
    }
    FootBall.prototype = {
        getMember: function () {
            console.log("eleven person part in ");
        },
        getBallSize: function () {
            console.log("is Bigger");
        }
    }
    var SportsFactory = function (name) {
        switch (name) {
            case "NBA":
                return new Basketball();
            case "FootBall":
                return new FootBall();
        }
    }
    var sports = new SportsFactory("NBA");
    console.log(sports.intro);

    //Builder

    var Human = function (param) {
        this.skill = param && param.skill || "Security";
        this.hobby = param && param.hobby || "Security";
    }
    Human.prototype = {
        getSkill: function () {
            return this.skill;
        },
        getHobby: function () {
            return this.hobby;
        }
    }

    var Named = function (name) {
        var that = this;
        (function (name, that) {
            that.wholeName = name;
            if (name.indexOf(' ') > -1) {
                that.firstName = name.slice(0, name.indexOf(' '));
                that.secondName = name.slice(name.indexOf(" "));
            }
        })(name, that);
    }

    var Work = function (work) {
        var that = this;
        (function (work, that) {
            switch (work) {
                case "code":
                    that.work = 'Enginerr';
                    that.workDescript = "deep in program";
                    break;
                case "UI":
                case "UE":
                    that.work = "Desginer";
                    that.workDescript = "Design is a skill";
                    break;
                case "Teach":
                    that.work = "Teacher";
                    that.workDescript = "Teacher is happy";
                    break;
                default:
                    that.work = work;
                    that.workDescript = "sorry,no adapt work to you";
                    break;
            }
        })(work, that);
    }

    Work.prototype.changeWork = function (work) {
        this.work = work;
    }
    Work.prototype.changeDescript = function (sentence) {
        this.workDescript = sentence;
    }

    var Person = function (name, work) {
        var _person = new Human();
        _person.name = new Named(name);
        _person.work = new Work(work);
        return _person;
    };

    var person = new Person('xiao ming', 'code');
    console.log(person.skill);
    console.log(person.name.firstName);
    console.log(person.work.work);
    console.log(person.work.workDescript);
    person.work.changeDescript("更改一下职位描述");
    console.log(person.work.workDescript);
    var LoopImages = function (imgArr, container) {
        this.images = imgArr;
        this.container = container;
        // this.createImage = function () {
        // };
        // this.changeImage = function () {
        // }
    }
    LoopImages.prototype = {
        createImage: function () {
            console.log("LoopImages createTmage function");
        },
        changeImage: function () {
            console.log("LoopImages changeImage function");
        }
    }
    var SlideLoopImg = function (imgArr, container) {
        LoopImages.call(this, imgArr, container);
        // this.changeImage = function () {
        //     console.log('SlideLoopImg changeImage Function');
        // }
    }
    SlideLoopImg.prototype = new LoopImages();
    SlideLoopImg.prototype.changeImage = function () {
        console.log('SlideLoopImg changeImage Function');
    }
    var FadeLoopImg = function (imgArr, container, arrow) {
        LoopImages.call(this, imgArr, container);
        this.arrow = arrow;
        // this.changeImage = function () {
        //     console.log("FadeLoopImg changeImage function");
        // }
    }
    FadeLoopImg.prototype = new LoopImages();
    FadeLoopImg.prototype.changeImage = function () {
        console.log("FadeLoopImg changeImage function");
    }
    var fadeImg = new FadeLoopImg(['001.jpg', '002.jpg', '003.jpg'], 'slide',
        ['left.jpg', 'right.jpg']);
    fadeImg.changeImage();

    function prototypeExtend() {
        var F = function () {
        }, args = arguments, i = 0, len = args.length;
        for (; i < len; i++) {
            for (var j in args[i]) {
                F.prototype[j] = args[i][j];
            }
        }
        return new F();
    }

    var pengiun = prototypeExtend({
        speed: 20,
        swim: function () {
            console.log('swin speed ' + this.speed);
        }
    }, {
        run: function (speed) {
            console.log('run speed ' + speed);
        }
    }, {
        jump: function () {
            console.log("jump");
        }
    });
    pengiun.swim();
    pengiun.run(100);
    pengiun.jump();
    var Conf = (function () {
        var conf = {
            MAX_NUM: 100,
            MIN_NUM: 1,
            COUNT: 100
        }
        return {
            get: function (name) {
                return conf[name] ? conf[name] : null;
            }
        }
    })();
    var count = Conf.get('COUNT');
    console.log(count);

    var LazySingle = (function () {
        var _instance = null;

        function Single() {
            return {
                publlicMethod: function () {
                },
                publicProperty: "1.0"
            }
        }

        return function () {
            if (!_instance) {
                _instance = Single();
            }
            return _instance;
        }
    })();

    console.log(LazySingle().publicProperty);

})
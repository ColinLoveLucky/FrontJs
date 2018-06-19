$(function () {
    var MVC = MVC || {};
    MVC.model = function () {
        var M = {};
        M.data = {};
        M.conf = {};
        return {
            getData: function (m) {
                return M.data[m];
            },
            getConf: function (c) {
                return M.conf[c];
            },
            setData: function (m, v) {
                M.data[m] = v;
                return this;
            },
            setConf: function (c, v) {
                M.conf[c] = v;
                return this;
            }
        }
    }();
    MVC.view = function () {
        var M = MVC.model;
        var V = {};
        return function (v) {
            V[v]();
        }
    }();
    MVC.ctrl = function () {
        var M = MVC.model;
        var V = MVC.view;
        var C = {};
    };

    MVC.model = function () {
        var M = {};
        M.data = {
            slideBar: [
                {
                    text: "萌妹子",
                    icon: 'left_meng.png',
                    title: '千本樱',
                    content: '自古有女友三号',
                    img: 'left_meng_img.png',
                    href: 'http://moe.hao123.com'
                },
                {
                    text: "动漫",
                    icon: 'left_meng.png',
                    title: '千本樱',
                    content: '自古有女友三号',
                    img: 'left_meng_img.png',
                    href: 'http://moe.hao123.com'
                }, {
                    text: "直播",
                    icon: 'left_meng.png',
                    title: '千本樱',
                    content: '自古有女友三号',
                    img: 'left_meng_img.png',
                    href: 'http://moe.hao123.com'
                },
                {
                    text: "热帖",
                    icon: 'left_meng.png',
                    title: '千本樱',
                    content: '自古有女友三号',
                    img: 'left_meng_img.png',
                    href: 'http://moe.hao123.com'
                }
            ]
        };
        M.conf = {
            slideBarCloseAnimate: false
        };
        return {}
    }();

    MVC.view = function () {
        var M = MVC.model;
        var V = {
            createSlideBar: function () {
                var html = '';
                var data = M.getData('slideBar');
                if (!data || !data.length) {
                    return;
                }
                var dom = $.create('div', {
                    'class': 'slidebar',
                    'id': 'slidebar'
                });

                var tpl = {
                    conatiner: ['<div class="slidebar-inner"><ul>{#content}}</ul></div>',
                        '<a hidefocus href="#" class="slidebar-close" title="收起"'].join(""),
                    item: []
                }
            }

        }
        return function (v) {
            V[v]();
        }
    }();
    MVC.ctrl = function () {
        var V = MVC.view;
        var M = MVC.model;
        var C = {
            initSlideBar: function () {
                V('createSlideBar');
                $('li', 'slidebar').on('mouseover', function (e) {
                    $(this).addClass('show');
                }).on('mouseout', function (e) {
                    $(this).removeClass('show');
                })
            }
        }
        C.initSlideBar();
    }();
})
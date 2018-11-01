$(document).ready(function () {

    //this.states = [
    //            { '&zIndex': 1, width: 200, height: 200, top: 71, left: 134, $opacity: 0.5 },
    //            { '&zIndex': 2, width: 130, height: 170, top: 61, left: 0, $opacity: 0.6 },
    //            { '&zIndex': 3, width: 170, height: 218, top: 37, left: 110, $opacity: 0.7 },
    //            { '&zIndex': 4, width: 224, height: 288, top: 0, left: 262, $opacity: 1 },
    //            { '&zIndex': 3, width: 170, height: 218, top: 37, left: 468, $opacity: 0.7 },
    //            { '&zIndex': 2, width: 130, height: 170, top: 61, left: 620, $opacity: 0.6 },
    //            { '&zIndex': 1, width: 120, height: 150, top: 71, left: 496, $opacity: 0.5 }
    //]


    (function ($) {
        // 创建构造函数
        function Slide(ele, options) {
            this.$ele = $(ele)//this. 构造函数的实例对象
            this.options = $.extend({
                speed: 1000,
                delay: 3000
            }, options)//拓展
            this.states = [
                { '&zIndex': 1, width: 400, height: 200, top: 71, left: 134, $opacity: 0.5 },
                { '&zIndex': 2, width: 400, height: 200, top: 61, left: 0, $opacity: 0.6 },
                { '&zIndex': 3, width: 400, height: 200, top: 37, left: 110, $opacity: 0.7 },
                { '&zIndex': 4, width: 400, height: 200, top: 0, left: 262, $opacity: 1 },
                { '&zIndex': 3, width: 400, height: 200, top: 37, left: 468, $opacity: 0.7 },
                { '&zIndex': 2, width: 400, height: 200, top: 61, left: 620, $opacity: 0.6 },
                { '&zIndex': 1, width: 400, height: 200, top: 71, left: 496, $opacity: 0.5 }
            ]
            this.lis = this.$ele.find('li')
            this.interval
            // 点击切换到下一张

            this.$ele.find('section:nth-child(2)').on('click', function () {
                this.stop()
                this.next()
                this.play()
            }.bind(this))
            // 点击切换到上一张
            this.$ele.find('section:nth-child(1)').on('click', function () {
                this.stop()
                this.prev()
                this.play()
            }.bind(this))
            this.move()
            // 让轮播图开始自动播放
            this.play()
        }


        Slide.prototype = {


            // 原型是一个对象，所以写成一个花括号

            // move()方法让轮播图到达states指定的状态
            // <1>当页面打开时将轮播图从中心点展开
            // <2>当轮播图已经展开时，会滚动轮播图(需要翻转states数组中的数据)
            move: function () {

                this.lis.each(function (i, el) {
                    $(el)
                        .css('z-index', this.states[i]['&zIndex'])
                        .finish().animate(this.states[i], this.options.speed)
                        // .stop(true,true).animate(states[i], 1000)
                        .find('img').css('opacity', this.states[i].$opacity)
                }.bind(this))
            },
            // 让轮播图切换到下一张
            next: function () {

                this.states.unshift(this.states.pop())
                this.move()
            },
            // 让轮播图滚动到上一张
            prev: function () {

                this.states.push(this.states.shift())
                this.move()
            },
            play: function () {

                this.interval = setInterval(function () {//这个this指window
                    // setInterval、setTimeOut 中的this指向window

                    // states.unshift(states.pop())       //从后往前走
                    // states.push(states.shift())     //从前往后走
                    this.next()
                }.bind(this), this.options.delay)
            },
            // 停止自动播放
            stop: function () {
                // var _this = this
                clearInterval(this.interval)
            }

        }
        $.fn.zySlide = function (options) {
            this.each(function (i, ele) {
                new Slide(ele, options)
            })
            return this
        }
    })(jQuery);
    //上面是图片轮播
    $('.zy-Slide').zySlide({ speed: 500 })
    .css('border', '0px solid blue');



    //师资团队
    $(".content").hover(function () {
        $(this).children(".txt").stop().animate({ height: "360px" }, 200);
        $(this).find(".txt h3").stop().animate({ paddingTop: "130" }, 550);
        $(this).find(".txt p").stop().show();
    }, function () {
        $(this).children(".txt").stop().animate({ height: "100px" }, 200);
        $(this).find(".txt h3").stop().animate({ paddingTop: "0px" }, 550);
        $(this).find(".txt p").stop().hide();
    });


    //首页动画
    var num = 400;//设置数量
    var w = window.innerWidth;
    var h = window.innerHeight;
    var max = 100;
    var _x = 0;
    var _y = 0;
    var _z = 150;
    var dtr = function (d) {
        return d * Math.PI / 180;
    };

    var rnd = function () {
        return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
    };
    var dist = function (p1, p2, p3) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    };

    var cam = {
        obj: {
            x: _x,
            y: _y,
            z: _z
        },
        dest: {
            x: 0,
            y: 0,
            z: 1
        },
        dist: {
            x: 0,
            y: 0,
            z: 200
        },
        ang: {
            cplane: 0,
            splane: 0,
            ctheta: 0,
            stheta: 0
        },
        zoom: 1,
        disp: {
            x: w / 2,
            y: h / 2,
            z: 0
        },
        upd: function () {
            cam.dist.x = cam.dest.x - cam.obj.x;
            cam.dist.y = cam.dest.y - cam.obj.y;
            cam.dist.z = cam.dest.z - cam.obj.z;
            cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
            cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
            cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
            cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
        }
    };

    var trans = {
        parts: {
            sz: function (p, sz) {
                return {
                    x: p.x * sz.x,
                    y: p.y * sz.y,
                    z: p.z * sz.z
                };
            },
            rot: {
                x: function (p, rot) {
                    return {
                        x: p.x,
                        y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                        z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                    };
                },
                y: function (p, rot) {
                    return {
                        x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                        y: p.y,
                        z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                    };
                },
                z: function (p, rot) {
                    return {
                        x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                        y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                        z: p.z
                    };
                }
            },
            pos: function (p, pos) {
                return {
                    x: p.x + pos.x,
                    y: p.y + pos.y,
                    z: p.z + pos.z
                };
            }
        },
        pov: {
            plane: function (p) {
                return {
                    x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                    y: p.y,
                    z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                };
            },
            theta: function (p) {
                return {
                    x: p.x,
                    y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                    z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                };

            },
            set: function (p) {
                return {
                    x: p.x - cam.obj.x,
                    y: p.y - cam.obj.y,
                    z: p.z - cam.obj.z
                };
            }
        },
        persp: function (p) {
            return {
                x: p.x * cam.dist.z / p.z * cam.zoom,
                y: p.y * cam.dist.z / p.z * cam.zoom,
                z: p.z * cam.zoom,
                p: cam.dist.z / p.z
            };
        },
        disp: function (p, disp) {
            return {
                x: p.x + disp.x,
                y: -p.y + disp.y,
                z: p.z + disp.z,
                p: p.p
            };
        },
        steps: function (_obj_, sz, rot, pos, disp) {
            var _args = trans.parts.sz(_obj_, sz);
            _args = trans.parts.rot.x(_args, rot);
            _args = trans.parts.rot.y(_args, rot);
            _args = trans.parts.rot.z(_args, rot);
            _args = trans.parts.pos(_args, pos);
            _args = trans.pov.plane(_args);
            _args = trans.pov.theta(_args);
            _args = trans.pov.set(_args);
            _args = trans.persp(_args);
            _args = trans.disp(_args, disp);
            return _args;
        }
    };

    (function () {
        "use strict";
        var threeD = function (param) {
            this.transIn = {};
            this.transOut = {};
            this.transIn.vtx = (param.vtx);
            this.transIn.sz = (param.sz);
            this.transIn.rot = (param.rot);
            this.transIn.pos = (param.pos);
        };

        threeD.prototype.vupd = function () {
            this.transOut = trans.steps(

              this.transIn.vtx,
              this.transIn.sz,
              this.transIn.rot,
              this.transIn.pos,
              cam.disp
            );
        };

        var Build = function () {
            this.vel = 0.04;
            this.lim = 360;
            this.diff = 200;
            this.initPos = 100;
            this.toX = _x;
            this.toY = _y;
            this.go();
        };

        Build.prototype.go = function () {
            this.canvas = document.getElementById("canv");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.$ = canv.getContext("2d");
            this.$.globalCompositeOperation = 'source-over';
            this.varr = [];
            this.dist = [];
            this.calc = [];

            for (var i = 0, len = num; i < len; i++) {
                this.add();
            }

            this.rotObj = {
                x: 0,
                y: 0,
                z: 0
            };
            this.objSz = {
                x: w / 5,
                y: h / 5,
                z: w / 5
            };
        };

        Build.prototype.add = function () {
            this.varr.push(new threeD({
                vtx: {
                    x: rnd(),
                    y: rnd(),
                    z: rnd()
                },
                sz: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rot: {
                    x: 20,
                    y: -20,
                    z: 0
                },
                pos: {
                    x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                    y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                    z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                }
            }));
            this.calc.push({
                x: 360 * Math.random(),
                y: 360 * Math.random(),
                z: 360 * Math.random()
            });
        };

        Build.prototype.upd = function () {
            cam.obj.x += (this.toX - cam.obj.x) * 0.05;
            cam.obj.y += (this.toY - cam.obj.y) * 0.05;
        };

        Build.prototype.draw = function () {
            this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
            cam.upd();
            this.rotObj.x += 0.1;
            this.rotObj.y += 0.1;
            this.rotObj.z += 0.1;

            for (var i = 0; i < this.varr.length; i++) {
                for (var val in this.calc[i]) {
                    if (this.calc[i].hasOwnProperty(val)) {
                        this.calc[i][val] += this.vel;
                        if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                    }
                }

                this.varr[i].transIn.pos = {
                    x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                    y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                    z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                };
                this.varr[i].transIn.rot = this.rotObj;
                this.varr[i].transIn.sz = this.objSz;
                this.varr[i].vupd();
                if (this.varr[i].transOut.p < 0) continue;
                var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                this.$.globalCompositeOperation = 'lighter';
                g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
                g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                this.$.fillStyle = g;
                this.$.beginPath();
                this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                this.$.fill();
                this.$.closePath();
            }
        };
        Build.prototype.anim = function () {
            window.requestAnimationFrame = (function () {
                return window.requestAnimationFrame ||
                  function (callback, element) {
                      window.setTimeout(callback, 1000 / 60);
                  };
            })();
            var anim = function () {
                this.upd();
                this.draw();
                window.requestAnimationFrame(anim);
            }.bind(this);
            window.requestAnimationFrame(anim);
        };

        Build.prototype.run = function () {
            this.anim();

            window.addEventListener('mousemove', function (e) {
                this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
            }.bind(this));
            window.addEventListener('touchmove1', function (e) {
                e.preventDefault();
                this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
            }.bind(this));
            window.addEventListener('mousedown1', function (e) {
                for (var i = 0; i < 100; i++) {
                    this.add();
                }
            }.bind(this));
            window.addEventListener('touchstart1', function (e) {
                e.preventDefault();
                for (var i = 0; i < 100; i++) {
                    this.add();
                }
            }.bind(this));
        };
        var app = new Build();
        app.run();
    })();
    window.addEventListener('resize', function () {

        var canvas = $("#canv");
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
    }, false);

    //// 首页动画结束
    ////////////////

    //师资团队
    $('.list li').hover(function () {
        $(this).addClass('on');
    },
function () {
    $(this).removeClass('on');
});

    //首页menubar
    var d = 1000;

    $('#menu span').each(function () {
        $(this).stop().animate({
            'top': '-17px'
        }, d += 250);
    });

    $('#menu > li').hover(function () {
        var $this = $(this);
        $('a', $this).addClass('hover');
        $('span', $this).stop().animate({ 'top': '40px' }, 300).css({ 'zIndex': '10' });
    }, function () {
        var $this = $(this);
        $('a', $this).removeClass('hover');
        $('span', $this).stop().animate({ 'top': '-17px' }, 800).css({ 'zIndex': '-1' });
    });

});




(function(){

    skill();
    function skill(){

        //关于我 小飞机
        var plane = document.getElementById("plane");
        circleMove({
            "obj" : plane,
            "yuanxin" : [129,129],
            "r" : 147,
            "looptime" : 6000,
            "deg" : 0
        })
        function circleMove(argsJSON){
            //要运动的对象
            var o = argsJSON.obj;
            //圆心
             var a = argsJSON.yuanxin[0];
             var b = argsJSON.yuanxin[1];
             //圆的半径
             var r = argsJSON.r;
             //方向，
             var direction = argsJSON.direction || 1;

             //信号量，当前度数。0度是12点方向，顺时针。如果用户传一个参数进来，就用传进来的参数，不传就默认是0
             var deg = argsJSON.deg || 0;

             //动画每帧的间隔时间
             var interval = 20;
             //运动一圈的时间
             var looptime = argsJSON.looptime;
             //运动一圈的帧数
             var loopframes = looptime / interval;
             //运动一圈一定是360，所以每帧的改变就是
             var degDalte = 360 / loopframes;

             setInterval(function(){
                deg += degDalte * direction;
                if(deg >= 360){
                    deg = 0;
                }
                go(deg);
             },interval)

             function go(deg){
                o.style.left = a + r * Math.sin(degToRar(deg)) + "px";
                o.style.top = b - r * Math.cos(degToRar(deg)) + "px";
             }

             function degToRar(deg){
                return deg * Math.PI / 180;
             }

        }
    }
})();

//技能圆
(function($) {
    $.fn.waterbubble = function(options) {
            var config = $.extend({
                radius: 60,
                lineWidth: undefined,
                data: 0.5,
                waterColor: 'rgba(73, 178, 233, 1)',
                textColor: 'rgba(06, 85, 128, 0.8)',
                font: '',
                wave: true,
                txt: undefined,
                animation: true
            }, options);

            var canvas = this[0];
            config.lineWidth = config.lineWidth ? config.lineWidth : config.radius/24;

            var waterbubble = new Waterbubble(canvas, config);

            return this;
        }
        

        function Waterbubble (canvas, config) {
            this.refresh(canvas, config);
        }

        Waterbubble.prototype = {
            refresh: function (canvas, config) {
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                this._init(canvas, config)
            },

            _init: function (canvas, config){
                var radius = config.radius;
                var lineWidth = config.lineWidth;

                canvas.width = radius*2 + lineWidth;
                canvas.height = radius*2 + lineWidth;

                this._buildShape(canvas, config);
            },

            _buildShape: function (canvas, config) {

                var ctx = canvas.getContext('2d');

                var gap = config.lineWidth*2;
                //raidus of water
                var r = config.radius - gap;
                var data = config.data;
                var lineWidth = config.lineWidth

                var waterColor = config.waterColor;
                var textColor = config.textColor;
                var font = config.font;

                var wave = config.wave

                // //the center of circle
                var x = config.radius + lineWidth/2;
                var y = config.radius + lineWidth/2;

                ctx.beginPath();
                
                ctx.arc(x, y, config.radius, 0, Math.PI*2);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = waterColor;
                ctx.stroke();
                //if config animation true
                if (config.animation) {
                    this._animate(ctx, r, data, lineWidth, waterColor, x, y, wave)
                } else {
                    this._fillWater(ctx, r, data, lineWidth, waterColor, x, y, wave);
                }
                
                if (typeof config.txt == 'string'){
                    this._drawText(ctx, textColor, font, config.radius, data, x, y, config.txt);
                }

                return;
            },

            _fillWater: function (ctx, r, data, lineWidth, waterColor, x, y, wave) {
                ctx.beginPath();

                ctx.globalCompositeOperation = 'destination-over';

                //start co-ordinates
                var sy = r*2*(1 - data) + (y - r);
                var sx = x - Math.sqrt((r)*(r) - (y - sy)*(y - sy));
                //middle co-ordinates
                var mx = x;
                var my = sy;
                //end co-ordinates
                var ex = 2*mx - sx;
                var ey = sy;

                var extent; //extent

                if (data > 0.9 || data < 0.1 || !wave) {
                    extent = sy
                } else{
                    extent = sy - (mx -sx)/4
                }

                ctx.beginPath();
                
                ctx.moveTo(sx, sy)
                ctx.quadraticCurveTo((sx + mx)/2, extent, mx, my);
                ctx.quadraticCurveTo((mx + ex)/2, 2*sy - extent, ex, ey);

                var startAngle = -Math.asin((x - sy)/r)
                var endAngle = Math.PI - startAngle;

                ctx.arc(x, y, r, startAngle, endAngle, false)

                ctx.fillStyle = waterColor;
                ctx.fill()
            },

            _drawText: function (ctx, textColor, font, radius, data, x, y, txt) {
                ctx.globalCompositeOperation = 'source-over';

                var size = font ? font.replace( /\D+/g, '') : 0.3*radius;
                ctx.font = font ? font : 'bold ' + size + 'px Microsoft Yahei';

                txt = txt.length ? txt : data*100 + '%'

                var sy = y + size/2;
                var sx = x - ctx.measureText(txt).width/2

                ctx.fillStyle = textColor;
                ctx.fillText(txt, sx, sy)
            },

            _animate: function (ctx, r, data, lineWidth, waterColor, x, y, wave) {
                var datanow = {
                    value: 0
                };
                var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (func) {
                    setTimeout(func, 16);
                };
                var self = this;
                var update = function () {
                    if (datanow.value < data - 0.01) {
                        datanow.value += (data - datanow.value)/15
                        self._runing = true;
                    } else {
                        self._runing = false;
                    }
                }
                var step = function () {
                    self._fillWater(ctx, r, datanow.value, lineWidth, waterColor, x, y, wave);
                    update();
                    if (self._runing) {
                        requestAnimationFrame(step);
                    }
                }
                step(ctx, r, datanow, lineWidth, waterColor, x, y, wave)
            }
        }
}(jQuery));

// $('#demo-1').waterbubble({txt: 'jQuery', textColor:'rgba(255,255,255,1)'});
// $('#demo-2').waterbubble({txt: 'jQuery', textColor:'rgba(255,255,255,1)'});
// $('#demo-3').waterbubble({txt: 'jQuery', textColor:'rgba(255,255,255,1)'});
// $('#demo-4').waterbubble({txt: 'jQuery', textColor:'rgba(255,255,255,1)'});

//一开始就要调用第一屏的进场动画
inArray[1]();

var $content = $(".content");  //容器
var h = $(".foot").height  = $content.height() * 0.4;

//信号量,合法的信号量值是1,2,3,4,
var page = 1;


//导航条的信号量和eq为几的li有cur。对应关系数组。
//信号量为1的时候，第0个li有cur
//信号量为2的时候，第1个li有cur
//信号量为3的时候，第2个li有cur
//信号量为4的时候，第3个li有cur
var arr = [null,0,1,2,3,4];

//函数节流
window.lock = true;

$(document).mousewheel(function(event,delta){
    if(!lock) return;
    //阻止默认事件
    event.preventDefault();
    //备份老的信号量
    var oldpage = page;
    
    // console.log(oldidx);
    //鼠标向下滚动delta是-1，所以要减等于
    page -= delta;

    if(page < 1){
        page = 1;
        return;
    }else if(page > 5){
        page = 5;
        return;
    }

    if(page == 5){
        $(".circles ol li").fadeOut();
    }else{
        $(".circles ol li").fadeIn();
    }

    if(page != oldpage){
        inArray[page]();
        outArray[oldpage]();
    }

    //过河拆桥
    lock = false;

    if(page < 5){
        $content.animate({
            //当page为1的时候屏幕是第0屏，所以要减1
            "top" : -100 * (page - 1) + "%"},
            500,
            "easieEaseInQuint",function(){
                // lock = true;
            });  //缓冲的类型
    }else if(page = 5){
        $content.animate({
            //当page为1的时候屏幕是第0屏，所以要减1
            "top" : "-340%"},
            500,
            "easieEaseInQuint",function(){
                lock = true;
            });  //缓冲的类型
    }
    
        
    //nav的切换
    $(".nav li").eq(arr[page]).addClass("cur").siblings().removeClass("cur");
    $(".circles ol li").eq(page - 1).addClass("cur").siblings().removeClass("cur");

});

//nav的监听
$(".nav li a[data-go]").click(function(){
     if(!lock) return;

    //备份老的信号量
    var oldpage = page;
    //改变信号量，鼠标向下滚动的时候delta是负值
    page = parseInt($(this).attr("data-go"));

    if(page != oldpage){
        inArray[page]();
        outArray[oldpage]();

        if(page < 5){
            $(".circles ol li").fadeIn();
            $content.animate({"top" : -100 * (page - 1) + "%"},500,"easieEaseInQuint");
        }else if(page == 5){
            $(".circles ol li").fadeOut();
            $content.animate({"top" : "-340%"},500,"easieEaseInQuint");
        }

        
        $(this).parent("li").addClass("cur").siblings().removeClass("cur");
        $(".circles ol li").eq(page - 1).addClass("cur").siblings().removeClass("cur");
        $('.game1').fadeOut();
        $('.game2').fadeOut();
    }

    lock = false;

    //用setTimeout来模拟回调函数开锁
    setTimeout(function(){
        lock = true;
    },1000)

});

//小圆点的监听
$(".circles ol li").click(function(){
     if(!lock) return;

    //备份老的信号量
    var oldpage = page;
    //改变信号量，鼠标向下滚动的时候delta是负值
    page = $(this).index() + 1;

    if(page > 4){
        page = 4;
        return;
    }

    if(page != oldpage){
        inArray[page]();
        outArray[oldpage]();

        $content.animate({"top" : -100 * (page - 1) + "%"},500,"easieEaseInQuint");
        $(".nav ul li").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
        $(this).addClass("cur").siblings().removeClass("cur");
        $('.game1').fadeOut();
        $('.game2').fadeOut();
    }

    lock = false;

    //用setTimeout来模拟回调函数开锁
    // setTimeout(function(){
    //     lock = true;
    // },1000)
});

    //第三屏的点击交互事件
    $('.no1').click(function(){
        $('.game1').fadeIn();
    })
    $('.game1 span').click(function(){
        $('.game1').fadeOut();
    })
    $('.no2').click(function(){
        $('.game2').fadeIn();
    })
    $('.game2 span').click(function(){
        $('.game2').fadeOut();
    })




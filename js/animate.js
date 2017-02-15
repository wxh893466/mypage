

    //全局锁
    // lock = window.lock;

    //这里来设计元素的进场和出场的动画
    //这里为了和idx对应，所以给数组第一个设置为null
    var inArray = [null,function(){},function(){},function(){},function(){},function(){}];  //入场动画
    var outArray = [null,function(){},function(){},function(){},function(){},function(){}];  //出场动画

    //设置每个屏幕的进场和出场动画
    //第一页的动画的用户体验是非常重要的，不能直接在页面上面插入img，要在js中自行创建dom
    inArray[1] = function(){  //第一页的进场动画
        //创建资源
        var R = [
            {
                "src" : "images/screen01.png",
                "className" : "screen01"
            },
            {
                "src" : "images/screen02.png",
                "className" : "screen02"
            },
            {
                "src" : "images/screen03.png",
                "className" : "screen03"
            },
            {
                "src" : "images/screen04.png",
                "className" : "screen04"
            },
            {
                "src" : "images/screen05.png",
                "className" : "screen05"
            },
            {
                "src" : "images/screen06.png",
                "className" : "screen06"
            }
        ];

        //计数器
        var count = 0;
        //版心容器
        var $box = $(".make .inner_c");

        for(var i = 0; i < R.length; i++){
            //new出来一个image，相当于创建一个图片，图片是孤儿节点
            var image = new Image();
            image.src = R[i].src;
            image.className = R[i].className;

            //将image转化为jq对象，然后再添加监听
            $(image).load(function(){
                //计数器+1
                count++;
                //默认给这些图片是因此
                $(this).hide().appendTo($box);
                //当图片加载完毕
                if(count == R.length){
                    goto();
                    lock = true;
                }
            })
        }

        function goto(){
            //键盘
            $(".make .screen01").show().css({"margin-left" : "-100px","opacity":0}).animate({
                "margin-left" : "0px","opacity" : 1
            },1000);

            //笔记本
            $(".make .screen02").show().css({"margin-left" : "-100px","margin-top" : "100px","opacity":0}).animate({
                "margin-left" : "0px","margin-top" : "0px","opacity" : 1
            },1000);

            //充电器
            $(".make .screen05").show().css({"margin-left" : "100px","opacity":0}).animate({
                "margin-left" : "0px","opacity" : 1
            },1000);

            //手机
            $(".make .screen06").show().css({"margin-left" : "100px","margin-top" : "100px","opacity":0}).animate({
                "margin-left" : "0px","margin-top" : "0px","opacity" : 1
            },1000);

            //鼠标、咖啡
            $(".make .screen03").delay(1200).fadeIn(500);
            $(".make .screen04").delay(1200).fadeIn(500);

            //ziyidazao
            $(".make .screen").velocity({"scale" : "0.01","opacity":"0"},0).velocity({"scale":"1.5","opacity":"1"},1000).velocity({"scale":"1"},1000);

            //mouse
            $(".make .mouse").delay(2000).fadeIn(1000);

            //文字
            $(".make .text").show().delay(1200).css("width",0).animate({"width":299},1500);

        }
    }

    //第一屏的出场动画
    outArray[1] = function(){
        //键盘
        $(".make .screen01").animate({"margin-left" : "-100px","opacity" : 0},500);

        //笔记本
        $(".make .screen02").animate({"margin-left" : "-100px","margin-top" : "100px","opacity" : 0
        },1000);

        //充电器
        $(".make .screen05").animate({"margin-left" : "100px","opacity" : 0},500);

        //手机
        $(".make .screen06").animate({"margin-left" : "100px","margin-top" : "100px","opacity" : 0
        },1000);

        //鼠标、咖啡
        $(".make .screen03").fadeOut();
        $(".make .screen04").fadeOut();

        //ziyidazao
        $(".make .screen").css("opacity",0);

        //mouse
        $(".make .mouse").fadeOut();

        //文字
        $(".make .text").fadeOut();
    }

    //第二屏的进场动画
    inArray[2] = function(){
        function moveAnimate(){
            $('#demo-1').fadeIn().waterbubble({txt: 'jQuery', font:'', data : 0.75, textColor:'rgba(255,255,255,1)'});
            $('#demo-2').fadeIn().waterbubble({txt: 'Ajax', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-3').fadeIn().waterbubble({txt: 'Bootstrap', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-4').fadeIn().waterbubble({txt: 'H5+C3', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-5').fadeIn().waterbubble({txt: 'Backbone', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-6').fadeIn().waterbubble({txt: 'WebAPP', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-7').fadeIn().waterbubble({txt: 'Angular', data : 0.6, textColor:'rgba(255,255,255,1)'});
            $('#demo-8').fadeIn().waterbubble({txt: 'React', data : 0.6, textColor:'rgba(255,255,255,1)'});
        }
        setTimeout(function(){
            moveAnimate();
        }, 1000);

        var $ps = $(".skill_r p");
        var length = $ps.length;
        // console.log(length);
        for(var i = 0; i < length; i++){
            $ps.eq(i).show().css({"margin-top":1000,"opacity":0}).delay(i * 100).animate({"margin-top":0,"opacity":1},1500);
        }

        $(".skill_l").fadeIn(1500,function (){
            lock = true;
        });
        

        
    }

    //第二屏的出场动画
    outArray[2] = function(){
        var $ps = $(".skill_r p");
        var length = $ps.length;
        // console.log(length);
        for(var i = 0; i < length; i++){
            $ps.eq(i).delay(i * 100).animate({"margin-top":1000},1000);
        };
        $('.skill_l li canvas').fadeOut();
        $(".skill_l").fadeOut();
        lock = true;
    }

    // 第三屏的进场动画
    inArray[3] = function(){
        $("#bg").show().css({"margin-left" : "-1100px","margin-top" : "-300px"}).animate({"margin-left" : "-500px","margin-top" : "-500px"},1500);
        for(var i = 0; i < 3; i++){
            $('.list0 li').eq(i).show().css({"margin-top" : "1000px"}).delay(i * 50).animate({"margin-top" : 0},1000)
        }
        for(var i = 0; i < 4; i++){
            $('.list_ul li').eq(i).show().css({"margin-top" : "1000px"}).delay((i+1) * 50 + 100).animate({"margin-top" : "-101px"},1000)
        }
        for(var i = 0; i < 3; i++){
            $('.list1 li').eq(i).show().css({"margin-top" : "1000px"}).delay((i+1) * 50 + 300).animate({"margin-top" : "-202px"},1000 , function (){
                lock = true;
            })
        }

        $('.content .page.work h3').delay(3000).fadeIn(1000);
       
    }

    // 第三屏的出场动画
    outArray[3] = function(){
       $("#bg").fadeOut();
       $('.List li').fadeOut();
       $('.game1').fadeOut();
       $('.game2').fadeOut();
        $('.content .page.work h3').fadeOut();
    }

    //第四屏的进场动画
    inArray[4] = function(){
        $('.me').show().css('margin-top' , '-500px').delay(1500).animate({'margin-top' : 20} , 1000).animate({'margin-top' : 0} , 200);
        $('.about-left').show().css({'margin-left' : '-800px' , 'opacity' : 0}).animate({'margin-left' : 0 , 'opacity' : 1} , 1500);
        $('.about-right h3').css({'margin-left' : '800px' , 'opacity' : 0}).animate({'margin-left' : '76px' , 'opacity' : 1} , 1500);
        for(var i = 0 ; i < 6; i++){
            $('.right-p span').eq(i).css({'margin-left' : '800px' , 'opacity' : 0}).delay(i * 300).animate({'margin-left' : '0px' , 'opacity' : 1} , 1500);
        }

        $('.btns').delay(2500).fadeIn(function (){
            lock = true;
        });

    }

    // 第四屏的出场动画
    outArray[4] = function(){
        $('.about-right h3').animate({'margin-left' : '800px' , 'opacity' : 0} , 1000);
        $('.me').fadeOut();
        $('.about-left').fadeOut();
        for(var i = 0 ; i < 6; i++){
            $('.right-p span').eq(i).delay(i * 40).animate({'margin-left' : '800px' , 'opacity' : 0} , 500);
        }
        $('.btns').fadeOut();
    }

    inArray[5] = function (){
        lock = true;
    }

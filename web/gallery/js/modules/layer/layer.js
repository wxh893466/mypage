define(function (require) {
    //加载css
    require("modules/layer/layer.css");
    //引入节流器
    var Throttle = require("tools/throttle");

    var height = $(window).height();
    var Layer = Backbone.View.extend({
        tpl : _.template($("#layerTemplate").html()),
        lastModelId: [],
        modelId:0,
        //touchstart时间
        startTime:0,
        //touchstart的位置
        startX:0,
        preModel:null,
        nextModel:null,
        windowWidth:$(window).width(),
        events:{
            "touchstart .img-container":"touchstartHandler",
            "touchmove .img-container":"touchmoveHandler",
            "touchend .img-container":"touchendHandler",
            "tap .img-container img":"toggleNav",
            "tap .back":"goBack"
        },
        //导航栏返回按钮的事件
        goBack: function () {
            $('.imgBox').removeClass('transition').attr({"style":"transform:translateX(0%)"});
            //每次点击开始的时候把当前图片与当前的modelId对应上
            this.changeImage(this.collection.get(this.modelId));
            this.lastModelId.pop();
            var len = this.lastModelId.length;
            //点击最后一次即将返回list页的时候，隐藏上一张图片
            //console.log(len)
            if(len === 0){
                this.$(".img-container .preImg").attr("src","");
            }
            var id = this.lastModelId[len-1];
            if(id){
                var model = this.collection.get(id);
                this.changeImage(model);
            }else{
                location.hash = "#";
            }

        },
        //点击图片导航显隐事件
        toggleNav: function () {
            this.$(".navbar").toggleClass("hide");
        },
        //触摸开始事件函数
        touchstartHandler: function (event) {
            event.preventDefault;
            this.startTime = new Date();
            if(event.touches.length>1){
                alert("请单手操作");
                return;
            }
            this.startX = event.touches[0].clientX;
            this.preModel =  this.collection.get(this.modelId - 1);
            this.nextModel =  this.collection.get(this.modelId + 1);
            if( this.preModel){
                this.$(".img-container .preImg").attr("src", this.preModel.get("url"));
            }
            if( this.nextModel) {
                this.$(".img-container .nextImg").attr("src", this.nextModel.get("url"));
            }
            $('.imgBox').removeClass("transition").attr({"style":"transform:translateX(0%)"});
            //console.log(this.modelId);
            //每次点击开始的时候把当前图片与当前的modelId对应上
            this.changeImage(this.collection.get(this.modelId));
        },
        //touchmov事件的函数
        touchmoveHandler: function () {
            event.preventDefault;
            var deltaX = event.touches[0].clientX - this.startX;
            if(deltaX>0){
                // 向右划
                if(!this.preModel){
                    //alert("到头了");
                }
            }else{
                if(!this.nextModel){
                    //alert("到头了");
                }
            }
            $('.imgBox').attr({"style":"transform:translateX(" + deltaX +"px)"});
        },
        //触摸结束的函数
        touchendHandler: function (event) {
            event.preventDefault();
            var distance = event.changedTouches[0].clientX - this.startX;
            var time = new Date() - this.startTime;
            if(this.preModel && (distance >= this.windowWidth/2 ||(distance > 30 && time < 300))){
                //console.log("向右划成功");
                --this.modelId;
                this.lastModelId.push(this.modelId);
                $('.imgBox').addClass("transition").attr({"style":"transform:translateX(100%)"});
                this.$(".title").html(this.preModel.get("title"));

            }else if(this.nextModel && (distance <= -this.windowWidth/2 || (distance < -30 && time < 300))){
                //console.log("向左划成功");
                ++this.modelId;
                //console.log(this.modelId);
                this.lastModelId.push(this.modelId);
                $('.imgBox').addClass("transition").attr({"style":"transform:translateX(-100%)"});
                this.$(".title").html(this.nextModel.get("title"));

            }else{
                //console.log("不成功");
                $('.imgBox').addClass("transition").attr({"style":"transform:none"});
                //利用throttle的定时器在动画执行完毕后隐藏前后图片
                Throttle(function () {
                    this.$(".img-container .nextImg").attr("src","");
                    this.$(".img-container .preImg").attr("src","");
                },500);
            }
        },
        //更改当前图片以及标题的函数
        changeImage: function (model) {
            this.$(".img-container #nowImg").attr("src",model.get("url"));
            this.$(".title").html(model.get("title"));
        },
        render: function (id) {
            //console.log( this.collection)
             this.modelId = id;
             var model = this.collection.get(id);
            //如果model是空，说你list没有初始化或者collection没有该id对应的model
            // 此时我们要将他渲染到list页面
            if(!model){
                //window.location.hash = "#";
                location.hash = "#";
                return true;
            }
             this.lastModelId.push(this.modelId);
             var data = model.pick('url', 'title');
             data.styles = "line-height:"+ height +"px";
             var html = this.tpl(data);
             this.$el.html(html);
             this.$el.show()
        }
    })
    return Layer;
})
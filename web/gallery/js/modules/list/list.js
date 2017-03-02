define(function (require) {
    require("modules/list/list.css");
    var Throttle = require("tools/throttle");
    var List = Backbone.View.extend({
        tpl: _.template('<a href="#layer/<%=id%>"><img class="show-img" style="<%=style%>" src="<%=url%>" alt="" /></a>'),
        leftHeight:0,
        rightHeight:0,
        //nav的touch时间用到的变量
        movearr:[0,0],
        //信号量
        nowx:0,
        deltaX:0,

        //记录菜单是否打开
        menuOpen:false,

        // 添加搜索交互
        events: {
            'click .search-btn': 'showSearchView',
            'tap .nav li':"chooseImageType",
            'tap .go-top':"goTop",
            'touchstart .nav':"touchstartHandler",
            'touchmove  .nav':"touchmoveHandler",
            'touchend .nav':"touchendHandler",
            'tap #hamburger':'sliderToggle'
        },
        initialize: function () {
            var that = this;
            this.getData();
            this.initDom();
            this.listenTo(this.collection,"add", function (model) {
                this.render(model);
            });
            
            //window的scroll事件绑定
            $(window).on("scroll", function () {
                Throttle(that.loadMoreData,{
                    context : that
                })
            })
        },
        loadMoreData: function () {
            //判断是否拉到底
          var h = $("body").height() - $(window).height() - $(window).scrollTop() -200 <= 0;
            if(h){
                this.getData();
            }
            this.dealGoTop();
        },
        getData: function () {
            this.collection.fetchData();
        },
        initDom: function () {
            // 获取左边图片列表容器
            this.leftContainer = this.$('.left-list')
            // 获取右边图片列表容器
            this.rightContainer = this.$('.right-list')
        },
        render: function (model) {
             var data = {
                 id:model.get("id"),
                 //style:"width:" + model.get("showWidth") + "px; height:" + model.get("showHeight") + "px",
                 style:"",
                 url:model.get("url")
             }
            var tpl = this.tpl(data);
            if(this.leftHeight > this.rightHeight){
                this.renderRight(tpl,model.get("showHeight"));
            }else{
                this.renderLeft(tpl,model.get("showHeight"));
            }
        },
        renderLeft: function (tpl,height) {
            this.leftHeight += height + 6;
            this.leftContainer.append($(tpl))
        },
        renderRight: function (tpl,height) {
            this.rightHeight += height + 6;
            this.rightContainer.append($(tpl))
        },
        // 获取搜索框里面的内容
        getSearchInputValue: function () {
             var val = this.$(".search-input").val();
            //判断val非空
            if(/^\s*$/.test(val)){
                alert("请输入搜索内容");
                return;
            }
            val = val.replace(/^\s+|\s+$/g,'');
            return val;
        },
        /**
         * 在集合中搜索数据
         * @val: 	搜索的query
         * @key: 	模型的搜索属性
         */
        searchDataFromCollection: function (val, key) {
            var searchKey = key || 'title'
            var col = this.collection.filter(function (model) {
                // 精确的搜索匹配，判断val是不是在模型的title里面
                return model.get(searchKey).indexOf(val) >= 0;
            })
            return col;
        },
        // 显示搜索结果页
        showSearchView: function () {
            // 第一步获取搜索的内容
            var val = this.getSearchInputValue()
            // 第二步根据搜索的内容获取数据
            if (val) {
                var result = this.searchDataFromCollection(val, 'title');
                // 把这些数据渲染到页面中
                this.resetView(result)
                // console.log(result)
            }
        },       /**
         * 重置搜搜的视图的
         * @result 		搜索数据结果的数组
         */
        resetView: function (result) {
            var that = this;
            // 清空图片容器视图
            this.clearView();
            // 遍历reult中的model
            result.forEach(function (model, index) {
                that.render(model)
            })
        },
        /**
         * 清空图片容器视图
         */
        clearView: function () {
            // 清空右边图片容器内容
            this.rightContainer.html('')
            // 清空左边容器高度
            this.rightHeight = 0;
            // 清空左边图片容器内容
            this.leftContainer.html('')
            // 清空右边容器高度
            this.leftHeight = 0;
        },
        // 单击图片类别点击事件绑定的回调函数
        chooseImageType: function (e) {
            var id = this.getTypeBtnValue(e.target);
            var result = this.getModelsFromCollection(id,"type");
            this.resetView(result);
        },
        //获取点击的按钮的data-id
        getTypeBtnValue: function (dom) {
            var id = $(dom).data("id");
            return id;
        },
        getModelsFromCollection: function (val,key) {
            var col = this.collection.filter(function (model) {
                // 精确的搜索匹配
                return model.get(key) == val;
            })
            return col;
        },
        //返回顶部按钮的 隐藏显示事件
        dealGoTop: function () {
          if($(window).scrollTop() > 200){
              this.$(".go-top").show();
          }else{
              this.$(".go-top").hide()
          }
        },
        goTop: function () {
           window.scrollTo(0,0)
           // document.body.scrollTop = document.documentElement.scrollTop = 0;

        },
        //导航部分的触摸抛掷事件
        touchstartHandler:function(event){
            event.preventDefault();
            this.movearr = [0,0];
            //去掉过渡
            this.$(".nav")[0].style.transition = "none";
            //记录误差
            this.deltaX = event.touches[0].clientX - this.nowx;
        },
        //touchmove事件并不是说，你滑动了多少像素就触发几次。而是有一个固有的时间周期。
        //你滑动的慢，clientX间距很小。你滑动的快，clientX间距很大。
        touchmoveHandler: function (event) {
            event.preventDefault();
            //信号量的改变
            this.nowx = event.touches[0].clientX - this.deltaX;

            //相对移动
            this.$(".nav")[0].style.transform = "translateX(" + this.nowx + "px)";
            this.$(".nav")[0].style.webkitTransform = "translateX(" + this.nowx + "px)";


            //记录手指的位置点
            this.movearr.push(event.touches[0].clientX);
        },
        touchendHandler: function (event) {
            event.preventDefault();
            //计算movearr最后两个点的间距
            var s = this.movearr[this.movearr.length - 1] - this.movearr[this.movearr.length - 2];
            //s的大小就决定了你的速度，计算一个新的有惯性的targetx。
            var targetx = this.nowx + s * 3;
            //console.log(nowx,s,targetx);
            if(targetx < 0){
                targetx = 0;
                //贝塞尔曲线有折返
                this.$(".nav")[0].style.transition= "all 0.6s cubic-bezier(0.15, 0.85, 0.15, 2.08) 0s";
            }else if(targetx > 0){
                targetx = 0;
                this.$(".nav")[0].style.transition = "all 0.6s cubic-bezier(0.15, 0.85, 0.15, 2.08) 0s";
            }else{
                this.$(".nav")[0].style.transition = "all 0.4s cubic-bezier(0.18, 0.68, 0.65, 0.88) 0s";
            }
            //用过渡来实现
            this.$(".nav")[0].style.transform = "translateX(" +  targetx + "px)";
            this.$(".nav")[0].style.webkitTransform = "translateX(" +  targetx + "px)";
            //信号量的值就是目标x的值
            this.nowx = targetx;
        },
        //左侧菜单的显隐事件函数
        sliderToggle: function () {
            this.$("#hamburger").toggleClass("open");
            if(this.$("#hamburger").hasClass("open")){
                $(".sliderBar").show();
                this.el.style.left = "200px";
                var that = this;
                this.el.addEventListener("tap", function (e) {
                    if(e.target !== that.$("#hamburger")[0]){
                        that.$("#hamburger").removeClass("open");
                        that.hideSlider();
                    }
                },true)

            }else{
                this.hideSlider();
            }
        },
        //list页面左滑，动画完成后隐藏侧边栏
        hideSlider: function () {
            this.el.style.left = "0px";
            Throttle(function () {
                $(".sliderBar").hide();
            },600)
        }



    })
    return List;
})
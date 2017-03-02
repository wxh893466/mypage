define(function (require) {

    var ImgCollection = require("modules/collection/imgCollection");
    var List = require("modules/list/list");
    var Layer = require("modules/layer/layer");
    var imgCollection = new ImgCollection();
    var Throttle = require("tools/throttle");

    //创建大图页面视图
    var layerView = new Layer({
        collection:imgCollection,
        el: $("#layer")
    })

    //创建列表页面视图
    var listView = new List({
        el: $("#list"),
        collection:imgCollection
    })

    var Router = Backbone.Router.extend({
        routes: {
            // 大图页的路由规则 #layer/47
            "layer/:num": "showLayer",
            // 其他路由匹配到列表页
            "*other": "showList"
        },
        showLayer: function (id) {
            //渲染大图页面
           var refresh =  layerView.render(parseInt(id));
            //根据render的返回值判断是否是直接在layer刷新页面
            if(refresh) return ;
            $("#list").addClass('hide').removeClass('show');
            $("#layer").show().addClass('show').removeClass('hide');
            //在list出场动画执行完毕后隐藏它
            //这里用到Throttle节流器中的定时器
            Throttle(function () {
                $("#list").hide();
            },{time:600})
        },
        showList: function () {
            //view.render()
            $("#list").show();
            if( $("#list").hasClass('hide')){
                $("#list").addClass('show').removeClass('hide');
            }
            $("#layer").addClass('hide').removeClass('show');
            Throttle(function () {
                $("#layer").hide();
            },{time:600})
        }
    })

    return {
        install: function () {
            var router = new Router();
            Backbone.history.start();
        }
    }
})
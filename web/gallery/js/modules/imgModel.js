/**
 * Created by yankj on 2016/6/28.
 */
define(function () {
    // 计算容器宽度
    // 屏幕宽度是由两张图片和三个边距构成，每个边距是6像素
    // 得到一张图片的宽度
    var w = parseInt(($(document).width()-6*3)/2);
    var ImgModel = Backbone.Model.extend({
        initialize:function(){
            this.on("add", function (model) {
                var h = model.get("height") * w /model.get("width");
                model.set({
                    showHeight:h,
                    showWidth:w
                })
            })
        }
    });

    return ImgModel;
})
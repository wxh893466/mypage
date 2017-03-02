/**
 * Created by wxh
 */
define(function (require) {
    var ImageModel = require("modules/model/imgModel");

    var ImgCollection = Backbone.Collection.extend({
        model: ImageModel,
        imageId:0,
        fetchData: function (success) {
            var that = this;
            $.get("data/imageList.json", function (res) {
                if(res.errno === 0){
                    res.data.sort(function () {
                        return Math.random() > .5 ?1 : -1
                    })
                    res.data.map(function (item) {
                        item.id = that.imageId++;
                    })
                    that.add(res.data);
                    success && success()
                }
            })
        }
    })



    return ImgCollection;
})
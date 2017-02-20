
//项目列表
angular.module('app', [])
// 定义列表控制器
.controller('listCtrl', function ($scope , $http) {
    //先获取数据再渲染页面
    $http({
        method : 'GET',
        url : 'data/list.json'
    })
    .success(function (res){
        //请求数据成功就将数据保存在list变量中
        if(res && res.errno == 0){
            //$scope.list = res.data.sort(function(){
            //    return Math.random() > .5 ? 1 : -1 ;
            //});
             $scope.list = res.data;
            // console.log($scope.list)
        }
    })
})



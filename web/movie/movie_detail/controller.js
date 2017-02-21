(function(angular) {
  'use strict';

  // 创建正在热映模块
  var module = angular.module(
    'moviecat.movie_detail', [
      'ngRoute',
      'moviecat.services.http'
    ]);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id', {
      templateUrl: 'movie_detail/view.html',
      controller: 'MovieDetailController'
    });
  }]);

  module.controller('MovieDetailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
	  'AppConfig',
    function($scope, $route, $routeParams, HttpService,AppConfig) {
     $scope.movie={};
		$scope.loading=true;
		var id=$routeParams.id;
		var apiAddress=AppConfig.detailApiAddress+id;
		//请求
		HttpService.jsonp(apiAddress,{},function(data){
			console.log(data);
		$scope.movie=data;
		//第三方的异步绑定后必须重新绑定
			$scope.loading=false;
		$scope.$apply();
		});
    }
  ]);
})(angular);


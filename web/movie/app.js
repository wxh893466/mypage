'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
	'ngRoute',
	//依赖模块如果路由匹配重复 掉一下位置
	'moviecat.movie_detail',
	'moviecat.movie_list',
	'moviecat.directives.auto_focus',
])
	//位模块定义一些常量 所有模块都可以获取
	.constant('AppConfig',{
		pageSize:10,
		listApiAddress:'http://api.douban.com/v2/movie/',
		detailApiAddress:'http://api.douban.com/v2/movie/subject/'
	})
	.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
	.controller('SearchController', [
		'$scope',
		'$route',
		function ($scope,$route) {
		$scope.input='';//获取文本框的值
		$scope.search=function(){
			console.log($scope.input);
			$route.updateParams({ category: 'search',q: $scope.input});
		};
	}]);


// .controller('NavController', [
//   '$scope',
//   '$location',
//   function($scope, $location) {
//     $scope.$location = $location;
//     $scope.$watch('$location.path()', function(now) {
//       if (now.startsWith('/in_theaters')) {
//         $scope.type = 'in_theaters';
//       } else if (now.startsWith('/coming_soon')) {
//         $scope.type = 'coming_soon';
//       } else if (now.startsWith('/top250')) {
//         $scope.type = 'top250';
//       }
//       console.log($scope.type);
//     });
//   }
// ])

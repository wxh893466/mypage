/*
 * @Author: 自动获取焦点
 * @Date:   2016-02-17 17:42:49
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 17:57:30
 */
(function(angular) {
  angular.module('moviecat.directives.auto_focus', [])
	 // 必须视同驼峰命名法
    .directive('autoFocus', ['$location', function($location) {
      // Runs during compile
      //var path = $location.path(); // /coming_soon/1
      return {
		template:'',
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
        	$scope.$location=$location;
			$scope.$watch('$location.path()',function(now){
               //path变化后 now新值
				var aLink = iElm.children().attr('href');
				var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon
				if(now.startsWith(type)){
					iElm.parent().children().removeClass('active');
					// 访问的是当前链接
					iElm.addClass('active');
				}
			});

          //iElm.on('click', function() {
          //	iElm.parent().children().removeClass('active');
          //  iElm.addClass('active');
          //});
        }
      };
    }]);
})(angular);

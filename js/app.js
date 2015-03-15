var app = angular.module('refresh_div',[]);
//make directive with $interval
        
    app.directive('widget', function($interval){
		return {
				template: '<div class="{{valclass}}">{{random}}</div>',
				replace: true,
				scope: {},
				restrict: 'E',

				link: function (scope, element, attributes, controller) {
		            scope.random = (Math.random()*100).toFixed(0);
		            scope.random <21 ? scope.valclass = 'lowValue': (scope.random > 79 ? scope.valclass = 'highValue' : scope.valclass = 'midValue');
		        },

				controller: function($scope, $interval) {
					$scope.getnumber = $interval(function(){
						$scope.random = (Math.random()*100).toFixed(0);
						$scope.random <21 ? $scope.valclass = 'lowValue': ($scope.random > 79 ? $scope.valclass = 'highValue' : $scope.valclass = 'midValue');
					}, 2000);
        		}
		}
	});
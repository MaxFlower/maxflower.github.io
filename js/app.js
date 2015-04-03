(function(){
	angular.module('refresh_div',[]);

    //GetLimits service
    function sourceLimits () {
	  this.getSourceLimits = function (sourceName) {	  	
	  	if (sourceName ==='cpu') return {min: 0, max: 100, measure: '%', accuracy: 0};
		if (sourceName ==='memoryUsed') return {min: 0, max: 5, measure: 'Gb', accuracy: 2};
		if (sourceName ==='memoryAvailable') return {min: 0, max: 3, measure: 'Gb', accuracy: 2};  	
	  };
	}

    //GetCurrentValue service
    function sourceData () {
	  this.getData = function (a, b, c) {
	  	return (a + Math.random()*b).toFixed(c);	
	  };
	}


	//App core
    angular
    	.module('refresh_div')
    	.service('GetLimits', sourceLimits)
    	.service('GetCurrentValue', sourceData)
	    .directive('widget', function(){
			return {
					restrict: 'E',
					replace: true,					
					scope: {
						widgetSource:'@src'
					},
					template: '<div class="box"> {{widgetSource + " :  " + sourceData + " " + sourceDef.measure}}</div>',					
					controller: function($scope, $interval, GetLimits, GetCurrentValue) {						
						$interval(function(){				
							$scope.sourceDef = GetLimits.getSourceLimits($scope.widgetSource);							
							$scope.sourceData = GetCurrentValue.getData($scope.sourceDef.min, $scope.sourceDef.max, $scope.sourceDef.accuracy);							
						}, 2000);	
					}       		      		
			}
		});
})();
var app = angular.module('refresh_div',[]);

    //make service    
    app.service('getRandomService', function(){
    	this.getRandom = function(){
    		return (Math.random()*100).toFixed(0);	
    	};
    });

	//make directive with $interval
    app.directive('widget', ['getRandomService', function($scope, $interval, getRandomService){
		return {
				restrict: 'E',
				template: '<div class="box">{{randomValue}}</div>',
				replace: true,
				scope: {
					randomValue: '&',
					valueType: '&'
				},				
				link: function ($scope, element, attrs) {
					$scope.$watch("randomValue", function(value){
						if(value<25){$scope.valueType = 'low'}
						else if(value>75){$scope.valueType = 'high'}
						else {$scope.valueType = 'mid'}						 
					})
		        },
				controller: function($scope, $interval, getRandomService) {
					
					function valueCicle(){
						$scope.randomValue =  getRandomService.getRandom();						    																						
					}

					$interval(valueCicle, 2000);

        		}
		}
	}]);
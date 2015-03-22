var app = angular.module('refresh_div',[]);

    //make service    
    app.service('getRandomService', function(){
    	this.getRandomValue = function(){
    		return (Math.random()*100).toFixed(0);	
    	};
    	this.getValueType = function(value){
    		if(value<25) return 'lowValue'
			else if(value>75) return 'highValue'
			else return 'midValue';	
    	};
    });


	//make directive with $interval
    app.directive('widget', ['getRandomService', function($scope, $interval, getRandomService){
		return {
				restrict: 'E',
				template: '<div class="box" ng-class="valueType">{{randomValue}}</div>',
				replace: true,
				scope: {},	

				
				controller: function($scope, $interval, getRandomService) {
					//Ctrlfunction
					function valueCicle(){
						$scope.randomValue =  getRandomService.getRandomValue();
						$scope.valueType = getRandomService.getValueType($scope.randomValue);						    																						
					}

					//init
					valueCicle();					

					//set life interval
					$interval(valueCicle, 2000);

        		}
		}
}]);
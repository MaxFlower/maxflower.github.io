var app = angular.module('refresh_div',[]);
//make directive with $interval
    app.directive('tbWidget', function($interval){
	return function($scope, element, attrs){
		$scope.$watch(attrs.tbWidget, function(value){
			$interval (function(){
				//get random integer
				var getRandom = (Math.random()*100).toFixed(0);
				element.text(getRandom);
				//reset Class for every box
				element.removeClass('black').removeClass('green').removeClass('red');
				//set appropriated Class for Element
				getRandom <21 ? element.addClass('red'): (getRandom > 79 ? element.addClass('green') : element.addClass('black'));						
			//set interval
			}, 5000);			
		});
	}	
});

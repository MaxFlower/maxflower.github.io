var app=angular.module('refresh_div',[]);
//make controller and interval within
app.controller('Changer', function($scope,$interval){
	$scope.blocks = [
		{item: '1', number: getRandomInt()},
		{item: '2', number: getRandomInt()},
		{item: '3', number: getRandomInt()},
	];

	function getRandomInt(){
			return (Math.random()*100).toFixed(0);
	};

	$interval(function(){
		for (var i=0; i<3; i++){
			$scope.blocks[i].number = getRandomInt();
		}
	},5000);
});

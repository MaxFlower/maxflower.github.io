window.onload = function (){

function getRandomInt(){
	return (Math.random()*100).toFixed(0);
}
// numbers in blocks
var numbers = function(){
	var block = [getRandomInt(), getRandomInt(), getRandomInt()];
	for (i=1; i<4; i++){
		var m = document.getElementById("div_" + i);
		m.innerHTML = block[i-1];
		
		//make 0-25 green 26-75 black 76-100 red
		m.style.color="black";
		if (block[i-1]<26){m.style.color="green";}
		if (block[i-1]>75){m.style.color="red";}	
	}
}

//init
numbers();
//set the 5sec interval for changing values
setInterval(numbers, 5000);  
}
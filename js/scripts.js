$(document).ready(function(){

	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='+location+',us&appid='+apiKey
		// console.log(weatherUrl);
		$.getJSON(weatherUrl, function(weatherData){
		// console.log(weatherData);
		// BECAUSE THE TEMPERATURE IS INSIDE OF THE MAIN OBJECT, NAMED TEMP
		var currTemp = weatherData.main.temp;
		var name = weatherData.name;
		var icon = weatherData.weather[0].icon + '.png';
		var windSpeed = weatherData.wind.speed;

		$('#current-temp').html('<img src="http://openweathermap.org/img/w/'+icon+'">The temperature in ' + name + ' is currently ' +currTemp+ '&deg; with a windspeed of ' +windSpeed+ ' Miles per hour');
		

// console.log($('#current-temp').html);

		var canvas = $('#weather-canvas');

		var context = canvas[0].getContext('2d');
		// console.log(windSpeed);
		// console.log(context);

		// set up the outer circle
		var currPercent = 0;
		
			function animate(current){
				// draw inner circle
				context.fillStyle = "#FFF";

				context.beginPath();
				context.arc(155,75,65,Math.PI*0,Math.PI*2);
				context.closePath();
				context.fill();
				// draw the outer line
				context.lineWidth = 10;

				// CHANGES METER TO RED WHEN TEMP IS OVER 80
				if(currTemp > 80){			
				context.strokeStyle = '#990000';
				}


				context.strokeColor = '#129793';
				context.beginPath();
				context.arc(155,75,70,Math.PI*1.5,(Math.PI*2*current)+Math.PI*1.5);
				context.stroke();




				currPercent++;
				if(currPercent < currTemp){
					requestAnimationFrame(function(){
						animate(currPercent / 100);


					});

				}
			}
		animate();
		});
		var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&q=Zip=" +location+ ",us&mode=json&appid=" + apiKey
// console.log(fiveDay)
		$.getJSON(fiveDayURL, function(fiveDayData){
			// console.log(fiveDayData);
			// console.log(fiveDayData.list[1].temp.min);

			var weekHTML = "";

			for(let i = 0 ; i < 6 ; i++){
				var weatherDate = new Date(fiveDayData.list[i].dt * 1000);
				var date = weatherDate.getDate();
				var min = fiveDayData.list[i].temp.min;
				var max = fiveDayData.list[i].temp.max;
				weekHTML += '<div class="fiveDayForecast">Date: ' + Math.floor(date) + '<br>Low: ' +Math.floor(min) + '<br>High: ' + Math.floor(max) + '</div>';
			}
			$('.weather-week').html(weekHTML);
		});
	});
});



































$(function(){

				var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": "https://www.stattleship.com/baseball/mlb/games?on=today",
				  "method": "GET",
				  "headers": {
				    "content-type": "application/json",
				    "authorization": "Token token=4fe5a34d5fa6a0e6d69cdf8dee6df958",
				    "accept": "application/vnd.stattleship.com; version=1"
				  }
				}

				$.ajax(settings).done(function (data) {
				  console.log(data);
				  console.log(data.games[1].name);
				  $('.results-teams').html(data.games[1].name)
				  var venue_id = data.games[1].venue_id;
				  console.log(venue_id);
				  $.each(data.venues,function(index,venue){
				  	if(venue.id == venue_id){
				  		// console.log(venue.latitude + ' , ' + venue.longitude);
				  		var weatherSettings = {
				  			"url":"http://api.wunderground.com/api/46de172933d3e145/hourly/q/"+venue.state+"/"+venue.city+".json",
				  			"method":"GET"
				  		};
				  		$.ajax(weatherSettings).done(function(data){
				  			// grab the hour that correlates to the games starting time
				  			console.log(data.hourly_forecast[1].temp.english);
				  			$('.results-box').html("<p>Temperature at game time: " +data.hourly_forecast[1].temp.english+ " degrees</p>");
				  		});
				  	}
				  });
				});

				for 

			});
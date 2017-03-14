$(function(){

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://www.stattleship.com/baseball/mlb/games?on=today",
	  "method": "GET",
	  "headers": {
	    "content-type": "application/json",
	    "authorization": "Token token=213fb20e0286f9d76a6b6f035ac31db1",
	    "accept": "application/vnd.stattleship.com; version=1"
	  }
	}

	$.ajax(settings).done(function (data) {
	  console.log(data);
	  $.each(data.games,function(gameIndex,game){
	  	var $el = $('#template').clone();
	  	$el.attr('id','').addClass('result');
	  	$el.find('.results-teams').html(game.label);
	  	$el.find('.results-gameTime').html(convertTime(game.timestamp));
	  	// $el.find('.results-box').html('<p>Temperature: '+game.temperature+' </p>');

	  	var venue_id = game.venue_id;	
	  	
		  $.each(data.venues,function(index,venue){
		  	if(venue.id == venue_id){
		  		// console.log(venue.latitude + ' , ' + venue.longitude);
		  		var weatherSettings = {
		  			"url":"http://api.wunderground.com/api/46de172933d3e145/hourly/q/"+venue.state+"/"+venue.city+".json",
		  			"method":"GET"
		  		};
		  		$.ajax(weatherSettings).done(function(data){
		  			// grab the hour that correlates to the games starting time
		  			// console.log(data.hourly_forecast[1].temp.english);
		  			$el.find('.results-box').html("<p>Temperature at game time: " +data.hourly_forecast[1].temp.english+ " degrees</p>");
		  			$('#results').append($el);
		  		});
		  	}
		  });
	  });
	});


	function convertTime(timestamp){
		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var date = new Date(timestamp*1000);
		return date.toLocaleTimeString();
	}
	

});
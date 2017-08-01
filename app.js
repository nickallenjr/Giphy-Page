$(document).ready(function() {
	var gifs = ["Snakes", "Spiderman", "Lebron", "apple"]
	renderButtons();

	$("#addGif").on("click", function(event) {
		event.preventDefault();
		var gif = $("#gif-input").val()
		if (gifs.includes(gif) === true) {
			
		}
		else {
			gifs.push(gif);
			renderButtons();
		}
	})

	function renderButtons() {
		$("#button-container").empty();
        for (var i = 0; i < gifs.length; i++) {
      	  //gifs[i].charAt(0).toUpperCase() + gifs[i].slice(1);
          var a = $("<button>");
          a.addClass("gifname");
          a.attr("data-name", gifs[i]);
          a.text(gifs[i]);
          $("#button-container").append(a);
        }
        $("#gif-input").val("")

	}

	var gifArray = []
	var buttonArray = []

	function displayActualGifs() {
		$("#gifs").empty();
		var gif = $(this).attr("data-name");
		//var rating = r;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=0c5819fa57304ec4942fc15c16f31c35&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			if (buttonArray.includes(gif) === true) {
			}
			else {
				buttonArray.push(gif);
				gifArray.push(response.data);
			}
			console.log(queryURL)
			for (var i = 0; i < response.data.length; i++) {
				var data = response.data[i];
				var rating = response.data[i].rating;
				var still = response.data[i].images.original_still.url;
				var animate = response.data[i].images.original.url;
				$("#gifs").append("<div class='gifContainer' style='width: 200px; float: left;'></div>")
				$(".gifContainer").last().append("<p class='rate' style='width: auto; height: auto;'>Rating: " + rating + "</p>")
				$(".rate").last().append("<img class='images' style='height: 50%; width: 100%;' data-still='" + still + "' data-animate='" + animate + "' data-state='still' src='" + still + "'>")
			}
			$("img").mouseenter(function(){
				$(this).attr("src", $(this).attr("data-animate"))
				$(this).attr("data-state", "animate")
			})
			$("img").mouseleave(function(){
				$(this).attr("src", $(this).attr("data-still"))
				$(this).attr("data-state", "still")
			})	
		})	
	}

	$(document).on("click", ".gifname", displayActualGifs)



















})
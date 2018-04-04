var movieData ;

function submitUserInfo () {

$("#submitButton").on("click", function () {
    event.preventDefault();
    
    var userDate = $("#movieDate").val();
    var userZipCode = $("#zipCode").val();
    console.log("This is the user entered date: " + userDate);
    console.log("This is the user entered zip: " + userZipCode);

    // Empty the fields when the submit button is clicked
    $("#movieDate").val("");
    $("#zipCode").val("");

    // Create variables to hold the information needed to submit the API call
    var apiKey = "gkd947dfsy5spd8zcruwcwa6";
    var movieDate = userDate;
    var zipCode = userZipCode;
    var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + movieDate + "&zip=" + zipCode + "&imageSize=Sm&imageText=true&api_key=" + apiKey;
    console.log(queryURL);

    // Make an AJAX call to the movie API to get data back
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        // Store the JSON response in a variable
        movieData = response;
        console.log(movieData);

        // Looping over the results in the JSON object...
        for (var i = 0; i < movieData.length; i++) {
        
            // Create a DIV to hold each of our movie titles and its description
            var movieDisplayDiv = $("<div>").addClass("movieDIV").addClass("card").attr("style", "width: 18rem");

            // Create a variable to hold each movie title
            var movieTitle = [];
            movieTitle = movieData[i].title;
            console.log(movieTitle);

            var movieID = [];
            movieID = movieData[i].tmsId;
            console.log(movieID);

            // Create an inner DIV for each movie title and description to utilize the card component from Bootstrap
            var innerMovieDiv = $("<div>").addClass("card-body");

            // Display the movie title in each individual DIV
            var titleDisplay = $("<h5>").text(movieTitle).addClass("card-title").attr("id", movieID);

            // Create a variable to hold each movie description
            var movieDescr = movieData[i].shortDescription;

            // Display the movie description in each individual DIV
            var descrDisplay = $("<h6>").text(movieDescr).addClass("movieDescr").addClass("card-title");

            // Add the movie title and the description to the individual DIV
            innerMovieDiv.append(titleDisplay,descrDisplay)

            movieDisplayDiv.append(innerMovieDiv);

            // Add all the movies to an existing DIV on the apge called movieTitles
            $("#movieTitles").append(movieDisplayDiv);
        }
    });
});
}
// Call the function
submitUserInfo();

$(document).on("click", "h5", function () {
    //console.log("clicked");

    var movieID = $(this).attr("id");
    console.log(movieID);

    var selectedMovie = movieData.find(function(element) {
        return element.tmsId == movieID;
    });

    // for (var i = 0; selectedMovie.showtimes[i] < movieData.length; i++) {
    //     var movieShowtimes = [];
    //     movieShowtimes = selectedMovie.showtimes[i].dateTime;
    //     console.log("Showtimes: " + movieShowtimes);
    // }
      
    var testList = $("<ul>").addClass("testClass");

    var testListItem = $("<li>").text("Here's some text");

    testList.append(testListItem);

    $(this).parent().append(testList);
    
});
// Call the function



  // Testing getting information back from the JSON object

  // ---------This is the code to find showtimes and theatre names-------------
            // var movieTitle = response[i].title;
            // console.log("Here's the movie title: " + movieTitle);

            // var movieShowtimes = response[i].showtimes[i].dateTime;
            // console.log("Heres are all the showtime: " + movieShowtimes);
            
            // var movieTheatres = response[i].showtimes[i].theatre.name;
            // console.log("Heres are all the movie theatres: " + movieShowtimes);
    // ---------------------------------------------------------------------------

  // Create a variable to hold each movie rating
        // Leaving out for now (need to figure out how to skip items that don't have a rating so it doesn't break the whole program)
        //var movieRating = response[i].ratings[0].code;
        //console.log("This is the movie rating: " + movieRating);

  // var movieTitle = response[30].title;
    // console.log("This is the movie title: " + movieTitle);

    // for (var i = 0; i < response.length; i++) {
    //     var movieTheatre = [];
    //     movieTheatre = response[0].showtimes[i].dateTime;
    //     console.log("Heres are all the movie theatres for each showtime: " + movieTheatre);
    // };

    // for (var i = 0; i < response.length; i++) {
    //     var movieTheatre = response[i].showtimes;
    //     console.log("Heres are all the movie showtimes: " + movieShowtimes);
    // };

    // var movieDescr = response[0].shortDescription;
    // console.log("This is the movie description: " + movieDescr);

    // var movieRating = response[0].ratings[0].code;
    // console.log("This is the movie rating: " + movieRating);

    // var movieTitle = response[0].title;
    // console.log("This is the movie title: " + movieTitle);

    // var showTimes = response[0].showtimes[1].dateTime;
    // console.log("This is a showtime for the movie: " + showTimes);

    // var movieTheatre = response[0].showtimes[1].theatre.name;
    // console.log("This is the theatre for the showtime above: " + movieTheatre);

    // var prefImg = response[i].preferredImage.uri;
        // console.log("Here's the image for this movie: " + prefImg);

    // var movieImg = $("<img>")
    // movieImg.attr("src", response[i].preferredImage.uri).addClass("movieImg");

    // I'm getting a 403 Forbidden which means that I we don't have rights to access the images :(
        // Crete a variable to hold each movie image
        //var movieImg = response[i].preferredImage.uri;
        // Display all the images correctly
        //var imgDisplay = $("<img>").attr("src", "http://developer.tmsimg.com/" + movieImg + "?api_key=" + apiKey).addClass("movieImg");
        //console.log(imgDisplay);
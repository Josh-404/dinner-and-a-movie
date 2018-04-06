var movieData;

function submitUserInfo() {

    $("#submitButton").on("click", function () {
        event.preventDefault();

        var userDate = $("#movieDate").val();
        var userZipCode = $("#zipCode").val();
        console.log("This is the user entered date: " + userDate);
        console.log("This is the user entered zip: " + userZipCode);

        // Local Storage
        // Clear absolutely everything stored in localStorage using localStorage.clear()
        localStorage.clear();

        // Store the zipcode into localStorage using "localStorage.setItem"
        localStorage.setItem("zipcode", userZipCode);
        console.log("Local Storage ZipCode: "+localStorage.getItem("zipcode"));

        // Empty the fields when the submit button is clicked
        $("#movieDate").val("");
        $("#zipCode").val("");

        // Create variables to hold the information needed to submit the API call
        var apiKey = "gkd947dfsy5spd8zcruwcwa6";
        var movieDate = userDate;
        var zipCode = userZipCode;
        var queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + movieDate + "&zip=" + zipCode + "&imageSize=Sm&imageText=true&api_key=" + apiKey;
        console.log(queryURL);

        // Make an AJAX call to the movie API to get data back
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

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
                innerMovieDiv.append(titleDisplay, descrDisplay)

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

    var selectedMovie = movieData.find(function (element) {
        return element.tmsId == movieID;
    });

    // for (var i = 0; selectedMovie.showtimes[i] < movieData.length; i++) {
    //     var movieShowtimes = [];
    //     movieShowtimes = selectedMovie.showtimes[i].dateTime;
    //     console.log("Showtimes: " + movieShowtimes);
    // }

    var testList = $("<ul>").addClass("testClass");

    var testListItem = $("<li>").text("Here's some text");
    var restaurantPage = $("<li>").addClass("btn btn-primary btn-dark").html('<a href="./index_restaurant.html">Want to go to Dinner?</a>');

    // var restaurantPage = $("<li>").addClass("btn btn-primary btn-dark dinnerButton").html("What to go to Dinner?");
    testList.append(testListItem, restaurantPage);

    $(this).parent().append(testList);

});


// ***************************
// Display restaurant Info
// function displayRestaurantInfo() {
// ***************************

// $(document).on("click", ".dinnerButton", function () {

//     // VARIABLE DECLARATION
//     var georesults;
//     var latitude;
//     var longitude;
//     // ***************************

//     // $("#submitButton").on("click", function (event) {
//     event.preventDefault();
//     //   $("#geolocation-appear-here").empty();
//     //   $("#restaurant-appear-here").empty();
//     console.log("****** Dinner Button Clicked ******");

//     //   var zipCode = $("#zipCode").val();
//     //   $("#zipCode").val("");
//     var zipCode = localStorage.getItem("zipcode")
//     console.log("*** Zip Code for Geolocation Calulation: " + zipCode);
//     var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyD2nn48mhiIlV_nDEM-7OTtVwU22wOQa5Y"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         georesults = response;
//         console.log("Lat: " + georesults.results[0].geometry.location.lat);
//         console.log("Long: " + georesults.results[0].geometry.location.lng);
//         latitude = georesults.results[0].geometry.location.lat;
//         longitude = georesults.results[0].geometry.location.lng;
//         $("#geolocation-appear-here").html("Latitude: " + latitude + " Longitude: " + longitude);

//         // $("#geolocation-appear-here").text(JSON.stringify(georesults));
//     });

//     // var restaurantURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=chicago+restaurant&key=AIzaSyCMv62EJ-6UqQEJhfSK1H2VFhle3CRnC-Q";
//     var restaurantURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=5000&type=restaurant&key=AIzaSyCMv62EJ-6UqQEJhfSK1H2VFhle3CRnC-Q";
//     // var restaurantURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=  41.8403395    ,    -87.6137011  &radius=5000&type=restaurant&key=AIzaSyCMv62EJ-6UqQEJhfSK1H2VFhle3CRnC-Q";

//     $.ajax({
//         url: restaurantURL,
//         method: "GET"
//     }).then(function (response) {

//         var restresults = response;
//         console.log(response);
//         console.log("Array Length: " + response.results.length);

//         // $("#movie-view").html(JSON.stringify(response,"",4));
//         // $("#restaurant-appear-here").html(JSON.stringify(response,"",4));

//         for (var i = 0; i < response.results.length; i++) {
//             console.log("GOING FOR IT");
//             // Create a DIV to hold each of our restaurants and its description
//             var restDisplayDiv = $("<div>").addClass("restDIV").addClass("card").attr("style", "width: 18rem");

//             // Create a variable to hold each restaurant name 
//             var restName = response.results[i].name;
//             console.log("Restaurant Name: " + restName);

//             // Create an inner DIV for each Restaurant title and description to utilize the card component from Bootstrap
//             var innerRestDiv = $("<div>").addClass("card-body").attr("id", restName);

//             // Display the movie title in each individual DIV
//             var nameDisplay = $("<h5>").text("Restaurant Name: " + restName).addClass("restName").addClass("card-title");

//             // Create a variable to hold each Restaurant description
//             // var movieDescr = response[i].shortDescription;

//             var restOpen = response.results[i].opening_hours.open_now;
//             console.log("Open: " + restOpen);
//             var priceLevel = response.results[i].price_level;
//             console.log("Price Level: " + priceLevel);
//             var rating = response.results[i].rating;
//             console.log("Rating: " + rating);


//             // Display the Restaurant description in each individual DIV
//             if (restOpen) {
//                 var openDisplay = $("<h6>").text("Open").addClass("openDisplay").addClass("card-title");
//             }
//             else { var openDisplay = $("<h6>").text("Closed").addClass("openDisplay").addClass("card-title"); }
//             var priceDisplay = $("<h6>").text("Price Level: " + priceLevel).addClass("priceDisplay").addClass("card-title");
//             var ratingDisplay = $("<h6>").text("Google Rating: " + rating).addClass("ratingDisplay").addClass("card-title");

//             // Add the movie title and the description to the individual DIV
//             innerRestDiv.append(nameDisplay, openDisplay, priceDisplay, ratingDisplay)

//             restDisplayDiv.append(innerRestDiv);

//             // Add all the movies to an existing DIV on the apge called movieTitles
//             // $("#restaurant-appear-here").prepend(restDisplayDiv);
//             $("#nearbyRestaurants").prepend(restDisplayDiv);

//         }

//     });
//     // });
// });

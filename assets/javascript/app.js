// ***************************
// GLOBAL VARIABLE DECLARATION
var movieData;
// ***************************

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7G2xyyMsQpQ22H3YEq7Nv5MVuiGamad8",
    authDomain: "dinner-and-a-movie-200002.firebaseapp.com",
    databaseURL: "https://dinner-and-a-movie-200002.firebaseio.com",
    projectId: "dinner-and-a-movie-200002",
    storageBucket: "",
    messagingSenderId: "814272938765"
};
firebase.initializeApp(config);

var database = firebase.database();

// ****** LOCAL STORAGE ******** 
function saveData(userDate, userZipCode, movieTitle, theaterName, movieTime) {
    // Clear absolutely everything stored in localStorage using localStorage.clear()
    localStorage.clear();

    // Store the zipcode into localStorage using "localStorage.setItem"
    localStorage.setItem("zipcode", userZipCode);
    console.log("Local Storage ZipCode: " + localStorage.getItem("zipcode"));

    // Creates local "temporary" object for holding Dinner * Movie data
    var movieDinner = {
        date: userDate,
        zipCode: userZipCode,
        title: movieTitle,
        theater: theaterName,
        time: movieTime,
    };

    // Uploads movie & dinner data to the database
    database.ref().push(movieDinner);

    // Logs everything to console
    console.log("Firebase Push date: " + movieDinner.date);
    console.log("Firebase Push ZipeCode: " + movieDinner.zipCode);
    // Added info to Firebase
    console.log("Dinner & Movie Info successfully added");
};
// **** END OF LOCAL STORAGE CODE ***********

function inputValidation(zip, userDate) {
    $("#errorTextZip").empty();
    $("#errorTextDate").empty();
    if ((userDate >= moment().format("YYYY-MM-DD")) && ((zip > 10000) && (zip < 99999))) {
        console.log("*********** Input Correct ******");
        return true;
    }
    else {
        if ((zip < 10000) || (zip > 99999)) {
            console.log("Input Validation-->Wrong Zip: " + zip);
            $("#errorTextZip").append("Enter Valid Zip code with 5 Digits: ex. 60647 ")
            // return false;
        }
        if ((userDate < moment().format("YYYY-MM-DD"))) {
            console.log("Input validation --> Wrong Date: " + userDate);
            $("#errorTextDate").append("Enter Valid date [mm/dd/yyyy]. Dates before today are not allowed ")
            // return false;
        }
        return false;
    }
}

function submitUserInfo() {

    $("#submitButton").on("click", function () {
        event.preventDefault();

        var userDate = $("#movieDate").val();
        var userZipCode = $("#zipCode").val();
        var movieTitle = "";
        var theaterName = "";
        var movieTime = "";
        console.log("This is the user entered date: " + userDate);
        console.log("This is the user entered zip: " + userZipCode);

        if (inputValidation(userZipCode, userDate)) {
            // Calling SaveData() to store info in Firebase
            saveData(userDate, userZipCode, movieTitle, theaterName, movieTime);
            // Local Storage
            // Clear absolutely everything stored in localStoßrage using localStorage.clear()
            localStorage.clear();

            // Empty the fields when the submit button is clicked
            $("#movieDate").val("");
            $("#zipCode").val("");

            // Create variables to hold the information needed to submit the API call
            // var apiKey = "gkd947dfsy5spd8zcruwcwa6";
            //    Alfredo's Key
            var apiKey = "juzanm2r7beucstd9975h2sk";
            var movieDate = userDate;
            var zipCode = userZipCode;
            var queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + movieDate + "&zip=" + zipCode + "&imageSize=Sm&imageText=true&api_key=" + apiKey;
            console.log(queryURL);

            // Make an AJAX call to the movie API to get data back
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
            // Create variables to hold the information needed to submit the API call
            // var apiKey = "gkd947dfsy5spd8zcruwcwa6"; //Liz's API Key
            var apiKey = "juzanm2r7beucstd9975h2sk"; //Alfredo's API Key
            var movieDate = userDate;
            var zipCode = userZipCode;
            var queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + movieDate + "&zip=" + zipCode + "&imageSize=Sm&imageText=true&api_key=" + apiKey;
            console.log(queryURL);

                // Store the JSON response in a variable
                movieData = response;
                console.log("Movie Data JSON Response: " + movieData);

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
        }
    });
};

// Call the function

submitUserInfo();

$(document).on("click", "h5", function () {
    // Using 'this', create a variable that grabs the movie ID in the id attribute for the specific movie title that the user has clicked on.
    var movieID = $(this).attr("id");
    console.log(movieID);

    // Create a variable that returns the index number of the movie that matches that movie ID that was clicked. We can use this index number to plug into the for loop to only loop through that movie's showtimes.
    var selectedMovie = movieData.findIndex(function (movie) {
        return movie.tmsId === movieID;
    });
    console.log("This is the selected movie's index: " + selectedMovie);

    // Create an empty array that will hold a list of generated objects containing each movie theatre and showtime.
    var movieTheatres = [];
    var theatreNames = [];

    // Loop through all the movie showtimes of the array that we have selected to get the theatres names by using the index number generated above
    for (var i = 0; i < movieData[selectedMovie].showtimes.length; i++) {
        // Create a variable to hold each of the theatre names for each showtime in the array
        var theatreName = movieData[selectedMovie].showtimes[i].theatre.name;
        //console.log("Here's the theatre name: " + theatreName);

        //console.log("Here's all the movieShowtimes: " + movieShowtimes);
        // Create an if statement using the indexOf method that will create an object with 2 properties: name (holds the name of the theatre) and time (an array that holds the showtimes) but only if that theatre name and time is not present ( == -1) and pushes it to the movieTheatre variable.
        if (theatreNames.indexOf(theatreName) < 0) {
            theatreNames.push(theatreName);
        }
    }

    console.log("All movie theatres and showtimes for this particular movie: ", theatreNames);

    // Loop through the movieTheatres array to get all showtimes for each movie and theatre
    for (var i = 0; i < theatreNames.length; i++) {
        // Create a new variable that will use the filter function to create a new array to hold all of the movie showtimes from the same theatre name
        var showtimes = movieData[selectedMovie].showtimes.filter(function (showtime) {
            //console.log("DATA", showtime);
            return showtime.theatre.name == theatreNames[i];
        });
        movieTheatres.push({ name: theatreNames[i], times: [] });
        //console.log("Showtime: ", showtimes);
        // Within this loop, then loop through the newy created array stored in the showtimes variable and push all the showtimes into the movieTheatre array
        for (j = 0; j < showtimes.length; j++) {
            //console.log("Showtimes: " , showtimes[j]);
            movieTheatres[i].times.push(showtimes[j].dateTime);
        }
    }
    console.log(movieTheatres)

    //When the user clicks a movie title, grab all the theatres and the corresponding show times and display that in a new div within the movie title div
    for (let i = 0; i < movieTheatres.length; i++) {
        var showtimesDIV = $("<div>").addClass("showtimesDIV");
        //console.log("DIV " + showtimesDIV);

        var theatre = movieTheatres[i].name;
        console.log("Theatre " + theatre);

        var movieTimes = movieTheatres[i].times.map(function (element) {
            return moment(element).format('h:mm A');
        });
        console.log("Movie times" + movieTimes);

        showtimesDIV.append("<strong>" + theatre + "</strong>" + "<br>" + movieTimes.join(", ") + "<hr>");

        $(this).parent().append(showtimesDIV);
    }

    var restaurantPage = $("<button>").addClass("btn btn-primary btn-dark dinnerButton").html('<a href="./index_restaurant.html">Want to go to Dinner?</a>');

    $(this).parent().append(restaurantPage);

});

// Display restaurant Info
// function displayRestaurantInfo() {
$("#add-zip").on("click", function (event) {
  event.preventDefault();
  console.log("Button Clicked");

  var zipCode = $("#zipcode-input").val();
  $("#zipcode-input").val("");
  console.log("Zip Code: " + zipCode);
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyD2nn48mhiIlV_nDEM-7OTtVwU22wOQa5Y"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var georesults = response;
    // console.log(results);


    $("#geolocation-appear-here").text(JSON.stringify(georesults));
  });

  var restaurantURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=chicago+restaurant&key=AIzaSyCMv62EJ-6UqQEJhfSK1H2VFhle3CRnC-Q";
  $.ajax({
    url: restaurantURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var restresults = response;
    // console.log(results);

    $("#restaurant-appear-here").text(JSON.stringify(restresults));
  });
});

  // $(document).on("click", "#add-zip", displayRestaurantInfo);


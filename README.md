# dinner-and-a-movie

An application to help you find movies, showtimes and nearby restaurants to help you plan your next dinner and a movie date.

# What Does the App Do?

The Dinner and a Movie application uses two different APIs to pull in movie and showtime information based on a user entered date and zip code as well as restaurant information based on the user entered zip code. 

On the first page of the application, the user enters in a date and a zip code. This information is used to retreive movie titles and descriptions and display them to the user. From the movies titels that appear, the user can click on the movie name to see a list of theaters and showtimes where the movie is playing near the zip code they entered (the zip code entered by the user is stored in local storage and accessed on the next page).

At the bottom of the list of theatres and showtimes a button will appear that asks the user if they want to go to dinner. Clicking on this button takes them to a second page that displays a list of restaurants near the zip code that they entered, including whether or not the restaurant is currently open, the price level (if available) and restaurant rating (if available).

# How Did You Make the App?

The app was made with:

* The [Gracenote Movie API](http://developer.tmsapi.com/docs/data_v1_1/movies/Movies_playing_in_local_theatres) to find movies playing in local theatres based on the user entered date and zip code
* The [Google Places API](https://developers.google.com/places/web-service/intro) to find restaurants based on the user entered zip code
* HTML and [Boostrap 4](https://getbootstrap.com/) to style the page elements
* CSS for custom styling of hover elements over the movie names and media queries to resize the header image on the first page so that it gets resized appropriately in its DIV at smaller screen sizes.
* [Hover.css](http://ianlunn.github.io/Hover/) to add fun animations to the button elements on the page
* [Google Fonts](https://fonts.google.com/) for the text elements on the page
* The [jQuery](https://jquery.com/) library for Javascript to dynamically generate the movies showtime and restaurant elements based on the user entered data
* AJAX to query the APIs
* [Firebase](https://firebase.google.com/) to store user submitted data
* [Moment.js](http://momentjs.com/) to format the movie times in an easier to read format (ie. 11:00 AM instead of 2018-04-09T11:00)

# What Challenges Did You Encounter?

**Finding a suitable free and open API that didn't require us contact the creator directly or pay to use it**
* We initially looked in to using the Fandango API (which is actually managed by Gracenote) and the OpenTable API but neither were open APIs that we would be able to use for this project. Luckily, we were able to use the limited and free version of the Gracenote API to get the movies and showtimes.

**Pulling the data we wanted out of the API**
* This was particularly true of the movie API in which the theatre name was stored as a sub-property of a specific showtime property for each movie.

**Being limited in our display of the information we got back from the APIs**
* Unfortunately, we did not have enough time to incorporate more visual elements to the information that we were displaying on the page. For example, in the case of the movie API, while a movie poster property was available, we were unable to utilize it because we were using a limited and free version of that particular API. 

# What's Next?

We'd love to build out the app further with the following details:

* Adding more code to filter and refine the results and prevent bad results from displaying. In the future, we'd like to write code to limit the movie results based on a certain timeframe like movies released in the past 1 month or 2 months or only showtimes at certain times that the user defines. We'd also like to refine the code to skip JSON results when properties were missing. For a few zip codes, some restaurant results did not have one of the properties we wanted to display, so the code would error out.

* Adding more/better visual elements. In the future, we'd like to try and incorporate the [Open Movie Database API](http://www.omdbapi.com/) to pull in movie posters images to replace it with the movie title or specific restaurant and food pictures for the restaurant results. For now, we have placeholder images to give a sense of what's possible.
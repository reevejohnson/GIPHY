var topics = ["Aladdin", "Beauty and the Beast", "The Lion King", "Robin Hood", "Bambi", "101 Dalmatians", "The Aristocats", "Snow White", "Cinderella", "Dumbo", "The Little Mermaid", "Moana"]

function addButtons() {
    for (var i = 0; i < topics.length; i++) {
        var disneyBtn = $("<button>");
        disneyBtn.addClass("disney-button disneyMovie disney-button-color");
        disneyBtn.attr("data-disneyMovie", topics[i]);
        disneyBtn.text(topics[i]);
        $("#buttons").append(disneyBtn);
    }
};

addButtons();

$(".disney-button").on("click", function() {

    var disneyMovie = $(this).attr("data-disneyMovie");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      disneyMovie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var movieImage = $("<img>");

            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[i].images.fixed_height.url);
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
            movieImage.attr("class", "gif");
            movieImage.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(movieImage);

            $("#gif-column").prepend(gifDiv);
          }
        }
    });
});

$("body").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

function refreshButtons() {
    $("#buttons").html("");

    addButtons();

    $(".disney-button").on("click", function() {

        var disneyMovie = $(this).attr("data-disneyMovie");
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          disneyMovie + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
    
          .then(function(response) {
    
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
    
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    
                var gifDiv = $("<div class='item'>");
    
                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
    
                var movieImage = $("<img>");
    
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_height.url);
                movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                movieImage.attr("class", "gif");
                movieImage.attr("data-state", "still");
    
                gifDiv.append(p);
                gifDiv.append(movieImage);
    
                $("#gif-column").prepend(gifDiv);
              }
            }
        });
    });
}

$(".submit").on("click", function (event) {
    event.preventDefault();

    var addedDisneyMovie = $("#fmovie").val();
    topics.push(addedDisneyMovie);

    refreshButtons();

    $("#fmovie").val("");
})
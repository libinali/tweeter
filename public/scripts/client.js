
$(document).ready(function() {

  // Escape function to prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to create a tweet element
  const createTweetElement = function(tweetData) {
    const $tweet = $(`          
  <article>
    <header>
      <div class="user-info">
        <img src="${escape(tweetData.user.avatars)}" alt="profile-photo">
        <p>${escape(tweetData.user.name)}</p> 
      </div>
      <div class="username">
        <p>${escape(tweetData.user.handle)}</p>
      </div>
    </header>
    <div class="user-tweet">
      <p>${escape(tweetData.content.text)}</p>
    </div>
    <div class="underline"></div>
    <footer>
      <div class="tweet-date">
        <p>${timeago.format(tweetData.created_at)}</p>
      </div>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  // Function to render tweets on the page
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-history');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-history').prepend($tweet);
    }
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  // Load tweets on page load
  loadTweets();


  // Form submission handling
  $("#tweets-form").on("submit", function(e) {
    e.preventDefault();
  
    // Hide the error element on form submission
    $(".error-message").slideUp();

    // Get tweet content
    const tweetContent = $("#tweet-text").val();

    // Validation checks
    if (!tweetContent) {
      $(".error-message").text("⚠️ Please enter a tweet before submitting ⚠️").slideDown();
      return;
    }

    if (tweetContent.length > 140) {
      $(".error-message").text("⚠️ Tweet is too long. Maximum character limit is 140. ⚠️").slideDown();
      return;
    }

    // Serialize form data
    const formData = $(this).serialize();

    // AJAX request to submit tweet
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function(data) {
      // Reload tweets and reset form
        loadTweets();
        $("#tweet-text").val("");
        $('.counter').text(140);
      },
      error: function(error) {
        console.error(error);
      }
    });

  });

});




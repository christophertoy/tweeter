/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function (tweet) {

    const $article = $('<article>').addClass('tweets');
    const $header = $('<header>').addClass('tweet-header');
    const $img = $('<img>').attr('src', tweet.user.avatars);
    const $name = $('<p>').addClass('full-name').text(tweet.user.name);
    const $username = $('<p>').addClass('username').text(tweet.user.handle);
    const $content = $('<div>').addClass('tweet-body')
    const $tweetText = $('<p>').text(tweet.content.text)
    const $footer = $('<footer>').addClass('tweet-footer')
    const $footerData = $('<p>').text(tweet.created_at);

    $article.append($header, $content, $footer);
    $header.append($img, $name, $username);
    $content.append($tweetText);
    $footer.append($footerData);

    return $article
  }

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    }
  }


  const $postForm = $('#new-post');

  $postForm.on('submit', function(event) {
  event.preventDefault();
  $('.error-message').children().remove()
  const textArea = $('#tweet-text').val();
  if (textArea === '') {
    return $errorMessage = $('<p>').text("Tweets can't be blank!").appendTo($('.error-message')).slideDown();
  } else if (textArea.length > 140) {
    return $errorMessage = $('<p>').text("Tweet is too long! Please keep to under 140 chars!").appendTo($('.error-message')).slideDown(400)
  }
  const serializedData = $(this).serialize();

  // submit Data to server
  $.post('/tweets/', serializedData)
    .then((response) => {
      loadTweets();
      $('#tweet-text').val('');
      $('.counter').text(140);
    })
  })


  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      dataType: 'json',
      success: (tweets) => { renderTweets(tweets) }
    })
  }

  loadTweets();

});
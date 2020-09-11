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
    const $content = $('<div>').addClass('tweet-body');
    const $tweetText = $('<p>').text(tweet.content.text);
    const $footer = $('<footer>').addClass('tweet-footer');
    const $footerData = $('<p>').text(timeSince(tweet.created_at) + ' ago');
    const $icons = $('<div>').addClass('icons');


    $article.append($header, $content, $footer);
    $header.append($img, $name, $username);
    $content.append($tweetText);
    $footer.append($footerData);
    $footer.append($icons);
    $icons.append('<i class="fas fa-flag fa-lg"> </i>');
    $icons.append('<i class="fas fa-retweet fa-lg"> </i>');
    $icons.append('<i class="fas fa-heart fa-lg"> </i>');

    return $article;
  }


  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    }
  }



  const $postForm = $('#new-post');

  $postForm.on('submit', function (event) {
    event.preventDefault();
    $('.error-message').children().remove()
    const textArea = $('#tweet-text').val();
    if (textArea === '') {
      return $('<p>').text("Tweets can't be blank!").appendTo($('.error-message')).slideDown();
    } else if (textArea.length > 140) {
      return $('<p>').text("Tweet is too long! Please keep to under 140 chars!").appendTo($('.error-message')).slideDown(400);
    }
    const serializedData = $(this).serialize();

    // Submit data to server
    $.post('/tweets/', serializedData)
      .then((response) => {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
      })
  })

  // Load tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      dataType: 'json',
      success: (tweets) => { renderTweets(tweets) }
    });
  };

  loadTweets();

  // Toggle Compose Tweet on click

  $('.new-tweet').hide();
  $('.fas').click(function () {
    $('.new-tweet').toggle();
  });


  // Imported code to convert date

  const timeSince = function (date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }

    const seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }

    return interval + ' ' + intervalType;
  };

});
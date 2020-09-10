/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]


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

    // can use a hybrid approach
    //   const markup = `
    //   <article class="tweets">
    //   <header class ="tweet-header"> 
    //     <img src=${tweetData.user.avatars} /> 
    //     <p class="full-name">${tweetData.user.name}</p>
    //     <p class="username">${tweetData.user.handle}</p>
    //   </header>
    //   <div class="tweet-body">
    //     <p>${tweetData.content.text}
    //     </p>
    //   </div>
    //   <footer class="tweet-footer">
    //     <p>${tweetData.created_at}</p>
    //   </footer>
    // </article>


    //   `
    return $article
  }

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    }
  }

  // renderTweets(tweetData);

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
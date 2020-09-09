$(document).ready(function () {
  // --- our code goes here ---
  const $textarea = $('textarea');
  $textarea.on('keyup', function () {
    const characterInput = $textarea.val().length;
    const charactersLeft = 140 - characterInput;
    const characterCount = $(this).siblings().find('.counter').html(charactersLeft);


    if (charactersLeft < 0) {
      characterCount.css('color', 'red')
    } else {
      characterCount.css('color', '#545149')
    }

  })
});
$(document).ready(function() {
  $('.new-tweet form textarea').on('input', function(event) {
    const currentLength = $(this).val().length;
    const charactersRemaining = 140 - currentLength;
    const counterElement = $(this).closest('.new-tweet').find('.counter');

    counterElement.text(charactersRemaining);

    if (currentLength > 140) {
      counterElement.addClass('counter-exceeded');
    } else {
      counterElement.removeClass('counter-exceeded');
    }
  });
});

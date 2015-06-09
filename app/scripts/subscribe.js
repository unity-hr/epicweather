import fetch from './helpers/fetch-api';

var form = document.querySelector('.section-subscribe .form');

form.addEventListener('submit', function (event) {
  fetch('/subscribe', {
    method: 'post',
    body: new FormData(form)
  }).then(function (res) {
    if (res.code) {
      console.error(res.message);
    }
  });

  event.preventDefault();
});

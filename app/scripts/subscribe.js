import fetch from './helpers/fetch-api';

var form = document.querySelector('.section-subscribe .form');

var loading = form.querySelector('.form-feedback-loading');
var success = form.querySelector('.form-feedback-success');
var error = form.querySelector('.form-feedback-error');

form.addEventListener('submit', function (event) {
  loading.style.display = 'block';
  success.style.display = '';
  error.style.display = '';

  fetch('/subscribe', {
    method: 'post',
    body: new FormData(form)
  }).then(function (res) {
    loading.style.display = '';

    if (res.code) {
      console.error(res.message);
      error.style.display = 'block';
    } else {
      success.style.display = 'block';
    }
  });

  event.preventDefault();
});

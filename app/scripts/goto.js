import Velocity from 'velocity-animate';

var navHeight = document.querySelector('.navigation').offsetHeight;

document.addEventListener('click', function (event) {
  console.log(event.target);
  if (event.target.classList.contains('goto')) {
    var target = event.target.getAttribute('data-target') || event.target.getAttribute('href');
    var el = document.querySelector(target);

    history.pushState(null, null, event.target.href)

    Velocity(el, 'scroll', {
      offset: -navHeight,
      duration: 500
    });

    event.preventDefault();
  }
});

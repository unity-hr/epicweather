import skrollr from 'skrollr';
import Modernizr from 'modernizr';

var nav = document.querySelector('.navigation');

if (!Modernizr.touchevents) {
  skrollr.init({
    forceHeight: false,
    render: function (data) {
      if (data.curTop > 0) {
        nav.classList.remove('transparent');
      } else {
        nav.classList.add('transparent');
      }
    }
  });
}

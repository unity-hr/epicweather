import Flickity from 'flickity';

var container = document.querySelector('.section-epicweather .section-items');

new Flickity(container, {
  prevNextButtons: false,
  wrapAround: true,
  autoPlay: true
});

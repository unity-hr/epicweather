import Flickity from 'flickity';
import imagesLoaded from 'imagesloaded';

var container = document.querySelector('.section-epicweather .section-items');

imagesLoaded(container, function () {
  new Flickity(container, {
    prevNextButtons: false,
    wrapAround: true,
    autoPlay: true
  });
});

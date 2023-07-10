import Swiper, { Navigation, Autoplay } from 'swiper';

Swiper.use([Navigation, Autoplay]);

const swiper = new Swiper('.couches__content', {

  slidesPerView: 'auto',
  spaceBetween: 20,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.couches__slider-btn--next',
    prevEl: '.couches__slider-btn--prev',
  },
  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },
});


const mySwiper = new Swiper('.gallery__content', {

  slidesPerView: 'auto',
  spaceBetween: 20,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: 'gallery__slider-btn--next',
    prevEl: '.gallery__slider-btn--prev',
  },
  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },
});


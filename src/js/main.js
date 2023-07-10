import {asd} from './func';
import './_components';
asd();
// import Swiper, { Navigation } from 'swiper';

// Swiper.use([Navigation]);

// const swiper = new Swiper('.couches__content', {
//   slidesPerView: 'auto',
//   spaceBetween: 40,

//   navigation: {
//     nextEl: '.couches__slider-btn--next',
//     prevEl: '.couches__slider-btn--prev',
//   },
// });

// // форма
// const validation = new JustValidate('#form',

// {
// errorLabelStyle: {
//   color: '#FF3030',
// },

// });

// validation
// .addField('#name', [
// {
//   rule: 'minLength',
//   value: 3,
//   errorMessage: 'Минимум 3 символа'
// },
// {
//   rule: 'maxLength',
//   value: 30,
// },
// {
//   rule: 'required',
//   value: true,
//   errorMessage: 'Введите имя!'
//  }
// ])
// .addField('#email', [
// {
//   rule: 'required',
//   errorMessage: 'Email обязателен',
// },
// {
//   rule: 'email',
//   value: true,
//   errorMessage: 'Недопустимый формат',
// },
// ])
// .onSuccess((event) => {
// console.log('Validation passes and form submitted', event);

// let formData = new FormData(event.target);

// console.log(...formData);

// let xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log('Отправлено');
//     }
//   }
// }

// xhr.open('POST', 'mail.php', true);
// xhr.send(formData);

// event.target.reset();
// // });



// //burger
// let burger = document.querySelector('.burger');
// let menu = document.querySelector('.nav');
// let menuLinks = document.querySelectorAll('.nav__link');
// let closeBurger = document.querySelector('.burger__close');

// burger.addEventListener('click',function () {
//     burger.classList.toggle('burger--active');
//     menu.classList.toggle('nav--active');
//     document.body.classList.toggle('stop-scroll');
//   });

// menuLinks.forEach(function (el) {
//   el.addEventListener('click', function () {
//     burger.classList.remove('burger--active');
//     menu.classList.remove('nav--active');
//     document.body.classList.remove('stop-scroll');

//   });
// });
// closeBurger.addEventListener('click', function(){
//   burger.classList.remove('burger--active');
//   menu.classList.remove('nav--active');
//   document.body.classList.remove('stop-scroll');
// })



// lazyload();

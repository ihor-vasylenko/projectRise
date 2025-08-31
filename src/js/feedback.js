import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Raty from 'raty-js';
import 'css-star-rating/css/star-rating.css';

import { getFeedbacks } from './api.js';

async function initFeedbacks() {
  const { data: feedbacks } = await getFeedbacks({ limit: 10, page: 1 });

  const wrapper = document.querySelector('.swiper-wrapper');

  wrapper.innerHTML = feedbacks
    .map(
      item => `
        <div class="swiper-slide">
        <div class="rating" data-score="${item.rating}"></div>
          <p>${item.descr}</p>
          <h3>${item.name}</h3>
        </div>
      `
    )
    .join('');

  //  raty-js
  document.querySelectorAll('[data-raty]').forEach(el => {
    new Raty(el, {
      starType: 'i',
      readOnly: true,
      score: el.dataset.score,
    });
  });
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove: true,

    pagination: {
      el: '.swiper-pagination',
      renderBullet: function (index, className) {
        if (index === 0) return `<span class="${className} first-dot"></span>`;
        else if (index === 1)
          return `<span class="${className} middle-dot"></span>`;
        else if (index === 2)
          return `<span class="${className} last-dot"></span>`;
        return '';
      },
    },
    breakpoints: {},
  });
}

initFeedbacks();

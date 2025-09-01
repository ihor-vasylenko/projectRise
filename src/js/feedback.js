import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import Raty from 'raty-js';

import { getFeedbacks } from './api.js';

async function initFeedbacks() {
  const { data: feedbacks } = await getFeedbacks({ limit: 10, page: 1 });

  const wrapper = document.querySelector('.swiper-wrapper');

  wrapper.innerHTML = feedbacks
    .map(
      // the rating string with *STARS* just for easier css styles, remove when actual stars appears.
      item => `
    <div class="swiper-slide">
      <div class="feedback-slide">
        <div class="rating" data-score="${item.rating}">*STARS*</div>
        <p class="feedback-text">${item.descr}</p>
        <h4 class="feedback-name">${item.name}</h4>
      </div>
    </div>
      `
    ).join('');


   // raty-js
  document.querySelectorAll('[data-raty]').forEach(el => {
    new Raty(el, {
      starType: 'i',
		 readOnly: true,
		 score: el.dataset.score,
	 });
  });

  const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove: true,
    on: {
      init() {
        createCustomPagination(this);
        updateCustomPagination(this);
      },
      slideChange() {
        updateCustomPagination(this);
      },
    },
  });
}

function createCustomPagination(swiper) {
  const pagination = document.querySelector('.swiper-pagination');
  pagination.innerHTML = '';

  const dots = ['first', 'middle', 'last'];
  dots.forEach(type => {
    const dot = document.createElement('button');
    dot.classList.add('custom-dot', `dot-${type}`);
    dot.setAttribute('type', 'button');
    dot.addEventListener('click', () => {
      if (type === 'first') swiper.slideTo(0);
      if (type === 'middle')
        swiper.slideTo(Math.floor(swiper.slides.length / 2));
      if (type === 'last') swiper.slideTo(swiper.slides.length - 1);
    });
    pagination.appendChild(dot);
  });
}

function updateCustomPagination(swiper) {
  const dots = document.querySelectorAll('.custom-dot');
  dots.forEach(dot => dot.classList.remove('active'));

  if (swiper.realIndex === 0) {
    document.querySelector('.dot-first').classList.add('active');
  } else if (swiper.realIndex === swiper.slides.length - 1) {
    document.querySelector('.dot-last').classList.add('active');
  } else {
    document.querySelector('.dot-middle').classList.add('active');
  }
}

initFeedbacks();

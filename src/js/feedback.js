import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Raty from 'raty-js';
import { getFeedbacks } from './api.js';

const feedbacks = await getFeedbacks({ limit: 10, page: 1 });
console.log(feedbacks);

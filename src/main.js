import { mobileMenu } from './js/header';

mobileMenu();

import './js/api.js';
import './js/artists.js';

import { initArtistModal } from './js/artists-details-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtistModal();
});

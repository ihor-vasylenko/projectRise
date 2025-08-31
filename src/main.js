import { getArtists } from './js/api.js';
import { openArtistModal } from './js/artists-details-modal.js';

// async function init() {
//   try {
//     const { artists } = await getArtists({ limit: 10, page: 1 });

//     const list = document.querySelector('#artists-list');
//     list.innerHTML = artists
//       .map(
//         a => `
//       <li data-id="${a._id}" class="artist-item">
//         <img src="${a.strArtistThumb}" alt="${a.strArtist}" />
//         <p>${a.strArtist}</p>
//       </li>
//     `
//       )
//       .join('');

//     // Клік по артисту -> відкриває модалку
//     list.addEventListener('click', e => {
//       const item = e.target.closest('.artist-item');
//       if (!item) return;
//       const id = item.dataset.id;
//       openArtistModal(id);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// init();

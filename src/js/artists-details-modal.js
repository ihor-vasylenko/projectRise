import { getArtistDetailsWithAlbums } from './api.js';

const modal = document.querySelector('#artist-modal');
const modalContent = modal.querySelector('.modal-content');
const overlay = document.querySelector('.modal-overlay');

/**
 * Відкрити модальне вікно з деталями артиста
 * @param {string} artistId - ID артиста
 */
export async function openArtistModal(artistId) {
  try {
    const artist = await getArtistDetailsWithAlbums(artistId);

    modalContent.innerHTML = `
      <button class="modal-close">&times;</button>
      
      <h2 class="artist-name">${artist.strArtist}</h2>
      
      <div class="artist-header">
        <div class="artist-image">
          <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
        </div>
        <div class="artist-details">
          <p><strong>Years active:</strong> ${artist.intBornYear || ''}–${
      artist.intDiedYear || 'present'
    }</p>
          <p><strong>Sex:</strong> ${artist.strGender || '-'}</p>
          <p><strong>Members:</strong> ${artist.intMembers || '-'}</p>
          <p><strong>Country:</strong> ${artist.strCountry || '-'}</p>
        </div>
      </div>

      <div class="artist-bio">
        <h3>Biography</h3>
        <p>${artist.strBiographyEN || 'No biography available.'}</p>
      </div>

      <div class="artist-genres">
        ${(artist.genres || [])
          .map(g => `<span class="tag">${g}</span>`)
          .join('')}
      </div>

      <h3>Albums</h3>
      <div class="albums-list">
        ${artist.albumsList
          .map(
            album => `
          <div class="album">
            <h4>${album.strAlbum}</h4>
            <ul class="tracks">
              ${album.tracks
                .map(
                  track => `
                  <li>
                    ${track.strTrack} 
                    <span class="duration">${track.intDuration || ''}</span>
                  </li>`
                )
                .join('')}
            </ul>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    modal.classList.add('open');
    overlay.classList.add('open');

    modalContent
      .querySelector('.modal-close')
      .addEventListener('click', closeArtistModal, { once: true });
    overlay.addEventListener('click', closeArtistModal, { once: true });
  } catch (error) {
    console.error('Помилка завантаження артиста:', error);
  }
}

/**
 * Закрити модальне вікно
 */
export function closeArtistModal() {
  modal.classList.remove('open');
  overlay.classList.remove('open');
}

import { getArtists, getArtistById } from './js/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const modal = document.getElementById('artist-modal');
  const overlay = document.getElementById('artist-modal-overlay');
  const closeBtn = document.getElementById('artist-modal-close');
  const artistsContainer = document.querySelector('#artists-list'); // контейнер у artists.html

  // --- Рендер артистів ---
  try {
    const artists = await getArtists();
    artistsContainer.innerHTML = artists
      .map(
        artist => `
      <div class="artist-card">
        <img src="${artist.photo}" alt="${artist.name}" />
        <h3>${artist.name}</h3>
        <button class="open-artist-modal" data-id="${artist._id}">Детальніше</button>
      </div>
    `
      )
      .join('');
  } catch (err) {
    console.error(err);
    artistsContainer.innerHTML = '<p>Не вдалося завантажити артистів</p>';
  }

  // --- Відкриття модалки ---
  artistsContainer.addEventListener('click', async e => {
    const btn = e.target.closest('.open-artist-modal');
    if (!btn) return;

    const id = btn.dataset.id;
    try {
      const artist = await getArtistById(id);
      fillModal(artist); // функція для заповнення HTML
      modal.setAttribute('aria-hidden', 'false');
    } catch (err) {
      console.error('Не вдалося завантажити артиста', err);
    }
  });

  // --- Закриття модалки ---
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    overlay.removeEventListener('click', closeModal);
    closeBtn.removeEventListener('click', closeModal);
  }
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
});

// --- Функція наповнення модалки ---
function fillModal(artist) {
  const modalContent = document.querySelector('#artist-modal .modal-content');

  modalContent.innerHTML = `
    <button class="modal-close" id="artist-modal-close">&times;</button>
    <h2 class="artist-name">${artist.name}</h2>
    <div class="artist-image">
      <img src="${artist.photo}" alt="${artist.name}" />
    </div>
    <ul class="artist-info">
      <li><strong>Years active:</strong> 
        ${
          artist.startYear
            ? `${artist.startYear} – ${artist.endYear || 'present'}`
            : 'information missing'
        }
      </li>
      ${artist.gender ? `<li><strong>Sex:</strong> ${artist.gender}</li>` : ''}
      ${
        artist.members
          ? `<li><strong>Members:</strong> ${artist.members}</li>`
          : ''
      }
      <li><strong>Country:</strong> ${artist.country}</li>
    </ul>
    <div class="artist-bio">
      <h3>Biography</h3>
      <p>${artist.history}</p>
    </div>
    <div class="artist-genres">
      ${artist.genres.map(g => `<span>${g}</span>`).join(' ')}
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      ${artist.albums
        .map(
          album => `
        <div class="album">
          <h4>${album.title}</h4>
          <table>
            <thead>
              <tr><th>Title</th><th>Duration</th><th>Link</th></tr>
            </thead>
            <tbody>
              ${album.songs
                .map(
                  song => `
                <tr>
                  <td>${song.title}</td>
                  <td>${song.duration}</td>
                  <td>${
                    song.youtubeLink
                      ? `<a href="${song.youtubeLink}" target="_blank">▶</a>`
                      : '-'
                  }</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

export function initArtistModal() {
  const modal = document.getElementById('artist-modal');
  const overlay = document.getElementById('artist-modal-overlay');
  const closeBtn = document.getElementById('artist-modal-close');

  const nameEl = modal.querySelector('.artist-name');
  const imageEl = modal.querySelector('.artist-image img');
  const infoEl = modal.querySelector('.artist-info');
  const bioEl = modal.querySelector('.artist-bio p');
  const genresEl = modal.querySelector('.artist-genres');
  const albumsEl = modal.querySelector('.artist-albums');

  let lastFocusedElement = null; // збережемо, хто відкрив модалку

  const getYoutubeLink = vid => {
    if (!vid) return '';
    return vid.startsWith('http')
      ? vid
      : `https://www.youtube.com/watch?v=${vid}`;
  };

  const formatDuration = ms => {
    if (!ms || isNaN(ms)) return '-';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  document.addEventListener('artists:open', async e => {
    const { id, fetchDetails } = e.detail;

    try {
      const artist = await fetchDetails();

      nameEl.textContent = artist.strArtist || 'Unknown Artist';
      imageEl.src = artist.strArtistThumb || '';
      imageEl.alt = artist.strArtist || 'Artist';

      infoEl.innerHTML = `
        <li><strong>Years active:</strong> ${artist.intFormedYear || 'N/A'} – ${
        artist.strDisbanded || 'present'
      }</li>
        <li><strong>Sex:</strong> ${artist.strGender || 'N/A'}</li>
        <li><strong>Members:</strong> ${artist.intMembers || 'N/A'}</li>
        <li><strong>Country:</strong> ${artist.strCountry || 'N/A'}</li>
      `;

      bioEl.textContent = artist.strBiographyEN || 'No biography available.';

      genresEl.innerHTML = (artist.genres || [])
        .map(g => `<span>${g}</span>`)
        .join('');

      if (artist.albumsList && artist.albumsList.length > 0) {
        albumsEl.innerHTML = artist.albumsList
          .map(album => {
            const tracksMarkup =
              Array.isArray(album.tracks) && album.tracks.length > 0
                ? album.tracks
                    .map(
                      track => `
            <div class="track-row">
              <span class="track-title">${track.strTrack || 'N/A'}</span>
              <span class="track-duration">${formatDuration(
                track.intDuration
              )}</span>
              ${
                track.movie
                  ? `<a href="${getYoutubeLink(
                      track.movie
                    )}" target="_blank" rel="noopener noreferrer" class="track-link">▶</a>`
                  : '<span style="opacity: 0.5;">—</span>'
              }
            </div>
          `
                    )
                    .join('')
                : '<p>No tracks</p>';

            return `
      <div class="album">
        <h4>${album.strAlbum || 'Untitled'}</h4>
        ${tracksMarkup}
      </div>
    `;
          })
          .join('');
      } else {
        albumsEl.innerHTML = '<p>No albums found</p>';
      }

      openModal();
    } catch (err) {
      console.error('Modal error:', err);
    }
  });

  function openModal() {
    lastFocusedElement = document.activeElement; // зберегли останній фокус
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
    closeBtn.focus(); // одразу сфокусуємось на кнопці закриття
  }

  function closeModal() {
    if (document.activeElement) {
      document.activeElement.blur(); // знімаємо фокус з кнопки
    }
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.classList.remove('no-scroll');

    if (lastFocusedElement) {
      lastFocusedElement.focus(); // повертаємо фокус назад
    }
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

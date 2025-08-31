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

      albumsEl.innerHTML = '<h3>Albums</h3>';

      if (artist.albumsList && artist.albumsList.length > 0) {
        albumsEl.innerHTML += artist.albumsList
          .map(
            album => `
            <div class="album">
              <h4>${album.strAlbum || 'Untitled'}</h4>
              ${
                Array.isArray(album.tracks) && album.tracks.length > 0
                  ? `
                    <table>
                      <thead>
                        <tr><th>Title</th><th>Duration</th><th>Link</th></tr>
                      </thead>
                      <tbody>
                        ${album.tracks
                          .map(
                            track => `
                            <tr>
                              <td>${track.strTrack || 'N/A'}</td>
                              <td>${formatDuration(track.intDuration)}</td>
                              <td>${
                                track.movie
                                  ? `<a href="${getYoutubeLink(
                                      track.movie
                                    )}" target="_blank" rel="noopener noreferrer">▶</a>`
                                  : '<span style="opacity: 0.5;">—</span>'
                              }</td>
                            </tr>
                          `
                          )
                          .join('')}
                      </tbody>
                    </table>
                  `
                  : '<p>No tracks</p>'
              }
            </div>
          `
          )
          .join('');
      } else {
        albumsEl.innerHTML += '<p>No albums found</p>';
      }

      openModal();
    } catch (err) {
      console.error('Modal error:', err);
    }
  });

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

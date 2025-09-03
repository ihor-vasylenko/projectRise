import {
  getArtists,
  getArtistDetailsWithAlbums,
  getArtistById,
} from './api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import spriteUrl from '../img/icons.svg?url';

iziToast.settings({
  position: 'topRight',
  timeout: 4500,
  closeOnClick: true,
  progressBar: true,
  transitionIn: 'fadeInUp',
  transitionOut: 'fadeOut',
});

const toast = {
  error(message = 'Something went wrong. Please try again.') {
    iziToast.error({
      title: 'Error',
      message,
      backgroundColor: 'var(--color-affair-dark)',
      titleColor: 'var(--color-white)',
      messageColor: 'var(--opacity-white-60)',
      progressBarColor: 'var(--color-affair-light)',
      overlay: false,
    });
  },
};

function getAxiosErrorMessage(err) {
  if (err?.response) {
    const serverMsg =
      err.response.data?.message || err.response.data?.error || err.message;
    return `Server error: ${serverMsg}`;
  }
  if (err?.request) {
    return 'Network error: no response from server.';
  }
  return err?.message || 'Unexpected error.';
}

const refs = { list: null, loadMore: null };

const STATE = {
  page: 1,
  limit: 8,
  total: 0,
  loading: false,
  lastBatchCount: 0,
};

document.addEventListener('DOMContentLoaded', () => {
  refs.list = document.getElementById('artists-list');
  refs.loadMore = document.getElementById('artists-load-more');
  if (!refs.list || !refs.loadMore) {
    console.warn('[Artists] Section markup not found');
    return;
  }
  init();
});

function init() {
  loadFirstPage();
  refs.loadMore.addEventListener('click', onLoadMore);
  refs.list.addEventListener('click', onCardClick);
}

async function loadFirstPage() {
  STATE.page = 1;
  refs.list.innerHTML = '';
  await loadPage(STATE.page);
}

async function onLoadMore() {
  await loadPage(STATE.page + 1);
}

async function loadPage(page) {
  if (STATE.loading) return;
  setLoading(true);
  try {
    const payload = await getArtists({ page, limit: STATE.limit });

    const {
      items,
      page: realPage,
      limit,
      total,
    } = normalizeListPayload(payload, page, STATE.limit);

    STATE.page = realPage;
    STATE.limit = limit;
    STATE.total = total;
    STATE.lastBatchCount = items.length;

    renderCards(items);
    updateLoadMoreVisibility();
    showEmptyIfNeeded();
  } catch (err) {
    console.error(err);
    toast.error(getAxiosErrorMessage(err));
  } finally {
    setLoading(false);
  }
}

function normalizeListPayload(payload, fallbackPage, fallbackLimit) {
  const arr = Array.isArray(payload?.artists) ? payload.artists : [];
  const total = Number(payload?.totalArtists ?? 0) || 0;
  const page = Number(payload?.page ?? fallbackPage) || fallbackPage;
  const limit = Number(payload?.limit ?? fallbackLimit) || fallbackLimit;

  return {
    items: arr.map(mapArtistBase),
    total,
    page,
    limit,
  };
}

function mapArtistBase(raw) {
  const id = raw._id;
  const name = raw.strArtist;
  const photo = raw.strArtistThumb || '';
  const genres = Array.isArray(raw.genres) ? raw.genres.filter(Boolean) : [];
  const short = raw.strBiographyEN || '';
  return { id, name, photo, genres, short };
}

function renderCards(items) {
  const markup = items.map(cardTemplate).join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function cardTemplate(a) {
  const tags = (a.genres || [])
    .map(g => `<span class="tag">${escapeHtml(g)}</span>`)
    .join('');
  return `
    <li class="artist-card" data-id="${a.id}">
      ${
        a.photo
          ? `<img class="artist-cover" src="${a.photo}" alt="${escapeHtml(
              a.name
            )}" loading="lazy" />`
          : ''
      }
      <div class="tags">${tags}</div>
      <h4 class="artist-name-section">${escapeHtml(a.name)}</h4>
      <p class="artist-desc">${escapeHtml(a.short)}</p>
      <div class="card-actions">
        <button class="link-more" type="button" data-learn-more>
          Learn More
          <svg class="icon-learn-more" width="24" height="24" aria-hidden="true">
            <use href="${spriteUrl}#icon-filled-arrow"></use>
          </svg>
        </button>
      </div>
    </li>
  `;
}

function updateLoadMoreVisibility() {
  if (!refs.loadMore) return;
  const totalLoaded = refs.list.children.length;
  const finished = STATE.total > 0 && totalLoaded >= STATE.total;
  refs.loadMore.hidden = false;
  refs.loadMore.disabled = finished || STATE.loading;
}

function showEmptyIfNeeded() {
  if (refs.list.children.length === 0) {
    refs.list.innerHTML = `<li class="artists-empty">No artists found</li>`;
  }
}

function setLoading(flag) {
  STATE.loading = flag;
  if (refs.loadMore) refs.loadMore.disabled = flag || refs.loadMore.hidden;
}

function onCardClick(e) {
  const btn = e.target.closest('[data-learn-more]');
  if (!btn) return;
  const card = e.target.closest('.artist-card');
  const id = card?.dataset.id;
  if (!id) return;

  const ev = new CustomEvent('artists:open', {
    bubbles: true,
    detail: {
      id,
      fetchDetails: async () => {
        try {
          return await getArtistDetailsWithAlbums(id);
        } catch {
          return await getArtistById(id);
        }
      },
    },
  });

  card.dispatchEvent(ev);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const BASE_URL = 'https://sound-wave.b.goit.study/api';

export async function getArtists() {
  const res = await fetch(`${BASE_URL}/artists`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}

export async function getArtists() {
  const res = await fetch(`${BASE_URL}/artists`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  const data = await res.json();
  return data.results; // саме тут масив артистів
}

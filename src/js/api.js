const BASE_URL = 'https://sound-wave.b.goit.study/api';

export async function getArtists() {
  const res = await fetch(`${BASE_URL}/artists`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}

export async function getArtistById(id) {
  const res = await fetch(`${BASE_URL}/artists/${id}`);
  if (!res.ok) throw new Error('Failed to fetch artist');
  return res.json();
}
// const mockArtists = [
//   {
//     _id: '1',
//     name: 'Linkin Park',
//     photo: 'https://i.imgur.com/nX2K6fT.jpg',
//     country: 'USA',
//     startYear: 1996,
//     endYear: 2017,
//     gender: 'Band',
//     members:
//       'Chester Bennington, Mike Shinoda, Brad Delson, Dave Farrell, Rob Bourdon, Joe Hahn',
//     genres: ['Nu Metal', 'Alternative Rock'],
//     history:
//       'Linkin Park — американський рок-гурт, заснований у 1996 році. Відомі поєднанням альтернативного року з електронікою та репом.',
//     albums: [
//       {
//         title: 'Hybrid Theory',
//         songs: [
//           {
//             title: 'In the End',
//             duration: '3:36',
//             youtubeLink: 'https://youtu.be/eVTXPUF4Oz4',
//           },
//           {
//             title: 'Crawling',
//             duration: '3:29',
//             youtubeLink: 'https://youtu.be/Gd9OhYroLN0',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     _id: '2',
//     name: 'Imagine Dragons',
//     photo: 'https://i.imgur.com/TKz3Vpi.jpg',
//     country: 'USA',
//     startYear: 2008,
//     gender: 'Band',
//     members: 'Dan Reynolds, Wayne Sermon, Ben McKee, Daniel Platzman',
//     genres: ['Pop Rock', 'Alternative Rock'],
//     history: 'Imagine Dragons — американський поп-рок гурт із Лас-Вегаса.',
//     albums: [
//       {
//         title: 'Night Visions',
//         songs: [
//           {
//             title: 'Radioactive',
//             duration: '3:06',
//             youtubeLink: 'https://youtu.be/ktvTqknDobU',
//           },
//           {
//             title: 'Demons',
//             duration: '2:57',
//             youtubeLink: 'https://youtu.be/mWRsgZuwf_8',
//           },
//         ],
//       },
//     ],
//   },
// ];

// // --- Функції ---
// export async function getArtists() {
//   // імітація запиту
//   return new Promise(resolve => {
//     setTimeout(() => resolve(mockArtists), 500);
//   });
// }

// export async function getArtistById(id) {
//   return mockArtists.find(a => a._id === id);
// }

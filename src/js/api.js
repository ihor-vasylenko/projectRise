// Імпортуємо axios для зручних HTTP-запитів
import axios from 'axios';

// Встановлюємо базовий URL для всіх запитів до API
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

// --- ОСНОВНІ ФУНКЦІЇ ---

/**
 * Отримує список виконавців з можливістю фільтрації, сортування та пагінації.
 * @param {object} [params={}] - Об'єкт з параметрами запиту (limit, page, name, sortName, genre).
 * @returns {Promise<Array>} Проміс, який повертає масив об'єктів виконавців.
 */
export const getArtists = async (params = {}) => {
  try {
    const response = await axios.get('/artists', { params });
    return response.data;
  } catch (error) {
    console.error('Помилка під час завантаження виконавців:', error);
    throw error; // Прокидаємо помилку для обробки в UI (показ повідомлення)
  }
};

/**
 * Отримує список відгуків з пагінацією.
 * @param {object} [params={}] - Об'єкт з параметрами запиту (limit, page).
 * @returns {Promise<Object>} Проміс, який повертає об'єкт з даними { data: [], total, page, limit }.
 */
export const getFeedbacks = async (params = {}) => {
  try {
    const response = await axios.get('/feedbacks', { params });
    return response.data;
  } catch (error) {
    console.error('Помилка під час завантаження відгуків:', error);
    throw error;
  }
};

/**
 * Отримує інформацію про одного виконавця та загальний список його треків (без групування по альбомах).
 * @param {string} id - Унікальний ідентифікатор виконавця.
 * @returns {Promise<Object|null>} Проміс, який повертає об'єкт виконавця з ключем `tracksList`.
 */
export const getArtistById = async id => {
  try {
    const response = await axios.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка під час завантаження виконавця з id ${id}:`, error);
    throw error;
  }
};

/**
 * Отримує повну інформацію про виконавця, включаючи список його альбомів та треків, згрупованих по альбомах.
 * Це основна функція для заповнення модального вікна згідно ТЗ.
 * @param {string} id - Унікальний ідентифікатор виконавця.
 * @returns {Promise<Object|null>} Проміс, який повертає повний об'єкт виконавця з ключем `albumsList`.
 */
export const getArtistDetailsWithAlbums = async id => {
  try {
    const response = await axios.get(`/artists/${id}/albums`);
    return response.data;
  } catch (error) {
    console.error(
      `Помилка під час завантаження альбомів для виконавця з id ${id}:`,
      error
    );
    throw error;
  }
};

// ФУНКЦІЇ ДЛЯ ДОДАТКОВИХ ЗАВДАНЬ (закоментовано на майбутнє)

// /**
//  * Отримує список усіх музичних жанрів для фільтра.
//  * @returns {Promise<Array<Object>>} Проміс, який повертає масив об'єктів жанрів (напр., [{_id: '...', genre: 'Rock'}]).
//  */
// export const getGenres = async () => {
//   try {
//     const response = await axios.get('/genres');
//     return response.data;
//   } catch (error) {
//     console.error('Помилка під час завантаження жанрів:', error);
//     throw error;
//   }
// };

// /**
//  * Надсилає новий відгук на сервер.
//  * Важливо: валідацію даних потрібно проводити ПЕРЕД викликом цієї функції.
//  * @param {object} feedbackData - Об'єкт з даними відгуку.
//  * @param {string} feedbackData.name - Ім'я користувача (2-16 символів).
//  * @param {number} feedbackData.rating - Рейтинг (від 1 до 5).
//  * @param {string} feedbackData.descr - Текст відгуку (10-512 символів).
//  * @returns {Promise<Object>} Проміс, який повертає об'єкт з повідомленням про успіх (напр., { message: "..." }).
//  */
// export const postFeedback = async (feedbackData) => {
//   try {
//     const response = await axios.post('/feedbacks', feedbackData);
//     return response.data;
//   } catch (error) {
//     console.error('Помилка під час відправки відгуку:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

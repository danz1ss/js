function validateForm() {
  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const releaseYear = document.getElementById("releaseYear").value.trim();

  if (!title) {
    alert("Пожалуйста, введите название фильма");
    return false;
  }

  if (!genre) {
    alert("Пожалуйста, введите жанр фильма");
    return false;
  }

  if (!releaseYear) {
    alert("Пожалуйста, введите год выпуска");
    return false;
  }

  return true;
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const releaseYear = document.getElementById("releaseYear").value.trim();
  const isWatched = document.getElementById("isWatched").checked;

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };

  addFilm(film);
}

async function addFilm(film) {
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
    body: JSON.stringify(film),
  });
  
  // Очистка формы после успешного добавления
  document.getElementById("film-form").reset();
  
  renderTable();
}

// Функция для получения фильмов с фильтрацией
async function getFilms() {
  const filterTitle = document.getElementById("filter-title").value.trim();
  const filterGenre = document.getElementById("filter-genre").value.trim();
  const filterYear = document.getElementById("filter-year").value.trim();
  const filterWatched = document.getElementById("filter-watched").value;

  // Формируем URL с параметрами запроса
  let url = "https://sb-film.skillbox.cc/films?";
  const params = [];

  if (filterTitle) params.push(`title=${encodeURIComponent(filterTitle)}`);
  if (filterGenre) params.push(`genre=${encodeURIComponent(filterGenre)}`);
  if (filterYear) params.push(`releaseYear=${encodeURIComponent(filterYear)}`);
  if (filterWatched) params.push(`isWatched=${filterWatched}`);

  url += params.join("&");

  const filmsResponse = await fetch(url, {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  
  return await filmsResponse.json();
}

async function renderTable() {
  const films = await getFilms();
  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td>
        <button class="delete-btn" onclick="deleteFilm('${film.id}')">Удалить</button>
      </td>
    `;
    filmTableBody.appendChild(row);
  });
}

// Удаление одного фильма
async function deleteFilm(filmId) {
  if (!confirm("Вы уверены, что хотите удалить этот фильм?")) {
    return;
  }

  await fetch(`https://sb-film.skillbox.cc/films/${filmId}`, {
    method: "DELETE",
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });

  renderTable();
}

// Удаление всех фильмов
async function deleteAllFilms() {
  if (!confirm("Вы уверены, что хотите удалить ВСЕ фильмы?")) {
    return;
  }

  await fetch("https://sb-film.skillbox.cc/films", {
    method: "DELETE",
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });

  renderTable();
}

// Обработчики событий
document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

document
  .getElementById("delete-all-btn")
  .addEventListener("click", deleteAllFilms);

// Обработчики для фильтров
document.getElementById("filter-title").addEventListener("input", renderTable);
document.getElementById("filter-genre").addEventListener("input", renderTable);
document.getElementById("filter-year").addEventListener("input", renderTable);
document.getElementById("filter-watched").addEventListener("change", renderTable);

// Display films on load
renderTable();
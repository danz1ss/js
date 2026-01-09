const movieForm = document.getElementById('movieForm');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const watchedInput = document.getElementById('watched');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const moviesTableBody = document.getElementById('moviesTableBody');
const sortSelect = document.getElementById('sortSelect');
const sortBtn = document.getElementById('sortBtn');

let movies = [];
let editingIndex = -1;

function loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
        movies = JSON.parse(storedMovies);
        renderMovies();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

function renderMovies() {
    moviesTableBody.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>${movie.watched ? 'Да' : 'Нет'}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editMovie(${index})">Редактировать</button>
                    <button class="delete-btn" onclick="deleteMovie(${index})">Удалить</button>
                </div>
            </td>
        `;
        moviesTableBody.appendChild(row);
    });
}

// Валидация формы
function validateForm() {
    if (!titleInput.value.trim()) {
        alert('Пожалуйста, введите название фильма');
        return false;
    }
    
    if (!genreInput.value.trim()) {
        alert('Пожалуйста, введите жанр фильма');
        return false;
    }
    
    if (!yearInput.value || yearInput.value < 1900 || yearInput.value > 2100) {
        alert('Пожалуйста, введите корректный год выпуска');
        return false;
    }
    
    return true;
}

// Добавление/обновление фильма
movieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const movie = {
        title: titleInput.value.trim(),
        genre: genreInput.value.trim(),
        year: parseInt(yearInput.value),
        watched: watchedInput.checked
    };
    
    if (editingIndex === -1) {
        // Добавление нового фильма
        movies.push(movie);
    } else {
        // Обновление существующего
        movies[editingIndex] = movie;
        editingIndex = -1;
        submitBtn.textContent = 'Добавить';
        cancelBtn.style.display = 'none';
    }
    
    saveToLocalStorage();
    renderMovies();
    movieForm.reset();
});

// Редактирование фильма
function editMovie(index) {
    const movie = movies[index];
    
    titleInput.value = movie.title;
    genreInput.value = movie.genre;
    yearInput.value = movie.year;
    watchedInput.checked = movie.watched;
    
    editingIndex = index;
    submitBtn.textContent = 'Обновить';
    cancelBtn.style.display = 'inline-block';
    
    // Прокрутка к форме
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Отмена редактирования
cancelBtn.addEventListener('click', function() {
    movieForm.reset();
    editingIndex = -1;
    submitBtn.textContent = 'Добавить';
    cancelBtn.style.display = 'none';
});

// Удаление фильма
function deleteMovie(index) {
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
        movies.splice(index, 1);
        saveToLocalStorage();
        renderMovies();
        
        // Если удаляем фильм, который редактируем
        if (editingIndex === index) {
            movieForm.reset();
            editingIndex = -1;
            submitBtn.textContent = 'Добавить';
            cancelBtn.style.display = 'none';
        } else if (editingIndex > index) {
            editingIndex--;
        }
    }
}

// Сортировка фильмов
sortBtn.addEventListener('click', function() {
    const sortBy = sortSelect.value;
    
    movies.sort((a, b) => {
        if (sortBy === 'year') {
            return a.year - b.year;
        } else {
            return a[sortBy].localeCompare(b[sortBy]);
        }
    });
    
    saveToLocalStorage();
    renderMovies();
});

// Загрузка данных при старте
loadMovies();
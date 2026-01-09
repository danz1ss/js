// Массив книг
const books = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "Над пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети"
];

// Получаем элементы DOM
const bookList = document.querySelector('.book-list');
const addBtn = document.querySelector('.add-btn');
const searchBtn = document.querySelector('.search-btn');

// Функция отображения списка книг
function displayBooks() {
    bookList.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        const li = document.createElement('li');
        li.textContent = books[i];
        bookList.append(li);
    }
}

// Функция добавления книги
function addBook() {
    const bookName = prompt('Введите название книги:');
    
    if (bookName === null || bookName.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    
    books.push(bookName.trim());
    displayBooks();
}

// Функция поиска книги
function searchBook() {
    const searchQuery = prompt('Введите название книги для поиска:');
    
    if (searchQuery === null || searchQuery.trim() === '') {
        displayBooks();
        return;
    }
    
    let found = false;
    const listItems = bookList.querySelectorAll('li');
    
    for (let i = 0; i < books.length; i++) {
        if (books[i].toLowerCase().includes(searchQuery.toLowerCase())) {
            listItems[i].classList.add('highlight');
            found = true;
        } else {
            listItems[i].classList.remove('highlight');
        }
    }
    
    if (!found) {
        alert('Книга не найдена!');
        displayBooks();
    }
}

// Обработчики событий
addBtn.addEventListener('click', addBook);
searchBtn.addEventListener('click', searchBook);

// Первоначальное отображение списка
displayBooks();
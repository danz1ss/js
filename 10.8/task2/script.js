// Получаем элементы DOM
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const dynamicList = document.getElementById('dynamicList');

// Функция для добавления элемента списка
function addListItem() {
    // Создаем новый элемент списка
    const newItem = document.createElement('li');
    newItem.textContent = 'Новый элемент списка';
    
    // Добавляем элемент в список
    dynamicList.appendChild(newItem);
}

// Функция для удаления последнего элемента списка
function removeListItem() {
    // Проверяем, есть ли элементы в списке
    if (dynamicList.children.length > 0) {
        // Удаляем последний элемент
        dynamicList.removeChild(dynamicList.lastElementChild);
    } else {
        alert('Список пуст! Нечего удалять.');
    }
}

// Добавляем обработчики событий
addBtn.addEventListener('click', addListItem);
removeBtn.addEventListener('click', removeListItem);
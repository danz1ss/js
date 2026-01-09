// Массив роста учеников
const heights = [164, 157, 160, 143, 170];

// Получаем элементы DOM
const heightList = document.querySelector('.height-list');
const addBtn = document.querySelector('.add-btn');
const filterBtn = document.querySelector('.filter-btn');

// Функция отображения списка роста
function displayHeights(heightsToDisplay = heights) {
    heightList.innerHTML = '';
    for (let i = 0; i < heightsToDisplay.length; i++) {
        const li = document.createElement('li');
        li.textContent = heightsToDisplay[i];
        heightList.append(li);
    }
}

// Функция добавления роста
function addHeight() {
    const heightInput = prompt('Введите рост ученика (см):');
    
    if (heightInput === null || heightInput.trim() === '') {
        alert('Рост не введён!');
        return;
    }
    
    const height = Number(heightInput);
    
    if (isNaN(height) || height <= 0) {
        alert('Введите корректное значение роста!');
        return;
    }
    
    heights.push(height);
    displayHeights();
}

// Функция фильтрации по минимальному значению
function filterHeights() {
    const minHeightInput = prompt('Введите минимальный рост для фильтрации:');
    
    if (minHeightInput === null || minHeightInput.trim() === '') {
        displayHeights();
        return;
    }
    
    const minHeight = Number(minHeightInput);
    
    if (isNaN(minHeight)) {
        alert('Введите корректное значение!');
        return;
    }
    
    const filteredHeights = [];
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] >= minHeight) {
            filteredHeights.push(heights[i]);
        }
    }
    
    displayHeights(filteredHeights);
}

// Обработчики событий
addBtn.addEventListener('click', addHeight);
filterBtn.addEventListener('click', filterHeights);

// Первоначальное отображение списка
displayHeights();
// Исходный массив с ценами
let prices = [100, 500, 250, 750, 300];

// Получаем элементы DOM
const priceList = document.getElementById('priceList');
const sortAscBtn = document.getElementById('sortAscBtn');
const sortDescBtn = document.getElementById('sortDescBtn');

// Функция для отображения цен на странице
function displayPrices(pricesArray) {
    priceList.innerHTML = '';
    
    for (let i = 0; i < pricesArray.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = pricesArray[i];
        priceList.appendChild(listItem);
    }
}

// Функция для сортировки по возрастанию
function sortAscending() {
    const sortedPrices = [...prices];
    
    // Сортировка пузырьком по возрастанию
    for (let i = 0; i < sortedPrices.length - 1; i++) {
        for (let j = 0; j < sortedPrices.length - 1 - i; j++) {
            if (sortedPrices[j] > sortedPrices[j + 1]) {
                const temp = sortedPrices[j];
                sortedPrices[j] = sortedPrices[j + 1];
                sortedPrices[j + 1] = temp;
            }
        }
    }
    
    // Обновляем массив и отображение
    prices = sortedPrices;
    displayPrices(prices);
}

// Функция для сортировки по убыванию
function sortDescending() {
    const sortedPrices = [...prices];
    
    // Сортировка пузырьком по убыванию
    for (let i = 0; i < sortedPrices.length - 1; i++) {
        for (let j = 0; j < sortedPrices.length - 1 - i; j++) {
            if (sortedPrices[j] < sortedPrices[j + 1]) {

                const temp = sortedPrices[j];
                sortedPrices[j] = sortedPrices[j + 1];
                sortedPrices[j + 1] = temp;
            }
        }
    }
    
    // Обновляем массив и отображение
    prices = sortedPrices;
    displayPrices(prices);
}

// Добавляем обработчики событий для кнопок
sortAscBtn.addEventListener('click', sortAscending);
sortDescBtn.addEventListener('click', sortDescending);

// Первоначальное отображение цен
displayPrices(prices);
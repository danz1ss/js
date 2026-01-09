// Массив товаров
const products = ["Арбуз", "Книга", "Кофе", "Макароны", "Молоко", "Сахар", "Яблоки"];

// Получаем элементы DOM
const productList = document.querySelector('.product-list');
const addBtn = document.querySelector('.add-btn');

// Функция сортировки массива по возрастанию (пузырьковая сортировка)
function sortProducts(arr) {
    const sortedArr = [...arr]; // Создаем копию массива
    
    for (let i = 0; i < sortedArr.length - 1; i++) {
        for (let j = 0; j < sortedArr.length - 1 - i; j++) {
            if (sortedArr[j] > sortedArr[j + 1]) {
                // Меняем местами элементы
                const temp = sortedArr[j];
                sortedArr[j] = sortedArr[j + 1];
                sortedArr[j + 1] = temp;
            }
        }
    }
    
    return sortedArr;
}

// Функция отображения отсортированного списка товаров
function displayProducts() {
    productList.innerHTML = '';
    const sortedProducts = sortProducts(products);
    
    for (let i = 0; i < sortedProducts.length; i++) {
        const li = document.createElement('li');
        li.textContent = sortedProducts[i];
        productList.append(li);
    }
}

// Функция добавления товара
function addProduct() {
    const productName = prompt('Введите название товара:');
    
    if (productName === null || productName.trim() === '') {
        alert('Название товара не введено!');
        return;
    }
    
    products.push(productName.trim());
    displayProducts();
}

// Обработчик события
addBtn.addEventListener('click', addProduct);

// Первоначальное отображение списка
displayProducts();
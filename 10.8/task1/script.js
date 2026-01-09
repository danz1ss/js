// Получаем все миниатюры
const thumbnails = document.querySelectorAll('.thumbnail');
const fullImage = document.getElementById('fullImage');
const placeholderText = document.querySelector('.placeholder-text');

// Добавляем обработчик события для каждой миниатюры
thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
        // Получаем URL полного изображения из атрибута data-full
        const fullImageUrl = this.getAttribute('data-full');
        
        // Устанавливаем URL полного изображения
        fullImage.src = fullImageUrl;
        fullImage.style.display = 'block';
        
        // Скрываем текст-заполнитель
        if (placeholderText) {
            placeholderText.style.display = 'none';
        }
        
        // Убираем класс active у всех миниатюр
        thumbnails.forEach(function(thumb) {
            thumb.classList.remove('active');
        });
        
        // Добавляем класс active к текущей миниатюре
        this.classList.add('active');
    });
});
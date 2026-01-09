// Функция для подсчёта гласных букв в слове
const countVowels = (word) => {
    // Определяем массив гласных букв 'a', 'e', 'i', 'o', 'u'
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    // Приводим слово к нижнему регистру для удобства сравнения
    const lowerWord = word.toLowerCase();
    // Используем метод filter() для фильтрации гласных букв
    const vowelArray = Array.from(lowerWord).filter(char => vowels.includes(char));
    // Возвращаем количество гласных букв
    return vowelArray.length;
};
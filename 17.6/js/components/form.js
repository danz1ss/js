// Компонент формы добавления записи
import { addItem } from '../storage.js';

export function renderForm(onSuccess) {
    const form = document.createElement('form');
    form.className = 'form';
    
    form.innerHTML = `
        <div class="form-group">
            <label for="name">Название</label>
            <input type="text" id="name" name="name" required>
            <div class="error" id="name-error"></div>
        </div>
        
        <div class="form-group">
            <label for="shelf">Полка</label>
            <input type="text" id="shelf" name="shelf" required>
            <div class="error" id="shelf-error"></div>
        </div>
        
        <div class="form-group">
            <label for="weight">Вес (кг)</label>
            <input type="number" id="weight" name="weight" step="0.1" required>
            <div class="error" id="weight-error"></div>
        </div>
        
        <div class="form-group">
            <label for="storageTime">Время хранения (дней)</label>
            <input type="number" id="storageTime" name="storageTime" required>
            <div class="error" id="storageTime-error"></div>
        </div>
        
        <div class="form-buttons">
            <button type="submit" class="btn btn-success">Добавить</button>
        </div>
    `;
    
    // Валидация
    function validateField(name, value) {
        const errorEl = document.getElementById(`${name}-error`);
        
        if (!value || value.trim() === '') {
            errorEl.textContent = 'Это поле обязательно для заполнения';
            return false;
        }
        
        if (name === 'weight' && (parseFloat(value) <= 0 || isNaN(value))) {
            errorEl.textContent = 'Вес должен быть положительным числом';
            return false;
        }
        
        if (name === 'storageTime' && (parseInt(value) <= 0 || isNaN(value))) {
            errorEl.textContent = 'Время хранения должно быть положительным числом';
            return false;
        }
        
        errorEl.textContent = '';
        return true;
    }
    
    // Обработчик отправки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Валидация всех полей
        let isValid = true;
        Object.keys(data).forEach(key => {
            if (!validateField(key, data[key])) {
                isValid = false;
            }
        });
        
        if (isValid) {
            addItem(data);
            onSuccess();
        }
    });
    
    // Валидация при потере фокуса
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input.name, input.value);
        });
    });
    
    return form;
}
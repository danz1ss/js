// Страница добавления записи
import { renderForm } from './components/form.js';

export function renderAddRecordPage(onNavigate) {
    const page = document.createElement('div');
    page.className = 'page';
    
    // Заголовок
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = '<h1 class="page-title">Добавить запись</h1>';
    
    page.appendChild(header);
    
    // Форма
    const form = renderForm(() => {
        // После успешного добавления переходим на страницу склада
        onNavigate('warehouse');
    });
    
    page.appendChild(form);
    
    return page;
}
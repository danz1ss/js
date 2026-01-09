// Страница списка склада
import { getItems } from './storage.js';
import { renderTable } from './components/table.js';

export function renderWarehousePage(onNavigate) {
    const page = document.createElement('div');
    page.className = 'page';
    
    // Заголовок
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
        <h1 class="page-title">Склад</h1>
        <button class="btn btn-primary" id="add-btn">Добавить запись</button>
    `;
    
    page.appendChild(header);
    
    // Таблица
    function updateTable() {
        const existingTable = page.querySelector('.warehouse-table');
        if (existingTable) {
            existingTable.remove();
        }
        
        const items = getItems();
        const table = renderTable(items, updateTable);
        page.appendChild(table);
    }
    
    updateTable();
    
    // Обработчик кнопки добавления
    page.querySelector('#add-btn').addEventListener('click', () => {
        onNavigate('add');
    });
    
    return page;
}
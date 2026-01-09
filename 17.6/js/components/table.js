// Компонент таблицы склада
import { deleteItem, sortItems } from '../storage.js';

let currentSort = { field: null, ascending: true };

export function renderTable(items, onUpdate) {
    const table = document.createElement('table');
    table.className = 'warehouse-table';
    
    // Заголовок таблицы
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th data-field="name">Название</th>
            <th data-field="shelf">Полка</th>
            <th data-field="weight">Вес</th>
            <th data-field="storageTime">Время хранения</th>
            <th>Действия</th>
        </tr>
    `;
    
    // Обработчики сортировки
    thead.querySelectorAll('th[data-field]').forEach(th => {
        th.addEventListener('click', () => {
            const field = th.dataset.field;
            
            if (currentSort.field === field) {
                currentSort.ascending = !currentSort.ascending;
            } else {
                currentSort.field = field;
                currentSort.ascending = true;
            }
            
            onUpdate();
        });
    });
    
    // Тело таблицы
    const tbody = document.createElement('tbody');
    
    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Список пуст</td></tr>';
    } else {
        // Сортировка
        let sortedItems = items;
        if (currentSort.field) {
            sortedItems = sortItems(items, currentSort.field, currentSort.ascending);
        }
        
        sortedItems.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.shelf}</td>
                <td>${item.weight} кг</td>
                <td>${item.storageTime} дней</td>
                <td>
                    <button class="btn btn-danger" data-id="${item.id}">Удалить</button>
                </td>
            `;
            
            // Обработчик удаления
            tr.querySelector('.btn-danger').addEventListener('click', () => {
                if (confirm('Удалить запись?')) {
                    deleteItem(item.id);
                    onUpdate();
                }
            });
            
            tbody.appendChild(tr);
        });
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    return table;
}
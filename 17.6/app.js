const STORAGE_KEY = 'warehouse_items';

function getItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addItem(item) {
    const items = getItems();
    item.id = Date.now();
    items.push(item);
    saveItems(items);
}

function deleteItem(id) {
    const items = getItems();
    const filtered = items.filter(item => item.id !== id);
    saveItems(filtered);
}

function sortItems(items, field, ascending = true) {
    return [...items].sort((a, b) => {
        const aVal = field === 'weight' || field === 'storageTime' ? parseFloat(a[field]) : a[field];
        const bVal = field === 'weight' || field === 'storageTime' ? parseFloat(b[field]) : b[field];
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
}

function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.id = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
}

let currentSort = { field: null, ascending: true };

function renderWarehousePage() {
    const page = document.createElement('div');
    page.className = 'container';
    
    page.innerHTML = `
        <div class="page-header">
            <h1>Склад</h1>
            <button class="btn btn-primary" id="add-btn">Добавить запись</button>
        </div>
        <table id="warehouse-table">
            <thead>
                <tr>
                    <th data-field="name">Название</th>
                    <th data-field="shelf">Полка</th>
                    <th data-field="weight">Вес</th>
                    <th data-field="storageTime">Время хранения</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
    
    function updateTable() {
        const tbody = page.querySelector('tbody');
        tbody.innerHTML = '';
        
        let items = getItems();
        if (currentSort.field) {
            items = sortItems(items, currentSort.field, currentSort.ascending);
        }
        
        if (items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Список пуст</td></tr>';
        } else {
            items.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.shelf}</td>
                    <td>${item.weight} кг</td>
                    <td>${item.storageTime} дней</td>
                    <td><button class="btn btn-danger" data-id="${item.id}">Удалить</button></td>
                `;
                tr.querySelector('.btn-danger').onclick = () => {
                    if (confirm('Удалить запись?')) {
                        deleteItem(item.id);
                        updateTable();
                    }
                };
                tbody.appendChild(tr);
            });
        }
    }
    
    page.querySelectorAll('th[data-field]').forEach(th => {
        th.onclick = () => {
            const field = th.dataset.field;
            if (currentSort.field === field) {
                currentSort.ascending = !currentSort.ascending;
            } else {
                currentSort.field = field;
                currentSort.ascending = true;
            }
            updateTable();
        };
    });
    
    page.querySelector('#add-btn').onclick = () => navigate('add');
    
    updateTable();
    return page;
}

function renderAddPage() {
    const page = document.createElement('div');
    page.className = 'container';
    
    page.innerHTML = `
        <div class="page-header">
            <h1>Добавить запись</h1>
        </div>
        <form id="add-form">
            <div class="form-group">
                <label>Название</label>
                <input type="text" name="name" required>
                <div class="error" id="name-error"></div>
            </div>
            <div class="form-group">
                <label>Полка</label>
                <input type="text" name="shelf" required>
                <div class="error" id="shelf-error"></div>
            </div>
            <div class="form-group">
                <label>Вес (кг)</label>
                <input type="number" name="weight" step="0.1" required>
                <div class="error" id="weight-error"></div>
            </div>
            <div class="form-group">
                <label>Время хранения (дней)</label>
                <input type="number" name="storageTime" required>
                <div class="error" id="storageTime-error"></div>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-success">Добавить</button>
            </div>
        </form>
    `;
    
    const form = page.querySelector('#add-form');
    
    function validateField(name, value) {
        const errorEl = document.getElementById(`${name}-error`);
        if (!value || value.trim() === '') {
            errorEl.textContent = 'Обязательное поле';
            return false;
        }
        if (name === 'weight' && (parseFloat(value) <= 0 || isNaN(value))) {
            errorEl.textContent = 'Вес должен быть положительным';
            return false;
        }
        if (name === 'storageTime' && (parseInt(value) <= 0 || isNaN(value))) {
            errorEl.textContent = 'Время должно быть положительным';
            return false;
        }
        errorEl.textContent = '';
        return true;
    }
    
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        let isValid = true;
        Object.keys(data).forEach(key => {
            if (!validateField(key, data[key])) isValid = false;
        });
        
        if (isValid) {
            addItem(data);
            navigate('warehouse');
        }
    };
    
    form.querySelectorAll('input').forEach(input => {
        input.onblur = () => validateField(input.name, input.value);
    });
    
    return page;
}

function navigate(page) {
    showLoader();
    
    setTimeout(() => {
        const app = document.getElementById('app');
        app.innerHTML = '';
        
        if (page === 'warehouse') {
            app.appendChild(renderWarehousePage());
        } else if (page === 'add') {
            app.appendChild(renderAddPage());
        }
        
        hideLoader();
    }, 300);
}

navigate('warehouse');
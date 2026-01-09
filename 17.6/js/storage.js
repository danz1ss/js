// Модуль для работы с localStorage
const STORAGE_KEY = 'warehouse_items';

export function getItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item) {
    const items = getItems();
    item.id = Date.now();
    items.push(item);
    saveItems(items);
    return item;
}

export function deleteItem(id) {
    const items = getItems();
    const filtered = items.filter(item => item.id !== id);
    saveItems(filtered);
}

export function sortItems(items, field, ascending = true) {
    return [...items].sort((a, b) => {
        const aVal = field === 'weight' || field === 'storageTime' ? parseFloat(a[field]) : a[field];
        const bVal = field === 'weight' || field === 'storageTime' ? parseFloat(b[field]) : b[field];
        
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
}
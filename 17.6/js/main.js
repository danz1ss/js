// Главный файл приложения
import { showLoader, hideLoader } from './components/loader.js';
import { renderWarehousePage } from './warehouse.js';
import { renderAddRecordPage } from './addRecord.js';

const app = document.getElementById('app');

// Навигация с имитацией загрузки
function navigate(page) {
    showLoader();
    
    // Имитация загрузки страницы
    setTimeout(() => {
        app.innerHTML = '';
        
        let pageElement;
        
        if (page === 'warehouse') {
            pageElement = renderWarehousePage(navigate);
        } else if (page === 'add') {
            pageElement = renderAddRecordPage(navigate);
        }
        
        if (pageElement) {
            app.appendChild(pageElement);
        }
        
        hideLoader();
    }, 300); // 300мс задержка для демонстрации прелоадера
}

// Инициализация приложения
navigate('warehouse');
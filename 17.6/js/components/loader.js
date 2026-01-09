// Компонент прелоадера
export function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.id = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
}

export function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}
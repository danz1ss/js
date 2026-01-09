function fetchCatImages() {
    const time = Math.random() * 3000 + 2000;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const images = [
                'https://placekitten.com/200/200',
                'https://placekitten.com/201/200',
                'https://placekitten.com/200/201',
                'https://placekitten.com/202/200',
                'https://placekitten.com/200/202'
            ];
            resolve({ images, time });
        }, time);
    });
}

function fetchDogImages() {
    const time = Math.random() * 3000 + 2000;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const images = [
                'https://placedog.net/200/200',
                'https://placedog.net/201/200',
                'https://placedog.net/200/201',
                'https://placedog.net/202/200',
                'https://placedog.net/200/202'
            ];
            resolve({ images, time });
        }, time);
    });
}

function progress(time, container) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-bar-wrapper';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressTime = document.createElement('div');
    progressTime.className = 'progress-time';
    progressTime.textContent = '0 с';
    
    progressWrapper.appendChild(progressBar);
    progressContainer.appendChild(progressWrapper);
    progressContainer.appendChild(progressTime);
    container.appendChild(progressContainer);
    
    const duration = time;
    const startTime = Date.now();
    let lastSecond = 0;
    
    return new Promise((resolve) => {
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            progressBar.style.transform = `scaleX(${progress})`;
            
            const currentSecond = Math.floor(elapsed / 1000);
            if (currentSecond !== lastSecond) {
                lastSecond = currentSecond;
                progressTime.textContent = `${currentSecond} с`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                progressTime.textContent = `${Math.ceil(duration / 1000)} с`;
                resolve();
            }
        };
        
        animate();
    });
}

function displayImages(images, container) {
    const grid = document.createElement('div');
    grid.className = 'images-grid';
    
    images.forEach(src => {
        const img = document.createElement('img');
        img.className = 'image-item';
        img.src = src;
        img.alt = 'Image';
        grid.appendChild(img);
    });
    
    container.appendChild(grid);
}

async function loadWithProgress(fetchFunction, title, container) {
    const section = document.createElement('div');
    section.className = 'load-section';
    
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    
    container.appendChild(section);
    
    const result = await fetchFunction();
    await progress(result.time, section);
    displayImages(result.images, section);
}

async function init() {
    const app = document.getElementById('app');
    
    await loadWithProgress(fetchCatImages, 'Загрузка изображений кошек', app);
    await loadWithProgress(fetchDogImages, 'Загрузка изображений собак', app);
}

init();
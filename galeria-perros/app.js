// API de Perros
const DOG_API = 'https://dog.ceo/api';
const galleryDiv = document.getElementById('gallery');
const statsDiv = document.getElementById('stats');
const breedSelect = document.getElementById('breedSelect');

let allBreeds = [];
let currentBreed = null;

// ==================== INICIALIZACIÓN ====================
window.addEventListener('load', () => {
    loadBreeds();
});

// ==================== CARGAR RAZAS ====================
async function loadBreeds() {
    try {
        const response = await fetch(`${DOG_API}/breeds/list/all`);
        const data = await response.json();
        
        if (data.status === 'success') {
            allBreeds = Object.keys(data.message).sort();
            
            // Llenar el selector
            breedSelect.innerHTML = '<option value="">Todas las razas</option>';
            allBreeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al cargar las razas');
    }
}

// ==================== CARGAR TODAS LAS RAZAS ====================
async function loadAllDogs() {
    galleryDiv.innerHTML = '<div class="loading">Cargando galería completa...</div>';
    statsDiv.innerHTML = '';
    
    try {
        const response = await fetch(`${DOG_API}/breeds/list/all`);
        const data = await response.json();
        
        if (data.status === 'success') {
            const breeds = Object.keys(data.message);
            let totalImages = 0;
            const gallery = [];
            
            for (const breed of breeds.slice(0, 30)) {
                const imgResponse = await fetch(`${DOG_API}/breed/${breed}/images/random`);
                const imgData = await imgResponse.json();
                
                if (imgData.status === 'success') {
                    gallery.push({
                        breed: breed,
                        image: imgData.message
                    });
                    totalImages++;
                }
            }
            
            displayGallery(gallery);
            updateStats(`Mostrando ${totalImages} razas de ${breeds.length} disponibles`);
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al cargar los perros');
    }
}

// ==================== CARGAR POR RAZA ====================
async function loadByBreed() {
    const breed = breedSelect.value;
    
    if (!breed) {
        alert('Selecciona una raza');
        return;
    }
    
    galleryDiv.innerHTML = '<div class="loading">Cargando imágenes de ' + breed + '...</div>';
    statsDiv.innerHTML = '';
    currentBreed = breed;
    
    try {
        const response = await fetch(`${DOG_API}/breed/${breed}/images`);
        const data = await response.json();
        
        if (data.status === 'success' && data.message.length > 0) {
            const images = data.message.slice(0, 24); // Mostrar máximo 24 imágenes
            const gallery = images.map(img => ({
                breed: breed,
                image: img
            }));
            
            displayGallery(gallery);
            updateStats(`Se encontraron ${data.message.length} imágenes de ${breed.toUpperCase()}`);
        } else {
            galleryDiv.innerHTML = '<div class="no-results">No hay imágenes disponibles para esta raza</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al cargar las imágenes');
    }
}

// ==================== GALERÍA ALEATORIA ====================
async function loadRandomGallery() {
    galleryDiv.innerHTML = '<div class="loading">Generando galería aleatoria...</div>';
    statsDiv.innerHTML = '';
    
    try {
        const randomBreeds = [];
        const shuffled = allBreeds.sort(() => 0.5 - Math.random()).slice(0, 12);
        
        for (const breed of shuffled) {
            const response = await fetch(`${DOG_API}/breed/${breed}/images/random`);
            const data = await response.json();
            
            if (data.status === 'success') {
                randomBreeds.push({
                    breed: breed,
                    image: data.message
                });
            }
        }
        
        displayGallery(randomBreeds);
        updateStats(`Galería aleatoria: ${randomBreeds.length} razas diferentes`);
    } catch (error) {
        console.error('Error:', error);
        showError('Error al generar la galería aleatoria');
    }
}

// ==================== MOSTRAR GALERÍA ====================
function displayGallery(dogs) {
    if (dogs.length === 0) {
        galleryDiv.innerHTML = '<div class="no-results">No hay perros para mostrar</div>';
        return;
    }
    
    galleryDiv.innerHTML = dogs.map(dog => createDogCard(dog)).join('');
}

// ==================== CREAR TARJETA DE PERRO ====================
function createDogCard(dog) {
    const breedName = dog.breed
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    return `
        <div class="dog-card">
            <div class="dog-image">
                <img src="${dog.image}" alt="${breedName}" onerror="this.src='https://via.placeholder.com/280x280?text=Error+loading+image'">
            </div>
            <div class="dog-info">
                <h3>${breedName}</h3>
                <p><strong>Raza:</strong> ${dog.breed}</p>
                <p>🐕 Haz clic para ver más detalles</p>
            </div>
        </div>
    `;
}

// ==================== ACTUALIZAR ESTADÍSTICAS ====================
function updateStats(message) {
    statsDiv.innerHTML = `📊 ${message}`;
}

// ==================== MOSTRAR ERROR ====================
function showError(message) {
    galleryDiv.innerHTML = `<div class="error">${message}</div>`;
}

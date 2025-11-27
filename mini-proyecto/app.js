// ==================== CONFIGURACIÓN ====================
const OMDB_API_KEY = 'ec1b95c9'; // API key gratuita (1000 requests/día)
const OMDB_URL = 'https://www.omdbapi.com/';
const DOG_API_URL = 'https://dog.ceo/api';
const CAT_FACTS_URL = 'https://catfact.ninja/fact';
const WEATHER_API_KEY = '9d3aad4f7cc842db8a9134032252711';
const WEATHER_URL = 'https://api.weatherapi.com/v1/current.json';

// ==================== MANEJO DE TABS ====================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Desactivar todos los tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Activar tab seleccionado
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Cargar datos iniciales según el tab
        if (tabName === 'dogs') loadBreeds();
    });
});

// ==================== PELÍCULAS (OMDb API) ====================
async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    const type = document.getElementById('typeSelect').value;
    
    if (!query) {
        alert('Por favor ingresa un título');
        return;
    }

    const resultsDiv = document.getElementById('moviesResults');
    resultsDiv.innerHTML = '<div class="loading">Buscando películas...</div>';

    try {
        let url = `${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`;
        if (type) url += `&type=${type}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
            resultsDiv.innerHTML = `<div class="no-results">No se encontraron resultados para "${query}"</div>`;
            return;
        }

        const movies = data.Search.slice(0, 20);
        resultsDiv.innerHTML = '';

        for (const movie of movies) {
            const detailResponse = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`);
            const details = await detailResponse.json();
            
            resultsDiv.innerHTML += createMovieCard(details);
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<div class="error">Error al buscar películas. Intenta más tarde.</div>';
    }
}

function createMovieCard(movie) {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x370?text=Sin+poster';
    const rating = movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A';
    
    return `
        <div class="card">
            <img src="${poster}" alt="${movie.Title}">
            <div class="card-content">
                <h3>${movie.Title}</h3>
                <p><strong>Año:</strong> ${movie.Year}</p>
                <p><strong>Tipo:</strong> ${movie.Type}</p>
                <p><strong>Director:</strong> ${movie.Director || 'N/A'}</p>
                <p><strong>Trama:</strong> ${movie.Plot.substring(0, 100)}...</p>
                <span class="rating">⭐ ${rating}/10</span>
            </div>
        </div>
    `;
}

// ==================== PERROS (Dog API) ====================
async function loadBreeds() {
    try {
        const response = await fetch(`${DOG_API_URL}/breeds/list/all`);
        const data = await response.json();
        
        const breedSelect = document.getElementById('breedSelect');
        breedSelect.innerHTML = '<option value="">Selecciona una raza...</option>';
        
        Object.keys(data.message).forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar las razas de perros');
    }
}

async function loadDogImage() {
    const breed = document.getElementById('breedSelect').value;
    
    if (!breed) {
        alert('Por favor selecciona una raza');
        return;
    }

    const resultsDiv = document.getElementById('dogsResults');
    resultsDiv.innerHTML = '<div class="loading">Cargando imagen...</div>';

    try {
        const response = await fetch(`${DOG_API_URL}/breed/${breed}/images/random`);
        const data = await response.json();
        
        if (data.status === 'success') {
            resultsDiv.innerHTML = `
                <div class="card">
                    <img src="${data.message}" alt="Perro ${breed}">
                    <div class="card-content">
                        <h3>${breed.charAt(0).toUpperCase() + breed.slice(1)}</h3>
                        <p>Raza de perro aleatoria</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<div class="error">Error al cargar la imagen</div>';
    }
}

async function loadRandomDog() {
    const resultsDiv = document.getElementById('dogsResults');
    resultsDiv.innerHTML = '<div class="loading">Cargando perro aleatorio...</div>';

    try {
        const response = await fetch(`${DOG_API_URL}/breeds/image/random`);
        const data = await response.json();
        
        if (data.status === 'success') {
            resultsDiv.innerHTML = `
                <div class="card">
                    <img src="${data.message}" alt="Perro aleatorio">
                    <div class="card-content">
                        <h3>Perro Aleatorio</h3>
                        <p>Una hermosa imagen de un perro sorpresa 🐕</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<div class="error">Error al cargar imagen aleatoria</div>';
    }
}

// ==================== GATOS (Cat Facts API) ====================
async function loadCatFact() {
    const resultsDiv = document.getElementById('catsResults');
    resultsDiv.innerHTML = '<div class="loading">Cargando dato curioso...</div>';

    try {
        const response = await fetch(CAT_FACTS_URL);
        const data = await response.json();
        
        resultsDiv.innerHTML = `
            <div class="fact-box">
                <h3>🐱 Dato Curioso sobre Gatos</h3>
                <p>${data.fact}</p>
                <button onclick="loadCatFact()">Otro dato 🔄</button>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<div class="error">Error al cargar dato curioso</div>';
    }
}

// ==================== CLIMA (Weather API) ====================
async function searchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        alert('Por favor ingresa una ciudad');
        return;
    }

    const resultsDiv = document.getElementById('weatherResults');
    resultsDiv.innerHTML = '<div class="loading">Obteniendo clima...</div>';

    try {
        const response = await fetch(
            `${WEATHER_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=yes&lang=es`
        );
        
        if (!response.ok) throw new Error('Ciudad no encontrada');
        
        const data = await response.json();
        const current = data.current;
        const location = data.location;
        
        resultsDiv.innerHTML = `
            <div class="weather-grid">
                <div class="weather-card">
                    <h3>${location.name}, ${location.country}</h3>
                    <img src="https:${current.condition.icon}" alt="clima">
                    <p>${current.condition.text}</p>
                </div>
                <div class="weather-card">
                    <h3>🌡️ Temperatura</h3>
                    <div class="value">${current.temp_c}°C</div>
                    <p>Sensación: ${current.feelslike_c}°C</p>
                </div>
                <div class="weather-card">
                    <h3>💨 Viento</h3>
                    <div class="value">${current.wind_kph} km/h</div>
                    <p>Dirección: ${current.wind_dir}</p>
                </div>
                <div class="weather-card">
                    <h3>💧 Humedad</h3>
                    <div class="value">${current.humidity}%</div>
                    <p>Precipitación: ${current.precip_mm}mm</p>
                </div>
                <div class="weather-card">
                    <h3>🌅 Índice UV</h3>
                    <div class="value">${current.uv}</div>
                    <p>Presión: ${current.pressure_mb} mb</p>
                </div>
                <div class="weather-card">
                    <h3>👁️ Visibilidad</h3>
                    <div class="value">${current.vis_km} km</div>
                    <p>Nubosidad: ${current.cloud}%</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<div class="error">Ciudad no encontrada. Intenta con otro nombre.</div>';
    }
}

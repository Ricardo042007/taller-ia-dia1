// URL de la API de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchbtn = document.getElementById('searchbtn');
const container = document.getElementById('container');

// Variable para almacenar todos los personajes
let allCharacters = [];

// Función para cargar todos los personajes
async function loadAllCharacters() {
    try {
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';
        
        let allData = [];
        let nextUrl = API_URL;
        
        // Hacer peticiones para obtener todas las páginas
        while (nextUrl) {
            const response = await fetch(nextUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            
            const data = await response.json();
            allData = [...allData, ...data.results];
            
            // Obtener la siguiente página si existe
            nextUrl = data.info.next;
        }
        
        allCharacters = allData;
        displayCharacters(allCharacters);
    } catch (error) {
        console.error('Error al cargar los personajes:', error);
        container.innerHTML = '<div class="no-results">Error al cargar los personajes. Por favor, intenta más tarde.</div>';
    }
}

// Función para mostrar personajes en el contenedor
function displayCharacters(characters) {
    if (characters.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron personajes.</div>';
        return;
    }

    container.innerHTML = characters.map(character => createCardHTML(character)).join('');
}

// Función para crear el HTML de una tarjeta
function createCardHTML(character) {
    const statusClass = character.status.toLowerCase();
    
    return `
        <div class="card">
            <img src="${character.image}" alt="${character.name}">
            <div class="card-content">
                <h2>${character.name}</h2>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Ubicación:</strong> ${character.location.name}</p>
                <span class="status ${statusClass}">${character.status}</span>
            </div>
        </div>
    `;
}

// Función para buscar personajes por nombre
function searchCharacters() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayCharacters(allCharacters);
        return;
    }

    const filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    displayCharacters(filtered);
}

// Función para limpiar la búsqueda
function clearSearch() {
    searchInput.value = '';
    displayCharacters(allCharacters);
}

// Event Listeners
searchBtn.addEventListener('click', searchCharacters);
searchbtn.addEventListener('click', clearSearch);

// Buscar al presionar Enter en el input
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchCharacters();
    }
});

// Cargar los personajes cuando se cargue la página
window.addEventListener('load', loadAllCharacters);

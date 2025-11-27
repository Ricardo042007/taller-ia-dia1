// Obtener elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const app = document.getElementById('app');

// Función para obtener datos del Pokémon desde la API
async function obtenerPokemon(nombrePokemon) {
    try {
        // Mostrar cargando
        app.innerHTML = '<div class="loading">Cargando...</div>';

        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
        if (!respuesta.ok) {
            throw new Error(`Pokémon no encontrado: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        mostrarTarjetaPokemon(datos);
    } catch (error) {
        app.innerHTML = `<div class="error">❌ ${error.message}. Intenta con otro Pokémon.</div>`;
        console.error(error);
    }
}

// Función para mostrar la tarjeta del Pokémon
function mostrarTarjetaPokemon(pokemon) {
    const tipos = pokemon.types.map(t => t.type.name).join(', ');
    const habilidades = pokemon.abilities.map(a => a.ability.name).join(', ');
    const imagen = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default;

    const tarjeta = `
        <div class="pokemon-card">
            <div class="pokemon-header">
                <h2 class="pokemon-name">${pokemon.name.toUpperCase()}</h2>
                <span class="pokemon-id">#${String(pokemon.id).padStart(4, '0')}</span>
            </div>
            
            <div class="pokemon-image-container">
                <img src="${imagen}" alt="${pokemon.name}" class="pokemon-image" />
            </div>
            
            <div class="pokemon-info">
                <div class="info-group">
                    <label>Altura:</label>
                    <span>${(pokemon.height / 10).toFixed(2)} m</span>
                </div>
                <div class="info-group">
                    <label>Peso:</label>
                    <span>${(pokemon.weight / 10).toFixed(2)} kg</span>
                </div>
            </div>
            
            <div class="pokemon-details">
                <div class="detail-box">
                    <h3>Tipos</h3>
                    <p>${tipos}</p>
                </div>
                <div class="detail-box">
                    <h3>Habilidades</h3>
                    <p>${habilidades}</p>
                </div>
            </div>
            
            <div class="stats-container">
                <h3>Estadísticas</h3>
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <label>${stat.stat.name.toUpperCase()}</label>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(stat.base_stat / 150) * 100}%"></div>
                        </div>
                        <span>${stat.base_stat}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    app.innerHTML = tarjeta;
}

// Eventos
searchBtn.addEventListener('click', () => {
    const nombre = searchInput.value.trim();
    if (nombre) {
        obtenerPokemon(nombre);
    } else {
        app.innerHTML = '<div class="error">⚠️ Por favor escribe el nombre de un Pokémon</div>';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
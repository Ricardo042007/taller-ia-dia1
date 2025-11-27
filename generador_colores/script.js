/* ========================================
   GENERADOR DE COLORES ALEATORIOS
   Funcionalidad interactiva para generar y copiar colores
   ======================================== */

// ========================================
// ELEMENTOS DEL DOM
// ========================================

const colorDisplay = document.getElementById('colorDisplay');
const hexCode = document.getElementById('hexCode');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyFeedback = document.getElementById('copyFeedback');

// ========================================
// FUNCIÓN: Generar color hexadecimal aleatorio
// ========================================

/**
 * Genera un color hexadecimal aleatorio en formato #RRGGBB
 * @returns {string} Color hexadecimal en formato #RRGGBB (ej: #A3E4D7)
 */
function generateRandomColor() {
    // Generar un número aleatorio entre 0 y 16777215 (0xFFFFFF)
    const randomNum = Math.floor(Math.random() * 16777215);
    
    // Convertir el número a hexadecimal y rellenar con ceros si es necesario
    // .toString(16) convierte a base 16 (hexadecimal)
    // .padStart(6, '0') asegura que tenga 6 dígitos, rellenando con ceros al inicio
    const hexColor = '#' + randomNum.toString(16).padStart(6, '0').toUpperCase();
    
    return hexColor;
}

// ========================================
// FUNCIÓN: Actualizar el color mostrado
// ========================================

/**
 * Actualiza el color del div mostrador y el texto del código hexadecimal
 * Se llama cuando se hace clic en "Generar Color"
 */
function updateColor() {
    // Generar nuevo color aleatorio
    const newColor = generateRandomColor();
    
    // Aplicar el color al div mostrador (con transición suave)
    colorDisplay.style.backgroundColor = newColor;
    
    // Actualizar el texto con el nuevo código hexadecimal
    hexCode.textContent = newColor;
}

// ========================================
// FUNCIÓN: Copiar código al portapapeles
// ========================================

/**
 * Copia el código hexadecimal al portapapeles del usuario
 * Muestra un mensaje de confirmación visual
 */
function copyToClipboard() {
    // Obtener el texto del código hexadecimal
    const textToCopy = hexCode.textContent;
    
    // Usar la API Clipboard para copiar el texto
    // navigator.clipboard.writeText() es una Promise que se resuelve cuando se copia
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Si la copia fue exitosa, mostrar mensaje de confirmación
        showCopyFeedback();
    }).catch(err => {
        // Si hay error, mostrar mensaje de fallo
        console.error('Error al copiar:', err);
        copyFeedback.textContent = '❌ Error al copiar';
        copyFeedback.classList.add('show');
        
        // Remover la clase después de 2 segundos
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    });
}

// ========================================
// FUNCIÓN: Mostrar confirmación visual
// ========================================

/**
 * Muestra un mensaje de confirmación cuando el código se copia exitosamente
 */
function showCopyFeedback() {
    // Cambiar el texto del mensaje de confirmación
    copyFeedback.textContent = '✓ ¡Código copiado!';
    
    // Agregar la clase 'show' para activar la animación
    copyFeedback.classList.add('show');
    
    // Remover la clase después de 2 segundos para que la animación se repita si se copia de nuevo
    setTimeout(() => {
        copyFeedback.classList.remove('show');
    }, 2000);
}

// ========================================
// INICIALIZACIÓN DE EVENTOS
// ========================================

// Evento: Click en "Generar Color"
// Cuando el usuario hace clic, se genera un nuevo color y se actualiza la pantalla
generateBtn.addEventListener('click', updateColor);

// Evento: Click en "Copiar Código"
// Cuando el usuario hace clic, se copia el código hexadecimal al portapapeles
copyBtn.addEventListener('click', copyToClipboard);

// Evento opcional: Generar color al cargar la página
// Esto asegura que el div tenga un color inicial al abrir la página
window.addEventListener('load', updateColor);

// ========================================
// EVENTO ADICIONAL: Click en el div del color
// ========================================

/**
 * Permite generar un nuevo color haciendo clic directamente en el div mostrador
 * Proporciona una interacción más intuitiva
 */
colorDisplay.addEventListener('click', updateColor);

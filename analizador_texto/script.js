// ===================================
// ANALIZADOR DE TEXTO - JAVASCRIPT
// ===================================

// Elementos del DOM
const textInput = document.getElementById('textInput');
const charCountTotal = document.getElementById('charCountTotal');
const charCountNoSpace = document.getElementById('charCountNoSpace');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const uniqueWords = document.getElementById('uniqueWords');
const clearBtn = document.getElementById('clearBtn');
const copyStatsBtn = document.getElementById('copyStatsBtn');
const downloadBtn = document.getElementById('downloadBtn');
const notification = document.getElementById('notification');

/**
 * Cuenta el número total de caracteres (incluyendo espacios)
 * @param {string} text - Texto a analizar
 * @returns {number} Total de caracteres
 */
function countCharactersTotal(text) {
    return text.length;
}

/**
 * Cuenta el número de caracteres sin espacios en blanco
 * @param {string} text - Texto a analizar
 * @returns {number} Total de caracteres sin espacios
 */
function countCharactersNoSpace(text) {
    // Elimina todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
    return text.replace(/\s/g, '').length;
}

/**
 * Cuenta el número de palabras considerando múltiples espacios
 * Una palabra se define como una secuencia de caracteres separada por espacios
 * @param {string} text - Texto a analizar
 * @returns {number} Total de palabras
 */
function countWords(text) {
    // Valida que no esté vacío
    if (!text.trim()) {
        return 0;
    }
    
    // Divide por espacios en blanco y filtra elementos vacíos
    // \s+ coincide con uno o más espacios en blanco
    const words = text.trim().split(/\s+/);
    
    return words.length;
}

/**
 * Cuenta el número de oraciones basado en puntos, signos de interrogación y exclamación
 * @param {string} text - Texto a analizar
 * @returns {number} Total de oraciones
 */
function countSentences(text) {
    // Valida que no esté vacío
    if (!text.trim()) {
        return 0;
    }
    
    // Busca secuencias que terminen con: . ! ?
    // Agrupa estos caracteres para contar solo una oración por grupo
    const sentences = text.match(/[.!?]+/g);
    
    // Si no hay puntuación, devuelve 0
    return sentences ? sentences.length : 0;
}

/**
 * Cuenta el número de palabras únicas (sin duplicados)
 * @param {string} text - Texto a analizar
 * @returns {number} Total de palabras únicas
 */
function countUniqueWords(text) {
    // Valida que no esté vacío
    if (!text.trim()) {
        return 0;
    }
    
    // Convierte a minúsculas, divide en palabras y elimina puntuación
    const words = text
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.replace(/[^\w]/g, '')) // Elimina puntuación
        .filter(word => word.length > 0); // Filtra palabras vacías
    
    // Usa Set para obtener solo palabras únicas
    const uniqueWordsSet = new Set(words);
    
    return uniqueWordsSet.size;
}

/**
 * Calcula el tiempo estimado de lectura en minutos
 * Basado en un promedio de 200 palabras por minuto (WPM estándar)
 * @param {number} wordCount - Número total de palabras
 * @returns {string} Tiempo de lectura formateado
 */
function calculateReadingTime(wordCount) {
    const WORDS_PER_MINUTE = 200; // Velocidad de lectura promedio
    
    // Calcula los minutos (mínimo 1 minuto si hay palabras)
    let minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    
    // Si no hay palabras, devuelve "0 min"
    if (wordCount === 0) {
        return '0 min';
    }
    
    // Agrega "s" para plurales (segundos si es menos de 1 minuto)
    if (minutes === 1) {
        return `${minutes} min`;
    } else {
        return `${minutes} min`;
    }
}

/**
 * Actualiza todas las estadísticas en tiempo real
 * Esta función se ejecuta cada vez que el usuario escribe en el textarea
 */
function updateStatistics() {
    // Obtiene el texto actual del textarea
    const text = textInput.value;
    
    // Calcula todas las métricas
    const totalChars = countCharactersTotal(text);
    const charsNoSpace = countCharactersNoSpace(text);
    const words = countWords(text);
    const sentences = countSentences(text);
    const readTime = calculateReadingTime(words);
    const unique = countUniqueWords(text);
    
    // Actualiza el DOM con animación
    updateStatWithAnimation(charCountTotal, totalChars);
    updateStatWithAnimation(charCountNoSpace, charsNoSpace);
    updateStatWithAnimation(wordCount, words);
    updateStatWithAnimation(sentenceCount, sentences);
    readingTime.textContent = readTime;
    updateStatWithAnimation(uniqueWords, unique);
}

/**
 * Actualiza un elemento de estadística con animación
 * @param {HTMLElement} element - Elemento a actualizar
 * @param {number} newValue - Nuevo valor a mostrar
 */
function updateStatWithAnimation(element, newValue) {
    // Solo anima si el valor cambió
    if (element.textContent !== newValue.toString()) {
        element.style.animation = 'none';
        
        // Fuerza un reflow para reiniciar la animación
        void element.offsetWidth;
        
        element.textContent = newValue;
        element.style.animation = 'fadeIn 0.3s ease';
    }
}

/**
 * Limpia el textarea y resetea todas las estadísticas
 * Muestra una notificación de confirmación
 */
function clearAll() {
    // Valida si hay contenido antes de limpiar
    if (textInput.value.trim() === '') {
        showNotification('No hay texto que limpiar', 'error');
        return;
    }
    
    // Limpia el textarea
    textInput.value = '';
    
    // Actualiza las estadísticas a cero
    updateStatistics();
    
    // Enfoca el textarea para mejor UX
    textInput.focus();
    
    // Muestra notificación de éxito
    showNotification('✓ Texto limpiado correctamente', 'success');
}

/**
 * Copia las estadísticas actuales al portapapeles en formato legible
 */
function copyStatistics() {
    // Valida si hay texto
    if (textInput.value.trim() === '') {
        showNotification('⚠️ No hay texto para analizar', 'error');
        return;
    }
    
    // Recopila todas las estadísticas
    const stats = `
📊 ANÁLISIS DE TEXTO
===================
📝 Caracteres (con espacios): ${charCountTotal.textContent}
📌 Caracteres (sin espacios): ${charCountNoSpace.textContent}
📚 Palabras: ${wordCount.textContent}
💬 Oraciones: ${sentenceCount.textContent}
⏱️ Tiempo de lectura: ${readingTime.textContent}
📈 Palabras únicas: ${uniqueWords.textContent}
    `.trim();
    
    // Copia al portapapeles usando la API moderna
    try {
        navigator.clipboard.writeText(stats).then(() => {
            showNotification('✓ Estadísticas copiadas al portapapeles', 'success');
        }).catch(() => {
            // Fallback para navegadores antiguos
            fallbackCopy(stats);
        });
    } catch (error) {
        fallbackCopy(stats);
    }
}

/**
 * Fallback para copiar al portapapeles en navegadores antiguos
 * @param {string} text - Texto a copiar
 */
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('✓ Estadísticas copiadas al portapapeles', 'success');
    } catch (error) {
        showNotification('✗ Error al copiar las estadísticas', 'error');
    }
    
    document.body.removeChild(textarea);
}

/**
 * Descarga el análisis completo en un archivo de texto
 */
function downloadAnalysis() {
    // Valida si hay texto
    if (textInput.value.trim() === '') {
        showNotification('⚠️ No hay texto para descargar', 'error');
        return;
    }
    
    // Obtiene la fecha y hora actual
    const now = new Date();
    const timestamp = now.toLocaleString('es-ES');
    
    // Crea el contenido del archivo
    const content = `
ANÁLISIS DE TEXTO
================
Fecha de generación: ${timestamp}

TEXTO ANALIZADO:
----------------
${textInput.value}

ESTADÍSTICAS:
-----------
- Caracteres (con espacios): ${charCountTotal.textContent}
- Caracteres (sin espacios): ${charCountNoSpace.textContent}
- Palabras: ${wordCount.textContent}
- Oraciones: ${sentenceCount.textContent}
- Tiempo estimado de lectura: ${readingTime.textContent}
- Palabras únicas: ${uniqueWords.textContent}

================
Generado por: Analizador de Texto
    `.trim();
    
    // Crea un Blob con el contenido
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    
    // Crea un URL temporal para el Blob
    const url = URL.createObjectURL(blob);
    
    // Crea un elemento <a> temporal para descargar
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis_texto_${Date.now()}.txt`;
    
    // Simula un clic en el enlace
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Libera el URL del Blob
    URL.revokeObjectURL(url);
    
    showNotification('✓ Análisis descargado correctamente', 'success');
}

/**
 * Muestra una notificación temporal al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success' o 'error')
 */
function showNotification(message, type = 'success') {
    // Limpia la notificación anterior
    notification.classList.remove('show', 'success', 'error');
    
    // Configura el mensaje y tipo
    notification.textContent = message;
    notification.classList.add(type);
    
    // Muestra la notificación
    notification.classList.add('show');
    
    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Manejador de eventos - Actualiza estadísticas en tiempo real
 * Se ejecuta cada vez que el usuario escribe, pega o modifica el texto
 */
textInput.addEventListener('input', updateStatistics);

/**
 * Manejador de eventos - Botón Limpiar
 */
clearBtn.addEventListener('click', clearAll);

/**
 * Manejador de eventos - Botón Copiar Estadísticas
 */
copyStatsBtn.addEventListener('click', copyStatistics);

/**
 * Manejador de eventos - Botón Descargar Análisis
 */
downloadBtn.addEventListener('click', downloadAnalysis);

/**
 * Inicialización al cargar la página
 * - Enfoca el textarea para mejor UX
 * - Actualiza las estadísticas iniciales (0)
 */
document.addEventListener('DOMContentLoaded', () => {
    textInput.focus();
    updateStatistics();
});

// Manejo de errores global para la aplicación
window.addEventListener('error', (event) => {
    console.error('Error detectado:', event.error);
    showNotification('✗ Ocurrió un error inesperado', 'error');
});

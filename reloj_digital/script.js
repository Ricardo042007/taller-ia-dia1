/* =====================================================
   RELOJ DIGITAL INTERACTIVO CON ALARMA
   ===================================================== */

// ========== VARIABLES GLOBALES ==========

// Estado de la alarma y modo de visualización
let alarmTime = null;           // Hora de alarma configurada (HH:MM)
let isAlarmActive = false;      // Si la alarma está activa
let is24HourMode = true;        // Modo 24h (true) o 12h (false)
let alarmSounding = false;      // Si la alarma está sonando actualmente

// Array de nombres de meses en español
const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

// Array de nombres de días en español
const dayNames = [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

// ========== REFERENCIAS DEL DOM ==========

const clockDisplay = document.getElementById('clockDisplay');
const dateDisplay = document.getElementById('dateDisplay');
const greeting = document.getElementById('greeting');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const cancelAlarmBtn = document.getElementById('cancelAlarmBtn');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const alarmStatus = document.getElementById('alarmStatus');
const alarmStatusText = document.getElementById('alarmStatusText');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const dismissAlarmBtn = document.getElementById('dismissAlarmBtn');

// ========== FUNCIONES AUXILIARES ==========

/**
 * Formatea un número agregando un cero a la izquierda si es menor a 10
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado con cero a la izquierda
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Obtiene la hora actual formateada según el modo (24h o 12h)
 * @returns {string} Hora formateada (HH:MM:SS)
 */
function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convertir a formato 12h si es necesario
    if (!is24HourMode) {
        hours = hours % 12 || 12;
    }

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

/**
 * Obtiene la fecha actual formateada en español
 * @returns {string} Fecha formateada (Día, DD de Mes de YYYY)
 */
function getFormattedDate() {
    const now = new Date();
    const day = dayNames[now.getDay()];
    const date = now.getDate();
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    // Capitalizar el primer día
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);

    return `${capitalizedDay}, ${padZero(date)} de ${month} de ${year}`;
}

/**
 * Genera un saludo dinámico según la hora del día
 * @returns {string} Saludo apropiado
 */
function getGreeting() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
        return '¡Buenos días!';
    } else if (hours >= 12 && hours < 18) {
        return '¡Buenas tardes!';
    } else if (hours >= 18 && hours < 23) {
        return '¡Buenas noches!';
    } else {
        return '¡Madrugada!';
    }
}

/**
 * Formatea la hora en formato HH:MM para comparación
 * @returns {string} Hora actual en formato HH:MM
 */
function getCurrentTimeForComparison() {
    const now = new Date();
    return `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;
}

/**
 * Valida que la hora de alarma sea futura
 * @param {string} selectedTime - Hora seleccionada en formato HH:MM
 * @returns {boolean} True si la hora es futura, false en caso contrario
 */
function isFutureTime(selectedTime) {
    const currentTime = getCurrentTimeForComparison();
    return selectedTime > currentTime;
}

/**
 * Muestra la notificación de alarma con animación
 */
function showAlarmNotification() {
    // Reproducir sonido de alarma (usando alert como simulación)
    notificationMessage.textContent = `¡La alarma ha sonado a las ${getCurrentTimeForComparison()}!`;
    notification.classList.add('active');
    
    // Sonido de alarma (simulado)
    playAlarmSound();

    // Auto-desactivar después de 30 segundos si no se desactiva manualmente
    setTimeout(() => {
        if (alarmSounding) {
            dismissAlarm();
        }
    }, 30000);
}

/**
 * Simula el sonido de alarma usando el API Web Audio
 */
function playAlarmSound() {
    try {
        // Crear contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear oscilador para el sonido
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar el sonido de alarma (frecuencia alternada)
        const frequencies = [800, 600];
        let currentFreq = 0;
        const interval = setInterval(() => {
            if (!alarmSounding) {
                clearInterval(interval);
                oscillator.stop();
                return;
            }
            oscillator.frequency.setValueAtTime(frequencies[currentFreq], audioContext.currentTime);
            currentFreq = 1 - currentFreq;
        }, 100);
        
        // Configurar ganancia (volumen)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        oscillator.start();
        
        // Parar después de 5 segundos automáticamente
        setTimeout(() => {
            try {
                oscillator.stop();
            } catch (e) {
                // Ignorar si ya se detuvo
            }
        }, 5000);
    } catch (e) {
        // Si falla, usar alert como respaldo
        console.log('Sonido Web Audio no disponible, usando alert');
    }
}

/**
 * Desactiva la alarma actual
 */
function dismissAlarm() {
    alarmSounding = false;
    notification.classList.remove('active');
    isAlarmActive = false;
    alarmTime = null;
    alarmStatus.classList.remove('active');
    alarmStatusText.textContent = 'No hay alarma configurada';
}

// ========== FUNCIONES DE CONTROL ==========

/**
 * Actualiza el display del reloj, fecha y saludo
 */
function updateClock() {
    // Actualizar reloj
    const currentTime = getFormattedTime();
    clockDisplay.textContent = currentTime;

    // Actualizar fecha
    dateDisplay.textContent = getFormattedDate();

    // Actualizar saludo
    greeting.textContent = getGreeting();

    // Comparar hora actual con alarma configurada
    if (isAlarmActive && !alarmSounding) {
        const currentTimeForComparison = getCurrentTimeForComparison();
        
        if (currentTimeForComparison === alarmTime) {
            alarmSounding = true;
            showAlarmNotification();
        }
    }
}

/**
 * Configura una nueva alarma
 */
function setAlarm() {
    const selectedTime = alarmTimeInput.value;

    // Validar que se haya seleccionado una hora
    if (!selectedTime) {
        alert('Por favor, selecciona una hora');
        return;
    }

    // Validar que la hora sea futura
    if (!isFutureTime(selectedTime)) {
        alert('Por favor, selecciona una hora futura');
        return;
    }

    // Establecer la alarma
    alarmTime = selectedTime;
    isAlarmActive = true;
    alarmStatus.classList.add('active');
    alarmStatusText.textContent = `⏰ Alarma configurada para las ${alarmTime}`;

    console.log(`✓ Alarma establecida para las ${alarmTime}`);
}

/**
 * Cancela la alarma actual
 */
function cancelAlarm() {
    if (!isAlarmActive) {
        alert('No hay alarma configurada para cancelar');
        return;
    }

    isAlarmActive = false;
    alarmTime = null;
    alarmTimeInput.value = '';
    alarmStatus.classList.remove('active');
    alarmStatusText.textContent = 'No hay alarma configurada';
    dismissAlarm();

    console.log('✓ Alarma cancelada');
}

/**
 * Alterna entre modo 24h y 12h
 */
function toggleTimeMode() {
    is24HourMode = !is24HourMode;
    
    if (is24HourMode) {
        toggleModeBtn.textContent = 'Cambiar a 12h';
        console.log('✓ Modo 24 horas activado');
    } else {
        toggleModeBtn.textContent = 'Cambiar a 24h';
        console.log('✓ Modo 12 horas activado');
    }
}

// ========== EVENT LISTENERS ==========

// Botón para establecer alarma
setAlarmBtn.addEventListener('click', setAlarm);

// Botón para cancelar alarma
cancelAlarmBtn.addEventListener('click', cancelAlarm);

// Botón para cambiar modo 24h/12h
toggleModeBtn.addEventListener('click', toggleTimeMode);

// Botón para desactivar alarma
dismissAlarmBtn.addEventListener('click', dismissAlarm);

// Permitir establecer alarma al presionar Enter en el input
alarmTimeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setAlarm();
    }
});

// ========== INICIALIZACIÓN ==========

/**
 * Inicializa la aplicación
 */
function init() {
    // Actualizar reloj inmediatamente
    updateClock();

    // Actualizar reloj cada segundo
    setInterval(updateClock, 1000);

    console.log('✓ Reloj digital inicializado correctamente');
    console.log('Modo 24h activado');
    console.log('Esperando configuración de alarma...');
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Iniciar también si el script se carga después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
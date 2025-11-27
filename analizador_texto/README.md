# 📝 Analizador de Texto - Estadísticas en Tiempo Real

Una aplicación web moderna para analizar texto con estadísticas detalladas que se actualizan en tiempo real mientras escribes.

## 🎯 Características Principales

### 📊 Estadísticas en Tiempo Real
- **Caracteres (con espacios)**: Cuenta total de caracteres incluyendo espacios
- **Caracteres (sin espacios)**: Cuenta de caracteres sin incluir espacios en blanco
- **Palabras**: Número total de palabras considerando múltiples espacios
- **Oraciones**: Contador basado en puntos (.), signos de interrogación (?) y exclamación (!)
- **Tiempo de lectura**: Estimación basada en 200 palabras por minuto (WPM estándar)
- **Palabras únicas**: Cantidad de palabras diferentes (sin duplicados)

### 🎨 Interfaz de Usuario
- Diseño moderno y responsivo
- Tarjetas coloridas para cada métrica con colores diferenciados
- Animaciones sutiles al actualizar números
- Interfaz intuitiva y fácil de usar
- Compatibilidad con dispositivos móviles

### 🛠️ Funcionalidades Adicionales
- **Limpiar**: Resetea el textarea y todas las estadísticas
- **Copiar Estadísticas**: Copia un resumen de las estadísticas al portapapeles
- **Descargar Análisis**: Descarga un archivo de texto con el análisis completo

## 🏗️ Estructura del Proyecto

```
analizador_texto/
├── index.html      # Estructura HTML con textarea y tarjetas de estadísticas
├── style.css       # Estilos CSS con gradientes y animaciones
├── script.js       # Lógica JavaScript con funciones de análisis
└── README.md       # Este archivo
```

## 📄 Archivos Incluidos

### index.html
- Textarea grande para escribir o pegar texto
- Grid de tarjetas de estadísticas
- Botones de acción (Limpiar, Copiar, Descargar)
- Sección de notificaciones

### style.css
- Diseño limpio estilo "editor de texto"
- Gradientes lineales en el fondo y botones
- Colores diferenciados para cada métrica
- Animaciones fade-in para actualización de números
- Media queries para responsividad en móviles

### script.js
- Funciones de conteo bien documentadas
- Actualización en tiempo real con `addEventListener`
- Validación para textos vacíos
- Manejo de errores básico
- Comentarios explicativos en cada función

## 🚀 Cómo Usar

### En tu navegador:
1. Abre el archivo `index.html` en un navegador web
2. Comienza a escribir o pega un texto en el textarea
3. Observa cómo se actualizan las estadísticas en tiempo real
4. Usa los botones para:
   - **Limpiar**: Borrar todo y resetear
   - **Copiar Estadísticas**: Copiar las métricas al portapapeles
   - **Descargar**: Guardar el análisis en un archivo .txt

### Con un servidor local (recomendado):
```bash
# Opción 1: Con Python 3
python -m http.server 8000

# Opción 2: Con Node.js (si tienes http-server instalado)
http-server

# Opción 3: Con Live Server (extensión de VS Code)
# Clic derecho en index.html > Open with Live Server
```

Luego abre: `http://localhost:8000`

## 🔧 Funciones JavaScript Principales

### `countCharactersTotal(text)`
Cuenta caracteres incluyendo espacios.

### `countCharactersNoSpace(text)`
Cuenta caracteres eliminando espacios en blanco.

### `countWords(text)`
Divide el texto por espacios en blanco y cuenta palabras.

### `countSentences(text)`
Busca puntos, signos de interrogación y exclamación.

### `countUniqueWords(text)`
Usa un Set para obtener palabras únicas sin duplicados.

### `calculateReadingTime(wordCount)`
Calcula minutos basado en 200 palabras por minuto.

### `updateStatistics()`
Actualiza todas las métricas en el DOM.

### `copyStatistics()`
Copia las estadísticas al portapapeles en formato legible.

### `downloadAnalysis()`
Descarga un archivo de texto con el análisis completo.

## 🎨 Colores Utilizados

| Métrica | Color | Código |
|---------|-------|--------|
| Caracteres (con espacios) | Rojo | #ff6b6b |
| Caracteres (sin espacios) | Verde Azulado | #4ecdc4 |
| Palabras | Azul Cielo | #45b7d1 |
| Oraciones | Naranja | #ffa502 |
| Tiempo de Lectura | Púrpura Azul | #667eea |
| Palabras Únicas | Púrpura | #764ba2 |

## 📱 Responsive Design

La aplicación se adapta perfectamente a:
- 📱 Teléfonos móviles (desde 320px)
- 📱 Tablets (768px)
- 💻 Pantallas grandes (1000px+)

## 🛡️ Manejo de Errores

- Validación de textos vacíos
- Manejo de errores en la copia al portapapeles con fallback
- Notificaciones al usuario para todas las acciones
- Listener global para errores no capturados

## ⌨️ Eventos Manejados

- `input`: Actualización en tiempo real mientras escribes
- `click`: Botones de acción
- `DOMContentLoaded`: Inicialización de la aplicación

## 💡 Características Técnicas

- **Vanilla JavaScript**: Sin frameworks externos
- **CSS Grid**: Para el layout responsivo
- **LocalStorage**: Puede extenderse para guardar textos
- **Clipboard API**: Para copiar contenido
- **Blob API**: Para descargar archivos

## 🔮 Posibles Mejoras Futuras

- [ ] Guardar borradores en LocalStorage
- [ ] Análisis de sentimiento
- [ ] Palabras más frecuentes
- [ ] Exportar a PDF
- [ ] Tema oscuro/claro
- [ ] Multidioma
- [ ] Corrector ortográfico
- [ ] Lectura en voz alta

## 📝 Notas Técnicas

- La velocidad de lectura se basa en 200 WPM (promedio estándar)
- Las oraciones se cuentan por grupos de puntuación consecutiva
- Las palabras únicas se convierten a minúsculas para comparación
- Todos los emojis son decorativos y accesibles

## 🔐 Privacidad

- ✓ Todo se procesa localmente en tu navegador
- ✓ No se envía ningún dato a servidores
- ✓ Tu texto nunca se almacena automáticamente
- ✓ Puedes usar el botón "Limpiar" para borrar todo

## 📄 Licencia

Este proyecto es de código abierto y puede usarse libremente.

---

**¡Disfruta analizando tus textos!** 📊✨

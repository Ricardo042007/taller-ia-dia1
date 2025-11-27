Carpeta: calculadora

Contenido:
- `prompt_calculadora.txt` : Prompt en español listo para usar con una IA o compartir a un desarrollador para generar los archivos de la calculadora.

Qué puedo hacer ahora por ti:
- Generar los archivos `index.html`, `style.css` y `script.js` dentro de esta carpeta, con la calculadora funcional y comentada (incluye soporte de teclado). (Responde: "Genera archivos")
- Modificar el prompt para pedir características adicionales (tema oscuro, accesibilidad avanzada, history, etc.).

Cómo probar localmente los archivos (cuando estén creados):
1. Abrir `index.html` directamente en el navegador.
2. O servir la carpeta con Python desde PowerShell:

```powershell
cd 'C:\Users\albor\OneDrive\Escritorio\Taller_programacion\calculadora'
python -m http.server 8000
```

y luego abrir: http://localhost:8000/index.html

Si quieres que genere ahora los tres archivos listos (`index.html`, `style.css`, `script.js`), dime "Genera archivos" y los creo en `calculadora/`.

// Escribe un programa que salude al usuario por consola
console.log("¡Hola, Mundo! Bienvenido al curso de IA.");


// que es un commit y por que es importante
// Un commit en Git es una instantánea del estado actual de tu proyecto. Es importante porque permite guardar cambios de manera organizada y rastrear 

//"¿Cuál es la diferencia entre git add y git commit?"
// git add agrega los cambios al área de preparación (staging area), mientras que git commit guarda esos cambios en el historial del repositorio.

//"Explícame qué hace el comando git push."
// El comando git push envía los commits locales a un repositorio remoto, actualizando así el historial del proyecto en ese repositorio.

 
// --------------------------------------------------------------
// Función sencilla: sumar dos números
// Actuando como profesor: a continuación verás una función muy básica
// escrita con sintaxis ES5 (sin características avanzadas de ES6).
// Comentarios explicativos están en cada línea o bloque.
// --------------------------------------------------------------

// Definimos la función con la palabra clave `function` y le damos el nombre `sumar`.
// `a` y `b` son los parámetros que la función recibirá cuando la llamemos.
function sumar(a, b) {
	// Convertimos ambos parámetros a número usando `Number()`.
	// Esto evita que, si alguien pasa "2" y "3" como strings, se haga
	// una concatenación como en "2" + "3" -> "23".
	var numA = Number(a);
	var numB = Number(b);

	// `isNaN` devuelve true si el valor no es un número válido.
	// Comprobamos ambos argumentos y, si alguno no es número, lanzamos un error.
	if (isNaN(numA) || isNaN(numB)) {
		// `throw` interrumpe la ejecución y devuelve un Error con el mensaje.
		throw new Error('Ambos argumentos deben ser números');
	}

	// Si llegamos aquí, ambos valores son números válidos.
	// Realizamos la suma y devolvemos el resultado con `return`.
	return numA + numB;
}

// --------------------------------------------------------------
// Ejemplos de uso (puedes ejecutar el archivo con Node.js):
//  node index.js            -> mostrará los ejemplos a continuación
//  node index.js 2 3        -> (opcional) podríamos añadir soporte CLI, pero
//                             aquí mostramos ejemplos directos.
// --------------------------------------------------------------

// Mostramos ejemplos en consola usando console.log
console.log('Ejemplo sumar(2, 3):', sumar(2, 3));
console.log('Ejemplo sumar("4", "5"):', sumar('4', '5')); // strings convertidos a números

// Ejemplo con manejo de error: demostramos cómo capturar el error lanzado
try {
	// Esto producirá un error porque 'hola' no es un número
	console.log('Intento sumar("hola", 2):', sumar('hola', 2));
} catch (err) {
	// Mostramos el mensaje de error en la consola sin que el programa termine abruptamente
	console.error('Error al sumar:', err.message);
}


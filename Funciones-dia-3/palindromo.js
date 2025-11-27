//ejercicio: dector de palindromos 
//objetivo: crea una logica compleja ensapsulada en una funcion
// un ejemplo de palindromo es "analina" o "reconocer", oso
//crea una funcion llamada esPalindromo que reciba un texto y retorne true si es palindromo o false si no lo es


//1. crear una funcion que reciba un texto y retorne true si es palindromo o false si no lo es
//   Comentarios explicativos:
//   - Normalizamos el texto quitando espacios y pasando a minúsculas para que la comparación sea insensible
//     a mayúsculas y a espacios entre palabras.
//   - Recorremos sólo la mitad del texto y comparamos el caracter i con su correspondiente desde el final.
//   - Si encontramos una diferencia, devolvemos false inmediatamente; si no, devolvemos true al finalizar.
//   Nota: actualmente solo se eliminan espacios. Si quieres ignorar puntuación o acentos, habría que
//   limpiar/normalizar más el texto antes de comparar.
function esPalindromo(texto) {
    // Asegurar que trabajamos con string
    if (typeof texto !== 'string') texto = String(texto);

    // Eliminar espacios y normalizar a minúsculas para ignorar mayúsculas y espacios
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();

    const longitud = textoLimpio.length;
    for (let i = 0, mitad = Math.floor(longitud / 2); i < mitad; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false;
        }
    }

    return true;
}


//crea una funcion para calcular el area de circulo dado su radio
/**
 * Calcula el área de un círculo dado su radio.
 * 
 * @param {number} radio - El radio del círculo en unidades de longitud
 * @returns {number} El área del círculo calculada usando la fórmula A = π * r²
 * 
 * @example
 * // Retorna el área de un círculo con radio 5
 * areaCirculo(5); // 78.53981633974483
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
//crea una funcion para calcular el area de un rectangulo dado su base y altura
    /**
     * Calcula el área de un rectángulo.
     * 
     * @param {number} base - La base del rectángulo en unidades.
     * @param {number} altura - La altura del rectángulo en unidades.
     * @returns {number} El área del rectángulo (base × altura).
     * 
     * @example
     * const area = areaRectangulo(5, 10);
     * console.log(area); // 50
     */
    function areaRectangulo(base, altura) {
        return base * altura;
    }
//vamos a calcular el volumen de un cilindro 
//el volumen es el area de la base (circulo) * altura 
/**
 * Calcula el volumen de un cilindro.
 * 
 * El volumen se obtiene multiplicando el área de la base circular
 * por la altura del cilindro. La fórmula utilizada es: V = πr²h
 * 
 * @param {number} radio - El radio de la base circular del cilindro en unidades.
 * @param {number} altura - La altura del cilindro en unidades.
 * @returns {number} El volumen del cilindro en unidades cúbicas.
 * 
 * @example
 * // Calcular el volumen de un cilindro con radio 5 y altura 10
 * const volumen = volumenCilindro(5, 10);
 * console.log(volumen); // Resultado: 785.3981633974483
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}
//crear una funcion para calcular una derivada simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la derivada de un término polinómico de la forma a*x^n.
 *
 * La derivada de a*x^n es (a * n) * x^(n - 1). Devuelve un objeto con el
 * nuevo coeficiente y exponente resultantes de aplicar la regla de la potencia.
 *
 * @param {number} a - Coeficiente del término original (a).
 * @param {number} n - Exponente del término original (n).
 * @returns {{coeficiente: number, exponente: number}} Objeto con:
 *   - coeficiente: nuevo coeficiente (a * n)
 *   - exponente: nuevo exponente (n - 1)
 *
 * @example
 * // Para el término 3*x^4:
 * // derivadaPolinomio(3, 4) devuelve { coeficiente: 12, exponente: 3 }
 * // que representa 12*x^3
 */
function derivadaPolinomio(a, n) {
    // La derivada de ax^n es a*n*x^(n-1)
    const nuevoCoeficiente = a * n;
    const nuevoExponente = n - 1;
    return { coeficiente: nuevoCoeficiente, exponente: nuevoExponente };
}
//crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la integral de un polinomio de la forma ax^n.
 * La integral de ax^n es (a/(n+1))*x^(n+1) + C, donde C es la constante de integración.
 *
 * @param {number} a - El coeficiente del término del polinomio.
 * @param {number} n - El exponente del término del polinomio.
 * @returns {{ coeficiente: number, exponente: number }} - Un objeto que contiene el nuevo coeficiente y el nuevo exponente de la integral.
 *
 * @example
 * // Integral de 2x^3
 * const resultado = integralPolinomio(2, 3);
 * console.log(resultado); // { coeficiente: 0.5, exponente: 4 }
 */
function integralPolinomio(a, n) {
    // La integral de ax^n es (a/(n+1))*x^(n+1) + C
    const nuevoCoeficiente = a / (n + 1);
    const nuevoExponente = n + 1;
    return { coeficiente: nuevoCoeficiente, exponente: nuevoExponente };
}

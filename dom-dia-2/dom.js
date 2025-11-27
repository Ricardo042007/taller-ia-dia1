// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.

// Ejemplo de selección por ID usando getElementById (forma clásica)
// Busca en el documento un elemento con id="btnCambiarColor"
var btnCambiarColor = document.getElementById('btnCambiarColor');
// Busca en el documento un elemento con id="miCaja"
var miCaja = document.getElementById('miCaja');

// Alternativa moderna (más flexible): querySelector con selector CSS
// var btnCambiarColor = document.querySelector('#btnCambiarColor');
// var miCaja = document.querySelector('#miCaja');

// Comprobamos que los elementos existan antes de usarlos
if (btnCambiarColor && miCaja) {
	// 2. Escuchar eventos (Clicks)
	// Añadimos un listener al botón para que ejecute una función cuando se haga click
	btnCambiarColor.addEventListener('click', function () {
		// 3. Modificar elementos
		// Cambia el color de fondo de la caja a rojo
		miCaja.style.backgroundColor = 'red';
	});

	// Reto: botón 'Cambiar Texto' que cambia el contenido de la caja
	var btnCambiarTexto = document.getElementById('btnCambiarTexto');
	if (btnCambiarTexto) {
		btnCambiarTexto.addEventListener('click', function () {
			miCaja.textContent = '¡Hola DOM!';
		});
	}
} else {
	// Si no existen los elementos, mostrar advertencia en consola para depuración
	console.warn('No se encontraron elementos con id btnCambiarColor o miCaja en el documento');
}

// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

// ...existing code...
// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.

// Ejemplo de selección por ID usando getElementById (forma clásica)
// Busca en el documento un elemento con id="btnCambiarColor"
var btnCambiarColor = document.getElementById('btnCambiarColor');
// Busca en el documento un elemento con id="miCaja"
var miCaja = document.getElementById('miCaja');

// Alternativa moderna (más flexible): querySelector con selector CSS
// var btnCambiarColor = document.querySelector('#btnCambiarColor');
// var miCaja = document.querySelector('#miCaja');

// Comprobamos que los elementos existan antes de usarlos
if (btnCambiarColor && miCaja) {
    // 2. Escuchar eventos (Clicks)
    // Añadimos un listener al botón para que ejecute una función cuando se haga click
    btnCambiarColor.addEventListener('click', function () {
        // 3. Modificar elementos
        // Cambia el color de fondo de la caja a rojo
        miCaja.style.backgroundColor = 'red';
    });

    // Reto: botón 'Cambiar Texto' que cambia el contenido de la caja
    var btnCambiarTexto = document.getElementById('btnCambiarTexto');
    if (btnCambiarTexto) {
        btnCambiarTexto.addEventListener('click', function () {
            miCaja.textContent = '¡Hola DOM!';
        });
    }
} else {
    // Si no existen los elementos, mostrar advertencia en consola para depuración
    console.warn('No se encontraron elementos con id btnCambiarColor o miCaja en el documento');
}

// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

// ...existing code...

// ------------------------------
// A continuación: insertar una calculadora simple (HTML + CSS mínimo) dentro de esta página
// y añadir soporte para teclado (teclas numéricas y operadores).
// Esta sección crea la UI si no existe y agrega la lógica (sin usar eval()).
// ------------------------------

// Solo crear la calculadora si no existe ya (evita duplicados)
if (!document.getElementById('calc-container')) {

    // 1) Crear contenedor principal
    var calcContainer = document.createElement('div');
    calcContainer.id = 'calc-container';
    // clases mínimas para estilo; el usuario puede añadir CSS en su proyecto
    calcContainer.style.maxWidth = '360px';
    calcContainer.style.margin = '20px auto';
    calcContainer.style.fontFamily = 'Arial, sans-serif';

    // 2) Insertar HTML de la calculadora (estructura básica)
    calcContainer.innerHTML =
        '<div id="calc" role="application" aria-label="Calculadora simple" style="border:1px solid #ddd;padding:12px;border-radius:8px;background:#fff;">' +
            '<div id="calc-display" style="background:#222;color:#fff;padding:12px;border-radius:4px;text-align:right;font-size:1.4rem;min-height:44px;overflow:auto;">0</div>' +
            '<div class="calc-keys" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px;">' +
                '<button class="cbtn func" data-action="clear">C</button>' +
                '<button class="cbtn func" data-action="backspace">⌫</button>' +
                '<button class="cbtn op" data-value="%" title="porcentaje">%</button>' +
                '<button class="cbtn op" data-value="/" title="dividir">÷</button>' +

                '<button class="cbtn num" data-value="7">7</button>' +
                '<button class="cbtn num" data-value="8">8</button>' +
                '<button class="cbtn num" data-value="9">9</button>' +
                '<button class="cbtn op" data-value="*">×</button>' +

                '<button class="cbtn num" data-value="4">4</button>' +
                '<button class="cbtn num" data-value="5">5</button>' +
                '<button class="cbtn num" data-value="6">6</button>' +
                '<button class="cbtn op" data-value="-">−</button>' +

                '<button class="cbtn num" data-value="1">1</button>' +
                '<button class="cbtn num" data-value="2">2</button>' +
                '<button class="cbtn num" data-value="3">3</button>' +
                '<button class="cbtn op" data-value="+">+</button>' +

                '<button class="cbtn num" data-value="0" style="grid-column:span 2;">0</button>' +
                '<button class="cbtn num" data-value=".">.</button>' +
                '<button class="cbtn func" data-action="equal">=</button>' +
            '</div>' +
        '</div>';

    // 3) Añadir al documento (al final del body)
    document.body.appendChild(calcContainer);
}

// ------------------------------
// Lógica de la calculadora (similar a lo que se puso en calculadora/script.js,
// pero adaptada e insertada aquí). Comentarios para principiantes.
// ------------------------------

// Referencias al DOM (pantalla y área de teclas)
var calcDisplay = document.getElementById('calc-display');
var calcKeys = (document.getElementById('calc-container') || document.body).querySelector('.calc-keys');

// Estado: cadena con la expresión que el usuario está construyendo
var calcCurrent = '';

// Función que actualiza la pantalla con la entrada actual
function calcUpdateDisplay() {
    calcDisplay.textContent = calcCurrent === '' ? '0' : calcCurrent;
}

// Añade un carácter validando puntos repetidos en el número actual
function calcAppendChar(ch) {
    // Si es punto, evitar 2 puntos en el mismo número
    if (ch === '.') {
        // dividir por operadores para obtener la parte actual
        var parts = calcCurrent.split(/[\+\-\*\/\%]/);
        var last = parts[parts.length - 1];
        if (last.indexOf('.') !== -1) {
            return; // ya hay un punto en esta parte
        }
        if (last === '') {
            // si el número empieza con '.', anteponer 0 para claridad
            calcCurrent += '0';
        }
    }
    // Añadir el carácter
    calcCurrent += ch;
    calcUpdateDisplay();
}

// Borrar todo
function calcClearAll() {
    calcCurrent = '';
    calcUpdateDisplay();
}

// Borrar último carácter
function calcBackspace() {
    if (calcCurrent.length > 0) {
        calcCurrent = calcCurrent.slice(0, -1);
        calcUpdateDisplay();
    }
}

// Manejo de clicks en la calculadora (delegación)
if (calcKeys) {
    calcKeys.addEventListener('click', function (e) {
        var btn = e.target;
        // asegurarse de que se ha clicado un botón
        if (!btn.matches('button')) return;

        var val = btn.getAttribute('data-value');
        var action = btn.getAttribute('data-action');

        if (action === 'clear') { calcClearAll(); return; }
        if (action === 'backspace') { calcBackspace(); return; }
        if (action === 'equal') { calcCalculate(); return; }

        if (val) {
            // para la visualización usamos '*' en el input para multiplicación
            // y '/' para división; el botón muestra × o ÷ pero el data-value tiene el símbolo correcto
            calcAppendChar(val);
        }
    });
}

// ------------------------------
// Evaluador simple seguro (tokenizador + shunting-yard + RPN)
// Explicación corta: transformamos la expresión infija a RPN y luego la evaluamos.
// Esto evita usar eval() y es más controlable.
// ------------------------------

// Tokeniza la expresión en números y operadores
function calcTokenize(expr) {
    var tokens = [];
    var i = 0;
    while (i < expr.length) {
        var ch = expr[i];
        // ignorar espacios
        if (/\s/.test(ch)) { i++; continue; }

        // números (dígitos y punto decimal)
        if (/\d|\./.test(ch)) {
            var num = ch;
            i++;
            while (i < expr.length && /[\d.]/.test(expr[i])) {
                num += expr[i++];
            }
            tokens.push({ type: 'num', value: parseFloat(num) });
            continue;
        }

        // operadores y paréntesis simples (no añadimos funciones)
        if (/[+\-*/%^()]/.test(ch)) {
            tokens.push({ type: 'op', value: ch });
            i++;
            continue;
        }

        // carácter no reconocido -> error
        throw new Error('Carácter no válido: ' + ch);
    }
    return tokens;
}

// Convertir tokens infix a RPN (shunting-yard). Soporta unario '-' como 'u-'
function calcInfixToRPN(tokens) {
    var out = [];
    var ops = [];

    var precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3, 'u-': 4 };
    var rightAssoc = { '^': true, 'u-': true };

    for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        if (t.type === 'num') {
            out.push(t);
            continue;
        }
        if (t.type === 'op') {
            var v = t.value;
            // detectar unario '-'
            if (v === '-') {
                var prev = i === 0 ? null : tokens[i - 1];
                if (prev == null || (prev.type === 'op' && prev.value !== ')')) {
                    v = 'u-';
                }
            }
            if (v === '(') { ops.push(v); continue; }
            if (v === ')') {
                // sacar hasta '('
                while (ops.length && ops[ops.length - 1] !== '(') {
                    out.push({ type: 'op', value: ops.pop() });
                }
                if (!ops.length || ops[ops.length - 1] !== '(') {
                    throw new Error('Paréntesis desbalanceados');
                }
                ops.pop(); // quitar '('
                continue;
            }
            // operador normal: pop según precedencia y asociatividad
            while (ops.length) {
                var top = ops[ops.length - 1];
                if (top === '(') break;
                var predTop = precedence[top];
                var predV = precedence[v];
                if (predTop > predV || (predTop === predV && !rightAssoc[v])) {
                    out.push({ type: 'op', value: ops.pop() });
                } else { break; }
            }
            ops.push(v);
        }
    }

    while (ops.length) {
        var op = ops.pop();
        if (op === '(' || op === ')') throw new Error('Paréntesis desbalanceados');
        out.push({ type: 'op', value: op });
    }
    return out;
}

// Evaluar RPN y devolver resultado numérico
function calcEvalRPN(rpn) {
    var stack = [];
    for (var i = 0; i < rpn.length; i++) {
        var t = rpn[i];
        if (t.type === 'num') { stack.push(t.value); continue; }
        var op = t.value;
        if (op === 'u-') {
            if (stack.length < 1) throw new Error('Operación unaria inválida');
            var a = stack.pop();
            stack.push(-a);
            continue;
        }
        if (stack.length < 2) throw new Error('Operación binaria inválida');
        var b = stack.pop();
        var a2 = stack.pop();
        var res;
        switch (op) {
            case '+': res = a2 + b; break;
            case '-': res = a2 - b; break;
            case '*': res = a2 * b; break;
            case '/':
                if (b === 0) throw new Error('División por cero');
                res = a2 / b; break;
            case '%':
                if (b === 0) throw new Error('División por cero en módulo');
                res = a2 % b; break;
            case '^': res = Math.pow(a2, b); break;
            default: throw new Error('Operador desconocido: ' + op);
        }
        stack.push(res);
    }
    if (stack.length !== 1) throw new Error('Expresión inválida');
    return stack[0];
}

// Función principal que calcula la expresión actual y actualiza la pantalla
function calcCalculate() {
    if (calcCurrent.trim() === '') return;
    try {
        var tokens = calcTokenize(calcCurrent);
        var rpn = calcInfixToRPN(tokens);
        var result = calcEvalRPN(rpn);
        if (!isFinite(result)) throw new Error('Resultado no finito');
        // limitar decimales a 12 para evitar notación científica extraña
        var out = Math.round(result * 1e12) / 1e12;
        calcCurrent = String(out);
        calcUpdateDisplay();
    } catch (err) {
        // mostrar 'Error' brevemente y restaurar después
        calcDisplay.textContent = 'Error';
        setTimeout(calcUpdateDisplay, 1200);
        console.error(err);
    }
}

// Inicializar visualmente
calcUpdateDisplay();

// ------------------------------
// Soporte de teclado: las teclas numéricas y operadores afectan la calculadora
// Comentarios: escuchamos keydown y mapeamos teclas a acciones iguales a los botones
// ------------------------------
document.addEventListener('keydown', function (e) {
    var k = e.key;

    // Números 0-9 y punto
    if (/^[0-9]$/.test(k) || k === '.') {
        // evitar comportamiento por defecto (ej. scroll en algunas páginas)
        e.preventDefault();
        calcAppendChar(k);
        return;
    }

    // Operadores directos
    if (k === '+' || k === '-' || k === '*' || k === '/' || k === '%' || k === '^') {
        e.preventDefault();
        calcAppendChar(k);
        return;
    }

    // Tecla Enter o '=' -> calcular
    if (k === 'Enter' || k === '=') {
        e.preventDefault();
        calcCalculate();
        return;
    }

    // Backspace -> borrar último carácter
    if (k === 'Backspace') {
        e.preventDefault();
        calcBackspace();
        return;
    }

    // Escape -> limpiar todo
    if (k === 'Escape') {
        e.preventDefault();
        calcClearAll();
        return;
    }

    // Permitir 'x' o 'X' como multiplicación (mapear a '*')
    if (k === 'x' || k === 'X') {
        e.preventDefault();
        calcAppendChar('*');
        return;
    }
});

// Exponer funciones en window para depuración si se desea
window.domCalc = {
    appendChar: calcAppendChar,
    clear: calcClearAll,
    backspace: calcBackspace,
    calc: calcCalculate
};
// script.js
// Calculadora en JavaScript (sin eval) con soporte de teclado y comentarios en español

(function () {
  // Referencias al DOM
  var display = document.getElementById('display');
  var keys = document.getElementById('keys');

  // Estado: cadena que representa la entrada actual
  var current = '';

  // Actualiza la pantalla
  function updateDisplay() {
    display.textContent = current === '' ? '0' : current;
  }

  // Añade un carácter a la entrada (número, operador o punto)
  function appendChar(ch) {
    // Si es punto, evitamos que haya dos puntos en el mismo número
    if (ch === '.') {
      // dividir la entrada por operadores para obtener la parte actual
      var parts = current.split(/[+\-*/%^()]/);
      var last = parts[parts.length - 1];
      if (last.indexOf('.') !== -1) return; // ya tiene punto
      if (last === '') current += '0'; // '.5' -> '0.5'
    }
    current += ch;
    updateDisplay();
  }

  // Limpiar todo
  function clearAll() {
    current = '';
    updateDisplay();
  }

  // Borrar último carácter
  function backspace() {
    if (current.length > 0) {
      current = current.slice(0, -1);
      updateDisplay();
    }
  }

  // Manejo de clicks (delegación)
  keys.addEventListener('click', function (e) {
    var btn = e.target;
    if (!btn.matches('button')) return;
    var val = btn.getAttribute('data-value');
    var action = btn.getAttribute('data-action');

    if (action === 'clear') { clearAll(); return; }
    if (action === 'backspace') { backspace(); return; }
    if (action === 'equal') { calculate(); return; }

    if (val) appendChar(val);
  });

  // Manejo del teclado: números, operadores, Enter, Backspace, Escape
  document.addEventListener('keydown', function (e) {
    var k = e.key;

    // números y punto
    if (/^[0-9]$/.test(k) || k === '.') {
      e.preventDefault();
      appendChar(k);
      return;
    }

    // operadores directos
    if (k === '+' || k === '-' || k === '*' || k === '/' || k === '%' || k === '^') {
      e.preventDefault();
      appendChar(k);
      return;
    }

    // Enter o '=' -> calcular
    if (k === 'Enter' || k === '=') {
      e.preventDefault();
      calculate();
      return;
    }

    // Backspace
    if (k === 'Backspace') {
      e.preventDefault();
      backspace();
      return;
    }

    // Escape -> limpiar
    if (k === 'Escape') {
      e.preventDefault();
      clearAll();
      return;
    }

    // 'x' o 'X' -> multiplicación
    if (k === 'x' || k === 'X') {
      e.preventDefault();
      appendChar('*');
      return;
    }
  });

  // --------------------
  // Evaluador seguro: tokenizador, shunting-yard y RPN
  // --------------------

  // Tokeniza la expresión en números y operadores
  function tokenize(expr) {
    var tokens = [];
    var i = 0;
    while (i < expr.length) {
      var ch = expr[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (/\d|\./.test(ch)) {
        var num = ch; i++;
        while (i < expr.length && /[\d.]/.test(expr[i])) num += expr[i++];
        tokens.push({ type: 'num', value: parseFloat(num) });
        continue;
      }
      if (/[+\-*/%^()]/.test(ch)) { tokens.push({ type: 'op', value: ch }); i++; continue; }
      throw new Error('Carácter no válido en la expresión: ' + ch);
    }
    return tokens;
  }

  // Convierte tokens infix a RPN (shunting-yard), soporta unario '-'
  function infixToRPN(tokens) {
    var out = [];
    var ops = [];
    var prec = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3, 'u-': 4 };
    var rightAssoc = { '^': true, 'u-': true };

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.type === 'num') { out.push(t); continue; }
      if (t.type === 'op') {
        var v = t.value;
        if (v === '-') {
          var prev = i === 0 ? null : tokens[i - 1];
          if (prev == null || (prev.type === 'op' && prev.value !== ')')) v = 'u-';
        }
        if (v === '(') { ops.push(v); continue; }
        if (v === ')') {
          while (ops.length && ops[ops.length - 1] !== '(') out.push({ type: 'op', value: ops.pop() });
          if (!ops.length || ops[ops.length - 1] !== '(') throw new Error('Paréntesis desbalanceados');
          ops.pop(); continue;
        }
        while (ops.length) {
          var top = ops[ops.length - 1];
          if (top === '(') break;
          var pTop = prec[top];
          var pV = prec[v];
          if (pTop > pV || (pTop === pV && !rightAssoc[v])) out.push({ type: 'op', value: ops.pop() }); else break;
        }
        ops.push(v);
      }
    }
    while (ops.length) { var o = ops.pop(); if (o === '(' || o === ')') throw new Error('Paréntesis desbalanceados'); out.push({ type: 'op', value: o }); }
    return out;
  }

  // Evalúa RPN
  function evalRPN(rpn) {
    var s = [];
    for (var i = 0; i < rpn.length; i++) {
      var t = rpn[i];
      if (t.type === 'num') { s.push(t.value); continue; }
      var op = t.value;
      if (op === 'u-') { if (s.length < 1) throw new Error('Operador unario inválido'); s.push(-s.pop()); continue; }
      if (s.length < 2) throw new Error('Operación inválida');
      var b = s.pop(); var a = s.pop(); var res;
      switch (op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': if (b === 0) throw new Error('División por cero'); res = a / b; break;
        case '%': if (b === 0) throw new Error('División por cero en módulo'); res = a % b; break;
        case '^': res = Math.pow(a, b); break;
        default: throw new Error('Operador desconocido: ' + op);
      }
      s.push(res);
    }
    if (s.length !== 1) throw new Error('Expresión inválida');
    return s[0];
  }

  // Calcula la expresión actual
  function calculate() {
    if (current.trim() === '') return;
    try {
      var tokens = tokenize(current);
      var rpn = infixToRPN(tokens);
      var result = evalRPN(rpn);
      if (!isFinite(result)) throw new Error('Resultado no finito');
      var out = Math.round(result * 1e12) / 1e12; // limitar decimales
      current = String(out);
      updateDisplay();
    } catch (err) {
      display.textContent = 'Error';
      setTimeout(updateDisplay, 1400);
      console.error(err);
    }
  }

  // Inicializa la pantalla
  updateDisplay();

  // Exponer funciones para depuración (opcional)
  window.calc = { appendChar: appendChar, clearAll: clearAll, backspace: backspace, calculate: calculate };
})();

// ----------------------------
// Conversor Celsius -> Fahrenheit
// Función simple y conexión con la UI añadida en index.html
// ----------------------------
(function () {
  // Seleccionamos los elementos del conversor que añadimos al HTML
  var cInput = document.getElementById('celsiusInput');
  var convertBtn = document.getElementById('convertBtn');
  var outF = document.getElementById('fahrenheitOutput');

  if (!cInput || !convertBtn || !outF) {
    // Si por alguna razón faltan, no hacemos nada
    return;
  }

  // Función que convierte Celsius a Fahrenheit
  // Fórmula: (C * 9/5) + 32
  function celsiusToFahrenheit(c) {
    return (c * 9 / 5) + 32;
  }

  // Función que lee la entrada, convierte y actualiza la salida
  function doConvert() {
    var raw = cInput.value;
    // parseFloat convierte la cadena a número; Number también valdría
    var c = parseFloat(raw);
    if (isNaN(c)) {
      outF.textContent = '--';
      return;
    }
    var f = celsiusToFahrenheit(c);
    // Redondeamos a máximo 2 decimales para legibilidad
    var rounded = Math.round(f * 100) / 100;
    outF.textContent = String(rounded);
  }

  // Evento click en el botón
  convertBtn.addEventListener('click', function () {
    doConvert();
  });

  // Soporte de teclado: Enter cuando el input está enfocado
  cInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      doConvert();
    }
  });

  // También actualizar en cambio (opcional) para ver resultado instantáneo
  cInput.addEventListener('input', function () {
    // podemos comentar la siguiente línea si no queremos actualización en cada tecleo
    // doConvert();
  });

  // Exponer la función por si se desea usar desde la consola para pruebas
  window.celsiusToFahrenheit = celsiusToFahrenheit;
})();

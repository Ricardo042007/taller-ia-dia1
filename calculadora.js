#!/usr/bin/env node
/*
  calculadora.js
  Calculadora CLI simple en Node.js

  Uso:
    - Evaluar una expresión completa:
        node calculadora.js "2+3*4"
    - Pasar números y operador como argumentos:
        node calculadora.js 2 + 3
    - Entrar en modo interactivo (REPL):
        node calculadora.js

  NOTA DE SEGURIDAD: Este ejemplo usa `Function` para evaluar expresiones
  a partir de una validación básica de caracteres. Está pensado con fines
  educativos; en producción use un parser matemático (por ejemplo `mathjs`)
  o implemente un analizador seguro (shunting-yard) para evitar riesgos.
*/

const readline = require('readline');

// Expresión permitida: dígitos, espacios, operadores +-*/% paréntesis y punto decimal
const VALID_RE = /^[0-9+\-*/().%\s]+$/;

function evaluate(expr) {
  expr = String(expr).trim();
  if (expr.length === 0) throw new Error('Expresión vacía');
  if (!VALID_RE.test(expr)) throw new Error('Expresión contiene caracteres no permitidos');

  try {
    // Evaluamos la expresión de forma controlada construyendo una Function
    // con 'use strict'. Seguimos validando el resultado.
    const fn = new Function('"use strict"; return (' + expr + ');');
    const result = fn();
    if (typeof result === 'number' && !Number.isFinite(result)) throw new Error('Resultado no finito');
    return result;
  } catch (err) {
    throw new Error('Error al evaluar la expresión: ' + err.message);
  }
}

function printUsage() {
  console.log('Uso: node calculadora.js "2+3*4"  o  node calculadora.js 2 + 3');
  console.log('Ejecuta sin argumentos para entrar en modo interactivo (REPL).');
}

// --- Modo no interactivo: argumentos en línea ---
const args = process.argv.slice(2);
if (args.length > 0) {
  // Si pasan varios argumentos (ej: 2 + 3) los unimos con espacios
  const expr = args.join(' ');
  try {
    const res = evaluate(expr);
    console.log(res);
  } catch (err) {
    console.error(err.message);
    printUsage();
    process.exit(1);
  }
  return;
}

// --- Modo interactivo (REPL) ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'calc> '
});

console.log('Calculadora interactiva. Escribe una expresión y presiona Enter. Escribe `exit` o Ctrl+C para salir.');
rl.prompt();

rl.on('line', (line) => {
  const text = line.trim();
  if (text === '' ) {
    rl.prompt();
    return;
  }
  if (text.toLowerCase() === 'exit') {
    rl.close();
    return;
  }

  try {
    const result = evaluate(text);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Adiós.');
  process.exit(0);
});

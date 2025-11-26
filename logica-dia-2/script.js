//ejercicio: array y objetivos 
//1. array (lista)
//crea una lista de tus tres comidas favoritas 
const comidasFavoritas = ['Pizza', 'Sushi', 'Tacos'];

//2. objetivos (key y value)
var persona = {
    nombre: 'Juan',
    edad: 30,
    ciudad: 'Madrid', 
    habilidades : ['programacion', 'dibujo', 'cocina'],
    estatura: 1.75,
    programador: true
};
//3. como accedo a la propiedad nombre de mo objeto persona 
console.log("nombre", persona.nombre); // Accediendo a la propiedad 'nombre' del objeto 'persona
// como accedo a la propiedad habilidades de mi objeto persona
console.log ("habilidades", persona.habilidades);
// como accedo a la  hablilidad de mi objeto persona
console.log("habilidad de dibujo", persona.habilidades[1]);

//3. array de objetos 
//crea una lista de tres alumnos (objetos) con nombre, calificacion 
const alumnos = [
    { nombre: 'Ana', calificacion: 85 },
    { nombre: 'Luis', calificacion: 92 },
    { nombre: 'Marta', calificacion: 78 },
    { nombre: 'Carlos',  }
];
//escribe un bucle que rrecorra el array de alumnos e imprime solo los que tengan calificacion mayor a 80
for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log('Alumno con calificación mayor a 80:', alumnos[i].nombre);
    }
}
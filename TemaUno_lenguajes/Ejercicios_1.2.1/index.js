//Ejercicios 1.2.1: Sintaxis basica de Node.js
//Alumno: Zeus Cach


// EJERCICIO A: Comentarios en línea y multilínea

/*
  Este es un comentario
  multilínea que puede
  ocupar varias líneas
*/

//EJERCICIO B: Diferentes tipos de datos y sus valores

let texto = "Hola Mundo"; // String
let numero = 42; // Number
let decimal = 3.14; // Number (con decimales)
let booleano = true; // Boolean
let indefinido = undefined; // Undefined
let nulo = null; // Null
let objeto = { nombre: "Juan", edad: 25 }; // Object
let arreglo = [1, 2, 3, 4, 5]; // Array

console.log("String:", texto);
console.log("Number:", numero);
console.log("Decimal:", decimal);
console.log("Boolean:", booleano);
console.log("Undefined:", indefinido);
console.log("Null:", nulo);
console.log("Object:", objeto);
console.log("Array:", arreglo);


//EJERCICIO C: Array con diferentes tipos de datos

let arrayMixto = [
  "JavaScript",           // String
  2024,                  // Number
  true,                  // Boolean
  { lenguaje: "JS" },    // Object
  [1, 2, 3]             // Array
];

console.log("Array mixto:", arrayMixto);


// EJERCICIO D: Función polinómica

function funcionPolinomica(x, y) {
  let resultado = Math.pow(x, 2) + y;

  console.log(`f(${x}, ${y}) = x² + y`);
  console.log("Resultado:", resultado);

  return resultado;
}


funcionPolinomica(3, 4);

//EJERCICIO E: Función flecha que imprime un string

const imprimirString = (texto) => {
  // Convertir a mayúsculas
  console.log("Mayúsculas:", texto.toUpperCase());

  // Convertir a minúsculas
  console.log("Minúsculas:", texto.toLowerCase());

  // Longitud del string
  console.log("Longitud:", texto.length);

  // Invertir el string
  console.log("Invertido:", texto.split().reverse().join(''));
};

imprimirString("Hola JavaScript");


//EJERCICIO F: Bucle que imprime números del 1 al 10 en orden descendente

function numerosDescendentes() {
  for (let i = 10; i >= 1; i--) {
    console.log(i);
  }
}

numerosDescendentes();


//EJERCICIO G: Objeto que representa una institución

let miInstitucion = {
  nombre: "Universidad Nacional",
  ubicacion: "Ciudad Central",
  fundacion: 1990,
  estudiantes: 5000,
  carreras: ["Ingeniería", "Medicina", "Derecho", "Artes"],
  esPublica: true
};

console.log("Institución:", miInstitucion);

// EJERCICIO H: Agregar método al objeto anterior

miInstitucion.describir = function () {
  return `${this.nombre} está ubicada en ${this.ubicacion},
  fue fundada en ${this.fundacion} y cuenta con ${this.estudiantes} estudiantes.
  Ofrece carreras en: ${this.carreras.join(", ")}.`;
};

console.log(miInstitucion.describir());


//EJERCICIO I: Módulo con funciones matemáticas

export const matematicas = {
  suma: (a, b) => a + b,

  resta: (a, b) => a - b,

  multiplicacion: (a, b) => a * b,

  division: (a, b) => {
    return b === 0 ? "Error: Division por cero" : a / b
  },

  potencia: (base, exponente) => Math.pow(base, exponente),

  raizCuadrada: (num) => Math.sqrt(num)
};


//EJERCICIO J: Operación asincrónica con setTimeout y callback

function operacionAsincronica(mensaje, callback) {
  console.log("Iniciando operación asincrónica...");

  setTimeout(() => {
    console.log("Procesando:", mensaje);
    callback("Operación completada exitosamente");
  }, 2000); // Espera 2 segundos
}

// Callback para manejar el resultado
function manejarResultado(resultado) {
  console.log("Resultado:", resultado);
}

// Ejecutar
operacionAsincronica("Datos importantes", manejarResultado);


// EJERCICIO K: Conversión de cadena a número con manejo de errores

function convertirCadenaANumero(cadena) {
  try {

    let numero = Number(cadena);

    if (isNaN(numero)) {
      throw new Error("La cadena no es un número válido");
    }

    console.log("Conversión exitosa:", numero);
    console.log("Tipo de dato:", typeof numero);

    return numero

  } catch (error) {
    console.error("Error en la conversión:", error.message);
  }
}

// Pruebas
convertirCadenaANumero("123");      // Exitoso
convertirCadenaANumero("abc");      // Error


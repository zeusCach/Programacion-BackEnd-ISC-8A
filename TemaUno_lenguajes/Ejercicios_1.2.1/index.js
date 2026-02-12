//Ejercicios 1.2.1: Sintaxis basica de Node.js
//Alumno: Zeus Cach

/*
  Este es un comentario
  multilínea que puede
  ocupar varias líneas
*/

//Ejercicio b: Diferentes tipos de datos y sus valores

let texto = "Hola Mundo"; // String
let numero = 42; // Number
let decimal = 3.14; // Number (con decimales)
let booleano = true; // Boolean
let indefinido; // Undefined
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


//Ejercicio c: Array con diferentes tipos de datos

let arrayMixto = [
  "JavaScript",           // String
  2024,                  // Number
  true,                  // Boolean
  { lenguaje: "JS" },    // Object
  [1, 2, 3]             // Array
];

console.log("Array mixto:", arrayMixto);


// Ejercicio d: Función polinómica de segundo grado(ax² + bx + c)

function polinomioSegundoGrado(x, a, b, c) {
  return a * Math.pow(x, 2) + b * x + c;
}

// Ejemplo: 2x² + 3x + 1 cuando x = 5
let resultado = polinomioSegundoGrado(5, 2, 3, 1);
console.log("Resultado del polinomio:", resultado); // 2(25) + 3(5) + 1 = 66


//Ejercicio e: Función flecha que imprime un string

const imprimirString = (texto) => {
  // Convertir a mayúsculas
  console.log("Mayúsculas:", texto.toUpperCase());

  // Convertir a minúsculas
  console.log("Minúsculas:", texto.toLowerCase());

  // Longitud del string
  console.log("Longitud:", texto.length);

  // Invertir el string
  console.log("Invertido:", texto.split('').reverse().join(''));
};

imprimirString("Hola JavaScript");


//Ejercicio f: Bucle que imprime números del 1 al 10 en orden descendente

function numerosDescendentes() {
  for (let i = 10; i >= 1; i--) {
    console.log(i);
  }
}

numerosDescendentes();


//Ejercicio g: Objeto que representa una institución

let miInstitucion = {
  nombre: "Universidad Nacional",
  ubicacion: "Ciudad Central",
  fundacion: 1990,
  estudiantes: 5000,
  carreras: ["Ingeniería", "Medicina", "Derecho", "Artes"],
  esPublica: true
};

console.log("Institución:", miInstitucion);

// Ejercicio h: Agregar método al objeto anterior

miInstitucion.describir = function () {
  return `${this.nombre} está ubicada en ${this.ubicacion},
  fue fundada en ${this.fundacion} y cuenta con ${this.estudiantes} estudiantes.
  Ofrece carreras en: ${this.carreras.join(", ")}.`;
};

console.log(miInstitucion.describir());


//Ejercicio i: Módulo con funciones matemáticas

Archivo: matematicas.js
const matematicas = {
  suma: (a, b) => a + b,

  resta: (a, b) => a - b,

  multiplicacion: (a, b) => a * b,

  division: (a, b) => {
    return b === 0 ? "Error: Division por cero" : a / b
  },

  potencia: (base, exponente) => Math.pow(base, exponente),

  raizCuadrada: (num) => Math.sqrt(num)
};

// Uso del módulo en otro archivo
console.log("Suma:", matematicas.suma(10, 5));
console.log("Resta:", matematicas.resta(10, 5));
console.log("Multiplicación:", matematicas.multiplicacion(10, 5));
console.log("División:", matematicas.division(10, 5));
console.log("Potencia:", matematicas.potencia(2, 3));
console.log("Raíz cuadrada:", matematicas.raizCuadrada(16));


//Ejercicio j: Operación asincrónica con setTimeout y callback

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


// Ejercicio k: Conversión de cadena a número con manejo de errores

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


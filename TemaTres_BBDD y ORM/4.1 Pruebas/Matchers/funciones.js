// a. Igualdad exacta con toBe
function sumar(a, b) {
  return a + b;
}

// b. Comparación de objetos con toEqual
function crearUsuario(nombre, edad) {
  return { nombre, edad };
}

// c. Verificación de valores nulos y definidos
function buscarElemento(lista, valor) {
  const encontrado = lista.find((el) => el === valor);
  return encontrado !== undefined ? encontrado : null;
}

// d. Comparaciones numéricas
function calcularDescuento(precio, porcentaje) {
  return precio - precio * (porcentaje / 100);
}

// e. Coincidencia de cadenas con Expresiones Regulares
function generarSaludo(nombre) {
  return `¡Hola, ${nombre}! Bienvenido al sistema.`;
}

// f. Verificación de contenido en Arrays
function obtenerFrutas() {
  return ["manzana", "naranja", "plátano", "uva", "mango"];
}

// g. Negación de Matchers con .not
function generarNumeroAleatorio() {
  // Retorna un número aleatorio entre 1 y 100
  return Math.floor(Math.random() * 100) + 1;
}

// h. Pruebas asíncronas con Promesas
function obtenerDatos(exito) {
  return new Promise((resolve, reject) => {
    if (exito) {
      resolve({ mensaje: "Datos obtenidos correctamente", codigo: 200 });
    } else {
      reject(new Error("Error al obtener los datos"));
    }
  });
}

module.exports = {
  sumar,
  crearUsuario,
  buscarElemento,
  calcularDescuento,
  generarSaludo,
  obtenerFrutas,
  generarNumeroAleatorio,
  obtenerDatos,
};
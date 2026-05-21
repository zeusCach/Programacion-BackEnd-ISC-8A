const {
  sumar,
  crearUsuario,
  buscarElemento,
  calcularDescuento,
  generarSaludo,
  obtenerFrutas,
  generarNumeroAleatorio,
  obtenerDatos,
} = require("./funciones");


// a. Igualdad exacta con toBe

describe("a. toBe - Igualdad exacta", () => {
  test("10 + 10 es igual a 20", () => {
    expect(sumar(10, 10)).toBe(20);
  });
});

// b. Comparación de objetos con toEqual

describe("b. toEqual - Comparación de objetos", () => {
  test("dos objetos con las mismas propiedades son iguales", () => {
    const usuario1 = crearUsuario("Ana", 25);
    const usuario2 = { nombre: "Ana", edad: 25 };
    expect(usuario1).toEqual(usuario2);
  });
});

// c. Verificación de valores nulos y definidos

describe("c. toBeNull, toBeUndefined, toBeDefined", () => {
  test("retorna null cuando el elemento no existe en la lista", () => {
    const resultado = buscarElemento([1, 2, 3], 99);
    expect(resultado).toBeNull();
  });

  test("retorna un valor definido cuando el elemento existe", () => {
    const resultado = buscarElemento([1, 2, 3], 2);
    expect(resultado).toBeDefined();
  });

  test("una variable sin asignar es undefined", () => {
    let variableSinAsignar;
    expect(variableSinAsignar).toBeUndefined();
  });

  test("el resultado encontrado no es null", () => {
    const resultado = buscarElemento(["a", "b", "c"], "b");
    expect(resultado).not.toBeNull();
  });
});


// d. Comparaciones numéricas

describe("d. Comparaciones numéricas", () => {
  test("precio con 20% de descuento es menor que el original", () => {
    const precioOriginal = 100;
    const precioFinal = calcularDescuento(precioOriginal, 20);
    expect(precioFinal).toBeLessThan(precioOriginal);
  });

  test("precio con descuento es mayor que 0", () => {
    const precioFinal = calcularDescuento(100, 50);
    expect(precioFinal).toBeGreaterThan(0);
  });

  test("precio sin descuento es mayor o igual al original", () => {
    const precioFinal = calcularDescuento(100, 0);
    expect(precioFinal).toBeGreaterThanOrEqual(100);
  });

  test("precio con 10% de descuento es igual a 90", () => {
    const precioFinal = calcularDescuento(100, 10);
    expect(precioFinal).toBe(90);
  });
});


// e. Coincidencia de cadenas con Expresiones Regulares

describe("e. toMatch - Expresiones Regulares", () => {
  test("el saludo contiene el nombre del usuario", () => {
    const saludo = generarSaludo("Carlos");
    expect(saludo).toMatch(/Carlos/);
  })
});


// f. Verificación de contenido en Arrays

describe("f. toContain - Contenido en Arrays", () => {
  test("la lista de frutas contiene 'mango'", () => {
    const frutas = obtenerFrutas();
    expect(frutas).toContain("mango");
  });
});


// g. Negación de Matchers con .not

describe("g. .not.toBe - Negación de matchers", () => {
   test("un número aleatorio no es 0", () => {
    const numero = generarNumeroAleatorio();
    expect(numero).not.toBe(0);
  });
});


// h. Pruebas asíncronas con Promesas (resolves y rejects)

describe("h. Promesas - resolves y rejects", () => {
  test("la promesa se resuelve con los datos correctos", () => {
    return expect(obtenerDatos(true)).resolves.toEqual({
      mensaje: "Datos obtenidos correctamente",
      codigo: 200,
    });
  });

  test("la promesa es rechazada con un error", () => {
    return expect(obtenerDatos(false)).rejects.toThrow(
      "Error al obtener los datos"
    );
  });

  test("la promesa resuelta contiene código 200", async () => {
    const datos = await obtenerDatos(true);
    expect(datos.codigo).toBe(200);
  });
});
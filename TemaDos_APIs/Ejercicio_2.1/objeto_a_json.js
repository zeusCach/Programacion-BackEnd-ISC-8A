const objetoJavaScript = {
    nombre: "Taco de Pollo",
    ingredientes: {
        proteina: "Pollo",
        salsa: "Salsa Verde"
    }
};

const jsonString = JSON.stringify(objetoJavaScript);

console.log(jsonString);
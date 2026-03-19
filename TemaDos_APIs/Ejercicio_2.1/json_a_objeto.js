const jsonString = '{"nombre":"Taco de Pollo","ingredientes":{"proteina":"Pollo","salsa":"Salsa Verde"}}'

const objetoDeserealizado = JSON.parse(jsonString);
console.log(objetoDeserealizado);
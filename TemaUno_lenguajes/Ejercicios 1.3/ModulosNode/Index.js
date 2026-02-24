
const fs = require('fs');

//Creamos el archivo.txt con el text Hola desde node
fs.writeFile('archivo.txt', 'Hola desde NodeJS', (err) => {
    if(err) throw new err
     console.log('El archivo ha sido creado con exito');
})


//path a la ruta del archivo
const path = 'archivo.txt';

//funcion de readFile que recibe un callback para imprimir lo que contiene nuestro archivo segun el path
fs.readFile(path, 'utf-8', (err, data) => {
    if(err) throw new err
    console.log(data);
})

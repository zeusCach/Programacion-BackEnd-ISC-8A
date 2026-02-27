import express from 'express';

const app = express();
const port = 3000;

//Creamos una respuesta para la ruta principal, con texto: Bienvenido a mi página web 
app.get('/', (req, res)=> {
    res.send('<h1>Bienvenido a mi página web, desde Express con nodemon</h1>');
});

//Creamos una respuesta para la ruta about, con texto: Acerca de
app.get('/about', (req, res) => {
    res.send('<h1>Acerca de</h1>');
});

//Se cambia '*' por '/*splat' porque los comodines ya no pueden ser anónimos.
// El asterisco ahora debe colgar de un nombre de parámetro
app.use('/*splat', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
});

//listen que escucha el puerto al que se solcita:3000
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000')
});
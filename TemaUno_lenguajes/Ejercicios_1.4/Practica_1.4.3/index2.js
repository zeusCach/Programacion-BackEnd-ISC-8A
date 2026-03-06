import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"


//convierte esa URL en una ruta clara para el sistema. __dirname guarda solo la carpeta del archivo

//Zeus Cach

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

const app = express();
const port = 3000;

var nombreEquipo = '';

function registrador(req, res, next){
    //ejecuta la logica solo si el metodo es de tipo post
    if(req.method === 'POST'){
        console.log(req.body);
        nombreEquipo = req.body['mascota'] + req.body['adjetivo'];
    }
    next()//Continuamos con el siguiente proceso;
}

//convierte el body del request en un objeto JavaScript.
app.use(bodyParser.urlencoded({ extended: true }));

//middlewere que creamos para manejar la logica de registrar
app.use(registrador);

//endpoint para nuestra ruta index.html
app.get("/", (req, res) => {
    //envia la ruta de nuestro index al hacer get al localhost
    res.sendFile(`${__dirname}/public/index.html`);
});

//peticion de tipo post al hacer submit (renderizamos el continido que tenga nuestra variable global nombreEquipo)
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send(
        `      
          <h1>El nombre de tu equipo es:</h1> 
          <p>${nombreEquipo}</p>
        `
    );
});

//ejecuta el servicio o servidor
app.listen(port, () => {
    console.log(`servidor ejecutandose en el puerto ${port}`);
});
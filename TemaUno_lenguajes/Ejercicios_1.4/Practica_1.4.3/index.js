import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"

//convierte esa URL en una ruta clara para el sistema. __dirname guarda solo la carpeta del archivo
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname);

const app = express();
const port = 3000;

//middlewere que transcfora el body del reques en objeto javascript
app.use(bodyParser.urlencoded({ extended: true }))

//endpoint para nuestra ruta index.html(redirecciona cuando cargamos la url y ejecuta la solicitud get)
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

//peticion de tipo post al hacer submit que envia "Datos recibidos"
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("Datos recibidos");
});

//ejecuta el servicio o servidor.
app.listen(port, () => {
    console.log(`servidor ejecutandose en el puerto ${port}`);
});
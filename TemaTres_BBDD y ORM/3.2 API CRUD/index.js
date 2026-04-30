import dotenv from 'dotenv'
dotenv.config();

import Usuario from './models/usuario.model.js';
import express from 'express'
import mongoose from 'mongoose';

//Asignacion de puerto y uso de express
const app = express();
const port = 3000;

//URI de connection
const uri = process.env.URI_CONNECTION

//Connection a database
mongoose.connect(uri)
.then(() => {
    console.log("Conexión exitosa a la base de datos");
})
.catch((err) => {
    console.log("Error al conectar la base de datos: ",err);
});

//middlewares para obtener los datos enviados desde postman
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


//endpoint principal
app.get("/", (req, res) => {
    res.send("Welcome to my API CRUD")
});

//handler que registra un nuevo usuario
app.post("/usuarios", async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario: ',error);
        res.status(500).json({error: 'Error al crear el usuario'})
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchado en http://localhost:${port}`)
})


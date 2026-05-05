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

//handler que obtiene nuestros usuarios desde la database
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios)
    } catch (error) {
        console.error('Error al obtener los usuarios: ',error);
        res.status(500).json({error: 'Error al obtener los usuario'})
    }
});

//handle encargada de traernos un cliente en especifico de acuerdo a su id
app.get("/usuario/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);

    } catch (error) {
        console.error('Error al obtener el usuario por id: ',error);
        res.status(500).json({error: 'Error al obtener el usuario por id'})
    }
});

//handler que registra un nuevo usuario
app.post("/usuario", async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario: ',error);
        res.status(500).json({error: 'Error al crear el usuario'})
    }
});


//handle encargado de actualizar un usuario en particular
app.put("/usuario/:id", async (req, res) => {
 try {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, req.body);

    if(!usuario){
        return res.status(404).json({error: "Usuario no encontrado"});
    }

    const usuarioActualizado = await Usuario.findById(id);
    res.status(202).json(usuarioActualizado);

 } catch (error) {
    console.error('Error al actualizar el usuario: ', error);
    res.status(500).json({error: 'Error al actualizar el usuario'}) 
 }
});

//handle encargado de eliminar un usuario en particular
app.delete("/usuario/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);

        if(!usuario){
            return  res.status(404).json({error: 'Usuario no encontrado'})
        }

        res.status(200).json({mensaje: 'Usuario eliminado correctamente'});
        
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
        res.status(500).json({error: 'Error al eliminar el usuario'})
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchado en http://localhost:${port}`)
});


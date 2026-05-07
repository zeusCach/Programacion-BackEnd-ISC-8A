import dotenv from 'dotenv'
dotenv.config();


import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';

//Asignacion de puerto y uso de express
const app = express();
const port = 3000;

//URI de connection
const uri = process.env.URI_CONNECTION

//Configuramos el cliente de MongoDB con la URI de conexión
const client = new MongoClient(uri);

//Creamos una variable asignable para guarda la referencia a nuestra base de datos
let db;

//Negocio de connection
const conectar = async () => {
    try {
        await client.connect();
        db = client.db();
        console.log("Conexión exitosa a la base de datos");

    } catch (error) {
        console.error("Error al conectar: ", error);
        process.exit(1);
    }
}

//Mandamos a llamar a nuestra funcion de conexion 
await conectar();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoint principal
app.get("/", (req, res) => {
    res.send("Welcome to my API CRUD");
});

//endpoint que obtiene todos nuestros usuarios disponibles en la db
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await db.collection("usuarios").find().toArray();
        res.status(200).json(usuarios);

    } catch (error) {
        console.error('Error al obtener los usuarios: ', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

//Endpoint que busca usuario por id
app.get("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(id) });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {

        console.error('Error al obtener el usuario por id: ', error);
        res.status(500).json({ error: 'Error al obtener el usuario por id' });
    }
});


//Enpoint para añadir un nuevo usuario
app.post("/usuario", async (req, res) => {
    try {
        const usuario = await db.collection("usuarios").insertOne(req.body);
        res.status(201).json(usuario);

    } catch (error) {
        console.error('Error al crear el usuario: ', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

//enpoint para actualizar un campo/s especifico del usuario
app.put("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await db.collection("usuarios").updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuarioActualizado = await db.collection("usuarios").findOne(
            { _id: new ObjectId(id) }
        );

        res.status(202).json(usuarioActualizado);

    } catch (error) {
        console.error('Error al actualizar el usuario: ', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });

    }
});

//endpoint para eliminar un usuario
app.delete("/usuario/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const usuario = await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });

    }
});

//Mandamos a escuchar el puerto para correr aplicacion
app.listen(port, () => {
    console.log(`Servidor escuchado en http://localhost:${port}`)
});




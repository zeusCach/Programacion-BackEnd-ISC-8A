import express from 'express';
import Usuario from './models/usuario.model.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Welcome to my API CRUD");
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios: ', error);
        res.status(500).json({ error: 'Error al obtener los usuario' });
    }
});

app.get("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario por id: ', error);
        res.status(500).json({ error: 'Error al obtener el usuario por id' });
    }
});

app.post("/usuario", async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario: ', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.put("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuarioActualizado = await Usuario.findById(id);
        res.status(202).json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar el usuario: ', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

app.delete("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

export default app;

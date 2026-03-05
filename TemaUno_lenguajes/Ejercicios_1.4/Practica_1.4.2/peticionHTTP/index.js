import express from 'express';

const app = express();
const port = 3000;

// Petición GET principal
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>');
    res.sendStatus(200);
});

// Petición POST para registro
app.post('/registro', (req, res) => {
    res.sendStatus(201).send("Usuario registrado");
});

// Petición PUT para actualizar usuario
app.put('/usuario/actualizar', (req, res) => {
    res.sendStatus(200).send("Usuario actualizado");
});

// Petición PATCH para modificar usuario
app.patch('/usuario/modificar', (req, res) => {
    res.sendStatus(200).send("Usuario modificado");
});

// Petición DELETE para eliminar usuario
app.delete('/usuario/eliminar', (req, res) => {
    res.sendStatus(200).send("Usuario eliminado");
});

// Escuchando el puerto
app.listen(port, () => {
    console.log(`Servidor ejecutandose en puerto ${port}`);
});
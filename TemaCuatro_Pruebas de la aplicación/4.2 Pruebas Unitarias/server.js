import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import dns from 'dns';
import app from './app.js';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const port = 3000;
const uri = process.env.URI_CONNECTION;

mongoose.connect(uri)
    .then(() => {
        console.log("Conexión exitosa a la base de datos");
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Error al conectar la base de datos: ", err);
    });

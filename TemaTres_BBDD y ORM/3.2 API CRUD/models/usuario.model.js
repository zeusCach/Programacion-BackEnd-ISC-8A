import mongoose from "mongoose";

//Esquema para crear un nuevo user
const usuarioShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Favor de ingresar el nombre'],
        },
        age: {
            type: Number,
            required: [true, 'Favor de ingresar la edad'],
        },
        email: {
            type: String,
            required: [true, 'Favor de ingresar el correo'],
            unique: true,
        },
    },
    {
        timestamps: true
    },
);

//Creamos el modelo apartir del esquema usuarioShema
const Usuario = mongoose.model("Usuario", usuarioShema);

export default Usuario;

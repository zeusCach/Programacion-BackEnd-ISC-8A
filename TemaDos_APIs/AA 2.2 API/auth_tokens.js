import axios from "axios";

//Definiendo url(login y data) para manejar el negocio de login/auth/dataInfo
const urlLogin = "https://dummyjson.com/auth/login";
const urlData = "https://dummyjson.com/auth/me";

//creamos los datos de acceso para las credenciales
const credenciales = {
    username: 'emilyss',
    password: 'emilyspass'
};

//funcion asincrona encargada de enviar los datos para login en dummyjson usando axios como base
async function login() {
    try {

        //envia los datos de acceso(crendenciales) a traves de la url auth/login
        const response = await axios.post(urlLogin, credenciales);

        //almacena el token generado por el response al hacer post(enviando datos)
        const token = response.data.accessToken;

        //imprime el token si la autenticacion fue correcta
        console.log("Token recibido: ", token);

        //retorna el token generado para manejar logica separada
        return token;

    } catch (error) {
        //error que recibe el catch si la autenticacion fue incorrecta
        console.error("Error al logearse:", error.message);
    }
}


//funcion asincrona que obtine los datos protegidos, recibe un token como param para manejar logica del negocio
async function getProtectedData(token) {
    try {

        //reponse que obtiene los datos si la autorizacion fue validada por el token recibido al logearse
        const response = await axios.get(urlData, {
            headers: {
                authorization: token
            }
        });

        //imprime los datos del usuario autenticado
        console.log("Datos protegidos: ", response.data);

    } catch (error) {
        //error que atraba el catch si la autenticacion fue incorrecta o no procesada
        console.log("Error al obtener los datos protegidos", error);
    }
}


//main que controla el negocio del ejercicio (se declara como function async por cuestiones logicas)
async function main() {
    //obtiene el token que retornamos en login(espera a que se obtenga ese token con await)
    const token = await login();

    //funcion que recibe como param el token del usuario logueado y obtiene los datos protegidos
    await getProtectedData(token);
}

//Ejecutamos la logica de la aplicacion
main();

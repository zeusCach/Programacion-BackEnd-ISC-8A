import axios from "axios";

//Definimos los parametros principales de nuestro api en weather data(latitud, longitud y apikey)

const API_KEY = '6be7c425ed961630eb2b49e462781b19';
const lat = 19.5803342;
const lon = -88.0440957;

//url de OpenWeather API
const url = "https://api.openweathermap.org/data/2.5/weather";

async function getWeatherData() {
    try {
        const response = await axios.get(url, {
            params: { //configuracion del request propia de la url original
                lat: lat,
                lon: lon,
                units: 'metric',
                appid: API_KEY
            }
        })

        //Consulda de los datos al hacer fetch con axios al url
        console.log("Ciudad: ", response.data.name);
        console.log("Temperatura: ", response.data.main.temp, "°C");
        console.log("Clima: ", response.data.weather[0].description);

    } catch (error) {
        //maneja el error en caso de que algo haya salido mal
        console.log("Algo salio mal: ", error.message);
    }
}

//Llamamos a la funcion que contiene la logica del negocio
getWeatherData();
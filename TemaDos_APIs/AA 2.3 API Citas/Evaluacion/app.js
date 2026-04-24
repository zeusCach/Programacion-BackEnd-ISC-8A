import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getDataWeather } from "./middlewares/infoMiddleware.js";

//funcion que busca la ruta de env
dotenv.config();

//API_KEY
const API_KEY = process.env.API_KEY;

//Creamos el modulo de app para hacer uso de express y puerto para trabajar
const app = express();
const port = 3000;

//url de OpenWeather API
const url_weather = "https://api.openweathermap.org/data/2.5/weather";

//url que optiene informacion de la ciudad
const city_url = "https://api.openweathermap.org/geo/1.0/direct";

//servimos el motor de render y tipo de archivo asi como archivos publicos
app.set("view engine", "ejs");
app.use(express.static("public"));

//endpoint principal
app.get("/", getDataWeather, async (req, res) => {
  try {
    const geo = await axios.get(city_url, {
      params: {
        q: res.locals.city?.trim(),
        limit: 1,
        appid: API_KEY,
      },
    });

    const weatherInfo = await axios.get(url_weather, {
      params: {
        lat: geo.data[0].lat,
        lon: geo.data[0].lon,
        units: "metric",
        appid: API_KEY,
      },
    });

    const date = new Date(weatherInfo.data.dt * 1000).toLocaleDateString(
      "es-MX",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    res.render("index", {
      city: weatherInfo.data.name,
      country: weatherInfo.data.sys.country,
      date: date,
      temp: Math.round(weatherInfo.data.main.temp),
      feelsLike: Math.round(weatherInfo.data.main.feels_like),
      humidity: weatherInfo.data.main.humidity,
      wind: Math.round(weatherInfo.data.wind.speed * 3.6), // m/s → km/h
      visibility: weatherInfo.data.visibility / 1000, // metros → km
      description: weatherInfo.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weatherInfo.data.weather[0].icon}@2x.png`,
    });

  } catch (error) {
    if (error.weatherInfo) {
      console.log(error.weatherInfo.data);
    } else {
      console.log("Error:", error.message);
    }

    res.render("index");
  }
});

//Escuchamos el puerto para ejecutar proyecto
app.listen(port, () => {
  console.log(`Proyecto corriendo en http://localhost:${port}`);
});

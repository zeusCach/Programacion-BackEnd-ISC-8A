import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


// Middleware para servir los archivos index.html y estilo.css desde la carpeta public
app.use(express.static("public"));

// Convierte el body de la petición (JSON) en un objeto JS accesible en req.body
app.use(bodyParser.json());


//Data json(contiene la informacion de los datos a consumir)
const recetaJson = `[
  {
    "id": "0001",
    "tipo": "taco",
    "nombre": "Taco de Cochinita Pibil",
    "precio": 22.00,
    "ingredientes": {
      "proteina": {
        "nombre": "Puerco",
        "preparacion": "Horneado en hoja de plátano con achiote"
      },
      "salsa": {
        "nombre": "Habanero con cebolla morada",
        "picor": "Alto"
      },
      "acompañamientos": [
        {
          "nombre": "Cebolla morada encurtida",
          "cantidad": "2 cucharadas",
          "ingredientes": ["Cebolla morada", "Jugo de naranja agria", "Orégano", "Sal"]
        },
        {
          "nombre": "Salsa de habanero",
          "cantidad": "1 cucharada",
          "ingredientes": ["Chile habanero", "Tomate", "Ajo", "Sal", "Vinagre"]
        }
      ]
    }
  },
  {
    "id": "0002",
    "tipo": "taco",
    "nombre": "Taco de Poc Chuc",
    "precio": 25.00,
    "ingredientes": {
      "proteina": {
        "nombre": "Res",
        "preparacion": "Asado a la plancha con naranja agria"
      },
      "salsa": {
        "nombre": "Tomate asado",
        "picor": "Medio"
      },
      "acompañamientos": [
        {
          "nombre": "Cebolla asada",
          "cantidad": "1 cucharada",
          "ingredientes": ["Cebolla blanca", "Limón", "Sal", "Cilantro"]
        },
        {
          "nombre": "Frijoles negros colados",
          "cantidad": "2 cucharadas",
          "ingredientes": ["Frijol negro", "Epazote", "Sal", "Manteca"]
        }
      ]
    }
  },
  {
    "id": "0003",
    "tipo": "taco",
    "nombre": "Taco de Relleno Negro",
    "precio": 23.00,
    "ingredientes": {
      "proteina": {
        "nombre": "Pavo",
        "preparacion": "Guisado en chilmole con recado negro"
      },
      "salsa": {
        "nombre": "Chilmole",
        "picor": "Medio"
      },
      "acompañamientos": [
        {
          "nombre": "Pepita molida",
          "cantidad": "1 cucharada",
          "ingredientes": ["Pepita de calabaza", "Sal", "Chile seco"]
        },
        {
          "nombre": "Tortilla de maíz negro",
          "cantidad": "2 piezas",
          "ingredientes": ["Masa de maíz negro", "Sal", "Agua"]
        }
      ]
    }
  },
  {
    "id": "0004",
    "tipo": "taco",
    "nombre": "Taco de Camarón a la Yucateca",
    "precio": 28.00,
    "ingredientes": {
      "proteina": {
        "nombre": "Camarón",
        "preparacion": "Salteado con recado rojo y achiote"
      },
      "salsa": {
        "nombre": "Xni Pec",
        "picor": "Alto"
      },
      "acompañamientos": [
        {
          "nombre": "Xni Pec",
          "cantidad": "2 cucharadas",
          "ingredientes": ["Jitomate", "Cebolla morada", "Chile habanero", "Jugo de naranja agria", "Cilantro"]
        },
        {
          "nombre": "Aguacate",
          "cantidad": "3 rebanadas",
          "ingredientes": ["Aguacate", "Limón", "Sal"]
        }
      ]
    }
  }
]`;

//Deserializamos la cadena JSON a objeto JS
const recetaTacos = JSON.parse(recetaJson);


// Endpoint que busca una receta según el tipo de proteína enviado en la URL
app.get('/receta/:type', (req, res) => {

  const elegirTaco = recetaTacos.find(
    r => r.ingredientes.proteina.nombre.toLowerCase() === req.params.type.toLowerCase()
  );

  res.json(elegirTaco || { error: "Receta no encontrada" });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})
import axios from 'axios'

axios.get('https://jsonplaceholder.typicode.com/postss')
    .then(response => {
        console.log('Datos recibidos: ', response.data)
    })
    .catch(error => {
        console.error('Error al hacer la solicitud: ', error)
    });

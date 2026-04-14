
fetch('https://jsonplaceholder.typicode.com/postsd')
    .then(response => {
        if (!response.ok) {
            console.log(!response.ok)
            throw new Error('Respuesta del servidor fallida', response.statusText)

        }

        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data)
    })
    .catch(error => {
        console.log('Error al hacer la solicitud: ', error)
    })
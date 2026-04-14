import axios from "axios";


const obtenerUsuario = async () => {
    try {

        const response = await axios.get('https://reqres.in/api/users/4', {
            headers: {
                'Authorization': 'Basic' + Buffer.from('eve.hold@reqres.in:pistol').toString('base64'),
                'x-api-key': 'reqres_152997942644416aa6f1286b4d48b215'
            }
        });

        console.log('Datos del usuario: ', response.data)

    } catch (error) {
        console.error('Error al obtener datos del usuario: ', error.response.data)
    }
}


obtenerUsuario();
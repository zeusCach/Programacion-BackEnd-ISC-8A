import axios from "axios";


const registrarUsuario = async () => {
    try {
        const response = await axios.post('https://reqres.in/api/register',
            {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            },
            {
                headers: {
                    'x-api-key': 'reqres_152997942644416aa6f1286b4d48b215'
                }
            }
        );

        console.log('Registro exitoso: ', response.data);

    } catch (error) {
        console.error('Error en el registro: ', error.response.data)
    }
}


registrarUsuario();
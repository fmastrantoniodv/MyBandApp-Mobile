import axios from 'axios';
import Constants from 'expo-constants';
const { ENDPOINT_BACKEND, TIMEOUT_SERVICES } = Constants.expoConfig.extra;

const httpClient = axios.create({
    baseURL: ENDPOINT_BACKEND,
    timeout: Number(TIMEOUT_SERVICES), 
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response) => {
        return response.data; // Devuelve solo los datos relevantes
    },
    (error) => {
        if (error.response) {
            // El servidor respondió con un código fuera del rango 2xx
            console.error(`[httpClient].error=`, error.response);
            const { status, data } = error.response;
            console.error(`Error ${status}: ${data?.errorDetail || 'Error desconocido'}`);
            return Promise.reject({
                status,
                errorCode: data?.errorCode || 'NA',
                errorDetail: data?.errorDetail || 'Ocurrió un error',
            });
        } else if (error.request) {
            // No se recibió respuesta del servidor
            console.error('No response received:', error.request);
            return Promise.reject({
                message: 'No se pudo establecer conexión con el servidor',
                status: null,
            });
        } else {
            // Error al configurar la solicitud
            console.error('Error in request setup:', error.message);
            return Promise.reject({
                message: 'Error inesperado al realizar la solicitud',
                status: null,
            });
        }
    }
);

export default httpClient;

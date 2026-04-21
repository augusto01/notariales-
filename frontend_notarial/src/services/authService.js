import clienteAxios from '../api/clienteAxios';

export const authService = {
    login: async (credenciales) => {
        try {
            const { data } = await clienteAxios.post('/auth/login', credenciales);
            return { ok: true, data };
        } catch (error) {
            return { 
                ok: false, 
                msg: error.response?.data?.msg || 'Error de conexión con el servidor' 
            };
        }
    }
};
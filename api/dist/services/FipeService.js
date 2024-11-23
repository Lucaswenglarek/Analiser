const axios = require('axios');

class FipeService {
    async listarMarcas(type) {
        try {
            const url = `https://api.invertexto.com/v1/fipe/brands/${type}`;
            console.log(`Requisição para listar marcas: ${url}`);

            const response = await axios.get(url, {
                params: {
                    token: process.env.INVERTEXTO_API_KEY,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao listar marcas:', error.message);
            throw new Error('Erro ao listar marcas.');
        }
    }

    async listarModelos(marcaId) {
        try {
            const url = `https://api.invertexto.com/v1/fipe/models/${marcaId}`;
            console.log(`Requisição para listar modelos: ${url}`);

            const response = await axios.get(url, {
                params: {
                    token: process.env.INVERTEXTO_API_KEY,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao listar modelos:', error.message);
            throw new Error('Erro ao listar modelos.');
        }
    }
}

module.exports = FipeService;

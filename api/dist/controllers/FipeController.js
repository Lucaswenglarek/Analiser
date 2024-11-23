const FipeService = require('../services/FipeService');
const fipeService = new FipeService();

async function listarMarcas(req, res) {
    try {
        const type = req.query.type || 1; // 1 para carros por padrão
        const marcas = await fipeService.listarMarcas(type);
        res.json(marcas);
    } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        res.status(500).json({ message: 'Erro ao buscar marcas.' });
    }
}

async function listarModelos(req, res) {
    try {
        const { marcaId } = req.params;
        const modelos = await fipeService.listarModelos(marcaId);
        res.json(modelos);
    } catch (error) {
        console.error("Erro ao buscar modelos:", error);
        res.status(500).json({ message: 'Erro ao buscar modelos.' });
    }
}

async function listarAnos(req, res) {
    try {
        const { modeloId } = req.params;
        const anos = await fipeService.listarAnos(modeloId);
        res.json(anos);
    } catch (error) {
        console.error("Erro ao buscar anos:", error);
        res.status(500).json({ message: 'Erro ao buscar anos.' });
    }
}

module.exports = { listarMarcas, listarModelos, listarAnos };

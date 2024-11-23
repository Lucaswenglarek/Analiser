const express = require('express');
const { listarMarcas, listarModelos, listarAnos } = require('./controllers/FipeController');
const CreateVehicleController = require('./controllers/CreateVehicleController');

const router = express.Router();

const createVehicleController = new CreateVehicleController();

router.get('/fipe/marcas', listarMarcas); // Endpoint para obter marcas de veículos
router.get('/fipe/marcas/:marcaId/modelos', listarModelos); // Endpoint para obter modelos por marca
router.get('/fipe/modelos/:modeloId/anos', listarAnos); // Endpoint para obter anos de um modelo específico
router.post('/analyze-vehicle', createVehicleController.handle.bind(createVehicleController)); // Endpoint para análise de veículo

module.exports = router; // Exporta as rotas para uso no servidor

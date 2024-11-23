const CreateVehicleService = require('../services/CreateVehicleService');

class CreateVehicleController {
  async handle(req, res) {
    // Ajustar para usar brand e model diretamente
    const { brand, model, year, partsType, condition } = req.body;

    const createVehicleService = new CreateVehicleService();

    try {
      // Passar brand e model diretamente para o serviço
      const analysis = await createVehicleService.execute({ brand, model, year, partsType, condition });
      return res.status(200).json(analysis);
    } catch (error) {
      console.error('Erro ao obter a análise do veículo:', error);
      return res.status(500).json({ message: 'Erro ao obter a análise do veículo.' });
    }
  }
}

module.exports = CreateVehicleController;

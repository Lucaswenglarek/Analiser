"use strict";
const { GoogleGenerativeAI } = require("@google/generative-ai");

class CreateVehicleService {
    async execute({ brand, model, year, partsType, condition }) {
        try {
            // Verificar se brand e model estão definidos corretamente
            if (!brand || !model) {
                throw new Error("Os parâmetros brand e model devem estar definidos.");
            }

            console.log("Iniciando a análise para o veículo:", { brand, model, year, partsType, condition });

            // Obter a chave da API Google para análise
            const apiKey = process.env.GOOGLE_API_KEY;
            if (!apiKey) {
                throw new Error("A chave da API do Google não está definida no arquivo .env");
            }
            console.log("Chave da API:", apiKey);

            // Inicializar a instância do GoogleGenerativeAI
            const genAI = new GoogleGenerativeAI(apiKey);

            // Obter o modelo específico
            const modelInstance = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Definir o prompt para a análise do veículo
            const prompt = `
            Realize uma análise sobre o custo e a viabilidade de compra do veículo no leilão, considerando uma comparação dos custos de peças internas e externas (novas ou usadas) disponíveis em marketplaces e também analise o valor médio do veículo pesquisado em leilões no estado do Paraná (PR).
            
            Veículo: ${brand} ${model}, ano ${year}.
            Tipo de peças: ${partsType}.
            Condição das peças: ${condition}.
            
            A análise deve incluir:
            1. Uma visão geral do custo médio do veículo em leilões no Paraná (busca realizada em qualquer site de leilões).
            2. Comparação de preços de peças (${partsType}, ${condition}) em diferentes marketplaces. Não é necessário especificar cada peça individualmente, mas fornecer uma visão geral de faixas de preços para essas peças com base nos marketplaces analisados.
            3. Identificação do melhor custo-benefício para as peças necessárias, considerando os diferentes marketplaces.
            4. Considerar também os custos de manutenção, custos adicionais e a valorização/desvalorização do veículo no contexto de leilão e revenda futura.
            
            Retorne os resultados em forma de uma tabela, mostrando as faixas de preços observadas para cada marketplace, seguido de uma conclusão sobre a viabilidade da compra deste veículo em leilão.
            `;
            
            
            console.log("Prompt enviado para a IA:", prompt);

            // Fazer a requisição diretamente usando o modelo instanciado
            const response = await modelInstance.generateContent(prompt);
            const analysisResult = response.response.text();

            console.log("Resposta da análise:", analysisResult);
            return {
                message: "Análise de viabilidade de compra de veículo em leilão",
                brand,
                model,
                year,
                partsType,
                condition,
                analysis: analysisResult,
            };
        } catch (error) {
            console.error("Erro ao obter a análise do veículo:", error.message);
            throw new Error("Erro ao obter a análise do veículo.");
        }
    }
}

module.exports = CreateVehicleService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.default)({ logger: true });
server.register(cors_1.default, {
    origin: 'http://192.168.32.122:5173', // Permite todas as origens. Configure conforme necessário.
});
server.get('/cnpj/:cnpj', async (request, reply) => {
    const { cnpj } = request.params;
    try {
        const response = await axios_1.default.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        return reply.send(response.data);
    }
    catch (error) {
        return reply.status(500).send({ error: 'Erro ao consultar o CNPJ' });
    }
});
const start = async () => {
    try {
        await server.listen({ port: 3333 });
        server.log.info('Servidor rodando na porta 3333');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();

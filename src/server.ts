import axios from "axios";
import fastify from "fastify";
import fastifyCors from '@fastify/cors';

const server = fastify({ logger: true });

server.register(fastifyCors, {
  origin: 'http://192.168.32.122:5173', // Permite todas as origens. Configure conforme necessário.
});

interface CnpjParams {
  cnpj: string;
}

server.get<{ Params: CnpjParams }>('/cnpj/:cnpj', async (request, reply) => {
  const { cnpj } = request.params;

  try {
    const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
    return reply.send(response.data);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao consultar o CNPJ' });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3333 });
    server.log.info('Servidor rodando na porta 3333');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();



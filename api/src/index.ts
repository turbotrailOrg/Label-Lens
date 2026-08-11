import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import { analyseRoute } from './routes/analyse';

dotenv.config();

const server = Fastify({
  logger: true,
  bodyLimit: 10485760 // 10MB
});

async function start() {
  await server.register(cors, {
    origin: '*', // For MVP, allow all
  });

  await server.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit for high-res images
      files: 1
    }
  });

  // Register routes
  server.register(analyseRoute, { prefix: '/api' });

  const port = parseInt(process.env.PORT || '3000', 10);
  try {
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();

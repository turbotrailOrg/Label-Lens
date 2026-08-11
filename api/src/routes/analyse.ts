import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { analyseIngredients } from '../services/openai';
import { analyseIngredientsGemini } from '../services/gemini';

export async function analyseRoute(server: FastifyInstance) {
  server.post('/analyse', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await request.file();
      if (!data) {
        return reply.status(400).send({ error: 'No image uploaded' });
      }

      const buffer = await data.toBuffer();
      
      // Parse optional preferences from fields if present
      let userPreferences = {};
      if (data.fields && data.fields.preferences) {
        try {
          userPreferences = JSON.parse(
            'value' in data.fields.preferences ? String(data.fields.preferences.value) : '{}'
          );
        } catch (e) {
          server.log.warn('Failed to parse preferences field', e);
        }
      }

      const provider = process.env.AI_PROVIDER || 'openai';
      let result;
      if (provider === 'gemini') {
        result = await analyseIngredientsGemini(buffer, data.mimetype, userPreferences);
      } else {
        result = await analyseIngredients(buffer, data.mimetype, userPreferences);
      }
      
      return reply.send(result);
    } catch (error) {
      server.log.error(error);
      return reply.status(500).send({ error: 'Internal server error analyzing image.' });
    }
  });
}

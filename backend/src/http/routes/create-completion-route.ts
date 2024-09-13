import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { createGoalCompletionService } from '../../services/create-goal-completion-service';

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async req => {
      const { goalCompletion } = await createGoalCompletionService(req.body);
      return { message: 'Goal completed successfully.', goalCompletion };
    }
  );
};

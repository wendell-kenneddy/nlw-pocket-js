import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoalService } from '../../services/create-goal-service';
import z from 'zod';

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async req => {
      const goal = await createGoalService(req.body);
      return { message: 'Goal created successfully.', goal };
    }
  );
};

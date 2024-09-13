import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoalsService } from '../../services/get-week-pending-goals-service';

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async req => {
    const { pendingGoals } = await getWeekPendingGoalsService();
    return { pendingGoals };
  });
};

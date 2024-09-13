import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSummaryService } from '../../services/get-week-summary-service';

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/week-summary', async req => {
    const { summary } = await getWeekSummaryService();
    return { summary };
  });
};

import fastify from 'fastify';
import z from 'zod';
import { createGoalService } from '../services/create-goal-service';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getWeekPendingGoalsService } from '../services/get-week-pending-goals-service';
import { createGoalCompletionService } from '../services/create-goal-completion-service';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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
    const goal = await createGoalCompletionService(req.body);
    return { message: 'Goal completed successfully.', goal };
  }
);

app.get('/pending-goals', async req => {
  const { pendingGoals } = await getWeekPendingGoalsService();
  return { pendingGoals };
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server runnning'));

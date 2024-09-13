import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getPendingGoalsRoute } from './routes/get-pending-goals-route';
import { createGoalRoute } from './routes/create-goal-route';
import { createCompletionRoute } from './routes/create-completion-route';
import { getWeekSummaryRoute } from './routes/get-week-summary-route';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, {
  origin: '*',
});
app.register(getPendingGoalsRoute);
app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server runnning'));

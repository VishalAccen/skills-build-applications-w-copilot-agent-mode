import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
    response.status(409).json({ error: 'A record with that unique value already exists' });
    return;
  }

  const message = error instanceof Error ? error.message : 'Internal server error';
  const status = message.endsWith('is required') || message.endsWith('must be a positive number') ? 400 : 500;
  response.status(status).json({ error: message });
});

connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to octofit_db:', error);
});

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${port}`;
  console.log(`OctoFit API listening at ${baseUrl}`);
});

export default app;

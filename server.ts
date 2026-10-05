import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAnalyzePayload } from './api/analyze';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '5mb' }));

  // API Route: /api/analyze
  app.post('/api/analyze', async (req, res) => {
    try {
      if (!req.body || typeof req.body !== 'object') {
        res.status(400).json({ error: 'Request body must be a JSON object.' });
        return;
      }
      const result = await handleAnalyzePayload(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/analyze:', err.message);
      const statusCode = err.message?.includes('GEMINI_API_KEY is not configured')
        ? 500
        : err.message?.includes('RESOURCE_EXHAUSTED') || err.message?.includes('quota')
        ? 429
        : err.message?.includes('Invalid')
        ? 400
        : 500;

      res.status(statusCode).json({
        error: err.message || 'Internal analysis engine error.',
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'operational',
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log(`Serving static files from: ${distPath}`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Taiwan Intelligence Agent] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

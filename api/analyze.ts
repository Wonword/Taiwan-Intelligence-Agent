import type { IncomingMessage, ServerResponse } from 'http';
import { handleAnalyzePayload } from './_lib/analyzeCore';

// Configure maximum duration for Vercel Serverless Function (60s)
export const maxDuration = 60;

interface VercelRequest extends IncomingMessage {
  body: any;
  query: Record<string, string | string[]>;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse extends ServerResponse {
  status?: (statusCode: number) => VercelResponse;
  json?: (data: any) => VercelResponse;
  send?: (body: any) => VercelResponse;
}

async function parseBody(req: VercelRequest): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return req.body;
      }
    }
    return req.body;
  }

  // Fallback: read stream from IncomingMessage if body not already parsed
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(raw);
      }
    });
    req.on('error', reject);
  });
}

function sendResponse(res: VercelResponse, statusCode: number, data: any) {
  const jsonStr = JSON.stringify(data);
  const anyRes = res as any;
  if (typeof anyRes.status === 'function' && typeof anyRes.json === 'function') {
    anyRes.status(statusCode).json(data);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(jsonStr);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendResponse(res, 405, { error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const body = await parseBody(req);

    if (!body || typeof body !== 'object') {
      sendResponse(res, 400, {
        error: 'Invalid request body. Expected a JSON object with "mode".',
      });
      return;
    }

    const result = await handleAnalyzePayload(body);
    sendResponse(res, 200, result);
  } catch (error: any) {
    console.error('Serverless function error in /api/analyze:', error);

    const errorMessage = error?.message || 'An error occurred during intelligence analysis.';
    let status = 500;

    if (errorMessage.includes('GEMINI_API_KEY is not configured')) {
      status = 500;
    } else if (
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('429')
    ) {
      status = 429;
    } else if (errorMessage.includes('Invalid') || errorMessage.includes('Please provide')) {
      status = 400;
    }

    sendResponse(res, status, { error: errorMessage });
  }
}

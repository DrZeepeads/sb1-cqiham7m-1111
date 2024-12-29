import { QueryRequest, GenerateResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export async function generateAnswer(request: QueryRequest): Promise<GenerateResponse> {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to generate answer');
  }

  return response.json();
}
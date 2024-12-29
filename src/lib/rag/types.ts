export interface SearchResult {
  content: string;
  similarity: number;
  metadata: {
    chapter: string;
    page: number;
    section: string;
  };
}

export interface GenerateResponse {
  content: string;
  citations: Array<{
    text: string;
    chapter: string;
    page: number;
  }>;
}

export interface QueryRequest {
  query: string;
  sessionId?: string;
  previousMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
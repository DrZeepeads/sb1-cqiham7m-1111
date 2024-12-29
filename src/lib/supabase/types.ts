export interface TextbookChunk {
  id: string;
  content: string;
  embedding: number[];
  chapter: string;
  page: number;
  section: string;
  metadata: {
    edition: string;
    year: number;
  };
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      textbook_chunks: {
        Row: TextbookChunk;
        Insert: Omit<TextbookChunk, 'id'>;
        Update: Partial<TextbookChunk>;
      };
      chat_sessions: {
        Row: ChatSession;
        Insert: Omit<ChatSession, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ChatSession, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
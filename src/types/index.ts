export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
}

export interface Citation {
  text: string;
  page: number;
  chapter: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface ChatHistory {
  id: string;
  user_id: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { Message } from '@/types';
import { generateAnswer } from './api';
import { saveChatMessage } from '@/lib/supabase/chat';

interface RagContextType {
  isLoading: boolean;
  sendMessage: (content: string, sessionId?: string) => Promise<Message>;
}

const RagContext = createContext<RagContextType | undefined>(undefined);

export function RagProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string, sessionId?: string) => {
    setIsLoading(true);
    try {
      const response = await generateAnswer({
        query: content,
        sessionId,
      });

      const message: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.content,
        citations: response.citations,
        timestamp: new Date().toISOString(),
      };

      if (sessionId) {
        await saveChatMessage(sessionId, message);
      }

      return message;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <RagContext.Provider value={{ isLoading, sendMessage }}>
      {children}
    </RagContext.Provider>
  );
}

export function useRag() {
  const context = useContext(RagContext);
  if (context === undefined) {
    throw new Error('useRag must be used within a RagProvider');
  }
  return context;
}
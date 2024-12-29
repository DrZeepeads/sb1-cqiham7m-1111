import { useState, useCallback } from 'react';
import { Message } from '@/types';
import { useRag } from '@/lib/rag/context';

export function useChat(sessionId?: string) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm NelsonGPT, your pediatric knowledge assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const { isLoading, sendMessage } = useRag();

  const addMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const assistantMessage = await sendMessage(content, sessionId);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error appropriately
      console.error('Failed to get response:', error);
    }
  }, [sessionId, sendMessage]);

  return {
    messages,
    addMessage,
    isLoading,
  };
}
import { supabase } from './client';
import type { Message } from '@/types';
import type { ChatSession } from './types';

export async function createChatSession(userId: string, title: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({ user_id: userId, title })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function getChatSessions(userId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function saveChatMessage(sessionId: string, message: Message) {
  const { error } = await supabase
    .from('messages')
    .insert({
      session_id: sessionId,
      role: message.role,
      content: message.content,
      citations: message.citations,
    });
    
  if (error) throw error;
}
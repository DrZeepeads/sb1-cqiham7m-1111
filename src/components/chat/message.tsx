import { Message } from '@/types';
import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <Card className={`flex-1 p-4 ${isAssistant ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
        <p className="leading-relaxed">{message.content}</p>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-2 border-t pt-2 text-sm text-muted-foreground">
            <p className="font-semibold">Citations:</p>
            <ul className="list-inside list-disc">
              {message.citations.map((citation, index) => (
                <li key={index}>
                  {citation.text} (Chapter {citation.chapter}, Page {citation.page})
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
import { Message } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './message';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)] px-4">
      <div className="flex flex-col gap-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
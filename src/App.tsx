import { Header } from '@/components/layout/header';
import { MessageList } from '@/components/chat/message-list';
import { ChatInput } from '@/components/chat/input';
import { useChat } from '@/hooks/use-chat';
import { RagProvider } from '@/lib/rag/context';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  const { messages, addMessage, isLoading } = useChat();

  return (
    <RagProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto">
          <MessageList messages={messages} />
          <ChatInput onSend={addMessage} disabled={isLoading} />
        </main>
        <Toaster />
      </div>
    </RagProvider>
  );
}
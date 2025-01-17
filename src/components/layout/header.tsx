import { Button } from '@/components/ui/button';
import { StethoscopeIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-semibold">
          <StethoscopeIcon className="h-6 w-6" />
          <span>NelsonGPT</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  X,
  Send,
  Sun,
  Battery,
  FileText,
  HeadphonesIcon,
  Minimize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  'solar panels':
    "Great choice! We have panels from 400W to 580W from brands like SunPower, Jinko Solar, and Canadian Solar. Would you like me to recommend one based on your needs?",
  'battery':
    "We stock LFP batteries from 3.2kWh to 10kWh. Popular options include Pylontech and BYD. What capacity are you looking for?",
  'quote':
    "I'd recommend speaking with one of our experts! Click 'Talk to Expert' or visit our Consultation page for a personalized quote.",
  'invert':
    "We carry hybrid, off-grid, and grid-tie inverters from Deye, Growatt, Solis, and Victron. Hybrid inverters are the most popular choice for Nigerian homes. Would you like to learn more?",
  'installation':
    "We partner with certified installers across Nigeria! For installation services, I recommend scheduling a consultation with our team. They'll assess your needs and provide a complete solution.",
  'price':
    "Our prices vary based on the product and brand. Solar panels start from ₦95,000, batteries from ₦72,000, and inverters from ₦380,000. Would you like to browse specific products?",
};

const quickActions = [
  { label: 'Find Solar Panels', keywords: 'solar panels', icon: Sun },
  { label: 'Battery Help', keywords: 'battery', icon: Battery },
  { label: 'Get Quote', keywords: 'quote', icon: FileText },
  { label: 'Talk to Expert', keywords: 'expert', icon: HeadphonesIcon },
];

const defaultGreeting =
  "Hi! I'm SolBot, your solar energy assistant. How can I help you today?";

const defaultFallback =
  "I'd love to help! For detailed questions, our expert team is available. Would you like to schedule a consultation?";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes('expert') || lower.includes('talk') || lower.includes('human')) {
    return "I'd recommend speaking with one of our experts! Click 'Talk to Expert' or visit our Consultation page for personalized assistance.";
  }
  return defaultFallback;
}

export default function ChatBot() {
  const { navigate } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      text: defaultGreeting,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate bot thinking delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleQuickAction = (keywords: string) => {
    if (keywords === 'expert') {
      navigate('consultation');
      return;
    }
    sendMessage(keywords);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[60] flex w-[360px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:right-6 sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/20">
              <Sun className="size-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">SolBot</h3>
              <p className="text-xs opacity-80">Solar Energy Assistant</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Minimize2 className="size-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: '350px', minHeight: '250px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'rounded-br-md bg-primary text-primary-foreground'
                      : 'rounded-bl-md bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="border-t px-4 py-2">
              <p className="mb-2 text-xs text-muted-foreground">Quick actions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => handleQuickAction(action.keywords)}
                  >
                    <action.icon className="size-3" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="h-9 flex-1 rounded-full"
              />
              <Button
                size="icon"
                className="size-9 shrink-0 rounded-full"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-[60] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:right-6"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex size-4">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-4 rounded-full bg-green-500" />
          </span>
        )}
      </button>
    </>
  );
}

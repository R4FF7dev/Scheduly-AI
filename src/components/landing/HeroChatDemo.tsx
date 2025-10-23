import { useState, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isOption?: boolean;
}

const messages: Message[] = [
  { id: 1, text: "Hi! Can we meet next week to discuss the project?", isUser: true },
  { id: 2, text: "I'd be happy to schedule that! Here are some available times:", isUser: false },
  { id: 3, text: "Tuesday 10:30 AM", isUser: false, isOption: true },
  { id: 4, text: "Wednesday 2:00 PM", isUser: false, isOption: true },
  { id: 5, text: "Thursday 11:00 AM", isUser: false, isOption: true },
  { id: 6, text: "Tuesday 10:30 AM works perfect!", isUser: true },
  { id: 7, text: "✓ Added to calendar", isUser: false },
  { id: 8, text: "✓ Reminder set", isUser: false },
  { id: 9, text: "✓ Summary sent", isUser: false },
];

export const HeroChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleMessages(messages.map((m) => m.id));
      setIsAnimating(false);
      return;
    }

    const animateMessages = () => {
      setVisibleMessages([]);
      const delays = [0, 1000, 1800, 2200, 2600, 3000, 4200, 5000, 5500, 6000];

      delays.forEach((delay, index) => {
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, messages[index].id]);
        }, delay);
      });

      setTimeout(() => {
        setTimeout(animateMessages, 2000);
      }, 8000);
    };

    animateMessages();
  }, [prefersReducedMotion]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        {/* Phone Header */}
        <div className="bg-primary px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-semibold">
            AI
          </div>
          <div>
            <div className="text-primary-foreground font-semibold text-sm">Scheduly AI</div>
            <div className="text-primary-foreground/70 text-xs">Online</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-muted/30 p-4 h-[500px] overflow-y-auto space-y-3">
          {messages.map((message) => {
            const isVisible = visibleMessages.includes(message.id);
            if (!isVisible && isAnimating) return null;

            return (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} ${
                  isAnimating ? "animate-fade-in" : ""
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : message.isOption
                      ? "bg-accent text-accent-foreground border-2 border-primary/20 rounded-bl-sm cursor-pointer hover:border-primary/40 transition-colors"
                      : "bg-card text-card-foreground rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className={`text-sm ${message.isOption ? "font-medium text-center" : ""}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area (Static/Decorative) */}
        <div className="bg-card border-t border-border px-4 py-3 flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full px-4 py-2">
            <p className="text-sm text-muted-foreground">Type a message...</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

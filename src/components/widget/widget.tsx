"use client";

import * as React from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Bubble } from "./bubble";
import { ToolChip } from "./tool-chip";
import { BookingCard } from "./booking-card";
import { PaymentCard } from "./payment-card";
import { generateReply, newId, type BotMessage } from "@/lib/chat-mock";

interface WidgetProps {
  listerName: string;
  listerInitial: string;
  greeting: string;
  suggestions: string[];
}

export function Widget({
  listerName,
  listerInitial,
  greeting,
  suggestions,
}: WidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<BotMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInput("");
    setMessages((m) => [
      ...m,
      { id: newId(), kind: "user-text", text: trimmed },
    ]);
    setIsTyping(true);
    const reply = generateReply(trimmed);
    await new Promise((r) => setTimeout(r, reply.delayMs ?? 500));
    setIsTyping(false);
    // Stream the reply messages with small delays so the user can read each
    for (const msg of reply.messages) {
      setMessages((m) => [...m, msg]);
      if (msg.kind === "tool") {
        await new Promise((r) => setTimeout(r, (msg.tool?.durationMs ?? 1200) + 300));
      } else {
        await new Promise((r) => setTimeout(r, 350));
      }
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-5 right-5 z-50",
          "h-16 w-16 rounded-full bg-navy-700 text-cream-50",
          "shadow-widget focus-ring",
          "flex items-center justify-center",
          "transition-transform hover:scale-105 active:scale-95",
          !open && "animate-pulse-soft",
        )}
      >
        {open ? (
          <X size={26} strokeWidth={1.75} />
        ) : (
          <MessageCircle size={26} strokeWidth={1.75} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`Chat with ${listerName}`}
          className={cn(
            "fixed z-40 bg-cream-50",
            "shadow-widget border border-cream-200",
            "flex flex-col",
            // Mobile: full-screen
            "inset-0",
            // Desktop: floating panel — must come AFTER inset-0 so tailwind-merge
            // doesn't collapse the specific md:bottom-/right- utilities.
            "md:inset-auto md:bottom-24 md:right-5 md:w-[380px] md:h-[600px] md:rounded-xl md:overflow-hidden",
          )}
        >
          {/* Header */}
          <header className="flex items-center gap-3 px-4 py-3 bg-cream-100 border-b border-cream-200">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-navy-700 text-cream-50 flex items-center justify-center font-sans text-body font-semibold">
                {listerInitial}
              </div>
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-olive-600 border-2 border-cream-100"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body font-semibold text-navy-900 truncate">
                {listerName}
              </p>
              <p className="text-micro uppercase text-olive-600">
                Online · typically replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-9 w-9 rounded-full hover:bg-cream-200 text-ink-secondary flex items-center justify-center focus-ring"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </header>

          {/* Thread */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
            {/* Welcome */}
            <Bubble from="bot" showAvatar avatar={listerInitial}>
              <p className="font-display text-body-lg leading-snug">{greeting}</p>
            </Bubble>

            {messages.map((m, i) => renderMessage(m, i, messages, listerInitial))}

            {isTyping && (
              <Bubble from="bot" showAvatar avatar={listerInitial}>
                <TypingDots />
              </Bubble>
            )}

            {/* Suggested prompts (only on welcome state) */}
            {isEmpty && !isTyping && (
              <div className="pt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className={cn(
                      "inline-flex items-center h-8 px-3 rounded-full",
                      "bg-cream-50 border border-cream-200 text-small text-navy-700",
                      "hover:bg-navy-100 hover:border-navy-500/40 focus-ring",
                      "transition-colors",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-cream-200 p-3 bg-cream-50"
          >
            <div className="flex items-center gap-2 bg-cream-100 rounded-full pl-4 pr-1.5 py-1.5 border border-transparent focus-within:border-navy-500 focus-within:shadow-focus transition-shadow">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message"
                className="flex-1 bg-transparent text-body text-ink-primary placeholder:text-ink-tertiary focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || isTyping}
                className={cn(
                  "h-9 w-9 rounded-full bg-navy-700 text-cream-50",
                  "flex items-center justify-center transition-all",
                  "hover:bg-navy-500 focus-ring",
                  "disabled:opacity-40 disabled:pointer-events-none",
                )}
              >
                <ArrowUp size={18} strokeWidth={2} />
              </button>
            </div>
            <p className="text-micro text-ink-tertiary text-center mt-2 uppercase tracking-wider">
              Powered by{" "}
              <span className="font-display normal-case font-semibold tracking-normal text-ink-secondary">
                GreekList
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function renderMessage(
  m: BotMessage,
  index: number,
  all: BotMessage[],
  listerInitial: string,
) {
  if (m.kind === "user-text") {
    return (
      <Bubble key={m.id} from="user">
        {m.text}
      </Bubble>
    );
  }

  const prev = all[index - 1];
  const showAvatar =
    !prev || prev.kind === "user-text";

  if (m.kind === "bot-text") {
    return (
      <Bubble key={m.id} from="bot" showAvatar={showAvatar} avatar={listerInitial}>
        {m.text}
      </Bubble>
    );
  }

  if (m.kind === "tool" && m.tool) {
    return (
      <ToolChip
        key={m.id}
        label={m.tool.label}
        resolved={m.tool.resolved}
        durationMs={m.tool.durationMs}
      />
    );
  }

  if (m.kind === "booking-card" && m.booking) {
    return (
      <BookingCard
        key={m.id}
        service={m.booking.service}
        time={m.booking.time}
        practitioner={m.booking.practitioner}
      />
    );
  }

  if (m.kind === "payment-card" && m.payment) {
    return (
      <PaymentCard key={m.id} label={m.payment.label} amount={m.payment.amount} />
    );
  }

  return null;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <Dot delay={0} />
      <Dot delay={120} />
      <Dot delay={240} />
    </span>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="block h-1.5 w-1.5 rounded-full bg-ink-tertiary animate-bounce"
      style={{ animationDelay: `${delay}ms`, animationDuration: "1.1s" }}
    />
  );
}

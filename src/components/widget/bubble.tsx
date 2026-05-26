import { cn } from "@/lib/cn";

interface BubbleProps {
  from: "user" | "bot";
  children: React.ReactNode;
  showAvatar?: boolean;
  avatar?: React.ReactNode;
}

export function Bubble({ from, children, showAvatar, avatar }: BubbleProps) {
  const isUser = from === "user";
  return (
    <div className={cn("flex items-end gap-2", isUser && "justify-end")}>
      {!isUser && (
        <div
          className={cn(
            "h-7 w-7 shrink-0 rounded-full overflow-hidden",
            "bg-cream-200 text-navy-700 text-small font-semibold",
            "flex items-center justify-center",
            !showAvatar && "invisible",
          )}
        >
          {avatar}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5",
          "text-body leading-relaxed",
          isUser
            ? "bg-navy-100 text-navy-900 rounded-xl rounded-br-sm"
            : "bg-cream-100 text-ink-primary rounded-xl rounded-bl-sm",
        )}
      >
        {children}
      </div>
    </div>
  );
}

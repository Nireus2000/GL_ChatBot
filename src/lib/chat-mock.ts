export type MessageKind =
  | "bot-text"
  | "user-text"
  | "tool"
  | "booking-card"
  | "payment-card";

export interface BotMessage {
  id: string;
  kind: MessageKind;
  text?: string;
  // tool: shows a "Checking calendar…" chip that resolves into another message
  tool?: { label: string; resolved?: string; durationMs?: number };
  booking?: {
    service: string;
    time: string;
    practitioner?: string;
  };
  payment?: {
    label: string;
    amount: string; // "£50"
  };
}

export interface Reply {
  delayMs?: number;
  messages: BotMessage[];
}

const id = () => Math.random().toString(36).slice(2, 10);

function match(input: string, ...needles: string[]) {
  const lower = input.toLowerCase();
  return needles.some((n) => lower.includes(n));
}

export function generateReply(userText: string): Reply {
  // Booking flow — multi-step: bot text → tool chip → booking card
  if (match(userText, "book", "appointment", "ραντεβού", "rantevou")) {
    return {
      delayMs: 600,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text: "Of course — let me see what's free this week. Είστε νέος ασθενής, or have you been with us before?",
        },
        {
          id: id(),
          kind: "tool",
          tool: {
            label: "Checking the calendar",
            resolved: "Found 3 slots in the next 5 days",
            durationMs: 1400,
          },
        },
        {
          id: id(),
          kind: "booking-card",
          booking: {
            service: "Private check-up · 30 min",
            time: "Thursday, 14 March · 10:30 AM",
            practitioner: "Dr. Eleni Papadakis",
          },
        },
      ],
    };
  }

  if (match(userText, "price", "cost", "how much", "fees", "£", "πόσο")) {
    return {
      delayMs: 500,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "Our private check-up is £65 and includes a full examination plus a personalised plan. Clean & polish is £75. Want me to send you a paid hold for the slot?",
        },
        {
          id: id(),
          kind: "payment-card",
          payment: { label: "Reserve your check-up slot", amount: "£10" },
        },
      ],
    };
  }

  if (match(userText, "hour", "open", "close", "when", "ώρα", "ωρα")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "We're open Monday to Friday, 9:00 AM to 5:30 PM, and Saturday mornings by appointment. Today (Tuesday) we're open for another 4 hours.",
        },
      ],
    };
  }

  if (match(userText, "where", "address", "location", "park", "που", "πού")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "We're at 12 Aegean Street, Manchester M1 2AB — five minutes' walk from Piccadilly station. There's metered parking on Tariff Street, free after 6pm.",
        },
      ],
    };
  }

  if (match(userText, "greek", "ελληνικά", "ελληνικα", "milate")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "Ναι, βεβαίως. Most of our team — including Dr. Papadakis — are fluent in Greek. Feel free to switch any time.",
        },
      ],
    };
  }

  if (match(userText, "emergency", "pain", "πόνος", "πονος", "ponos")) {
    return {
      delayMs: 500,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "I'm sorry to hear that. We keep two emergency slots every day. If you can call us on 0161 123 4567 first thing, we'll fit you in. Out of hours, NHS 111 can help with serious pain.",
        },
      ],
    };
  }

  if (match(userText, "insurance", "bupa", "denplan", "axa", "cigna")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "We're recognised by Bupa, Denplan, AXA, and Cigna. Bring your policy number on the day and we'll handle the paperwork.",
        },
      ],
    };
  }

  if (match(userText, "children", "kids", "παιδί", "παιδι")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "Yes — from age 3. Children's appointments are unhurried and we always include a friendly tour of the chair first.",
        },
      ],
    };
  }

  if (match(userText, "hello", "hi", "γεια", "kalimera", "καλημέρα", "καλημερα")) {
    return {
      delayMs: 400,
      messages: [
        {
          id: id(),
          kind: "bot-text",
          text:
            "Καλημέρα! Happy to help — ask me about bookings, prices, opening hours, or anything else about the practice.",
        },
      ],
    };
  }

  return {
    delayMs: 500,
    messages: [
      {
        id: id(),
        kind: "bot-text",
        text:
          "That's a good question — let me get one of the team to come back to you. Could you share your name and email so we can follow up?",
      },
    ],
  };
}

export function newId() {
  return id();
}

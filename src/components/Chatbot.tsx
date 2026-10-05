"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  answerChat,
  chatSuggestions,
  parseOptionalPhone,
  whatsappHandoffUrl,
} from "@/lib/chatbot";
import { site } from "@/lib/site-data";

type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  handoff?: boolean;
};

const PHONE_KEY = "nes-chat-phone";

export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneDismissed, setPhoneDismissed] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "bot",
      text: `Welcome to ${site.name}®. Ask about courses, hostels, results, or admissions. Sharing a mobile for a callback is optional.`,
    },
  ]);
  const [suggestions, setSuggestions] = useState(chatSuggestions);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastQuestion = useRef("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PHONE_KEY) || "";
      if (saved) {
        setPhone(saved);
        setPhoneDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (pathname.startsWith("/portal") || pathname.startsWith("/login")) {
    return null;
  }

  function pushBot(text: string, opts?: { suggestions?: string[]; handoff?: boolean }) {
    setMessages((m) => [
      ...m,
      {
        id: `${Date.now()}-b`,
        role: "bot",
        text,
        handoff: opts?.handoff,
      },
    ]);
    if (opts?.suggestions) setSuggestions(opts.suggestions);
  }

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    lastQuestion.current = trimmed;
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-u`, role: "user", text: trimmed },
    ]);
    setInput("");
    const reply = answerChat(trimmed);
    window.setTimeout(() => {
      pushBot(reply.text, {
        suggestions: reply.suggestions,
        handoff: reply.handoff,
      });
    }, 180);
  }

  async function savePhone(raw: string, { skip }: { skip?: boolean } = {}) {
    if (skip) {
      setPhone("");
      setPhoneDraft("");
      setPhoneError("");
      setPhoneDismissed(true);
      try {
        localStorage.removeItem(PHONE_KEY);
      } catch {
        /* ignore */
      }
      pushBot("No problem — continue chatting anytime without a number.");
      return;
    }
    const parsed = parseOptionalPhone(raw);
    if (!parsed.ok) {
      setPhoneError(parsed.error);
      return;
    }
    if (!parsed.phone) {
      setPhoneError("Enter a number, or tap Skip.");
      return;
    }

    setSavingPhone(true);
    setPhoneError("");
    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: parsed.phone,
          note: lastQuestion.current
            ? `Admission query via chatbot. Last question: ${lastQuestion.current}`
            : "Admission query via website chatbot (callback requested).",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setPhoneError(data.error || "Could not save. You can still WhatsApp us.");
        return;
      }
      setPhone(parsed.phone);
      setPhoneDismissed(true);
      try {
        localStorage.setItem(PHONE_KEY, parsed.phone);
      } catch {
        /* ignore */
      }
      pushBot(
        `Thank you — ${parsed.phone} is noted for an admissions callback. Our team can see this enquiry in the college portal. You may also WhatsApp ${site.phone} anytime.`,
      );
    } catch {
      setPhoneError("Could not reach the server. Try WhatsApp instead.");
    } finally {
      setSavingPhone(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const showPhoneCard = open && !phoneDismissed && !phone;
  const waUrl = whatsappHandoffUrl({
    phone: phone || undefined,
    lastQuestion: lastQuestion.current || undefined,
  });

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex w-80 max-w-[calc(100vw-2.5rem)] flex-col items-stretch gap-2">
      {open ? (
        <div
          className="flex max-h-[min(22rem,55vh)] w-full flex-col overflow-hidden border border-line bg-ink/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
          role="dialog"
          aria-label="Nagaral Education Society assistant"
        >
          <div className="flex items-start justify-between gap-2 border-b border-line px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-xs font-medium leading-snug text-cream sm:text-sm">
                Nagaral Education Society&apos;s assistant
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-muted">
                Basic answers · WhatsApp for more
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 px-1 text-base leading-none text-muted hover:text-cream"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {showPhoneCard ? (
            <div className="flex items-end gap-1.5 border-b border-line bg-ink-soft/50 px-2.5 py-2">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-[0.12em] text-gold">
                  Callback <span className="normal-case tracking-normal text-muted">(optional)</span>
                </p>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Mobile number"
                  value={phoneDraft}
                  onChange={(e) => {
                    setPhoneDraft(e.target.value);
                    setPhoneError("");
                  }}
                  className="mt-1 w-full border border-line bg-ink px-2 py-1 text-[11px] text-cream outline-none focus:border-gold"
                  aria-label="Optional callback mobile"
                />
                {phoneError ? (
                  <p className="mt-0.5 text-[9px] text-red-400">{phoneError}</p>
                ) : null}
              </div>
              <button
                type="button"
                disabled={savingPhone}
                onClick={() => void savePhone(phoneDraft)}
                className="shrink-0 bg-gold px-2 py-1 text-[10px] font-semibold text-on-gold hover:bg-gold-bright disabled:opacity-60"
              >
                {savingPhone ? "…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => void savePhone("", { skip: true })}
                className="shrink-0 border border-line px-2 py-1 text-[10px] text-cream/75 hover:border-gold hover:text-gold"
              >
                Skip
              </button>
            </div>
          ) : null}

          {phone ? (
            <p className="border-b border-line px-3 py-1 text-[10px] text-muted">
              Callback: {phone}{" "}
              <button
                type="button"
                className="text-gold hover:underline"
                onClick={() => {
                  setPhone("");
                  setPhoneDismissed(false);
                  setPhoneDraft("");
                  try {
                    localStorage.removeItem(PHONE_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
              >
                clear
              </button>
            </p>
          ) : null}

          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2.5">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[92%] ${msg.role === "user" ? "ml-auto" : ""}`}>
                <div
                  className={`rounded-sm px-2.5 py-1.5 text-xs leading-relaxed sm:text-sm ${
                    msg.role === "user"
                      ? "bg-gold text-on-gold"
                      : "bg-ink-soft text-cream/90"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.handoff ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center rounded-sm bg-[#25D366] px-2.5 py-1 text-[10px] font-semibold text-on-gold hover:brightness-110"
                  >
                    Continue on WhatsApp
                  </a>
                ) : null}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex flex-wrap gap-1 border-t border-line px-2.5 py-1.5">
            {suggestions.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="border border-line px-1.5 py-0.5 text-[9px] text-cream/75 hover:border-gold hover:text-gold"
              >
                {s}
              </button>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#25D366]/45 px-1.5 py-0.5 text-[9px] text-[#25D366] hover:border-[#25D366]"
            >
              WhatsApp
            </a>
          </div>

          <form onSubmit={onSubmit} className="flex gap-1.5 border-t border-line p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="min-w-0 flex-1 border border-line bg-ink px-2 py-1.5 text-xs text-cream outline-none focus:border-gold"
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="bg-gold px-2.5 py-1.5 text-xs font-semibold text-on-gold hover:bg-gold-bright"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="self-start border border-line bg-ink px-3.5 py-2 text-sm font-medium text-cream shadow-lg hover:border-gold hover:text-gold"
        aria-expanded={open}
        aria-label={open ? "Close chatbot" : "Open admissions chatbot"}
      >
        {open ? "Close chat" : "Ask NES"}
      </button>
    </div>
  );
}

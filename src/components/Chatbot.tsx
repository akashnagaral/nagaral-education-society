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

type Msg = { id: string; role: "bot" | "user"; text: string };

const PHONE_KEY = "nes-chat-phone";

export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneDismissed, setPhoneDismissed] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "bot",
      text: `Hi! Ask about courses, hostels, results, or admissions at ${site.shortName}. Leave a mobile number only if you want a callback — it's optional.`,
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

  function pushBot(text: string, nextSuggestions?: string[]) {
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-b`, role: "bot", text },
    ]);
    if (nextSuggestions) setSuggestions(nextSuggestions);
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
      pushBot(reply.text, reply.suggestions);
    }, 180);
  }

  function savePhone(raw: string, { skip }: { skip?: boolean } = {}) {
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
      pushBot("No problem — you can keep chatting without sharing a number.");
      return;
    }
    const parsed = parseOptionalPhone(raw);
    if (!parsed.ok) {
      setPhoneError(parsed.error);
      return;
    }
    setPhoneError("");
    setPhone(parsed.phone);
    setPhoneDismissed(true);
    try {
      if (parsed.phone) localStorage.setItem(PHONE_KEY, parsed.phone);
      else localStorage.removeItem(PHONE_KEY);
    } catch {
      /* ignore */
    }
    pushBot(
      parsed.phone
        ? `Thanks — noted ${parsed.phone}. Admissions can call you back if needed. You can still WhatsApp anytime.`
        : "Got it — continuing without a number.",
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const showPhoneCard = open && !phoneDismissed && !phone;

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-2">
      {open ? (
        <div
          className="flex h-[min(28rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col border border-line bg-ink/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
          role="dialog"
          aria-label="Admissions chatbot"
        >
          <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
            <div>
              <p className="text-sm font-medium text-cream">NES assistant</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                Basic answers · WhatsApp for more
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-2 text-sm text-muted hover:text-cream"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[92%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "ml-auto bg-gold text-on-gold"
                    : "bg-ink-soft text-cream/90"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {showPhoneCard ? (
            <div className="border-t border-line bg-ink-soft/80 px-3 py-2.5">
              <p className="text-[11px] text-muted">
                Optional callback number — skip anytime
              </p>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile (optional)"
                  value={phoneDraft}
                  onChange={(e) => {
                    setPhoneDraft(e.target.value);
                    setPhoneError("");
                  }}
                  className="min-w-0 flex-1 border border-line bg-ink px-2 py-1.5 text-xs text-cream outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => savePhone(phoneDraft)}
                  className="shrink-0 bg-gold px-2.5 py-1.5 text-xs font-semibold text-on-gold hover:bg-gold-bright"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => savePhone("", { skip: true })}
                  className="shrink-0 border border-line px-2.5 py-1.5 text-xs text-cream/80 hover:border-gold hover:text-gold"
                >
                  Skip
                </button>
              </div>
              {phoneError ? (
                <p className="mt-1 text-[11px] text-red-400">{phoneError}</p>
              ) : null}
            </div>
          ) : null}

          {phone ? (
            <p className="border-t border-line px-3 py-1.5 text-[10px] text-muted">
              Callback noted: {phone}{" "}
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

          <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2">
            {suggestions.slice(0, 4).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="border border-line px-2 py-1 text-[10px] text-cream/75 hover:border-gold hover:text-gold"
              >
                {s}
              </button>
            ))}
            <a
              href={whatsappHandoffUrl({
                phone: phone || undefined,
                lastQuestion: lastQuestion.current || undefined,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#25D366]/40 px-2 py-1 text-[10px] text-[#25D366] hover:border-[#25D366]"
            >
              WhatsApp admissions
            </a>
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="min-w-0 flex-1 border border-line bg-ink px-2.5 py-2 text-sm text-cream outline-none focus:border-gold"
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="bg-gold px-3 py-2 text-sm font-semibold text-on-gold hover:bg-gold-bright"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border border-line bg-ink px-4 py-2.5 text-sm font-medium text-cream shadow-lg hover:border-gold hover:text-gold"
        aria-expanded={open}
        aria-label={open ? "Close chatbot" : "Open admissions chatbot"}
      >
        {open ? "Close chat" : "Ask NES"}
      </button>
    </div>
  );
}

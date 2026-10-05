import { colleges, faqs, site } from "@/lib/site-data";

export type ChatReply = {
  text: string;
  suggestions?: string[];
};

const extras: { keys: string[]; answer: string }[] = [
  {
    keys: ["hi", "hello", "hey", "namaste", "good morning", "good evening"],
    answer: `Hello! I'm the NES admissions assistant for ${site.name}® in Dharwad. Ask about courses, hostels, results, colleges, or timings — or WhatsApp us on ${site.phone}.`,
  },
  {
    keys: ["fee", "fees", "cost", "tuition", "price", "charges"],
    answer:
      "Fee details vary by course and scholarship eligibility. Share your class / marks with admissions on WhatsApp or call 9019939321 for an accurate quote — merit and need-based support are available.",
  },
  {
    keys: ["admission", "admit", "apply", "enrol", "enroll", "join", "seat"],
    answer:
      "Admissions are open for PUC Science (PCMB / PCMCS). Visit Mon–Sat 9:00 AM – 5:30 PM, or WhatsApp / call 9019939321 to schedule a campus visit. Sundays by appointment.",
  },
  {
    keys: ["contact", "phone", "call", "whatsapp", "number", "reach"],
    answer: `You can reach admissions on WhatsApp or phone: ${site.phone}. Email: ${site.email}. Address: ${site.address}.`,
  },
  {
    keys: ["pcmb", "pcmcs", "branch", "combination", "biology", "computer"],
    answer:
      "Within PUC Science you choose a branch: PCMB (Physics, Chemistry, Maths, Biology) or PCMCS (Physics, Chemistry, Maths, Computer Science). NEET / CET / JEE / NDA coaching is integrated.",
  },
  {
    keys: ["neet", "jee", "cet", "nda", "coaching", "competitive"],
    answer:
      "Yes — integrated coaching for NEET, K-CET, JEE, and NDA is offered with experienced faculty alongside regular PUC Science classes.",
  },
  {
    keys: ["ntss", "dharwad campus", "kelageri", "sarovar"],
    answer: `NTSS PU College, Dharwad (code JJ0346) at ${colleges[0].address}. NES has collaborated since ${colleges[0].collaboratedSince}. 100% II PU results in 2025–2026.`,
  },
  {
    keys: ["alnavar", "nes college", "vidyanagar"],
    answer: `NES PU Science College, Alnavar (code MM0013) at ${colleges[1].address}. Collaborated with NES since ${colleges[1].collaboratedSince}. 100% II PU board results 2025–26.`,
  },
  {
    keys: ["thank", "thanks", "ok", "okay", "great"],
    answer: "You're welcome! Message anytime, or WhatsApp admissions if you need a human counsellor.",
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s+/]/g, " ").replace(/\s+/g, " ").trim();
}

function score(haystack: string, keys: string[]) {
  let s = 0;
  for (const key of keys) {
    if (haystack.includes(key)) s += key.length > 4 ? 3 : 2;
  }
  return s;
}

export const chatSuggestions = [
  "Courses offered?",
  "Hostel & food?",
  "Admission timings?",
  "Board results?",
  "College codes?",
];

export function answerChat(userText: string): ChatReply {
  const q = normalize(userText);
  if (!q) {
    return {
      text: "Ask me anything about NES admissions, courses, hostels, or campuses.",
      suggestions: chatSuggestions,
    };
  }

  let best = { score: 0, answer: "" };

  for (const item of faqs) {
    const blob = normalize(`${item.q} ${item.a}`);
    const words = q.split(" ").filter((w) => w.length > 2);
    let s = 0;
    for (const w of words) {
      if (blob.includes(w)) s += 1;
      if (normalize(item.q).includes(w)) s += 2;
    }
    if (s > best.score) best = { score: s, answer: item.a };
  }

  for (const item of extras) {
    const s = score(q, item.keys);
    if (s > best.score) best = { score: s, answer: item.answer };
  }

  if (best.score >= 2 && best.answer) {
    return { text: best.answer, suggestions: chatSuggestions };
  }

  return {
    text: `I don't have a precise answer for that yet. WhatsApp admissions on ${site.phone} — they'll help you quickly. You can also browse the FAQ section on this page.`,
    suggestions: chatSuggestions,
  };
}

/** Optional Indian mobile — empty is valid (skipped) */
export function parseOptionalPhone(raw: string): { ok: true; phone: string } | { ok: false; error: string } {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return { ok: true, phone: "" };
  const phone = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (phone.length !== 10) {
    return { ok: false, error: "Enter a 10-digit mobile number, or leave it blank." };
  }
  if (!/^[6-9]/.test(phone)) {
    return { ok: false, error: "That doesn't look like an Indian mobile. You can skip this." };
  }
  return { ok: true, phone };
}

export function whatsappHandoffUrl(opts: { phone?: string; lastQuestion?: string } = {}) {
  const lines = [
    `Hello NES admissions — enquiry from nagaral.in chatbot.`,
  ];
  if (opts.lastQuestion) lines.push(`Question: ${opts.lastQuestion}`);
  if (opts.phone) lines.push(`My number: ${opts.phone}`);
  return `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}

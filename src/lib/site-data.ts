export type Achievement = {
  id: string;
  year: string;
  studentName: string;
  highlight: string;
  collegeId: "ntss-dharwad" | "nes-alnavar";
};

export type ResultFile = {
  id: string;
  collegeId: "ntss-dharwad" | "nes-alnavar";
  year: string;
  title: string;
  /** Path under /public, e.g. /results/ntss-dharwad/pu-2025.pdf */
  file: string;
  type: "result" | "notes";
};

export type College = {
  id: "ntss-dharwad" | "nes-alnavar";
  shortName: string;
  name: string;
  location: string;
  address: string;
  collegeCode?: string;
  /** Year NES began collaborating with this (existing) college */
  collaboratedSince: string;
  slug: string;
  image: string;
  mapUrl: string;
  mapEmbedUrl: string;
  description: string[];
  focus: string[];
};

export const site = {
  name: "Nagaral Education Society",
  shortName: "NES",
  registeredMark: true,
  founded: "2024",
  tagline: "Strong academic foundations. Affordable education. Bright futures.",
  heroLead:
    "Among Dharwad’s focused PU Science colleges — board excellence with integrated NEET, CET, JEE & NDA coaching.",
  city: "Dharwad",
  email: "nagaraleducationsociety@gmail.com",
  phone: "9019939321",
  phoneHref: "tel:+919019939321",
  whatsapp: "919019939321",
  whatsappHref: "https://wa.me/919019939321",
  emailHref: "mailto:nagaraleducationsociety@gmail.com",
  phones: [
    { label: "Admissions", number: "9019939321", href: "tel:+919019939321" },
  ],
  address: "D N Koppa, Sarovar Nagar, Near Kelageri, Dharwad – 580007",
  timings: {
    weekdays: "Mon – Sat: 9:00 AM – 5:30 PM",
    sunday: "Sunday: Closed (admissions by appointment)",
    note: "Campus visits welcome during office hours — call or WhatsApp to schedule.",
  },
  social: {
    youtube: "https://www.youtube.com/@NagaralEducationSociety",
    instagram: "https://www.instagram.com/nagaraleducationsociety/",
    telegram: "https://t.me/nagaraleducation",
  },
  owner: {
    name: "Shivaraj Nagaral",
    role: "Founder & Managing Trustee",
    credentials: "UG · University of Agricultural Sciences · MBA · Jain College",
    photo: "/images/shivaraj-nagaral.png",
    vision: "Inspiring young minds to aspire their dreams",
    highlights: [
      "Enthusiastic entrepreneur",
      "10 years in the agricultural sector",
      "Agriculture consultancy · ~8,000 farmers",
      "Founder, Nagaral Education Society",
    ],
    bio: [
      "Shivaraj Nagaral is an enthusiastic entrepreneur who completed his undergraduate studies at the University of Agricultural Sciences and earned an MBA from Jain College. He built a decade of experience in the agricultural sector before stepping out to follow his own path.",
      "After ten years in the field, he resigned to follow his instinct and founded his own agriculture consultation company. Today he serves a farmer base of around 8,000 families — a network built on trust, field knowledge, and practical guidance.",
      "Inspired and guided by H. S. Nagaral, he turned a childhood dream into Nagaral Education Society® — with the ambition to build one of the finest education societies, where quality learning can change a student’s life, strengthen the family, uplift the community, and contribute to the nation.",
      "His vision is clear: inspiring young minds to aspire their dreams. Under his leadership, the society collaborates with NTSS PU College, Dharwad and NES PU Science College, Alnavar — focused PU Science, integrated coaching, scholarships, and student support. The first pass-out batch (2025–2026) achieved 100% results in II PU.",
    ],
  },
  inspiration: {
    name: "H. S. Nagaral",
    role: "Inspiration & Chief Guide",
    credentials: "KAS · Retired JDLR (2014) · Former Professor",
    photo: "/images/dr-hs-nagaral.png",
    quote: "Lighting young minds. Brighter futures.",
    highlights: [
      "Village roots — first-generation academic journey",
      "7th · 10th · PU-II · Degree · Double degree",
      "High school teacher & principal, then professor",
      "KAS — State first rank in Kannada Medium",
      "Retired as JDLR · Joint Director of Land Records (2014)",
      "Main guide of Nagaral Education Society®",
    ],
    bio: [
      "H. S. Nagaral is the inspiration behind Nagaral Education Society® and remains our main guide. Coming from a village background, he walked a rare first-generation path — completing 7th standard, 10th, PU-II, a degree, and a double degree — proving that disciplined study can open every door.",
      "His teaching journey began early: he served as a high school teacher and then as a principal before becoming a professor. That love of the classroom never left him. Before clearing the Karnataka Administrative Service examinations, he taught with dedication — and secured the KAS state first rank in Kannada Medium, a mark of scholarship and perseverance.",
      "He went on to serve in the administration with dedication and retired in 2014 as Joint Director of Land Records (JDLR). Even after a distinguished public career, his focus stays on education, sharing knowledge, and guiding the next generation.",
      "Known for sincerity toward his work and motives, H. S. Nagaral believes knowledge grows when it is shared. He is regarded as an exceptional teacher — clear, patient, and deeply helpful — always focused on building a better future for students and society. His life and values continue to shape the spirit of Nagaral Education Society®.",
    ],
  },
  about: [
    "Welcome to Nagaral Education Society® — founded in 2024 in Dharwad and inspired by H. S. Nagaral. We help students build strong foundations through focused PU Science, integrated competitive coaching, and financial support.",
    "In our first academic pass-out year, the 2025–2026 batch achieved 100% results in PU-II — every student passed. This reflects dedicated teaching, limited batch strength, and close mentoring.",
    "Merit-based scholarships, need-based grants, and work-study programmes help deserving students access quality education. SSLC vacation classes are also offered to strengthen foundations before PUC.",
  ],
  faculty: {
    title: "Experienced faculty",
    text: "Seasoned educators for board and entrance preparation — combining subject depth with classroom experience.",
    points: [
      "Teachers with IIT / NIT backgrounds",
      "PhD holders with strong subject expertise",
      "Specialists for NEET · JEE · CET · NDA pathways",
      "Personal attention in limited-strength batches",
    ],
  },
  guidanceTeam: {
    title: "Society guidance team",
    text: "A professional circle that shapes academic vision and career direction beyond the classroom.",
    points: [
      "Doctors and healthcare professionals",
      "Engineers from diverse fields",
      "IAS and KAS officers",
      "Career mentoring support",
    ],
  },
  hostel: {
    title: "Separate hostels & hygienic food",
    text: "A disciplined residential setup so students can focus on studies — with day-scholar options too.",
    points: [
      "Separate boys’ and girls’ hostels",
      "Hygienic, nutritious meals daily",
      "Supervised campus living",
      "Day-scholar food option where available",
      "Ask admissions for seat availability",
    ],
  },
  eveningMentoring: {
    title: "Evening doubt-clearing with teachers",
    text: "Learning continues after class — teachers stay with students in study rooms until doubts are cleared.",
    points: [
      "Daily evening study-room visits",
      "Subject-wise rotation (PCM · Bio / CS)",
      "One-to-one and small-group help",
      "Board and entrance concepts reinforced",
    ],
  },
  sslcVacation: {
    title: "SSLC vacation classes",
    summary:
      "Bridge the gap between SSLC and PUC Science with focused vacation coaching.",
    detail:
      "Class 10 students revise foundations, build PU-ready habits, and start Science with confidence before PUC I.",
    points: [
      "SSLC Science & Maths revision",
      "PUC readiness and study discipline",
      "Limited batches · experienced faculty",
      "Guidance on PCMB / PCMCS choices",
      "Ask the office for batch timings",
    ],
  },
  milestone: {
    title: "100% II PU board results",
    batch: "2025–2026",
    detail:
      "First pass-out year under NES collaboration — every II PU student cleared the board examinations across our affiliated colleges.",
  },
};

export const coachingPrograms = [
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    summary:
      "Integrated medical entrance coaching alongside PUC Science — focused modules, expert faculty, and regular practice for MBBS aspirations.",
  },
  {
    id: "cet",
    name: "K-CET",
    fullName: "Karnataka Common Entrance Test",
    summary:
      "State entrance preparation for engineering, medical, and allied courses — aligned with Karnataka syllabus and exam patterns.",
  },
  {
    id: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination",
    summary:
      "Dedicated JEE coaching with experienced mentors — concept clarity, problem-solving drills, and rank-oriented guidance.",
  },
  {
    id: "nda",
    name: "NDA",
    fullName: "National Defence Academy",
    summary:
      "Specialised NDA training covering academics and exam strategy for students aiming at a career in the defence forces.",
  },
];

export const courses = [
  {
    id: "puc1",
    name: "PUC I — Science",
    detail:
      "First-year PU Science with strong foundations, limited batch strength, and lab-based learning.",
    branches: [
      {
        code: "PCMB",
        subjects: "Physics · Chemistry · Mathematics · Biology",
      },
      {
        code: "PCMCS",
        subjects: "Physics · Chemistry · Mathematics · Computer Science",
      },
    ],
  },
  {
    id: "puc2",
    name: "PUC II — Science",
    detail:
      "Board-focused second-year PU Science with integrated NEET / JEE / K-CET / NDA coaching support.",
    branches: [
      {
        code: "PCMB",
        subjects: "Physics · Chemistry · Mathematics · Biology",
      },
      {
        code: "PCMCS",
        subjects: "Physics · Chemistry · Mathematics · Computer Science",
      },
    ],
  },
  {
    id: "sslc-vacation",
    name: "SSLC vacation classes",
    detail:
      "Focused vacation coaching for Class 10 students — revise SSLC foundations, build PU-ready habits, and start Science with confidence before PUC I.",
    points: [
      "SSLC Science & Maths concept revision",
      "PUC Science readiness & study discipline",
      "Experienced faculty · limited batches",
      "Guidance on PCMB / PCMCS combinations",
    ],
  },
];

export const scholarships = [
  {
    title: "Merit-based scholarships",
    text: "Fee support for high-performing students based on board / entrance performance — so merit is never limited by fees alone.",
  },
  {
    title: "Need-based grants",
    text: "Assistance for deserving families who need help to continue quality PU Science education without interruption.",
  },
  {
    title: "Work-study programmes",
    text: "Selected students can contribute on campus while they study — building responsibility and reducing fee burden.",
  },
  {
    title: "How to apply",
    text: "Share mark sheets and family details at admission. Call or WhatsApp 9019939321 — the office guides you through available support.",
  },
];

export const facilities = [
  "Modern science laboratories — Physics, Chemistry, Biology & Computer Science",
  "Focused classrooms with limited student strength",
  "Tennis · cricket · football grounds",
  "Library and quiet study spaces",
  "Career guidance with Vision Career Studio (Bengaluru)",
  "SSLC vacation classes for Class 10 foundation",
];

export const successStories: {
  id: string;
  name: string;
  result: string;
  outcome: string;
  note: string;
  photo?: string;
}[] = [
  {
    id: "sachin",
    name: "Sachin S. Budhihal",
    result: "NEET 446",
    outcome: "Mandya Institute of Medical Science",
    note: "Medical pathway through focused NEET preparation.",
    photo: "/images/achievers/sachin-budhihal.png",
  },
  {
    id: "ameer",
    name: "Ameer Araligida",
    result: "JEE — 2nd Rank",
    outcome: "Merchant Navy Officer",
    note: "Dreams do come true with dedicated coaching and guidance.",
    photo: "/images/achievers/ameer-araligida.png",
  },
];

export const faqs = [
  {
    q: "Where is Nagaral Education Society based?",
    a: "We operate from Dharwad, Karnataka. NTSS PU College is at D N Koppa, Sarovar Nagar, Near Kelageri, Dharwad. We also collaborate with NES PU Science College, Alnavar.",
  },
  {
    q: "Which courses do you offer?",
    a: "PUC I Science and PUC II Science. Within Science, students choose a combination (branch): PCMB or PCMCS. Integrated coaching for NEET, K-CET, JEE, and NDA is also available, along with SSLC vacation classes.",
  },
  {
    q: "Do you conduct SSLC vacation classes?",
    a: "Yes. Nagaral Education Society® runs structured SSLC vacation classes for Class 10 students — revising Science and Mathematics foundations, building PU-ready study habits, and guiding them toward PUC Science (PCMB / PCMCS). Enquire via WhatsApp or the admission office for current batch timings.",
  },
  {
    q: "Who teaches at Nagaral Education Society?",
    a: "Our faculties are experienced educators. The team includes teachers with IIT and NIT degrees and PhD holders with strong subject and classroom experience, alongside specialists for NEET, JEE, CET, and NDA pathways.",
  },
  {
    q: "Who guides the society’s academic vision?",
    a: "Our society guidance team includes doctors, engineers, and other professionals, as well as IAS and KAS officers who advise on academics, careers, and student development.",
  },
  {
    q: "Is hostel and food available?",
    a: "Yes — separate boys’ and girls’ hostels with hygienic nutritious meals. Day-scholar options are available too. Ask admissions for current seats.",
  },
  {
    q: "Do teachers help after class hours?",
    a: "Yes. Teachers visit study rooms every evening on a subject-wise rotation and clear doubts with students.",
  },
  {
    q: "What sports facilities are available?",
    a: "Tennis, cricket, and football grounds — balancing academics with fitness.",
  },
  {
    q: "Do you provide scholarships?",
    a: "Yes — merit-based scholarships, need-based grants, and work-study programmes to keep quality education affordable.",
  },
  {
    q: "What are the office / admission timings?",
    a: "Monday to Saturday, 9:00 AM – 5:30 PM. Sundays by appointment for admissions. Call or WhatsApp for a campus visit.",
  },
  {
    q: "Do I need to log in to see results or notes?",
    a: "Public website content needs no login. Temporary notes and announcements for students/staff are shared through the college Portal login.",
  },
  {
    q: "What are your board results?",
    a: "In our first academic pass-out year, the 2025–2026 batch achieved 100% results in PU-II — every student passed the board examinations.",
  },
  {
    q: "What are the college codes?",
    a: "NTSS PU College, Dharwad — JJ0346. NES PU Science College, Alnavar — MM0013.",
  },
];

export const colleges: College[] = [
  {
    id: "ntss-dharwad",
    shortName: "NTSS Dharwad",
    name: "NTSS PU College, Dharwad",
    location: "Dharwad, Karnataka",
    address: "D N Koppa, Sarovar Nagar, Near Kelageri, Dharwad – 580007",
    collegeCode: "JJ0346",
    collaboratedSince: "2024",
    slug: "/colleges/ntss-dharwad",
    image: "/images/ntss-campus.png",
    mapUrl: "https://share.google/bJwhZHkuqQVTouDdY",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=NTSS+PU+College+Sarovar+Nagar+Kelageri+Dharwad&output=embed",
    description: [
      "NTSS PU College, Dharwad is a long-standing PU college. Nagaral Education Society®️ has collaborated with NTSS since 2024 to strengthen academic foundations and affordable education — with focused learning, limited student strength, experienced faculty, and modern facilities for PU Science.",
      "Nagaral Education Society supports students through merit-based scholarships, need-based grants, and work-study programs. Integrated coaching for NEET, JEE, K-CET, and NDA is offered by expert faculties. In the first academic pass-out year under this collaboration, the 2025–2026 batch achieved 100% results in PU-II.",
      "NTSS PU College Dharwad aims to guide students toward academic success and competitive exam preparation with dedicated teaching, career counselling by Vision Career Studio, and proper study support.",
    ],
    focus: [
      "100% II PU board results — 2025–2026",
      "NES collaboration since 2024",
      "PUC I & II Science · PCMB / PCMCS",
      "NEET | JEE | K-CET | NDA coaching",
      "Labs · sports grounds · hostels",
      "Evening doubt clearing in study rooms",
      "Experienced faculty — IIT / NIT / PhD",
    ],
  },
  {
    id: "nes-alnavar",
    shortName: "NES Alnavar",
    name: "NES PU Science College, Alnavar",
    location: "Alnavar, Dharwad, Karnataka",
    address: "Vidyanagar, Alnavar, Dharwad, Karnataka",
    collegeCode: "MM0013",
    collaboratedSince: "2024",
    slug: "/colleges/nes-alnavar",
    image: "/images/nes-alnavar-campus.png",
    mapUrl: "https://share.google/WGcHM63N1zR0xE31Z",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=NES+PU+Science+College+Alnavar+Dharwad&output=embed",
    description: [
      "NES PU Science College, Alnavar is an established PU Science college (college code MM0013) at Vidyanagar, Alnavar. Nagaral Education Society®️ has collaborated with the college since 2024 to provide strong academic foundations and affordable education — with focused learning, limited student strength, experienced faculty from reputed universities, and modern laboratories. The college achieved 100% results in II PU Board Exams 2025–26.",
      "Nagaral Education Society supports students through merit-based scholarships, need-based grants, and work-study programs to ensure that deserving students get access to quality education.",
      "NES PU Science College Alnavar aims to guide students toward academic success and competitive exam preparation with dedicated teaching and proper study support.",
    ],
    focus: [
      "100% II PU board results — 2025–2026",
      "NES collaboration since 2024 · code MM0013",
      "Focused PU Science · modern laboratories",
      "Evening doubt clearing in study rooms",
      "Hostels · hygienic food · sports grounds",
      "Scholarships · experienced faculty",
    ],
  },
];

/** Batch-level milestones only — individual students live under success stories / toppers */
export const achievements: Achievement[] = [
  {
    id: "pu2-100-ntss",
    year: "2025–2026",
    studentName: "100% II PU board results",
    highlight:
      "Every II PU student cleared the board examinations — first pass-out year under NES collaboration.",
    collegeId: "ntss-dharwad",
  },
  {
    id: "pu2-100-nes",
    year: "2025–2026",
    studentName: "100% II PU board results",
    highlight:
      "Every II PU student cleared the board examinations — first pass-out year under NES collaboration.",
    collegeId: "nes-alnavar",
  },
];

/** II PU Board toppers — NES PU College, Alnavar (2025–26) */
export const boardToppers2025 = [
  {
    id: "t1",
    rank: "1st Rank",
    name: "Shivaraj Torgal",
    score: "90.17%",
    photo: "/images/achievers/shivaraj-torgal.png",
    collegeId: "nes-alnavar" as const,
  },
  {
    id: "t2",
    rank: "2nd Rank",
    name: "Sakshi Jadhav",
    score: "89.67%",
    photo: "/images/achievers/sakshi-jadhav.png",
    collegeId: "nes-alnavar" as const,
  },
  {
    id: "t3",
    rank: "3rd Rank",
    name: "Shaziya Shek",
    score: "88.50%",
    photo: "/images/achievers/shaziya-shek.png",
    collegeId: "nes-alnavar" as const,
  },
];

export const galleryItems = [
  {
    id: "g1",
    src: "/images/ntss-campus.png",
    alt: "NTSS PU College campus, Dharwad",
    caption: "Campus — NTSS Dharwad",
  },
  {
    id: "g2",
    src: "/images/nes-alnavar-campus.png",
    alt: "NES PU Science College campus, Alnavar",
    caption: "Campus life — NES Alnavar",
  },
];

export type CareerRole = {
  id: string;
  title: string;
  category: "lecturer" | "lab-assistant";
  subject: string;
  salary: string;
  jd: string[];
};

const lecturerRoles: Omit<CareerRole, "id">[] = [
  {
    title: "Lecturer — Mathematics",
    category: "lecturer",
    subject: "Mathematics",
    salary: "Attractive salary",
    jd: [
      "Teach PUC Mathematics with clarity and exam-oriented practice.",
      "Support integrated CET / JEE problem-solving sessions as needed.",
      "Prepare lesson plans, assessments, and doubt-clearing schedules.",
      "Mentor limited batch strength for individual attention.",
    ],
  },
  {
    title: "Lecturer — Physics",
    category: "lecturer",
    subject: "Physics",
    salary: "Attractive salary",
    jd: [
      "Deliver PUC Physics theory and numericals with strong conceptual focus.",
      "Align classroom teaching with NEET / JEE / CET requirements.",
      "Coordinate with lab staff for practical readiness.",
      "Track student progress and support weak learners.",
    ],
  },
  {
    title: "Lecturer — Chemistry",
    category: "lecturer",
    subject: "Chemistry",
    salary: "Attractive salary",
    jd: [
      "Teach Organic, Inorganic, and Physical Chemistry for PUC.",
      "Integrate competitive-exam practice for NEET / JEE / CET.",
      "Ensure safe, effective lab linkage with theory classes.",
      "Contribute to study materials and periodic tests.",
    ],
  },
  {
    title: "Lecturer — Biology",
    category: "lecturer",
    subject: "Biology",
    salary: "Attractive salary",
    jd: [
      "Teach Botany and Zoology for PUC Science batches.",
      "Guide NEET aspirants with diagram practice and MCQ drills.",
      "Work with Biology lab assistants for practical sessions.",
      "Encourage scientific thinking and academic discipline.",
    ],
  },
];

const labAssistantRoles: Omit<CareerRole, "id">[] = [
  {
    title: "Lab Assistant — Physics",
    category: "lab-assistant",
    subject: "Physics",
    salary: "Attractive salary",
    jd: [
      "Prepare and maintain Physics lab apparatus and experiment setups.",
      "Assist lecturers during practical classes and demonstrations.",
      "Ensure safety, inventory, and cleanliness of the lab.",
      "Support students during experiments and record work.",
    ],
  },
  {
    title: "Lab Assistant — Chemistry",
    category: "lab-assistant",
    subject: "Chemistry",
    salary: "Attractive salary",
    jd: [
      "Handle chemicals, glassware, and reagents safely and responsibly.",
      "Set up Chemistry practicals as per PUC syllabus.",
      "Maintain stock registers and lab hygiene standards.",
      "Assist faculty and students during practical sessions.",
    ],
  },
  {
    title: "Lab Assistant — Biology",
    category: "lab-assistant",
    subject: "Biology",
    salary: "Attractive salary",
    jd: [
      "Prepare slides, specimens, and Biology lab materials.",
      "Support Botany / Zoology practical classes.",
      "Maintain lab equipment, charts, and models.",
      "Uphold safety and orderly lab operations.",
    ],
  },
];

function rolesForCollege(collegeId: College["id"]): CareerRole[] {
  const prefix = collegeId;
  return [...lecturerRoles, ...labAssistantRoles].map((role) => ({
    ...role,
    id: `${prefix}-${role.category}-${role.subject.toLowerCase()}`,
  }));
}

export const careersByCollege = colleges.map((college) => ({
  college,
  roles: rolesForCollege(college.id),
}));

export function getCollege(slugPart: string) {
  return colleges.find((c) => c.slug.endsWith(slugPart));
}

export function achievementsByYear(list: Achievement[] = achievements) {
  const map = new Map<string, Achievement[]>();
  for (const item of list) {
    const arr = map.get(item.year) ?? [];
    arr.push(item);
    map.set(item.year, arr);
  }
  return [...map.entries()].sort((a, b) => {
    const na = Number(String(a[0]).slice(0, 4));
    const nb = Number(String(b[0]).slice(0, 4));
    return nb - na;
  });
}

export function collegeName(id: Achievement["collegeId"]) {
  return colleges.find((c) => c.id === id)?.shortName ?? id;
}

/**
 * Register PDFs here after placing files in public/results/{college-id}/
 */
export const resultFiles: ResultFile[] = [];

export function resultsByYear(list: ResultFile[] = resultFiles) {
  const map = new Map<string, ResultFile[]>();
  for (const item of list) {
    const arr = map.get(item.year) ?? [];
    arr.push(item);
    map.set(item.year, arr);
  }
  return [...map.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}

export function resultsForCollege(collegeId: College["id"]) {
  return resultFiles.filter((r) => r.collegeId === collegeId);
}

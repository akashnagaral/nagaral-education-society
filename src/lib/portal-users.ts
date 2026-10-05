export type CollegeId = "ntss" | "nes";
export type UserRole = "ceo" | "admin" | "teacher" | "student";
export type ClassLevel = "pu1" | "pu2";
export type Audience =
  | "all"
  | "pu1"
  | "pu2"
  | "teachers"
  | "admins";
export type DocType = "result" | "notes" | "announcement" | "other";

export type PortalUser = {
  username: string;
  password: string;
  displayName: string;
  role: UserRole;
  college?: CollegeId;
  classLevel?: ClassLevel;
};

export type SessionUser = {
  username: string;
  displayName: string;
  role: UserRole;
  college?: CollegeId;
  classLevel?: ClassLevel;
};

export type PortalDocument = {
  id: string;
  title: string;
  description: string;
  docType: DocType;
  college: CollegeId;
  audience: Audience[];
  fileName: string;
  filePath: string;
  fileUrl: string;
  uploadedBy: string;
  createdAt: string;
  expiresAt: string;
};

/**
 * College portal logins — keep this list private; share only with the right people.
 * Change any password here anytime, then redeploy / restart the server.
 */
export const PORTAL_USERS: PortalUser[] = [
  {
    username: "owner@nes.com",
    password: "Nes#Founder9k",
    displayName: "CEO / Owner",
    role: "ceo",
  },
  {
    username: "admin.ntss@nes.com",
    password: "Dharwad#Vault38",
    displayName: "NTSS Admin",
    role: "admin",
    college: "ntss",
  },
  {
    username: "admin.alnavar@nes.com",
    password: "Alnavar$Gate91",
    displayName: "NES Admin",
    role: "admin",
    college: "nes",
  },
  {
    username: "faculty.ntss@nes.com",
    password: "Hubli@Staff64",
    displayName: "NTSS Teacher",
    role: "teacher",
    college: "ntss",
  },
  {
    username: "faculty.alnavar@nes.com",
    password: "Campus!Note27",
    displayName: "NES Teacher",
    role: "teacher",
    college: "nes",
  },
  {
    username: "pu1.ntss@nes.com",
    password: "DwdPu1$Focus",
    displayName: "NTSS PU-I Students",
    role: "student",
    college: "ntss",
    classLevel: "pu1",
  },
  {
    username: "pu2.ntss@nes.com",
    password: "DwdPu2$Focus",
    displayName: "NTSS PU-II Students",
    role: "student",
    college: "ntss",
    classLevel: "pu2",
  },
  {
    username: "pu1.alnavar@nes.com",
    password: "AlnPu1#Rise",
    displayName: "NES PU-I Students",
    role: "student",
    college: "nes",
    classLevel: "pu1",
  },
  {
    username: "pu2.alnavar@nes.com",
    password: "AlnPu2#Rise",
    displayName: "NES PU-II Students",
    role: "student",
    college: "nes",
    classLevel: "pu2",
  },
];

export const CEO_REDIRECT_URL =
  "https://script.google.com/macros/s/AKfycbx7iL-vaCTTP512qoJlPQDlX6kJiK47dJSbfO0Uq0ihj94ErWxzc3Nrhq8dBOw09Vkq/exec";

export const AUDIENCE_OPTIONS: { id: Audience; label: string }[] = [
  { id: "all", label: "Everyone at this college" },
  { id: "pu1", label: "PU-I students" },
  { id: "pu2", label: "PU-II students" },
  { id: "teachers", label: "Teachers" },
  { id: "admins", label: "Admins" },
];

export const DOC_TYPE_OPTIONS: { id: DocType; label: string }[] = [
  { id: "announcement", label: "Announcement" },
  { id: "notes", label: "Notes / study material" },
  { id: "result", label: "Result" },
  { id: "other", label: "Other document" },
];

export function findUser(username: string, password: string) {
  return PORTAL_USERS.find(
    (u) => u.username === username.trim().toLowerCase() && u.password === password,
  );
}

export function toSessionUser(user: PortalUser): SessionUser {
  return {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    college: user.college,
    classLevel: user.classLevel,
  };
}

export function collegeLabel(id?: CollegeId) {
  if (id === "ntss") return "NTSS Dharwad";
  if (id === "nes") return "NES Alnavar";
  return "All";
}

/** Can this user see a document? */
export function canViewDocument(user: SessionUser, doc: PortalDocument) {
  if (user.role === "ceo") return true;
  if (!user.college || user.college !== doc.college) return false;

  // Staff manage/view all documents for their college
  if (user.role === "admin" || user.role === "teacher") return true;

  if (doc.audience.includes("all")) return true;

  if (user.role === "student" && user.classLevel) {
    return doc.audience.includes(user.classLevel);
  }

  return false;
}

export function canUpload(user: SessionUser) {
  return user.role === "admin" || user.role === "teacher";
}

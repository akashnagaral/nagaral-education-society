# Portal + Supabase setup

## Auto-delete (free storage)

Uploaded documents are kept for **7 days**, then removed automatically
(file + database row) whenever someone opens the portal or uploads.

Also, if more than **40** live files exist, the **oldest** are deleted first
so free Supabase storage stays available. No paid plan required for this.

## Upload size limit

Maximum **5 MB** per file (enforced in the portal UI and API).

## College logins (private — do not post publicly)

| Username | Password | Access |
|----------|----------|--------|
| owner@nes.com | Nes#Founder9k | Owner → Apps Script accounts |
| admin.ntss@nes.com | Dharwad#Vault38 | NTSS admin |
| admin.alnavar@nes.com | Alnavar$Gate91 | NES Alnavar admin |
| faculty.ntss@nes.com | Hubli@Staff64 | NTSS teachers |
| faculty.alnavar@nes.com | Campus!Note27 | NES Alnavar teachers |
| pu1.ntss@nes.com | DwdPu1$Focus | NTSS PU-I view |
| pu2.ntss@nes.com | DwdPu2$Focus | NTSS PU-II view |
| pu1.alnavar@nes.com | AlnPu1#Rise | NES PU-I view |
| pu2.alnavar@nes.com | AlnPu2#Rise | NES PU-II view |

Share student passwords only with the relevant class. Change any password in `src/lib/portal-users.ts` and restart/redeploy when needed.

## Connect Supabase now (free)

1. Go to https://supabase.com → **Start your project** (free) → create org/project (region close to India, e.g. Singapore).
2. Wait until the project is ready.
3. Left menu → **SQL Editor** → New query → paste all of `supabase/schema.sql` → **Run**.
4. Left menu → **Storage** → confirm bucket **`portal-docs`** exists and is **Public**.
   - If missing: New bucket → name `portal-docs` → Public → Create.
5. Left menu → **Project Settings** → **API**:
   - Copy **Project URL**
   - Copy **anon public** key
   - Copy **service_role** key (keep secret)
6. In the project root `d:\Akash\projects\nes`, create `.env.local`:

```env
PORTAL_SESSION_SECRET=any-long-random-string-here
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

7. Restart the app: stop old server, then `npm run dev`.
8. Open http://localhost:3000/login → `admin.ntss@nes.com` / `Dharwad#Vault38` → Upload a PDF.

Without `.env.local`, uploads still work locally in `.data/` (not for Vercel production).

## Important

- Permanent board results you want forever should stay on the **public website**, not only in the 7-day portal.
- Portal uploads = temporary notes / announcements / short-lived results.
- Do not publish this login table on social media or the public website.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AUDIENCE_OPTIONS,
  DOC_TYPE_OPTIONS,
  canUpload,
  collegeLabel,
  type Audience,
  type DocType,
  type PortalDocument,
  type SessionUser,
} from "@/lib/portal-users";
import { formatMaxUpload, MAX_UPLOAD_BYTES } from "@/lib/portal-limits";

type Tab = "feed" | "upload";

export function PortalClient() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [docs, setDocs] = useState<PortalDocument[]>([]);
  const [tab, setTab] = useState<Tab>("feed");
  const [filter, setFilter] = useState<"all" | DocType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState<DocType>("announcement");
  const [audience, setAudience] = useState<Audience[]>(["pu1"]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const me = await fetch("/api/portal/me");
      if (!me.ok) {
        router.replace("/login");
        return;
      }
      const meData = (await me.json()) as { user: SessionUser };
      if (meData.user.role === "ceo") {
        window.open(
          "https://script.google.com/macros/s/AKfycbx7iL-vaCTTP512qoJlPQDlX6kJiK47dJSbfO0Uq0ihj94ErWxzc3Nrhq8dBOw09Vkq/exec",
          "_blank",
          "noopener,noreferrer",
        );
        router.replace("/");
        return;
      }
      setUser(meData.user);

      const docsRes = await fetch("/api/portal/documents");
      const docsData = (await docsRes.json()) as {
        documents?: PortalDocument[];
        error?: string;
      };
      if (!docsRes.ok) {
        setError(docsData.error || "Could not load documents");
      } else {
        setDocs(docsData.documents ?? []);
      }
    } catch {
      setError(
        "Could not reach the portal server. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "all") return docs;
    return docs.filter((d) => d.docType === filter);
  }, [docs, filter]);

  function toggleAudience(id: Audience) {
    setAudience((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`File is too large. Maximum size is ${formatMaxUpload()}.`);
      return;
    }
    setUploading(true);
    setMessage("");
    setError("");
    const form = new FormData();
    form.set("title", title);
    form.set("description", description);
    form.set("docType", docType);
    form.set("audience", JSON.stringify(audience));
    form.set("file", file);
    const res = await fetch("/api/portal/documents", { method: "POST", body: form });
    const data = (await res.json()) as { error?: string };
    setUploading(false);
    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }
    setTitle("");
    setDescription("");
    setFile(null);
    setAudience(["pu1"]);
    setMessage("Uploaded successfully.");
    setTab("feed");
    await load();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this document?")) return;
    const res = await fetch(`/api/portal/documents?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Delete failed");
      return;
    }
    await load();
  }

  if (loading || !user) {
    return (
      <div className="section-pad py-20 text-center text-muted">Loading portal…</div>
    );
  }

  const staff = canUpload(user);

  return (
    <div className="section-pad section-y">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Portal</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-cream">
              {user.displayName}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {collegeLabel(user.college)}
              {user.classLevel ? ` · ${user.classLevel.toUpperCase()}` : ""}
              {` · ${user.role}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="border border-line px-3 py-2 text-sm text-cream hover:border-gold"
            >
              Website
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="bg-gold px-3 py-2 text-sm font-semibold text-ink hover:bg-gold-bright"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-px">
          <button
            type="button"
            onClick={() => setTab("feed")}
            className={`px-4 py-2.5 text-sm ${
              tab === "feed" ? "border-b-2 border-gold text-gold" : "text-cream/70"
            }`}
          >
            Documents & announcements
          </button>
          {staff ? (
            <button
              type="button"
              onClick={() => setTab("upload")}
              className={`px-4 py-2.5 text-sm ${
                tab === "upload" ? "border-b-2 border-gold text-gold" : "text-cream/70"
              }`}
            >
              Upload
            </button>
          ) : null}
        </div>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}

        {tab === "feed" ? (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {(["all", "announcement", "notes", "result", "other"] as const).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`border px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${
                      filter === key
                        ? "border-gold text-gold"
                        : "border-line text-muted hover:text-cream"
                    }`}
                  >
                    {key}
                  </button>
                ),
              )}
            </div>

            <ul className="mt-6 space-y-3">
              {filtered.length === 0 ? (
                <li className="border border-line px-5 py-8 text-sm text-muted">
                  No documents for your account yet.
                </li>
              ) : (
                filtered.map((doc) => (
                  <li
                    key={doc.id}
                    className="border border-line bg-ink-soft/40 px-5 py-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-gold">
                          {doc.docType} · {doc.audience.join(", ")}
                        </p>
                        <h2 className="mt-1 text-lg text-cream">{doc.title}</h2>
                        {doc.description ? (
                          <p className="mt-2 text-sm text-cream/75">{doc.description}</p>
                        ) : null}
                        <p className="mt-2 text-xs text-muted">
                          {doc.fileName} · by {doc.uploadedBy} ·{" "}
                          {new Date(doc.createdAt).toLocaleString()}
                          {doc.expiresAt
                            ? ` · auto-deletes ${new Date(doc.expiresAt).toLocaleDateString()}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-line px-3 py-2 text-sm text-gold hover:border-gold"
                        >
                          Open
                        </a>
                        {staff ? (
                          <button
                            type="button"
                            onClick={() => void onDelete(doc.id)}
                            className="border border-line px-3 py-2 text-sm text-cream/70 hover:border-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <form onSubmit={onUpload} className="mt-8 max-w-xl space-y-4">
            <p className="text-sm text-muted">
              Upload for {collegeLabel(user.college)}. Choose who should see it
              when they log in.
            </p>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-muted">
                Title / what this document is
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full border border-line bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-muted">
                Short description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-line bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-muted">
                Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocType)}
                className="mt-1 w-full border border-line bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-gold"
              >
                {DOC_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="text-xs uppercase tracking-[0.14em] text-muted">
                Target audience (multiple allowed)
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {AUDIENCE_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 border border-line px-3 py-2 text-sm text-cream/85"
                  >
                    <input
                      type="checkbox"
                      checked={audience.includes(opt.id)}
                      onChange={() => toggleAudience(opt.id)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-muted">
                File (PDF / image / doc · max {formatMaxUpload()})
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm text-cream"
                required
              />
              <p className="mt-2 text-xs text-muted">
                Keep files under {formatMaxUpload()} so free storage lasts.
                Files auto-delete after 7 days; oldest files are cleared first if
                storage fills up.
              </p>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-bright disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Upload document"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

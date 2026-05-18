"use client";

import { useMemo, useState } from "react";

type CopilotTask = "parent_email" | "intervention_plan" | "meeting_agenda" | "note_structuring";

type CopilotPanelProps = {
  studentName?: string;
  studentId?: string;
  schoolId: string;
  userId: string;
};

const taskButtons: Array<{ task: CopilotTask; label: string }> = [
  { task: "parent_email", label: "Draft parent email" },
  { task: "intervention_plan", label: "Generate intervention plan" },
  { task: "meeting_agenda", label: "Create meeting agenda" },
  { task: "note_structuring", label: "Structure counselor notes" },
];

export function CopilotPanel({ studentName, studentId, schoolId, userId }: CopilotPanelProps) {
  const [context, setContext] = useState(
    studentName
      ? `Student: ${studentName}\nGoal: Build a counselor-ready draft based on current student context.`
      : "Create a counselor support draft using school-safe language.",
  );
  const [loadingTask, setLoadingTask] = useState<CopilotTask | null>(null);
  const [lastTask, setLastTask] = useState<CopilotTask | null>(null);
  const [reviewLoading, setReviewLoading] = useState<"approve" | "reject" | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const heading = useMemo(() => {
    if (studentName) {
      return `Generate support drafts for ${studentName}.`;
    }

    return "Generate notes, parent messages, and intervention drafts.";
  }, [studentName]);

  async function handleGenerate(task: CopilotTask) {
    setLoadingTask(task);
    setError("");
    setReviewStatus("");

    try {
      const response = await fetch("/api/copilot/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          context,
          schoolId,
          userId,
          studentId,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.message ?? "Failed to generate draft.");
        return;
      }

      setDraft(payload.draft ?? "");
      setLastTask(task);
    } catch {
      setError("Unable to generate draft right now.");
    } finally {
      setLoadingTask(null);
    }
  }

  async function handleReview(decision: "approve" | "reject") {
    if (!draft || !lastTask) {
      return;
    }

    setReviewLoading(decision);
    setError("");
    setReviewStatus("");

    try {
      const response = await fetch("/api/copilot/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolId,
          userId,
          studentId,
          task: lastTask,
          decision,
          draft,
          reviewNotes,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.message ?? "Failed to persist review decision.");
        return;
      }

      setReviewStatus(payload?.message ?? "Review decision saved.");
    } catch {
      setError("Unable to persist review decision right now.");
    } finally {
      setReviewLoading(null);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 shadow-sm backdrop-blur">
      <div className="pointer-events-none absolute -right-10 -top-8 h-24 w-24 rounded-full bg-indigo-300/50 blur-2xl" />
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-800">AI Counselor Copilot</h3>
        <span className="rounded-full border border-indigo-300 bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700">Draft only</span>
      </div>
      <p className="mb-3 text-sm text-slate-700">{heading}</p>

      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600" htmlFor="copilot-context">
        Context
      </label>
      <textarea
        id="copilot-context"
        value={context}
        onChange={(event) => setContext(event.target.value)}
        className="mb-3 min-h-[110px] w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      <div className="grid gap-2">
        {taskButtons.map((item) => (
          <button
            key={item.task}
            type="button"
            disabled={loadingTask !== null}
            onClick={() => handleGenerate(item.task)}
            className="rounded-lg border border-slate-300 bg-gradient-to-r from-white to-slate-50 px-3 py-2 text-left text-sm font-medium transition duration-200 hover:border-indigo-400/60 hover:from-indigo-50 hover:to-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingTask === item.task ? "Generating..." : item.label}
          </button>
        ))}
      </div>

      {error ? <p className="mt-3 text-xs text-red-700">{error}</p> : null}

      {draft ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Generated Draft</p>
          <pre className="whitespace-pre-wrap text-sm text-slate-700">{draft}</pre>

          <label
            className="mb-2 mt-3 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600"
            htmlFor="copilot-review-notes"
          >
            Review Notes (Optional)
          </label>
          <textarea
            id="copilot-review-notes"
            value={reviewNotes}
            onChange={(event) => setReviewNotes(event.target.value)}
            className="min-h-[72px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={reviewLoading !== null}
              onClick={() => handleReview("approve")}
              className="rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {reviewLoading === "approve" ? "Saving..." : "✓ Approve"}
            </button>
            <button
              type="button"
              disabled={reviewLoading !== null}
              onClick={() => handleReview("reject")}
              className="rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 px-3 py-2 text-sm font-bold text-white transition hover:from-slate-800 hover:to-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {reviewLoading === "reject" ? "Saving..." : "✕ Reject"}
            </button>
          </div>

          {reviewStatus ? <p className="mt-2 text-xs text-emerald-700">{reviewStatus}</p> : null}
        </div>
      ) : null}

      <p className="mt-3 text-xs text-slate-500">
        Human approval is required before saving or sending any AI output.
      </p>
    </section>
  );
}

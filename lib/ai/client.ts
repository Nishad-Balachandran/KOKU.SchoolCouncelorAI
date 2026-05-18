import OpenAI from "openai";

const provider = process.env.LLM_PROVIDER ?? "openai";
const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL,
  });
}

export async function generateDraft(params: {
  task: "parent_email" | "intervention_plan" | "meeting_agenda" | "note_structuring";
  context: string;
}) {
  const client = getClient();

  if (!client) {
    return {
      provider,
      model: "demo-fallback",
      text: buildDemoDraft(params.task, params.context),
    };
  }

  const safetyPrefix =
    "You are an assistant for school counselors. Never provide diagnosis. Never claim autonomous decisions. Return concise draft text only.";

  const prompt = `${safetyPrefix}\n\nTask: ${params.task}\n\nContext:\n${params.context}`;

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    messages: [
      { role: "system", content: "You produce professional school-safe drafts." },
      { role: "user", content: prompt },
    ],
  });

  return {
    provider,
    model,
    text: completion.choices[0]?.message?.content?.trim() ?? "",
  };
}

function buildDemoDraft(
  task: "parent_email" | "intervention_plan" | "meeting_agenda" | "note_structuring",
  context: string,
) {
  const trimmed = context.slice(0, 220);

  if (task === "parent_email") {
    return `Subject: Student Support Update\n\nHello Family,\n\nI wanted to share a brief update and invite you to a support check-in. Based on recent school data, I recommend we meet this week to align on next steps.\n\nContext summary: ${trimmed}\n\nBest,\nCounseling Team`;
  }

  if (task === "intervention_plan") {
    return `Draft Intervention Plan\n1. Define measurable weekly goal.\n2. Schedule counselor check-in twice per week.\n3. Assign classroom support action.\n4. Family communication checkpoint.\n5. Review progress in 14 days.\n\nContext summary: ${trimmed}`;
  }

  if (task === "meeting_agenda") {
    return `Meeting Agenda Draft\n- Review current attendance/academic snapshot\n- Discuss student strengths and barriers\n- Confirm intervention actions and owners\n- Set follow-up date and accountability\n\nContext summary: ${trimmed}`;
  }

  return `Structured Case Note Draft\n- Presenting concern\n- Key observations\n- Actions taken\n- Follow-up tasks\n\nContext summary: ${trimmed}`;
}

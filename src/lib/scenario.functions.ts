import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  answersSummary,
  buildLocalScenario,
  type Answers,
  type Scenario,
} from "@/lib/questionnaire";
import type { Lang } from "@/lib/i18n";

const InputSchema = z.object({
  answers: z.record(z.string(), z.array(z.string())),
  lang: z.enum(["fr", "en", "ar"]),
});

const AiSchema = z.object({
  summary: z.string(),
  recommendation: z.string(),
  recommendations: z.array(z.string()).min(2).max(5),
  levels: z
    .array(
      z.object({
        title: z.string(),
        mission: z.string(),
        objective: z.string(),
        reward: z.string(),
      }),
    )
    .min(1),
});

export const analyzeAnswers = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<Scenario> => {
    const answers = data.answers as Answers;
    const lang = data.lang as Lang;
    const local = buildLocalScenario(answers, lang);

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return local;

    try {
      const { generateText, Output } = await import("ai");
      const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
      const gateway = createLovableAiGatewayProvider(key);

      const langName = lang === "fr" ? "French" : lang === "ar" ? "Arabic" : "English";
      const result = await generateText({
        model: gateway("google/gemini-3.6-flash"),
        output: Output.object({ schema: AiSchema }),
        system:
          "You are a clinical psychologist specialised in gradual VR exposure therapy for phobias, and a game designer. " +
          `Write every string in ${langName}. Be warm, concrete and clinically credible. Never give medical diagnoses.`,
        prompt:
          `Patient questionnaire answers:\n${answersSummary(answers, lang)}\n\n` +
          `Computed fear score: ${local.fearScore}/10, risk: ${local.riskLevel}, motivation: ${local.motivation}/100.\n` +
          `Design a gamified gradual-exposure journey of exactly ${local.levels.length} stages, going from very easy to challenging, ` +
          `set in the patient's favourite universe and using their favourite animal and preferred play style. ` +
          `Each stage: short title, a mission name, one-sentence objective, and a reward name. ` +
          `Also give a global summary, one recommended therapy protocol sentence and 3 practical recommendations.`,
      });

      const ai = result.output;
      const levels = local.levels.map((l, i) => {
        const a = ai.levels[Math.min(i, ai.levels.length - 1)]!;
        return { ...l, title: a.title, mission: a.mission, objective: a.objective, reward: a.reward };
      });

      return {
        ...local,
        summary: ai.summary,
        recommendation: ai.recommendation,
        recommendations: ai.recommendations,
        levels,
        source: "ai",
      };
    } catch {
      return local;
    }
  });

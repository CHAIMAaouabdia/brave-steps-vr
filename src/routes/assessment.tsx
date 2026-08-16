import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Confetti } from "@/components/Confetti";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";
import { QUESTIONS, buildLocalScenario, type Answers } from "@/lib/questionnaire";
import { analyzeAnswers } from "@/lib/scenario.functions";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Évaluation initiale — G_Phob" },
      { name: "description", content: "Questionnaire à choix multiples analysé par l'IA pour générer votre scénario de jeu thérapeutique." },
      { property: "og:title", content: "Évaluation initiale — G_Phob" },
      { property: "og:description", content: "Répondez au questionnaire, l'IA construit votre parcours." },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { setScenario, setAssessment } = useApp();
  const analyze = useServerFn(analyzeAnswers);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step]!;
  const picked = answers[q.id] ?? [];
  const canNext = picked.length > 0;

  const langIdx = lang === "fr" ? 0 : lang === "en" ? 1 : 2;

  const toggle = (id: string) => {
    setAnswers((prev) => {
      const cur = prev[q.id] ?? [];
      if (q.multi) {
        return { ...prev, [q.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
      }
      return { ...prev, [q.id]: [id] };
    });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const scenario = await analyze({ data: { answers, lang } });
      setScenario(scenario, answers);
      if (scenario.source === "local") toast.info(t("q.aiFallback"));
      else toast.success(t("q.generated"));
    } catch {
      const local = buildLocalScenario(answers, lang);
      setScenario(local, answers);
      toast.info(t("q.aiFallback"));
    }
    setAssessment({
      fears: [...(answers["mainFear"] ?? []), ...(answers["secondaryFears"] ?? [])],
      intensity: { mild: 3, moderate: 5, strong: 8, extreme: 10 }[answers["intensity"]?.[0] ?? "moderate"] ?? 5,
      duration: answers["duration"]?.[0] ?? "1-3",
      impact: answers["impact"]?.[0] ?? "moderate",
      sleep: { good: 8, average: 5, bad: 3 }[answers["sleep"]?.[0] ?? "average"] ?? 5,
      stress: 6,
      animal: answers["animal"]?.[0] ?? "cat",
      hobby: answers["gameStyle"]?.[0] ?? "collect",
      color: "blue",
      game: answers["gameStyle"]?.[0] ?? "collect",
      music: "calm",
    });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="gradient-hero grid min-h-screen place-items-center px-4">
        <Confetti fire />
        <Card className="w-full max-w-lg rounded-4xl border-none text-center shadow-float">
          <CardContent className="p-8">
            <span className="mx-auto grid size-16 place-items-center rounded-3xl gradient-calm text-3xl">🎉</span>
            <h1 className="mt-4 text-2xl font-extrabold">{t("q.ready")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("q.generated")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button className="gradient-primary rounded-2xl" onClick={() => navigate({ to: "/game/$levelId", params: { levelId: "1" } })}>
                {t("q.playNow")}
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={() => navigate({ to: "/profile" })}>
                {t("q.seeProfile")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="gradient-hero min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("q.kicker")}</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t("q.title")}</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{t("q.subtitle")}</p>
        </div>

        <div className="mb-6 flex items-center gap-1.5">
          {QUESTIONS.map((x, i) => (
            <div key={x.id} className={`h-2 flex-1 rounded-full transition-all ${i <= step ? "gradient-primary" : "bg-muted"}`} />
          ))}
        </div>

        <Card className="animate-rise rounded-4xl border-none shadow-float">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {t("q.question")} {step + 1} {t("common.of")} {total}
              </p>
              <Badge variant="secondary" className="rounded-full">
                {q.multi ? t("q.pickMany") : t("q.pickOne")}
              </Badge>
            </div>
            <h2 className="mt-3 text-xl font-bold">{t(q.labelKey)}</h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {q.options.map((o) => {
                const active = picked.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggle(o.id)}
                    className={`rounded-3xl border p-4 text-start transition-all hover:-translate-y-0.5 ${
                      active ? "border-primary bg-primary/10 shadow-soft" : "bg-card"
                    }`}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <p className="mt-2 text-sm font-semibold">{o.label[langIdx]}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" disabled={step === 0 || loading} onClick={() => setStep((s) => s - 1)} className="rounded-2xl">
                <ArrowLeft className="size-4" /> {t("common.back")}
              </Button>
              {step < total - 1 ? (
                <Button className="gradient-primary rounded-2xl" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
                  {t("common.continue")} <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button className="gradient-primary rounded-2xl px-6" disabled={!canNext || loading} onClick={submit}>
                  {loading ? (
                    <><Loader2 className="size-4 animate-spin" /> {t("q.analyzing")}</>
                  ) : (
                    <><Sparkles className="size-4" /> {t("q.analyze")}</>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, HeartPulse, ShieldAlert, Sparkles, Target } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressCircle } from "@/routes/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";
import { ACHIEVEMENTS, FEARS, LEVELS } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil thérapeutique — G_Phob" },
      { name: "description", content: "Profil généré par l'IA : score de peur, motivation, risque et thérapie recommandée." },
      { property: "og:title", content: "Profil thérapeutique — G_Phob" },
      { property: "og:description", content: "Votre profil clinique simulé et vos recommandations." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useI18n();
  const { user, assessment, progress, level } = useApp();
  const fearScore = assessment?.intensity ?? 7;
  const completion = Math.round((progress.completed.length / LEVELS.length) * 100);
  const fearLabels = (assessment?.fears ?? ["dogs", "darkness"]).map(
    (id) => FEARS.find((f) => f.id === id)?.fr ?? id,
  );

  return (
    <AppShell title={t("prof.title")} subtitle={t("prof.subtitle")}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="mx-auto grid size-24 place-items-center rounded-full gradient-calm text-3xl font-extrabold text-primary-foreground">
              {(user?.firstName?.[0] ?? "Y") + (user?.lastName?.[0] ?? "B")}
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {user ? `${user.firstName} ${user.lastName}` : "Yasmine Belkacem"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user?.age ?? 12} {t("prof.yearsOld")} · {user?.country ?? "France"}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {fearLabels.map((f) => (
                <Badge key={f} variant="secondary" className="rounded-full">{f}</Badge>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-muted/60 p-4 text-start">
              <p className="text-xs text-muted-foreground">{t("prof.emergencyContact")}</p>
              <p className="text-sm font-medium">{user?.emergency ?? "Sarah Belkacem · +33 6 12 34 56 78"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft lg:col-span-2">
          <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
            <Metric icon={Target} label={t("prof.currentLevel")} value={`${t("prof.level")} ${level}`} tone="primary" />
            <Metric
              icon={ShieldAlert}
              label={t("prof.riskLevel")}
              value={fearScore >= 8 ? t("prof.riskHigh") : fearScore >= 5 ? t("prof.riskModerate") : t("prof.riskLow")}
              tone="warning"
            />
            <Metric icon={Brain} label={t("prof.fearScore")} value={`${fearScore}/10`} tone="violet" />
            <Metric icon={HeartPulse} label={t("prof.motivationScore")} value="88/100" tone="emerald" />
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground">{t("prof.recommendedDifficulty")}</p>
              <Progress value={fearScore * 10} className="mt-2 h-2.5" />
              <p
                className="mt-2 text-sm"
                dangerouslySetInnerHTML={{ __html: t("prof.recommendedTherapy") }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="flex flex-col items-center p-6">
            <h3 className="font-bold">{t("prof.globalProgress")}</h3>
            <div className="mt-4"><ProgressCircle value={completion} /></div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t("prof.levelsCompleted", { done: progress.completed.length, sessions: progress.sessions })}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="font-bold">{t("prof.aiReco")}</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                t("prof.reco1", { mission: LEVELS[Math.min(level - 1, 9)]!.mission }),
                t("prof.reco2"),
                t("prof.reco3"),
                t("prof.reco4", { animal: assessment?.animal ?? "chat", color: assessment?.color ?? "bleu" }),
              ].map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-3xl bg-muted/50 p-3">
                  <Activity className="mt-0.5 size-4 shrink-0 text-primary" /> {r}
                </li>
              ))}
            </ul>
            <Button asChild className="gradient-primary mt-5 rounded-2xl">
              <Link to="/therapy">{t("prof.continueTherapy")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5 rounded-4xl border-none shadow-soft">
        <CardContent className="p-6">
          <h3 className="font-bold">{t("prof.achievements")}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.id} className={`rounded-3xl border p-4 ${a.unlocked ? "shadow-soft" : "opacity-55"}`}>
                <span className="text-2xl">{a.icon}</span>
                <p className="mt-2 text-sm font-semibold">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "primary" | "emerald" | "violet" | "warning";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald/15 text-emerald",
    violet: "bg-violet/15 text-violet",
    warning: "bg-warning/20 text-warning-foreground",
  } as const;
  return (
    <div className="flex items-center gap-4 rounded-3xl border p-4">
      <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tones[tone]}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

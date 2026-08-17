import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Lock, Play, Sparkles, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";
import { LEVELS } from "@/lib/mock-data";
import forestImg from "@/assets/scene-forest.jpg";
import mountainImg from "@/assets/scene-mountain.jpg";

export const Route = createFileRoute("/therapy")({
  head: () => ({
    meta: [
      { title: "Niveaux d'exposition — G_Phob" },
      { name: "description", content: "10 niveaux d'exposition graduelle gamifiés, du plus doux au plus intense." },
      { property: "og:title", content: "Niveaux d'exposition — G_Phob" },
      { property: "og:description", content: "Découvrez les 10 missions immersives du parcours." },
    ],
  }),
  component: TherapyPage,
});

function TherapyPage() {
  const { progress, level } = useApp();
  const { t } = useI18n();

  return (
    <AppShell title={t("therapy.title")} subtitle={t("therapy.subtitle")}>
      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">{t("therapy.completedLevels")}</p>
            <p className="text-2xl font-bold">{progress.completed.length}/10</p>
            <Progress value={progress.completed.length * 10} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">{t("therapy.nextStep")}</p>
            <p className="truncate text-2xl font-bold">{LEVELS[Math.min(level - 1, 9)]!.title}</p>
            <p className="text-xs text-muted-foreground">{t("therapy.difficulty", { d: LEVELS[Math.min(level - 1, 9)]!.difficulty })}</p>
          </CardContent>
        </Card>
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">{t("therapy.cumulatedRewards")}</p>
            <p className="text-2xl font-bold">{progress.xp} XP</p>
            <p className="text-xs text-muted-foreground">{t("therapy.coinsBadges", { coins: progress.coins })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {LEVELS.map((l) => {
          const completed = progress.completed.includes(l.id);
          const locked = l.id > level;
          const pct = completed ? 100 : l.id === level ? 35 : 0;
          return (
            <Card key={l.id} className={`hover-lift overflow-hidden rounded-4xl border-none shadow-soft ${locked ? "opacity-70" : ""}`}>
              <div className="relative h-32">
                <img
                  src={l.scene === "forest" ? forestImg : mountainImg}
                  loading="lazy"
                  width={1600}
                  height={900}
                  alt={t("therapy.scene", { mission: l.mission })}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <Badge className="absolute start-3 top-3 rounded-full bg-card text-foreground hover:bg-card">
                  {t("therapy.level", { id: l.id })}
                </Badge>
                {completed && (
                  <span className="absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-emerald text-emerald-foreground">
                    <CheckCircle2 className="size-4" />
                  </span>
                )}
                {locked && (
                  <span className="absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-muted">
                    <Lock className="size-4" />
                  </span>
                )}
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold">{l.title}</h3>
                <p className="text-xs font-medium text-primary">{l.mission}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{l.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <Badge variant="secondary" className="rounded-full">{l.difficulty}</Badge>
                  <Badge variant="secondary" className="rounded-full"><Clock className="me-1 size-3" />{l.duration} {t("therapy.minutes")}</Badge>
                  <Badge variant="secondary" className="rounded-full"><Sparkles className="me-1 size-3" />+{l.xp} XP</Badge>
                </div>
                <ul className="mt-3 space-y-1">
                  {l.objectives.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" /> {o}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-2 text-xs">
                  <Trophy className="size-3.5 text-warning" /> {l.reward}
                </p>
                <Progress value={pct} className="mt-3 h-1.5" />
                <Button
                  asChild={!locked}
                  disabled={locked}
                  className={`mt-4 w-full rounded-2xl ${locked ? "" : "gradient-primary"}`}
                >
                  {locked ? (
                    <span><Lock className="size-4" /> {t("therapy.locked")}</span>
                  ) : (
                    <Link to="/session/$levelId" params={{ levelId: String(l.id) }}>
                      <Play className="size-4" /> {completed ? t("therapy.replay") : t("therapy.startSession")}
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

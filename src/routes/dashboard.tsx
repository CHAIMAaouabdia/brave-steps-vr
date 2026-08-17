import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BrainCircuit,
  CalendarDays,
  Coins,
  Flame,
  LineChart as LineIcon,
  MessageSquare,
  Play,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";
import { ACHIEVEMENTS, LEVELS, weeklySessions } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — G_Phob" },
      { name: "description", content: "Suivez vos missions, votre progression thérapeutique et vos récompenses au quotidien." },
      { property: "og:title", content: "Tableau de bord — G_Phob" },
      { property: "og:description", content: "Missions du jour, progression et récompenses." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, progress, level, moods, addMood } = useApp();
  const { t } = useI18n();
  const current = LEVELS[Math.min(level - 1, 9)]!;
  const completion = Math.round((progress.completed.length / LEVELS.length) * 100);

  return (
    <AppShell
      title={t("dash.hello", { name: user?.firstName ?? "Yasmine" })}
      subtitle={t("dash.subtitle")}
      action={
        <Button asChild size="sm" className="gradient-primary hidden rounded-full sm:inline-flex">
          <Link to="/therapy">
            <Play className="size-4" /> {t("dash.continue")}
          </Link>
        </Button>
      }
    >
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="hover-lift overflow-hidden rounded-4xl border-none shadow-soft xl:col-span-2">
          <CardContent className="gradient-hero p-6 sm:p-8">
            <Badge className="rounded-full bg-card text-foreground hover:bg-card">{t("dash.missionOfDay")}</Badge>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{current.mission}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{current.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">{t("dash.level")} {current.id}</Badge>
              <Badge variant="secondary" className="rounded-full">{current.difficulty}</Badge>
              <Badge variant="secondary" className="rounded-full">{current.duration} {t("common.min")}</Badge>
              <Badge variant="secondary" className="rounded-full">+{current.xp} XP</Badge>
            </div>
            <Button asChild className="gradient-primary mt-6 rounded-2xl px-6 shadow-float">
              <Link to="/session/$levelId" params={{ levelId: String(current.id) }}>
                <Play className="size-4" /> {t("dash.startSession")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <Stat icon={Trophy} label={t("dash.currentLevel")} value={`${t("dash.level")} ${level}`} hint={t("dash.pctOfJourney", { pct: completion })} />
          <Stat icon={Zap} label={t("dash.experience")} value={`${progress.xp} XP`} hint={`${progress.coins} ${t("dash.coins")}`} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Target} label={t("dash.totalSessions")} value={String(progress.sessions)} hint={t("dash.thisWeek")} />
        <Stat icon={Flame} label={t("dash.streak")} value={`${progress.streak} ${t("dash.days")}`} hint={t("dash.record")} />
        <Stat icon={Coins} label={t("dash.coinsLabel")} value={String(progress.coins)} hint={t("dash.rewardShop")} />
        <Stat icon={Award} label={t("dash.achievements")} value={`${ACHIEVEMENTS.filter((a) => a.unlocked).length}/${ACHIEVEMENTS.length}`} hint={t("dash.inProgress2")} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{t("dash.weeklyProgress")}</h3>
              <Badge variant="secondary" className="rounded-full">{t("dash.last7Days")}</Badge>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklySessions}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)" }} />
                  <Area type="monotone" dataKey="sessions" stroke="var(--primary)" fill="url(#g1)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">{t("dash.therapyProgress")}</h3>
            <div className="mt-6 flex justify-center">
              <ProgressCircle value={completion} />
            </div>
            <div className="mt-6 space-y-3">
              {LEVELS.slice(0, 4).map((l) => {
                const pct = progress.completed.includes(l.id) ? 100 : l.id === level ? 45 : 0;
                return (
                  <div key={l.id}>
                    <div className="flex justify-between text-xs">
                      <span className="truncate font-medium">{l.title}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <Progress value={pct} className="mt-1 h-1.5" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">{t("dash.moodOfDay")}</h3>
            <div className="mt-4 flex justify-between gap-2">
              {["😊", "😐", "😢", "😨", "😴"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    addMood(m, t("dash.moodFromDashboard"));
                    toast.success(t("dash.moodRecorded"));
                  }}
                  className="grid size-12 place-items-center rounded-2xl border bg-card text-2xl transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              {moods.slice(0, 3).map((m) => (
                <div key={m.id} className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
                  <span className="text-xl">{m.mood}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{m.note}</p>
                    <p className="text-[11px] text-muted-foreground">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">{t("dash.stressVsMood")}</h3>
            <div className="mt-4 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySessions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)" }} />
                  <Bar dataKey="stress" fill="var(--violet)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="mood" fill="var(--emerald)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-4xl border-none shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-bold">{t("dash.lastSession")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("dash.lastSessionDetail")}</p>
              <p className="text-xs text-muted-foreground">{t("dash.lastSessionTime")}</p>
              <div className="mt-4 border-t pt-4">
                <h3 className="font-bold">{t("dash.nextAppointment")}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <CalendarDays className="size-4 text-primary" /> {t("dash.nextAppointmentDetail")}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-4xl border-none shadow-soft">
            <CardContent className="grid grid-cols-2 gap-3 p-6">
              <QuickAction to="/therapy" icon={Play} label={t("dash.quickContinue")} />
              <QuickAction to="/progress" icon={LineIcon} label={t("dash.quickStats")} />
              <QuickAction to="/ai" icon={BrainCircuit} label={t("dash.quickAiChat")} />
              <QuickAction to="/messages" icon={MessageSquare} label={t("dash.quickMessages")} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5 rounded-4xl border-none shadow-soft">
        <CardContent className="p-6">
          <h3 className="font-bold">{t("dash.achievements")}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                className={`rounded-3xl border p-4 transition-all ${a.unlocked ? "bg-card shadow-soft" : "bg-muted/50 opacity-60"}`}
              >
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

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="hover-lift rounded-4xl border-none shadow-soft">
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl gradient-calm text-primary-foreground">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-xl font-bold">{value}</p>
          <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickAction({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 rounded-3xl border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <Icon className="size-5 text-primary" />
      <span className="text-xs font-semibold">{label}</span>
    </Link>
  );
}

export function ProgressCircle({ value, size = 140 }: { value: number; size?: number }) {
  const { t } = useI18n();
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--primary)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-extrabold">{value}%</p>
          <p className="text-[11px] text-muted-foreground">{t("dash.completedPercent")}</p>
        </div>
      </div>
    </div>
  );
}

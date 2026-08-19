import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { Glasses, Heart, LogOut, Pause, Play, Trophy, Wind } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Confetti } from "@/components/Confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";
import forestImg from "@/assets/scene-forest.jpg";
import mountainImg from "@/assets/scene-mountain.jpg";

export const Route = createFileRoute("/game/$levelId")({
  head: () => ({
    meta: [
      { title: "مهمة تفاعلية — G_Phob" },
      { name: "description", content: "مهمة تعرض تفاعلية: انقر على الأهداف، تحكم في قلقك، وأنجز المرحلة." },
      { property: "og:title", content: "مهمة تفاعلية — G_Phob" },
      { property: "og:description", content: "لعبة صغيرة للتعرض التدريجي أنشأها الذكاء الاصطناعي." },
    ],
  }),
  component: GamePage,
});

type Spawn = { key: number; x: number; y: number; target: boolean; emoji: string };

function GamePage() {
  const { levelId } = useParams({ from: "/game/$levelId" });
  const navigate = useNavigate();
  const { t } = useI18n();
  const { scenario, completeLevel, recordResult } = useApp();

  const id = Number(levelId);
  const level = useMemo(() => scenario?.levels.find((l) => l.id === id) ?? null, [scenario, id]);

  const [entered, setEntered] = useState(false);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [anxiety, setAnxiety] = useState(40);
  const [left, setLeft] = useState(level?.timeLimit ?? 45);
  const [spawns, setSpawns] = useState<Spawn[]>([]);
  const [status, setStatus] = useState<"idle" | "won" | "lost">("idle");
  const seq = useRef(0);
  const anxRef = useRef(40);
  anxRef.current = anxiety;

  const bg = id % 2 === 0 ? mountainImg : forestImg;

  const finish = useCallback(
    (won: boolean, finalScore: number) => {
      setRunning(false);
      setStatus(won ? "won" : "lost");
      setSpawns([]);
      if (!level) return;
      recordResult(level.id, { score: finalScore, anxiety: Math.round(anxRef.current), success: won });
      if (won) {
        completeLevel(level.id, level.xp, level.coins);
        toast.success(`${t("game.success")} +${level.xp} XP`);
      } else {
        toast.error(t("game.failed"));
      }
    },
    [completeLevel, level, recordResult, t],
  );

  // timer
  useEffect(() => {
    if (!running || !level) return;
    const i = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) return 0;
        return l - 1;
      });
      setAnxiety((a) => Math.min(100, a + 1.5));
    }, 1000);
    return () => clearInterval(i);
  }, [running, level]);

  useEffect(() => {
    if (running && left === 0) finish(false, score);
  }, [left, running, finish, score]);

  useEffect(() => {
    if (running && anxiety >= 100) finish(false, score);
  }, [anxiety, running, finish, score]);

  // spawner
  useEffect(() => {
    if (!running || !level) return;
    const i = setInterval(() => {
      const key = ++seq.current;
      const isTarget = Math.random() > 0.32;
      setSpawns((s) => [
        ...s.slice(-6),
        {
          key,
          x: 8 + Math.random() * 78,
          y: 12 + Math.random() * 66,
          target: isTarget,
          emoji: isTarget ? level.targetEmoji : level.distractorEmoji,
        },
      ]);
      setTimeout(() => setSpawns((s) => s.filter((sp) => sp.key !== key)), level.spawnMs * 1.7);
    }, level.spawnMs);
    return () => clearInterval(i);
  }, [running, level]);

  const hit = (sp: Spawn) => {
    if (!running || !level) return;
    setSpawns((s) => s.filter((x) => x.key !== sp.key));
    if (sp.target) {
      const next = score + 1;
      setScore(next);
      setAnxiety((a) => Math.max(0, a - 2));
      if (next >= level.targetCount) finish(true, next);
    } else {
      setAnxiety((a) => Math.min(100, a + 12));
    }
  };

  const breathe = () => setAnxiety((a) => Math.max(0, a - 18));

  const reset = () => {
    setScore(0);
    setAnxiety(40);
    setLeft(level?.timeLimit ?? 45);
    setStatus("idle");
    setSpawns([]);
    setRunning(true);
  };

  if (!scenario || !level) {
    return (
      <div className="gradient-hero grid min-h-screen place-items-center px-4 text-center">
        <div className="max-w-md rounded-4xl bg-card p-8 shadow-float">
          <h1 className="text-xl font-bold">{t("sc.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("sc.none")}</p>
          <Button asChild className="gradient-primary mt-6 rounded-2xl">
            <Link to="/assessment">{t("sc.startQuestionnaire")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!entered) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden">
        <img src={bg} alt="" width={1600} height={900} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
        <div className="relative z-10 mx-4 max-w-lg rounded-4xl bg-card p-8 text-center shadow-float">
          <span className="mx-auto grid size-16 place-items-center rounded-3xl gradient-primary text-primary-foreground">
            <Glasses className="size-7" />
          </span>
          <Badge className="mt-4 rounded-full" variant="secondary">
            {t("shell.level")} {level.id} · {scenario.universe}
          </Badge>
          <h1 className="mt-3 text-3xl font-extrabold">{level.mission}</h1>
          <p className="mt-2 text-sm font-medium text-primary">{level.title}</p>
          <p className="mt-3 text-sm text-muted-foreground">{level.objective}</p>
          <p className="mt-4 rounded-3xl bg-muted/60 p-3 text-xs text-muted-foreground">{t("game.instructions")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gradient-primary rounded-2xl px-8" onClick={() => { setEntered(true); setRunning(true); }}>
              <Glasses className="size-4" /> {t("game.enter")}
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <Link to="/therapy">{t("common.back")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const nextLevel = scenario.levels.find((l) => l.id === level.id + 1);

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      <Confetti fire={status === "won"} />
      <img src={bg} alt="" width={1600} height={900} className={`absolute inset-0 size-full object-cover transition-transform duration-[20s] ${running ? "scale-110" : "scale-100"}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/20 to-foreground/70" />

      {/* play field */}
      <div className="absolute inset-0 z-10">
        {spawns.map((sp) => (
          <button
            key={sp.key}
            onClick={() => hit(sp)}
            style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            className="animate-rise absolute grid size-14 place-items-center rounded-full bg-card/90 text-2xl shadow-float transition-transform hover:scale-110 active:scale-95"
          >
            {sp.emoji}
          </button>
        ))}
      </div>

      <div className="pointer-events-none relative z-20 flex min-h-screen flex-col p-4 sm:p-6">
        <div className="pointer-events-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0 rounded-3xl bg-card/85 px-4 py-3 backdrop-blur">
            <p className="truncate text-xs text-muted-foreground">
              {t("shell.level")} {level.id} · {level.title}
            </p>
            <p className="truncate font-bold">{level.mission}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" className="rounded-2xl" disabled={status !== "idle"} onClick={() => setRunning((r) => !r)}>
              {running ? <><Pause className="size-4" /> {t("common.pause")}</> : <><Play className="size-4" /> {t("common.resume")}</>}
            </Button>
            <Button variant="secondary" className="rounded-2xl" onClick={() => navigate({ to: "/therapy" })}>
              <LogOut className="size-4" /> {t("common.quit")}
            </Button>
          </div>
        </div>

        <div className="pointer-events-auto mt-auto grid gap-4 lg:grid-cols-3">
          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            <p className="text-xs text-muted-foreground">{t("game.score")}</p>
            <p className="text-4xl font-extrabold tabular-nums">
              {score}<span className="text-lg text-muted-foreground">/{level.targetCount}</span>
            </p>
            <Progress value={(score / level.targetCount) * 100} className="mt-3 h-2.5" />
            <p className="mt-2 text-xs text-muted-foreground">
              {t("game.time")} · {left}
              {t("common.sec")}
            </p>
          </div>

          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            <p className="text-xs text-muted-foreground">{t("game.anxiety")}</p>
            <p className={`text-3xl font-extrabold ${anxiety > 70 ? "text-destructive" : "text-emerald"}`}>
              {Math.round(anxiety)}%
            </p>
            <Progress value={anxiety} className="mt-3 h-2.5" />
            <Button className="mt-4 w-full rounded-2xl" variant="secondary" onClick={breathe} disabled={!running}>
              <Wind className="size-4" /> {t("game.breathe")}
            </Button>
          </div>

          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            {status === "won" ? (
              <div className="text-center">
                <Trophy className="mx-auto size-8 text-warning" />
                <p className="mt-2 font-bold">{t("game.success")}</p>
                <p className="text-xs text-muted-foreground">+{level.xp} XP · +{level.coins} 🪙 · {level.reward}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {nextLevel && (
                    <Button className="gradient-primary rounded-2xl" onClick={() => navigate({ to: "/game/$levelId", params: { levelId: String(nextLevel.id) } })}>
                      {t("game.next")}
                    </Button>
                  )}
                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/therapy">{t("game.backToJourney")}</Link>
                  </Button>
                </div>
              </div>
            ) : status === "lost" ? (
              <div className="text-center">
                <Heart className="mx-auto size-8 text-destructive" />
                <p className="mt-2 font-bold">{t("game.failed")}</p>
                <p className="text-xs text-muted-foreground">{t("game.failedHint")}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button className="gradient-primary rounded-2xl" onClick={reset}>{t("common.retry")}</Button>
                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/therapy">{t("game.backToJourney")}</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">{t("game.objective")}</p>
                <p className="mt-1 text-sm font-medium">{level.objective}</p>
                <p className="mt-3 text-xs text-muted-foreground">{t("game.instructions")}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  CheckCircle2,
  Glasses,
  LogOut,
  Pause,
  Play,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Confetti } from "@/components/Confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { LEVELS } from "@/lib/mock-data";
import forestImg from "@/assets/scene-forest.jpg";
import mountainImg from "@/assets/scene-mountain.jpg";

export const Route = createFileRoute("/session/$levelId")({
  head: () => ({
    meta: [
      { title: "Session immersive — G_Phob" },
      { name: "description", content: "Session d'exposition immersive simulée avec objectifs, minuteur et suivi du stress." },
      { property: "og:title", content: "Session immersive — G_Phob" },
      { property: "og:description", content: "Entrez en immersion et complétez votre mission." },
    ],
  }),
  component: SessionPage,
});

function SessionPage() {
  const { levelId } = useParams({ from: "/session/$levelId" });
  const navigate = useNavigate();
  const { completeLevel } = useApp();
  const level = useMemo(() => LEVELS.find((l) => l.id === Number(levelId)) ?? LEVELS[0]!, [levelId]);
  const total = level.duration * 60;

  const [entered, setEntered] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [objectivesDone, setObjectivesDone] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setElapsed((e) => e + 3), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  const pct = Math.min(100, Math.round((elapsed / total) * 100));

  useEffect(() => {
    const idx = Math.floor((pct / 100) * level.objectives.length);
    setObjectivesDone(Array.from({ length: Math.min(idx, level.objectives.length) }, (_, i) => i));
    if (pct >= 100 && !done) {
      setRunning(false);
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  const finish = () => {
    setDone(true);
    setRunning(false);
    completeLevel(level.id, level.xp, level.coins);
    toast.success(`Niveau ${level.id} réussi ! +${level.xp} XP`);
  };

  const mmss = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const bg = level.scene === "forest" ? forestImg : mountainImg;

  if (!entered) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden">
        <img src={bg} alt="" width={1600} height={900} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
        <div className="relative z-10 mx-4 max-w-lg rounded-4xl bg-card p-8 text-center shadow-float">
          <span className="mx-auto grid size-16 place-items-center rounded-3xl gradient-primary text-primary-foreground">
            <Glasses className="size-7" />
          </span>
          <Badge className="mt-4 rounded-full" variant="secondary">Niveau {level.id} · {level.difficulty}</Badge>
          <h1 className="mt-3 text-3xl font-extrabold">{level.mission}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{level.description}</p>
          <ul className="mt-5 space-y-2 text-start">
            {level.objectives.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /> {o}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="gradient-primary rounded-2xl px-8"
              onClick={() => {
                setEntered(true);
                setRunning(true);
              }}
            >
              <Glasses className="size-4" /> Entrer en VR
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <Link to="/therapy">Retour</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Simulation — aucun casque requis pour cette démonstration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Confetti fire={done} />
      <img
        src={bg}
        alt=""
        width={1600}
        height={900}
        className={`absolute inset-0 size-full object-cover transition-transform duration-[20s] ${running ? "scale-110" : "scale-100"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/25 to-foreground/70" />

      <div className="relative z-10 flex min-h-screen flex-col p-4 sm:p-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0 rounded-3xl bg-card/85 px-4 py-3 backdrop-blur">
            <p className="truncate text-xs text-muted-foreground">Niveau {level.id} · {level.title}</p>
            <p className="truncate font-bold">{level.mission}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" className="rounded-2xl" onClick={() => setRunning((r) => !r)}>
              {running ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> Reprendre</>}
            </Button>
            <Button
              variant="secondary"
              className="rounded-2xl"
              onClick={() => navigate({ to: "/therapy" })}
            >
              <LogOut className="size-4" /> Quitter
            </Button>
          </div>
        </div>

        <div className="mt-auto grid gap-4 lg:grid-cols-3">
          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            <p className="text-xs text-muted-foreground">Minuteur</p>
            <p className="text-4xl font-extrabold tabular-nums">{mmss(Math.min(elapsed, total))}</p>
            <p className="text-xs text-muted-foreground">objectif {level.duration}:00</p>
            <Progress value={pct} className="mt-4 h-2.5" />
            <p className="mt-2 text-xs text-muted-foreground">{pct}% de la session</p>
          </div>

          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            <p className="mb-3 text-xs text-muted-foreground">Objectifs</p>
            <ul className="space-y-2">
              {level.objectives.map((o, i) => (
                <li key={o} className="flex items-start gap-2 text-sm">
                  <CheckCircle2
                    className={`mt-0.5 size-4 shrink-0 ${objectivesDone.includes(i) || done ? "text-emerald" : "text-muted-foreground/40"}`}
                  />
                  <span className={objectivesDone.includes(i) || done ? "" : "text-muted-foreground"}>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-4xl bg-card/90 p-5 backdrop-blur shadow-float">
            {done ? (
              <div className="text-center">
                <Trophy className="mx-auto size-8 text-warning" />
                <p className="mt-2 font-bold">Mission réussie !</p>
                <p className="text-xs text-muted-foreground">
                  +{level.xp} XP · +{level.coins} pièces · {level.reward}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild className="gradient-primary rounded-2xl">
                    <Link to="/therapy">Niveau suivant débloqué</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/dashboard">Tableau de bord</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">Niveau de stress estimé</p>
                <p className="text-3xl font-extrabold text-emerald">
                  {Math.max(2, 8 - Math.round(pct / 15))}/10
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Respirez : inspirez 4s · retenez 7s · expirez 8s
                </p>
                <Button className="gradient-primary mt-4 w-full rounded-2xl" onClick={finish}>
                  <CheckCircle2 className="size-4" /> Terminer la session
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Confetti } from "@/components/Confetti";
import { useApp } from "@/lib/app-state";
import { FEARS } from "@/lib/mock-data";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Évaluation initiale — G_Phob" },
      { name: "description", content: "Questionnaire multi-étapes pour générer votre profil thérapeutique personnalisé." },
      { property: "og:title", content: "Évaluation initiale — G_Phob" },
      { property: "og:description", content: "Identifiez vos peurs et générez votre profil thérapeutique." },
    ],
  }),
  component: AssessmentPage,
});

const STEPS = ["Vos peurs", "Intensité", "Impact quotidien", "Vous connaître", "Profil IA"];

function AssessmentPage() {
  const navigate = useNavigate();
  const { setAssessment } = useApp();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const [fears, setFears] = useState<string[]>(["dogs"]);
  const [intensity, setIntensity] = useState(7);
  const [duration, setDuration] = useState("1-3");
  const [impact, setImpact] = useState("moderate");
  const [sleep, setSleep] = useState(5);
  const [stress, setStress] = useState(6);
  const [animal, setAnimal] = useState("Chat");
  const [hobby, setHobby] = useState("Dessin");
  const [color, setColor] = useState("Bleu");
  const [game, setGame] = useState("Puzzle");
  const [music, setMusic] = useState("Pop");

  const finish = () => {
    setGenerating(true);
    setTimeout(() => {
      setAssessment({ fears, intensity, duration, impact, sleep, stress, animal, hobby, color, game, music });
      setGenerating(false);
      setDone(true);
      toast.success("Profil thérapeutique généré par l'IA");
    }, 1800);
  };

  return (
    <div className="gradient-hero min-h-screen py-10">
      <Confetti fire={done} />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Évaluation initiale</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Faisons connaissance</h1>
        </div>

        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full transition-all ${i <= step ? "gradient-primary" : "bg-muted"}`} />
              <p className="mt-2 hidden text-center text-[11px] text-muted-foreground sm:block">{s}</p>
            </div>
          ))}
        </div>

        <Card className="animate-rise rounded-4xl border-none shadow-float">
          <CardContent className="p-6 sm:p-8">
            {step === 0 && (
              <>
                <h2 className="text-xl font-bold">De quoi avez-vous peur ?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Plusieurs choix possibles.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {FEARS.map((f) => {
                    const active = fears.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() =>
                          setFears((p) => (active ? p.filter((x) => x !== f.id) : [...p, f.id]))
                        }
                        className={`rounded-3xl border p-4 text-start transition-all hover:-translate-y-0.5 ${
                          active ? "border-primary bg-primary/10 shadow-soft" : "bg-card"
                        }`}
                      >
                        <span className="text-2xl">{f.emoji}</span>
                        <p className="mt-2 text-sm font-semibold">{f.fr}</p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold">Quelle est l'intensité de cette peur ?</h2>
                <div className="mt-10 text-center">
                  <p className="text-6xl font-extrabold text-gradient">{intensity}</p>
                  <p className="text-sm text-muted-foreground">sur 10</p>
                </div>
                <Slider className="mt-8" min={1} max={10} step={1} value={[intensity]} onValueChange={(v) => setIntensity(v[0] ?? 1)} />
                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>Légère</span><span>Insupportable</span>
                </div>
                <div className="mt-8 space-y-2">
                  <Label className="text-sm font-semibold">Depuis combien de temps ?</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full rounded-2xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lt1">Moins d'un an</SelectItem>
                      <SelectItem value="1-3">1 à 3 ans</SelectItem>
                      <SelectItem value="3-10">3 à 10 ans</SelectItem>
                      <SelectItem value="gt10">Plus de 10 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold">Impact sur votre quotidien</h2>
                <div className="mt-6 space-y-3">
                  {[
                    { v: "low", l: "Faible — je gère la plupart des situations" },
                    { v: "moderate", l: "Modéré — j'évite certaines situations" },
                    { v: "high", l: "Élevé — cela limite fortement ma vie" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setImpact(o.v)}
                      className={`flex w-full items-center gap-3 rounded-3xl border p-4 text-start transition-all ${
                        impact === o.v ? "border-primary bg-primary/10" : "bg-card"
                      }`}
                    >
                      <span className={`grid size-5 place-items-center rounded-full border ${impact === o.v ? "gradient-primary text-primary-foreground" : ""}`}>
                        {impact === o.v && <Check className="size-3" />}
                      </span>
                      <span className="text-sm font-medium">{o.l}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 space-y-6">
                  <SliderRow label="Qualité du sommeil" value={sleep} onChange={setSleep} />
                  <SliderRow label="Niveau de stress" value={stress} onChange={setStress} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold">Personnalisons vos missions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ces réponses permettent à l'IA d'adapter les univers de vos sessions.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Text label="Animal préféré" value={animal} onChange={setAnimal} />
                  <Text label="Loisir préféré" value={hobby} onChange={setHobby} />
                  <Text label="Couleur préférée" value={color} onChange={setColor} />
                  <Text label="Jeu préféré" value={game} onChange={setGame} />
                  <Text label="Musique préférée" value={music} onChange={setMusic} />
                </div>
              </>
            )}

            {step === 4 && (
              <div className="text-center">
                {!done ? (
                  <>
                    <Sparkles className="mx-auto size-12 text-primary" />
                    <h2 className="mt-4 text-xl font-bold">Générer mon profil thérapeutique</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      L'IA va analyser vos {fears.length} peur(s), votre intensité ({intensity}/10)
                      et vos préférences pour construire un parcours sur mesure.
                    </p>
                    <Button
                      disabled={generating}
                      onClick={finish}
                      size="lg"
                      className="gradient-primary mt-8 rounded-2xl px-8"
                    >
                      {generating ? <><Loader2 className="size-4 animate-spin" /> Analyse en cours…</> : "Générer le profil"}
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="mx-auto grid size-16 place-items-center rounded-3xl gradient-calm text-3xl">🎉</span>
                    <h2 className="mt-4 text-2xl font-extrabold">Profil prêt !</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thérapie recommandée : exposition graduelle en 10 paliers, 3 sessions/semaine.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button className="gradient-primary rounded-2xl" onClick={() => navigate({ to: "/profile" })}>
                        Voir mon profil
                      </Button>
                      <Button variant="outline" className="rounded-2xl" onClick={() => navigate({ to: "/dashboard" })}>
                        Aller au tableau de bord
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {!done && (
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="rounded-2xl">
                  <ArrowLeft className="size-4" /> Retour
                </Button>
                {step < 4 && (
                  <Button className="gradient-primary rounded-2xl" onClick={() => setStep((s) => s + 1)}>
                    Continuer <ArrowRight className="size-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SliderRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">{label}</Label>
        <span className="text-sm font-bold text-primary">{value}/10</span>
      </div>
      <Slider className="mt-3" min={1} max={10} step={1} value={[value]} onValueChange={(v) => onChange(v[0] ?? 1)} />
    </div>
  );
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-2xl" />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { PATIENTS, monthlyProgress, type Patient } from "@/lib/mock-data";

export const Route = createFileRoute("/therapist")({
  head: () => ({
    meta: [
      { title: "Espace thérapeute — G_Phob" },
      { name: "description", content: "Suivi de patientèle : niveaux, risques, statistiques et notes cliniques." },
      { property: "og:title", content: "Espace thérapeute — G_Phob" },
      { property: "og:description", content: "Tableau de bord clinique pour les praticiens." },
    ],
  }),
  component: TherapistPage,
});

const FILTERS = ["Tous", "Actif", "Pause", "Terminé"] as const;

function TherapistPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"Tous" | Patient["status"]>("Tous");
  const [selected, setSelected] = useState<Patient>(PATIENTS[0]!);

  const filterLabel: Record<(typeof FILTERS)[number], string> = {
    Tous: t("ther.filter.all"),
    Actif: t("ther.filter.active"),
    Pause: t("ther.filter.paused"),
    Terminé: t("ther.filter.done"),
  };

  const riskLabel: Record<Patient["risk"], string> = {
    Faible: t("ther.risk.low"),
    Modéré: t("ther.risk.medium"),
    Élevé: t("ther.risk.high"),
  };

  const statusLabel: Record<Patient["status"], string> = {
    Actif: t("ther.filter.active"),
    Pause: t("ther.filter.paused"),
    Terminé: t("ther.filter.done"),
  };

  const list = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) &&
      (filter === "Tous" || p.status === filter),
  );

  return (
    <AppShell
      title={t("ther.title")}
      subtitle={t("ther.subtitle")}
      action={
        <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success(t("ther.reportExported"))}>
          <Download className="size-4" /> {t("ther.report")}
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { l: t("ther.kpi.patients"), v: "42" },
          { l: t("ther.kpi.sessions"), v: "218" },
          { l: t("ther.kpi.adherence"), v: "84%" },
          { l: t("ther.kpi.alerts"), v: "2" },
        ].map((k) => (
          <Card key={k.l} className="hover-lift rounded-4xl border-none shadow-soft">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{k.l}</p>
              <p className="text-2xl font-extrabold text-gradient">{k.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <div className="relative min-w-0">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("ther.searchPlaceholder")} className="rounded-2xl ps-9" />
              </div>
              <div className="flex shrink-0 gap-1">
                {FILTERS.map((f) => (
                  <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} className="rounded-full" onClick={() => setFilter(f)}>
                    {filterLabel[f]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {list.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4 text-start transition-colors ${
                    selected.id === p.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.age} {t("ther.yearsShort")} · {p.phobia} · {t("ther.level")} {p.level} · {p.sessions} {t("ther.sessions")}
                    </p>
                    <Progress value={p.progress} className="mt-2 h-1.5" />
                  </div>
                  <div className="shrink-0 text-end">
                    <Badge
                      variant="secondary"
                      className={`rounded-full ${p.risk === "Élevé" ? "bg-destructive/15 text-destructive" : p.risk === "Modéré" ? "bg-warning/25" : "bg-emerald/15 text-emerald"}`}
                    >
                      {riskLabel[p.risk]}
                    </Badge>
                    <p className="mt-1 text-[11px] text-muted-foreground">{p.lastSession}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-4xl border-none shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selected.phobia} · {t("ther.level")} {selected.level} · {t("ther.status")} {statusLabel[selected.status]}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: t("ther.stat.progress"), v: `${selected.progress}%` },
                  { l: t("ther.stat.sessions"), v: String(selected.sessions) },
                  { l: t("ther.stat.risk"), v: riskLabel[selected.risk] },
                ].map((s) => (
                  <div key={s.l} className="rounded-3xl bg-muted/60 p-3">
                    <p className="text-lg font-bold">{s.v}</p>
                    <p className="text-[11px] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyProgress}>
                    <defs>
                      <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--emerald)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--emerald)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" fontSize={11} stroke="var(--muted-foreground)" />
                    <YAxis fontSize={11} stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)" }} />
                    <Area type="monotone" dataKey="completion" stroke="var(--emerald)" fill="url(#tg)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">{t("ther.aiReco")}</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="rounded-2xl bg-muted/50 p-3">{t("ther.reco1")}</li>
                <li className="rounded-2xl bg-muted/50 p-3">{t("ther.reco2")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-4xl border-none shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-bold">{t("ther.notes")}</h3>
              <Textarea rows={4} className="mt-3 rounded-3xl" placeholder={t("ther.notesPlaceholder")} />
              <Button className="gradient-primary mt-3 rounded-2xl" onClick={() => toast.success(t("ther.noteSaved"))}>
                {t("ther.saveNote")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

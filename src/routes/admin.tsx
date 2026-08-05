import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PATIENTS, monthlyProgress } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — G_Phob" },
      { name: "description", content: "Gestion des utilisateurs, statistiques plateforme et journaux système." },
      { property: "og:title", content: "Administration — G_Phob" },
      { property: "og:description", content: "Panneau d'administration de la plateforme G_Phob." },
    ],
  }),
  component: AdminPage,
});

const THERAPISTS = [
  { n: "Dr. Amina Rahmani", s: "Psychologue TCC", p: 42 },
  { n: "Dr. Paul Vidal", s: "Psychiatre", p: 28 },
  { n: "Dr. Leïla Ben Salah", s: "Pédopsychiatre", p: 35 },
];

const LOGS = [
  { t: "10:42", m: "Session VR terminée — patient p2 — niveau 7", lvl: "INFO" },
  { t: "10:31", m: "Nouvel utilisateur inscrit — patient p9", lvl: "INFO" },
  { t: "09:58", m: "Alerte risque élevé détectée — patient p3", lvl: "WARN" },
  { t: "09:12", m: "Export de rapport clinique généré", lvl: "INFO" },
  { t: "08:47", m: "Échec de synchronisation casque VR-08", lvl: "ERROR" },
];

function AdminPage() {
  return (
    <AppShell
      title="Administration"
      subtitle="Vue plateforme"
      action={
        <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success("Export analytics CSV (simulation)")}>
          Export
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { l: "Utilisateurs", v: "2 418" },
          { l: "Thérapeutes", v: "37" },
          { l: "Sessions totales", v: "18 946" },
          { l: "Disponibilité", v: "99,9%" },
        ].map((k) => (
          <Card key={k.l} className="hover-lift rounded-4xl border-none shadow-soft">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{k.l}</p>
              <p className="text-2xl font-extrabold text-gradient">{k.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-5 rounded-4xl border-none shadow-soft">
        <CardContent className="p-6">
          <Tabs defaultValue="patients">
            <TabsList className="rounded-2xl">
              <TabsTrigger value="patients" className="rounded-xl">Patients</TabsTrigger>
              <TabsTrigger value="therapists" className="rounded-xl">Thérapeutes</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-xl">Analytics</TabsTrigger>
              <TabsTrigger value="logs" className="rounded-xl">Journaux</TabsTrigger>
            </TabsList>

            <TabsContent value="patients" className="mt-5 space-y-2">
              {PATIENTS.map((p) => (
                <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age} ans · {p.phobia} · {p.sessions} sessions</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">{p.status}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => toast.info("Fiche patient (démo)")}>Gérer</Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="therapists" className="mt-5 space-y-2">
              {THERAPISTS.map((t) => (
                <div key={t.n} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{t.n}</p>
                    <p className="text-xs text-muted-foreground">{t.s} · {t.p} patients</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => toast.info("Profil praticien (démo)")}>Voir</Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="mt-5">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                    <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)" }} />
                    <Bar dataKey="sessions" fill="var(--violet)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-5 space-y-2">
              {LOGS.map((l) => (
                <div key={l.t} className="flex items-center gap-3 rounded-3xl bg-muted/50 p-3 font-mono text-xs">
                  <span className="text-muted-foreground">{l.t}</span>
                  <Badge
                    variant="secondary"
                    className={`rounded-full ${l.lvl === "ERROR" ? "bg-destructive/15 text-destructive" : l.lvl === "WARN" ? "bg-warning/25" : ""}`}
                  >
                    {l.lvl}
                  </Badge>
                  <span className="truncate">{l.m}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { PATIENTS, monthlyProgress, type Patient } from "@/lib/mock-data";

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

const LOGS = [
  { t: "10:42", key: "adm.log1" as const, lvl: "INFO" },
  { t: "10:31", key: "adm.log2" as const, lvl: "INFO" },
  { t: "09:58", key: "adm.log3" as const, lvl: "WARN" },
  { t: "09:12", key: "adm.log4" as const, lvl: "INFO" },
  { t: "08:47", key: "adm.log5" as const, lvl: "ERROR" },
];

function AdminPage() {
  const { t } = useI18n();

  const THERAPISTS = [
    { n: t("adm.therapist1.name"), s: t("adm.therapist1.spec"), p: 42 },
    { n: t("adm.therapist2.name"), s: t("adm.therapist2.spec"), p: 28 },
    { n: t("adm.therapist3.name"), s: t("adm.therapist3.spec"), p: 35 },
  ];

  const statusLabel: Record<Patient["status"], string> = {
    Actif: t("adm.status.active"),
    Pause: t("adm.status.paused"),
    Terminé: t("adm.status.done"),
  };

  return (
    <AppShell
      title={t("adm.title")}
      subtitle={t("adm.subtitle")}
      action={
        <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success(t("adm.exportDone"))}>
          {t("adm.export")}
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { l: t("adm.kpi.users"), v: "2 418" },
          { l: t("adm.kpi.therapists"), v: "37" },
          { l: t("adm.kpi.sessions"), v: "18 946" },
          { l: t("adm.kpi.uptime"), v: "99,9%" },
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
              <TabsTrigger value="patients" className="rounded-xl">{t("adm.tab.patients")}</TabsTrigger>
              <TabsTrigger value="therapists" className="rounded-xl">{t("adm.tab.therapists")}</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-xl">{t("adm.tab.analytics")}</TabsTrigger>
              <TabsTrigger value="logs" className="rounded-xl">{t("adm.tab.logs")}</TabsTrigger>
            </TabsList>

            <TabsContent value="patients" className="mt-5 space-y-2">
              {PATIENTS.map((p) => (
                <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age} {t("adm.yearsShort")} · {p.phobia} · {p.sessions} {t("adm.sessions")}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">{statusLabel[p.status]}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(t("adm.patientRecord"))}>{t("adm.manage")}</Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="therapists" className="mt-5 space-y-2">
              {THERAPISTS.map((th) => (
                <div key={th.n} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{th.n}</p>
                    <p className="text-xs text-muted-foreground">{th.s} · {th.p} {t("adm.patients")}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => toast.info(t("adm.therapistProfile"))}>{t("adm.view")}</Button>
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
                  <span className="truncate">{t(l.key)}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppShell>
  );
}

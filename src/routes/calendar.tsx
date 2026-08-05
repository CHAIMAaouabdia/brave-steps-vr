import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendrier & rendez-vous — G_Phob" },
      { name: "description", content: "Planifiez vos séances, consultez l'historique et vos prochains rendez-vous." },
      { property: "og:title", content: "Calendrier — G_Phob" },
      { property: "og:description", content: "Agenda de vos sessions et rendez-vous thérapeutiques." },
    ],
  }),
  component: CalendarPage,
});

const UPCOMING = [
  { d: "Ven. 7 août · 14:30", t: "Consultation Dr. Rahmani", tag: "Visio" },
  { d: "Lun. 10 août · 18:00", t: "Session niveau 5 — Le pont suspendu", tag: "VR" },
  { d: "Mer. 12 août · 17:30", t: "Session niveau 6 — Vers la lumière", tag: "VR" },
];

const HISTORY = [
  { d: "4 août · 18:20", t: "Niveau 3 — Pluie d'étoiles", s: "Réussie · 9 min" },
  { d: "2 août · 19:05", t: "Niveau 2 — Les clés du calme", s: "Réussie · 8 min" },
  { d: "31 juil. · 17:40", t: "Niveau 1 — Premier souffle", s: "Réussie · 6 min" },
];

function CalendarPage() {
  return (
    <AppShell
      title="Calendrier"
      subtitle="Séances et rendez-vous"
      action={
        <Button size="sm" className="gradient-primary rounded-full" onClick={() => toast.success("Rendez-vous demandé (simulation)")}>
          <Plus className="size-4" /> Rendez-vous
        </Button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-4">
            <Calendar mode="single" className={cn("pointer-events-auto p-3")} />
          </CardContent>
        </Card>
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">À venir</h3>
            <div className="mt-4 space-y-3">
              {UPCOMING.map((u) => (
                <div key={u.t} className="rounded-3xl border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{u.d}</p>
                    <Badge variant="secondary" className="rounded-full">{u.tag}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium">{u.t}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">Historique</h3>
            <div className="mt-4 space-y-3">
              {HISTORY.map((h) => (
                <div key={h.t} className="flex items-start gap-3 rounded-3xl bg-muted/50 p-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{h.t}</p>
                    <p className="text-[11px] text-muted-foreground">{h.d} · {h.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "التقويم والمواعيد — G_Phob" },
      { name: "description", content: "خطّط لجلساتك واطّلع على سجلك ومواعيدك القادمة." },
      { property: "og:title", content: "التقويم — G_Phob" },
      { property: "og:description", content: "أجندة جلساتك ومواعيدك العلاجية." },
    ],
  }),
  component: CalendarPage,
});

const UPCOMING = [
  { dKey: "cal.up1.d", tKey: "cal.up1.t", tag: "cal.visio" },
  { dKey: "cal.up2.d", tKey: "cal.up2.t", tag: "cal.vr" },
  { dKey: "cal.up3.d", tKey: "cal.up3.t", tag: "cal.vr" },
];

const HISTORY = [
  { dKey: "cal.h1.d", tKey: "cal.h1.t", sKey: "cal.h1.s" },
  { dKey: "cal.h2.d", tKey: "cal.h2.t", sKey: "cal.h2.s" },
  { dKey: "cal.h3.d", tKey: "cal.h3.t", sKey: "cal.h3.s" },
];

function CalendarPage() {
  const { t } = useI18n();
  return (
    <AppShell
      title={t("cal.title")}
      subtitle={t("cal.subtitle")}
      action={
        <Button size="sm" className="gradient-primary rounded-full" onClick={() => toast.success(t("cal.toastRequested"))}>
          <Plus className="size-4" /> {t("cal.appointment")}
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
            <h3 className="font-bold">{t("cal.upcoming")}</h3>
            <div className="mt-4 space-y-3">
              {UPCOMING.map((u) => (
                <div key={u.tKey} className="rounded-3xl border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{t(u.dKey)}</p>
                    <Badge variant="secondary" className="rounded-full">{t(u.tag)}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium">{t(u.tKey)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">{t("cal.history")}</h3>
            <div className="mt-4 space-y-3">
              {HISTORY.map((h) => (
                <div key={h.tKey} className="flex items-start gap-3 rounded-3xl bg-muted/50 p-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t(h.tKey)}</p>
                    <p className="text-[11px] text-muted-foreground">{t(h.dKey)} · {t(h.sKey)}</p>
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

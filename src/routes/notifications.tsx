import { createFileRoute } from "@tanstack/react-router";
import { Award, Bell, CalendarDays, CheckCheck, Quote, Trophy } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — G_Phob" },
      { name: "description", content: "Rappels quotidiens, succès débloqués et rendez-vous à venir." },
      { property: "og:title", content: "Notifications — G_Phob" },
      { property: "og:description", content: "Tous vos rappels thérapeutiques au même endroit." },
    ],
  }),
  component: NotificationsPage,
});

const ICONS = {
  reminder: Bell,
  session: Trophy,
  achievement: Award,
  appointment: CalendarDays,
  quote: Quote,
} as const;

function NotificationsPage() {
  const { notifications, markAllRead } = useApp();
  const { t } = useI18n();

  return (
    <AppShell
      title={t("notif.title")}
      subtitle={`${notifications.filter((n) => !n.read).length} ${t("notif.unread")}`}
      action={
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            markAllRead();
            toast.success(t("notif.toastAllRead"));
          }}
        >
          <CheckCheck className="size-4" /> {t("notif.markAllRead")}
        </Button>
      }
    >
      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <Card key={n.id} className={`rounded-4xl border-none shadow-soft ${n.read ? "opacity-70" : ""}`}>
              <CardContent className="flex items-start gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-calm text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{n.date}</p>
                </div>
                {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

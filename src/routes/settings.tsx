import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/lib/app-state";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — G_Phob" },
      { name: "description", content: "المظهر واللغة والملف الشخصي والأمان والإشعارات وإمكانية الوصول." },
      { property: "og:title", content: "الإعدادات — G_Phob" },
      { property: "og:description", content: "خصّص تجربتك على G_Phob." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, user } = useApp();
  const { t, lang, setLang } = useI18n();

  return (
    <AppShell title={t("set.title")} subtitle={t("set.subtitle")}>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">{t("set.appearance")}</h3>
            <Row label={t("set.darkMode")}>
              <Switch checked={theme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
            </Row>
            <Row label={t("set.language")}>
              <div className="flex gap-1">
                {(["fr", "en", "ar"] as Lang[]).map((l) => (
                  <Button
                    key={l}
                    size="sm"
                    variant={lang === l ? "default" : "outline"}
                    className="rounded-full uppercase"
                    onClick={() => setLang(l)}
                  >
                    {l}
                  </Button>
                ))}
              </div>
            </Row>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">{t("set.profile")}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">{t("set.firstName")}</Label>
                <Input defaultValue={user?.firstName ?? "Yasmine"} className="rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">{t("set.lastName")}</Label>
                <Input defaultValue={user?.lastName ?? "Belkacem"} className="rounded-2xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">{t("set.email")}</Label>
              <Input defaultValue={user?.email ?? "yasmine@gphob.io"} className="rounded-2xl" />
            </div>
            <Button className="gradient-primary rounded-2xl" onClick={() => toast.success(t("set.profileUpdated"))}>
              {t("set.save")}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">{t("set.notifications")}</h3>
            {[
              t("set.notif.daily"),
              t("set.notif.sessions"),
              t("set.notif.achievements"),
              t("set.notif.appointments"),
              t("set.notif.quotes"),
            ].map((n) => (
              <Row key={n} label={n}><Switch defaultChecked /></Row>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">{t("set.securityAccessibility")}</h3>
            <Row label={t("set.twoFactor")}><Switch /></Row>
            <Row label={t("set.largeText")}><Switch /></Row>
            <Row label={t("set.reduceMotion")}><Switch /></Row>
            <Row label={t("set.childMode")}><Switch defaultChecked /></Row>
            <Button variant="outline" className="rounded-2xl" onClick={() => toast.success(t("set.passwordEmailSent"))}>
              {t("set.changePassword")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border p-4">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}

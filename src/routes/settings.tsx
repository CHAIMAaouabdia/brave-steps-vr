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
      { title: "Paramètres — G_Phob" },
      { name: "description", content: "Thème, langue, profil, sécurité, notifications et accessibilité." },
      { property: "og:title", content: "Paramètres — G_Phob" },
      { property: "og:description", content: "Personnalisez votre expérience G_Phob." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, user } = useApp();
  const { lang, setLang } = useI18n();

  return (
    <AppShell title="Paramètres" subtitle="Préférences du compte">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">Apparence</h3>
            <Row label="Mode sombre">
              <Switch checked={theme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
            </Row>
            <Row label="Langue">
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
            <h3 className="font-bold">Profil</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Prénom</Label>
                <Input defaultValue={user?.firstName ?? "Yasmine"} className="rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Nom</Label>
                <Input defaultValue={user?.lastName ?? "Belkacem"} className="rounded-2xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input defaultValue={user?.email ?? "yasmine@gphob.io"} className="rounded-2xl" />
            </div>
            <Button className="gradient-primary rounded-2xl" onClick={() => toast.success("Profil mis à jour")}>
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">Notifications</h3>
            {["Rappels quotidiens", "Sessions terminées", "Succès débloqués", "Rendez-vous", "Citations motivantes"].map((n) => (
              <Row key={n} label={n}><Switch defaultChecked /></Row>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-bold">Sécurité & accessibilité</h3>
            <Row label="Authentification à deux facteurs"><Switch /></Row>
            <Row label="Texte agrandi"><Switch /></Row>
            <Row label="Réduire les animations"><Switch /></Row>
            <Row label="Mode enfant simplifié"><Switch defaultChecked /></Row>
            <Button variant="outline" className="rounded-2xl" onClick={() => toast.success("Email de changement de mot de passe envoyé")}>
              Changer le mot de passe
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

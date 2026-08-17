import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/app-state";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "Suivi de l'humeur — G_Phob" },
      { name: "description", content: "Enregistrez votre humeur quotidienne et visualisez son historique." },
      { property: "og:title", content: "Suivi de l'humeur — G_Phob" },
      { property: "og:description", content: "Journal émotionnel quotidien." },
    ],
  }),
  component: MoodPage,
});

const MOOD_KEYS = [
  { e: "😊", key: "mood.happy" as const },
  { e: "😐", key: "mood.neutral" as const },
  { e: "😢", key: "mood.sad" as const },
  { e: "😨", key: "mood.anxious" as const },
  { e: "😴", key: "mood.tired" as const },
];

function MoodPage() {
  const { moods, addMood } = useApp();
  const { t } = useI18n();
  const [selected, setSelected] = useState("😊");
  const [note, setNote] = useState("");

  return (
    <AppShell title={t("mood.title")} subtitle={t("mood.subtitle")}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-4xl border-none shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="grid grid-cols-5 gap-3">
              {MOOD_KEYS.map((m) => (
                <button
                  key={m.e}
                  onClick={() => setSelected(m.e)}
                  className={`rounded-3xl border p-4 text-center transition-all hover:-translate-y-1 ${
                    selected === m.e ? "border-primary bg-primary/10 shadow-soft" : "bg-card"
                  }`}
                >
                  <span className="text-3xl">{m.e}</span>
                  <p className="mt-1 text-[11px] font-medium">{t(m.key)}</p>
                </button>
              ))}
            </div>
            <Textarea
              className="mt-5 rounded-3xl"
              rows={4}
              placeholder={t("mood.notePlaceholder")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              className="gradient-primary mt-4 rounded-2xl"
              onClick={() => {
                addMood(selected, note || t("mood.noNote"));
                setNote("");
                toast.success(t("mood.saved"));
              }}
            >
              {t("mood.save")}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-bold">{t("mood.history")}</h3>
            <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto">
              {moods.map((m) => (
                <div key={m.id} className="flex items-start gap-3 rounded-3xl bg-muted/50 p-3">
                  <span className="text-2xl">{m.mood}</span>
                  <div className="min-w-0">
                    <p className="text-sm">{m.note}</p>
                    <p className="text-[11px] text-muted-foreground">{m.date}</p>
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

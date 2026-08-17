import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — G_Phob" },
      { name: "description", content: "Échangez avec votre thérapeute et l'équipe de soin." },
      { property: "og:title", content: "Messages — G_Phob" },
      { property: "og:description", content: "Messagerie sécurisée patient-thérapeute." },
    ],
  }),
  component: MessagesPage,
});

const THREADS = [
  { id: "t1", nameKey: "msg.t1.name", lastKey: "msg.t1.last", initials: "AR" },
  { id: "t2", nameKey: "msg.t2.name", lastKey: "msg.t2.last", initials: "GP" },
  { id: "t3", nameKey: "msg.t3.name", lastKey: "msg.t3.last", initials: "CK" },
];

function MessagesPage() {
  const { t } = useI18n();
  const [active, setActive] = useState(THREADS[0]!);
  const [msgs, setMsgs] = useState([
    { id: 1, me: false, text: t("msg.m1") },
    { id: 2, me: true, text: t("msg.m2") },
    { id: 3, me: false, text: t("msg.m3") },
  ]);
  const [input, setInput] = useState("");

  return (
    <AppShell title={t("msg.title")} subtitle={t("msg.subtitle")}>
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-3">
            {THREADS.map((th) => (
              <button
                key={th.id}
                onClick={() => setActive(th)}
                className={`flex w-full items-center gap-3 rounded-3xl p-3 text-start transition-colors ${
                  active.id === th.id ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <Avatar className="size-10">
                  <AvatarFallback className="gradient-calm text-xs font-bold text-primary-foreground">{th.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t(th.nameKey)}</p>
                  <p className="truncate text-xs text-muted-foreground">{t(th.lastKey)}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="flex h-[60vh] flex-col p-0">
            <div className="border-b p-4 font-bold">{t(active.nameKey)}</div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-3xl px-4 py-2.5 text-sm ${m.me ? "gradient-primary text-primary-foreground" : "bg-muted"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim()) return;
                setMsgs((m) => [...m, { id: Date.now(), me: true, text: input }]);
                setInput("");
              }}
            >
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("msg.placeholder")} className="rounded-2xl" />
              <Button type="submit" size="icon" className="gradient-primary size-10 shrink-0 rounded-2xl">
                <Send className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

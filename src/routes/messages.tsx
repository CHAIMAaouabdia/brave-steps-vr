import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  { id: "t1", name: "Dr. Amina Rahmani", last: "Bravo pour la session d'hier !", initials: "AR" },
  { id: "t2", name: "Support G_Phob", last: "Votre casque est bien configuré.", initials: "GP" },
  { id: "t3", name: "Coach Karim", last: "On se voit vendredi ?", initials: "CK" },
];

function MessagesPage() {
  const [active, setActive] = useState(THREADS[0]!);
  const [msgs, setMsgs] = useState([
    { id: 1, me: false, text: "Bonjour Yasmine, comment s'est passée la session ?" },
    { id: 2, me: true, text: "Beaucoup mieux, mon stress est descendu à 3/10 !" },
    { id: 3, me: false, text: "Bravo pour la session d'hier ! On passe au niveau 4 vendredi." },
  ]);
  const [input, setInput] = useState("");

  return (
    <AppShell title="Messages" subtitle="Messagerie simulée">
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="p-3">
            {THREADS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={`flex w-full items-center gap-3 rounded-3xl p-3 text-start transition-colors ${
                  active.id === t.id ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <Avatar className="size-10">
                  <AvatarFallback className="gradient-calm text-xs font-bold text-primary-foreground">{t.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.last}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-none shadow-soft">
          <CardContent className="flex h-[60vh] flex-col p-0">
            <div className="border-b p-4 font-bold">{active.name}</div>
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
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Votre message…" className="rounded-2xl" />
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

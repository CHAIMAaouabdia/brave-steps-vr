import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "المساعد العلاجي الذكي — G_Phob" },
      { name: "description", content: "مرافقة حوارية افتراضية متاحة بين جلساتك العلاجية." },
      { property: "og:title", content: "المساعد الذكي — G_Phob" },
      { property: "og:description", content: "تحدّث مع معالجك الافتراضي." },
    ],
  }),
  component: AIPage,
});

type Msg = { id: number; role: "user" | "ai"; text: string };

function AIPage() {
  const { t } = useI18n();
  const REPLY_KEYS = ["ai.reply1", "ai.reply2", "ai.reply3", "ai.reply4", "ai.reply5", "ai.reply6"];
  const QUESTION_KEYS = ["ai.q1", "ai.q2", "ai.q3", "ai.q4", "ai.q5"];

  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, role: "ai", text: t("ai.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "ai", text: t(REPLY_KEYS[Math.floor(Math.random() * REPLY_KEYS.length)]!) },
      ]);
    }, 1200);
  };

  return (
    <AppShell title={t("ai.title")} subtitle={t("ai.subtitle")}>
      <Card className="rounded-4xl border-none shadow-soft">
        <CardContent className="flex h-[65vh] flex-col p-0">
          <div className="flex items-center gap-3 border-b p-4">
            <span className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
              <BrainCircuit className="size-5" />
            </span>
            <div>
              <p className="font-bold">{t("ai.name")}</p>
              <p className="text-xs text-emerald">{t("ai.online")}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm ${
                    m.role === "user" ? "gradient-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 rounded-3xl bg-muted px-4 py-3 w-fit">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-2 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUESTION_KEYS.map((qk) => (
                <button
                  key={qk}
                  onClick={() => send(t(qk))}
                  className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                >
                  {t(qk)}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.placeholder")}
                className="rounded-2xl"
              />
              <Button type="submit" size="icon" className="gradient-primary size-10 shrink-0 rounded-2xl">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

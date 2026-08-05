import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AI_REPLIES, SUGGESTED_QUESTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "Assistant IA thérapeutique — G_Phob" },
      { name: "description", content: "Un accompagnement conversationnel simulé disponible entre vos séances." },
      { property: "og:title", content: "Assistant IA — G_Phob" },
      { property: "og:description", content: "Discutez avec votre thérapeute virtuel." },
    ],
  }),
  component: AIPage,
});

type Msg = { id: number; role: "user" | "ai"; text: string };

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, role: "ai", text: "Bonjour 👋 Je suis Aria, votre assistante thérapeutique. Comment vous sentez-vous aujourd'hui ?" },
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
        { id: Date.now() + 1, role: "ai", text: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]! },
      ]);
    }, 1200);
  };

  return (
    <AppShell title="Assistant IA" subtitle="Aria · réponses simulées">
      <Card className="rounded-4xl border-none shadow-soft">
        <CardContent className="flex h-[65vh] flex-col p-0">
          <div className="flex items-center gap-3 border-b p-4">
            <span className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
              <BrainCircuit className="size-5" />
            </span>
            <div>
              <p className="font-bold">Aria</p>
              <p className="text-xs text-emerald">En ligne</p>
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
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                >
                  {q}
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
                placeholder="Écrivez votre message…"
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

import { createFileRoute } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { monthlyProgress, pieData, radarData, weeklySessions } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Statistiques & progression — G_Phob" },
      { name: "description", content: "Courbes de stress, d'humeur, de peur et taux de complétion de votre thérapie." },
      { property: "og:title", content: "Statistiques — G_Phob" },
      { property: "og:description", content: "Analyse complète de votre progression thérapeutique." },
    ],
  }),
  component: ProgressPage,
});

const COLORS = ["var(--primary)", "var(--emerald)", "var(--violet)", "var(--warning)"];
const tip = { borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)" };

function ProgressPage() {
  const { t } = useI18n();
  return (
    <AppShell
      title={t("progress.title")}
      subtitle={t("progress.subtitle")}
      action={
        <>
          <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success(t("progress.pdfGenerated"))}>
            <Download className="size-4" /> {t("progress.pdf")}
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success(t("progress.csvExported"))}>
            {t("progress.csv")}
          </Button>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: t("progress.completionRate"), v: "78%" },
          { l: t("progress.successRate"), v: "91%" },
          { l: t("progress.avgDuration"), v: "12 min" },
          { l: t("progress.satisfaction"), v: "4.8/5" },
        ].map((k) => (
          <Card key={k.l} className="hover-lift rounded-4xl border-none shadow-soft">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{k.l}</p>
              <p className="text-2xl font-extrabold text-gradient">{k.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard title={t("progress.weeklySessions")}>
          <BarChart data={weeklySessions}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tip} />
            <Bar dataKey="sessions" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title={t("progress.monthlySessions")}>
          <LineChart data={monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tip} />
            <Legend />
            <Line type="monotone" dataKey="sessions" stroke="var(--primary)" strokeWidth={3} />
            <Line type="monotone" dataKey="completion" stroke="var(--emerald)" strokeWidth={3} />
          </LineChart>
        </ChartCard>

        <ChartCard title={t("progress.stressMoodEvolution")}>
          <LineChart data={weeklySessions}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tip} />
            <Legend />
            <Line type="monotone" dataKey="stress" stroke="var(--violet)" strokeWidth={3} />
            <Line type="monotone" dataKey="mood" stroke="var(--emerald)" strokeWidth={3} />
          </LineChart>
        </ChartCard>

        <ChartCard title={t("progress.fearEvolution")}>
          <LineChart data={monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tip} />
            <Line type="monotone" dataKey="fear" stroke="var(--warning)" strokeWidth={3} />
          </LineChart>
        </ChartCard>

        <ChartCard title={t("progress.psychoSkills")}>
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="axis" fontSize={12} stroke="var(--muted-foreground)" />
            <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.35} />
            <Tooltip contentStyle={tip} />
          </RadarChart>
        </ChartCard>

        <ChartCard title={t("progress.sessionDistribution")}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={4}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip contentStyle={tip} />
          </PieChart>
        </ChartCard>
      </div>
    </AppShell>
  );
}

function ChartCard({ title, children }: { title: React.ReactNode; children: React.ReactElement }) {
  return (
    <Card className="rounded-4xl border-none shadow-soft">
      <CardContent className="p-6">
        <h3 className="font-bold">{title}</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

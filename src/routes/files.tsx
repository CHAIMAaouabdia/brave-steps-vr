import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/files")({
  head: () => ({
    meta: [
      { title: "Documents médicaux — G_Phob" },
      { name: "description", content: "Déposez et consultez vos rapports médicaux, ordonnances et images." },
      { property: "og:title", content: "Documents — G_Phob" },
      { property: "og:description", content: "Gestion de vos documents de santé." },
    ],
  }),
  component: FilesPage,
});

type Doc = { name: string; size: string; type: string };

function FilesPage() {
  const { t } = useI18n();
  const [files, setFiles] = useState<Doc[]>([
    { name: "Bilan_psychologique_2026.pdf", size: "412 Ko", type: "pdf" },
    { name: "Ordonnance_juin.pdf", size: "88 Ko", type: "pdf" },
    { name: "Scan_dessin_therapie.png", size: "1,2 Mo", type: "image" },
  ]);

  return (
    <AppShell title={t("files.title")} subtitle={t("files.subtitle")}>
      <Card className="rounded-4xl border-none shadow-soft">
        <CardContent className="p-6">
          <label className="grid cursor-pointer place-items-center rounded-4xl border-2 border-dashed p-10 text-center transition-colors hover:bg-muted/50">
            <Upload className="size-8 text-primary" />
            <p className="mt-3 font-semibold">{t("files.drop")}</p>
            <p className="text-xs text-muted-foreground">{t("files.dropHint")}</p>
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFiles((p) => [
                  { name: f.name, size: `${Math.round(f.size / 1024)} ${t("files.ko")}`, type: f.type.includes("image") ? "image" : "pdf" },
                  ...p,
                ]);
                toast.success(t("files.toastUploaded"));
              }}
            />
          </label>

          <div className="mt-6 space-y-3">
            {files.map((f) => (
              <div key={f.name} className="flex items-center gap-4 rounded-3xl border p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  {f.type === "image" ? <ImageIcon className="size-5" /> : <FileText className="size-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.size}</p>
                </div>
                <Badge variant="secondary" className="hidden rounded-full sm:inline-flex">{f.type.toUpperCase()}</Badge>
                <Button size="icon" variant="ghost" onClick={() => toast.success(t("files.toastDownload"))}>
                  <Download className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

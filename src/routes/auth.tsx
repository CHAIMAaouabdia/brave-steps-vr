import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BrainCircuit, Chrome, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp, type Role } from "@/lib/app-state";
import heroImg from "@/assets/hero-vr.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — G_Phob" },
      { name: "description", content: "Connectez-vous ou créez votre compte patient ou thérapeute sur G_Phob." },
      { property: "og:title", content: "Connexion — G_Phob" },
      { property: "og:description", content: "Accédez à votre parcours de thérapie VR." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>("patient");
  const [mode, setMode] = useState("login");

  const simulate = (fn: () => void, msg: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fn();
      toast.success(msg);
    }, 900);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="gradient-hero relative hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <BrainCircuit className="size-5" />
          </span>
          <span className="text-xl font-extrabold">G_Phob</span>
        </Link>
        <div>
          <img src={heroImg} loading="lazy" width={1408} height={1104} alt="Thérapie VR" className="float-slow rounded-4xl shadow-float" />
          <h2 className="mt-8 text-3xl font-extrabold">Votre parcours vers la sérénité</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Exposition graduelle, missions ludiques et suivi clinique — dans un environnement
            totalement sécurisé.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Prototype MVP — authentification simulée.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md rounded-4xl border-none shadow-float">
          <CardContent className="p-6 sm:p-8">
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                <TabsTrigger value="login" className="rounded-xl">Connexion</TabsTrigger>
                <TabsTrigger value="register" className="rounded-xl">Inscription</TabsTrigger>
                <TabsTrigger value="forgot" className="rounded-xl">Oubli</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
                  {(["patient", "therapist"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`rounded-xl py-2 text-sm font-semibold transition-all ${
                        role === r ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"
                      }`}
                    >
                      {r === "patient" ? "Patient" : "Thérapeute"}
                    </button>
                  ))}
                </div>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = (new FormData(e.currentTarget).get("email") as string) || "demo@gphob.io";
                    simulate(() => {
                      login(email, role);
                      navigate({ to: role === "therapist" ? "/therapist" : "/dashboard" });
                    }, "Connexion réussie");
                  }}
                >
                  <Field label="Email">
                    <Input name="email" type="email" required defaultValue="yasmine@gphob.io" className="rounded-2xl" />
                  </Field>
                  <Field label="Mot de passe">
                    <Input type="password" required defaultValue="demo1234" className="rounded-2xl" />
                  </Field>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox defaultChecked /> Se souvenir de moi
                    </label>
                    <button type="button" className="text-sm font-medium text-primary" onClick={() => setMode("forgot")}>
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <Button disabled={loading} className="gradient-primary w-full rounded-2xl" type="submit">
                    {loading && <Loader2 className="size-4 animate-spin" />} Se connecter
                  </Button>
                </form>
                <GoogleButton onClick={() => simulate(() => { login("google.user@gmail.com", role); navigate({ to: role === "therapist" ? "/therapist" : "/dashboard" }); }, "Connexion Google simulée")} />
              </TabsContent>

              <TabsContent value="register" className="mt-6">
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    simulate(() => {
                      register({
                        firstName: (fd.get("firstName") as string) || "Yasmine",
                        lastName: (fd.get("lastName") as string) || "Belkacem",
                        email: (fd.get("email") as string) || "demo@gphob.io",
                        role: "patient",
                        age: fd.get("age") as string,
                        gender: (fd.get("gender") as string) ?? "",
                        country: fd.get("country") as string,
                        emergency: fd.get("emergency") as string,
                      });
                      navigate({ to: "/assessment" });
                    }, "Compte créé — évaluation initiale");
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Prénom"><Input name="firstName" required className="rounded-2xl" /></Field>
                    <Field label="Nom"><Input name="lastName" required className="rounded-2xl" /></Field>
                    <Field label="Âge"><Input name="age" type="number" min={7} max={99} required className="rounded-2xl" /></Field>
                    <Field label="Genre">
                      <Select name="gender" defaultValue="f">
                        <SelectTrigger className="w-full rounded-2xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="f">Femme</SelectItem>
                          <SelectItem value="m">Homme</SelectItem>
                          <SelectItem value="o">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Pays"><Input name="country" defaultValue="France" required className="rounded-2xl" /></Field>
                  <Field label="Email"><Input name="email" type="email" required className="rounded-2xl" /></Field>
                  <Field label="Mot de passe"><Input type="password" required minLength={6} className="rounded-2xl" /></Field>
                  <Field label="Contact d'urgence"><Input name="emergency" placeholder="Nom + téléphone" required className="rounded-2xl" /></Field>
                  <Button disabled={loading} type="submit" className="gradient-primary w-full rounded-2xl">
                    {loading && <Loader2 className="size-4 animate-spin" />} Créer mon compte
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="forgot" className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Saisissez votre email : un lien de réinitialisation vous sera envoyé (simulation).
                </p>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    simulate(() => setMode("login"), "Email de réinitialisation envoyé");
                  }}
                >
                  <Field label="Email"><Input type="email" required className="rounded-2xl" /></Field>
                  <Button disabled={loading} type="submit" className="gradient-primary w-full rounded-2xl">
                    {loading && <Loader2 className="size-4 animate-spin" />} Envoyer le lien
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              En continuant, vous acceptez nos CGU et notre politique de confidentialité.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <Button variant="outline" className="w-full rounded-2xl" onClick={onClick}>
        <Chrome className="size-4" /> Continuer avec Google
      </Button>
    </>
  );
}

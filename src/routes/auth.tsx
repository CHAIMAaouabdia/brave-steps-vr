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
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-vr.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — G_Phob" },
      { name: "description", content: "سجّل الدخول أو أنشئ حسابك كمريض أو معالج على G_Phob." },
      { property: "og:title", content: "تسجيل الدخول — G_Phob" },
      { property: "og:description", content: "ادخل إلى رحلتك العلاجية بالواقع الافتراضي." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register } = useApp();
  const { t } = useI18n();
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
          <img src={heroImg} loading="lazy" width={1408} height={1104} alt={t("auth.imgAlt")} className="float-slow rounded-4xl shadow-float" />
          <h2 className="mt-8 text-3xl font-extrabold">{t("auth.tagline.title")}</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            {t("auth.tagline.text")}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{t("auth.prototypeNote")}</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md rounded-4xl border-none shadow-float">
          <CardContent className="p-6 sm:p-8">
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                <TabsTrigger value="login" className="rounded-xl">{t("auth.tabs.login")}</TabsTrigger>
                <TabsTrigger value="register" className="rounded-xl">{t("auth.tabs.register")}</TabsTrigger>
                <TabsTrigger value="forgot" className="rounded-xl">{t("auth.tabs.forgot")}</TabsTrigger>
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
                      {r === "patient" ? t("auth.role.patient") : t("auth.role.therapist")}
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
                    }, t("auth.toast.loginSuccess"));
                  }}
                >
                  <Field label={t("auth.field.email")}>
                    <Input name="email" type="email" required defaultValue="yasmine@gphob.io" className="rounded-2xl" />
                  </Field>
                  <Field label={t("auth.field.password")}>
                    <Input type="password" required defaultValue="demo1234" className="rounded-2xl" />
                  </Field>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox defaultChecked /> {t("auth.rememberMe")}
                    </label>
                    <button type="button" className="text-sm font-medium text-primary" onClick={() => setMode("forgot")}>
                      {t("auth.forgotPassword")}
                    </button>
                  </div>
                  <Button disabled={loading} className="gradient-primary w-full rounded-2xl" type="submit">
                    {loading && <Loader2 className="size-4 animate-spin" />} {t("auth.signIn")}
                  </Button>
                </form>
                <GoogleButton onClick={() => simulate(() => { login("google.user@gmail.com", role); navigate({ to: role === "therapist" ? "/therapist" : "/dashboard" }); }, t("auth.toast.googleLogin"))} />
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
                    }, t("auth.toast.registerSuccess"));
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={t("auth.field.firstName")}><Input name="firstName" required className="rounded-2xl" /></Field>
                    <Field label={t("auth.field.lastName")}><Input name="lastName" required className="rounded-2xl" /></Field>
                    <Field label={t("auth.field.age")}><Input name="age" type="number" min={7} max={99} required className="rounded-2xl" /></Field>
                    <Field label={t("auth.field.gender")}>
                      <Select name="gender" defaultValue="f">
                        <SelectTrigger className="w-full rounded-2xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="f">{t("auth.gender.f")}</SelectItem>
                          <SelectItem value="m">{t("auth.gender.m")}</SelectItem>
                          <SelectItem value="o">{t("auth.gender.o")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label={t("auth.field.country")}><Input name="country" defaultValue="France" required className="rounded-2xl" /></Field>
                  <Field label={t("auth.field.email")}><Input name="email" type="email" required className="rounded-2xl" /></Field>
                  <Field label={t("auth.field.password")}><Input type="password" required minLength={6} className="rounded-2xl" /></Field>
                  <Field label={t("auth.field.emergency")}><Input name="emergency" placeholder={t("auth.field.emergencyPlaceholder")} required className="rounded-2xl" /></Field>
                  <Button disabled={loading} type="submit" className="gradient-primary w-full rounded-2xl">
                    {loading && <Loader2 className="size-4 animate-spin" />} {t("auth.createAccount")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="forgot" className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("auth.forgot.text")}
                </p>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    simulate(() => setMode("login"), t("auth.toast.resetSent"));
                  }}
                >
                  <Field label={t("auth.field.email")}><Input type="email" required className="rounded-2xl" /></Field>
                  <Button disabled={loading} type="submit" className="gradient-primary w-full rounded-2xl">
                    {loading && <Loader2 className="size-4 animate-spin" />} {t("auth.sendLink")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              {t("auth.legalNote")}
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
  const { t } = useI18n();
  return (
    <>
      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("auth.orDivider")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <Button variant="outline" className="w-full rounded-2xl" onClick={onClick}>
        <Chrome className="size-4" /> {t("auth.continueGoogle")}
      </Button>
    </>
  );
}

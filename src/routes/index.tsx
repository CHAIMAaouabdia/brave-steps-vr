import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Gamepad2,
  HeartPulse,
  LineChart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n, type Lang } from "@/lib/i18n";
import heroImg from "@/assets/hero-vr.jpg";
import forestImg from "@/assets/scene-forest.jpg";
import mountainImg from "@/assets/scene-mountain.jpg";
import therapistImg from "@/assets/therapist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G_Phob — Thérapie VR des phobies assistée par IA" },
      {
        name: "description",
        content:
          "Vaincre les phobies et l'anxiété grâce à l'exposition graduelle en réalité virtuelle, la gamification et le suivi thérapeutique.",
      },
      { property: "og:title", content: "G_Phob — Thérapie VR des phobies" },
      {
        property: "og:description",
        content: "Exposition graduelle en réalité virtuelle assistée par IA, pour tous les âges.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { icon: Users, title: "Évaluation initiale", text: "Un questionnaire intelligent identifie vos peurs, leur intensité et leur impact." },
  { icon: BrainCircuit, title: "Profil thérapeutique IA", text: "L'IA génère un parcours d'exposition personnalisé et un score de risque." },
  { icon: Gamepad2, title: "Missions immersives", text: "10 niveaux d'exposition gamifiés, du plus doux au plus intense." },
  { icon: LineChart, title: "Suivi clinique", text: "Votre thérapeute suit vos courbes de stress, d'humeur et de progression." },
];

const BENEFITS = [
  { icon: ShieldCheck, title: "Environnement sécurisé", text: "L'exposition se fait dans un cadre virtuel totalement contrôlé, avec sortie immédiate possible." },
  { icon: Gamepad2, title: "Motivation par le jeu", text: "XP, badges, pièces et récompenses quotidiennes maintiennent l'engagement des plus jeunes." },
  { icon: HeartPulse, title: "Régulation émotionnelle", text: "Exercices de respiration et d'ancrage intégrés à chaque mission." },
  { icon: Activity, title: "Données objectives", text: "Chaque session produit des indicateurs mesurables pour le clinicien." },
  { icon: BrainCircuit, title: "IA d'accompagnement", text: "Un assistant conversationnel disponible 24/7 entre les séances." },
  { icon: Users, title: "Tous les âges", text: "Des parcours adaptés aux enfants, adolescents et adultes." },
];

const TESTIMONIALS = [
  { name: "Yasmine, 12 ans", role: "Phobie des chiens", text: "Avant j'avais peur de sortir. Maintenant je caresse le chien de ma voisine !", rating: 5 },
  { name: "Lucas, 27 ans", role: "Acrophobie", text: "Après 8 semaines, j'ai pu monter sur la terrasse du 15e étage sans panique.", rating: 5 },
  { name: "Dr. Amina Rahmani", role: "Psychologue clinicienne", text: "Le suivi de données transforme réellement ma pratique en TCC.", rating: 5 },
];

const FAQ = [
  { q: "G_Phob remplace-t-il un thérapeute ?", a: "Non. G_Phob est un outil d'accompagnement conçu pour être utilisé en complément d'un suivi clinique. Chaque parcours peut être supervisé par un thérapeute." },
  { q: "Faut-il un casque de réalité virtuelle ?", a: "Un casque améliore l'immersion, mais le prototype fonctionne également en mode écran sur ordinateur, tablette et mobile." },
  { q: "À partir de quel âge ?", a: "Les parcours sont adaptés dès 7 ans, avec un mode enfant plus ludique et des sessions plus courtes." },
  { q: "Mes données sont-elles protégées ?", a: "Les données de santé sont chiffrées et l'architecture cible est conforme RGPD. Ce prototype utilise des données simulées." },
  { q: "Combien de temps dure un parcours ?", a: "En moyenne 8 à 12 semaines, à raison de 2 à 3 sessions hebdomadaires de 10 à 20 minutes." },
];

function Landing() {
  const { t, lang, setLang } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground">
              <BrainCircuit className="size-5" />
            </span>
            <span className="truncate text-xl font-extrabold tracking-tight">G_Phob</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground xl:flex">
              <a href="#how" className="transition-colors hover:text-foreground">{t("nav.how")}</a>
              <a href="#benefits" className="transition-colors hover:text-foreground">{t("nav.benefits")}</a>
              <a href="#science" className="transition-colors hover:text-foreground">{t("nav.science")}</a>
              <a href="#faq" className="transition-colors hover:text-foreground">{t("nav.faq")}</a>
              <a href="#contact" className="transition-colors hover:text-foreground">{t("nav.contact")}</a>
            </nav>
            <div className="flex items-center rounded-full border p-0.5">
              {(["fr", "en", "ar"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                    lang === l ? "gradient-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/auth">{t("cta.login")}</Link>
            </Button>
            <Button asChild className="gradient-primary rounded-full shadow-soft">
              <Link to="/auth">{t("cta.start")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <Badge className="rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-foreground shadow-soft hover:bg-card">
              <Sparkles className="me-1 size-3.5" /> {t("hero.badge")}
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary rounded-full px-8 shadow-float">
                <Link to="/auth">{t("cta.start")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card px-8">
                <a href="#how">{t("cta.learn")}</a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { v: "2 400+", l: t("hero.stat1") },
                { v: "87%", l: t("hero.stat2") },
                { v: "4.8/5", l: t("hero.stat3") },
              ].map((s) => (
                <div key={s.l} className="rounded-3xl bg-card/70 p-4 backdrop-blur shadow-soft">
                  <p className="text-2xl font-extrabold text-gradient">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Enfant utilisant un casque de réalité virtuelle dans un environnement apaisant"
              width={1408}
              height={1104}
              className="float-slow w-full rounded-4xl shadow-float"
            />
            <div className="absolute -bottom-4 start-2 hidden rounded-3xl bg-card p-4 shadow-float sm:block">
              <p className="text-xs text-muted-foreground">Niveau de stress</p>
              <p className="text-2xl font-bold text-emerald">-42%</p>
              <p className="text-xs text-muted-foreground">après 6 sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle kicker="Parcours" title={t("section.how")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Card key={s.title} className="hover-lift rounded-4xl border-none shadow-soft">
              <CardContent className="p-6">
                <span className="grid size-12 place-items-center rounded-2xl gradient-calm text-primary-foreground">
                  <s.icon className="size-6" />
                </span>
                <p className="mt-4 text-xs font-bold text-muted-foreground">ÉTAPE {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle kicker="Bénéfices" title={t("section.benefits")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="hover-lift rounded-4xl border-none shadow-soft">
                <CardContent className="p-6">
                  <b.icon className="size-8 text-primary" />
                  <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={forestImg} loading="lazy" width={1600} height={900} alt="Scène immersive de forêt" className="col-span-2 rounded-4xl shadow-soft" />
            <img src={mountainImg} loading="lazy" width={1600} height={900} alt="Scène immersive de montagne" className="rounded-3xl shadow-soft" />
            <img src={therapistImg} loading="lazy" width={900} height={900} alt="Thérapeute clinicienne" className="rounded-3xl object-cover shadow-soft" />
          </div>
          <div>
            <SectionTitle kicker="Science" title={t("section.science")} align="start" />
            <p className="mt-4 text-muted-foreground">
              G_Phob s'appuie sur les thérapies cognitivo-comportementales (TCC) et sur l'exposition
              graduelle, dont l'efficacité est documentée dans le traitement des phobies
              spécifiques. La réalité virtuelle permet une habituation progressive dans un cadre
              maîtrisé et reproductible.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Hiérarchie d'exposition en 10 paliers calibrés",
                "Mesure continue du SUD (Subjective Units of Distress)",
                "Renforcement positif et prévention de l'évitement",
                "Rapports cliniques exportables pour le praticien",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald" />
                  <span className="text-sm">{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle kicker="Témoignages" title={t("section.testimonials")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((tst) => (
              <Card key={tst.name} className="hover-lift rounded-4xl border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: tst.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm italic">“{tst.text}”</p>
                  <div className="mt-5">
                    <p className="font-semibold">{tst.name}</p>
                    <p className="text-xs text-muted-foreground">{tst.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionTitle kicker="FAQ" title={t("section.faq")} />
        <Accordion type="single" collapsible className="mt-10">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="rounded-3xl border-b px-2">
              <AccordionTrigger className="text-start text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionTitle kicker="Contact" title={t("section.contact")} align="start" />
            <p className="mt-4 text-muted-foreground">
              Vous êtes clinicien, établissement de santé ou incubateur ? Écrivez-nous, nous
              organisons une démonstration complète du prototype.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex items-center gap-3"><Mail className="size-4 text-primary" /> contact@gphob.io</p>
              <p className="flex items-center gap-3"><Phone className="size-4 text-primary" /> +33 1 84 80 00 12</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 text-primary" /> Paris · Tunis · Montréal</p>
            </div>
          </div>
          <Card className="rounded-4xl border-none shadow-soft">
            <CardContent className="p-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Message envoyé ! Notre équipe vous répond sous 24h.");
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input required placeholder="Nom" className="rounded-2xl" />
                  <Input required type="email" placeholder="Email" className="rounded-2xl" />
                </div>
                <Input placeholder="Organisation" className="rounded-2xl" />
                <Textarea required placeholder="Votre message" rows={5} className="rounded-2xl" />
                <Button type="submit" className="gradient-primary w-full rounded-2xl">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                <BrainCircuit className="size-5" />
              </span>
              <span className="text-lg font-extrabold">G_Phob</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Thérapie par exposition en réalité virtuelle assistée par IA. Prototype MVP.
            </p>
          </div>
          {[
            { title: "Produit", links: ["Fonctionnalités", "Niveaux", "Assistant IA", "Tarifs"] },
            { title: "Cliniciens", links: ["Espace thérapeute", "Rapports", "Recherche", "Formation"] },
            { title: "Légal", links: ["Confidentialité", "CGU", "RGPD", "Mentions légales"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <button className="transition-colors hover:text-foreground" onClick={() => toast.info("Section de démonstration")}>
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © 2026 G_Phob. Prototype de démonstration — données simulées.
        </p>
      </footer>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  align = "center",
}: {
  kicker: string;
  title: string;
  align?: "center" | "start";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{title}</h2>
    </div>
  );
}

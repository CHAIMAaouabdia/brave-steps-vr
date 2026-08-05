import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.how": "Comment ça marche",
  "nav.benefits": "Bénéfices",
  "nav.science": "Approche scientifique",
  "nav.testimonials": "Témoignages",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "cta.start": "Commencer la thérapie",
  "cta.learn": "En savoir plus",
  "cta.login": "Connexion",
  "hero.badge": "Thérapie par exposition en réalité virtuelle assistée par IA",
  "hero.title": "Vaincre ses peurs, une immersion à la fois",
  "hero.subtitle":
    "G_Phob accompagne enfants, adolescents et adultes dans le traitement des phobies et troubles anxieux grâce à une exposition graduelle, ludique et encadrée par des thérapeutes.",
  "hero.stat1": "Patients accompagnés",
  "hero.stat2": "Taux de complétion",
  "hero.stat3": "Satisfaction",
  "section.how": "Un parcours en 4 étapes",
  "section.benefits": "Pourquoi G_Phob",
  "section.science": "Une approche fondée sur la science",
  "section.testimonials": "Ils ont retrouvé confiance",
  "section.faq": "Questions fréquentes",
  "section.contact": "Parlons de votre projet",
  "nav.dashboard": "Tableau de bord",
  "nav.therapy": "Thérapie",
  "nav.progress": "Progression",
  "nav.mood": "Humeur",
  "nav.ai": "Assistant IA",
  "nav.calendar": "Calendrier",
  "nav.messages": "Messages",
  "nav.notifications": "Notifications",
  "nav.files": "Documents",
  "nav.profile": "Profil thérapeutique",
  "nav.settings": "Paramètres",
  "nav.therapist": "Espace thérapeute",
  "nav.admin": "Administration",
  "auth.login": "Se connecter",
  "auth.register": "Créer un compte",
  "auth.logout": "Déconnexion",
};

const en: Dict = {
  "nav.how": "How it works",
  "nav.benefits": "Benefits",
  "nav.science": "Scientific approach",
  "nav.testimonials": "Testimonials",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "cta.start": "Start therapy",
  "cta.learn": "Learn more",
  "cta.login": "Log in",
  "hero.badge": "AI-assisted virtual reality exposure therapy",
  "hero.title": "Overcome your fears, one immersion at a time",
  "hero.subtitle":
    "G_Phob supports children, teenagers and adults through gradual, gamified exposure therapy supervised by clinicians.",
  "hero.stat1": "Patients supported",
  "hero.stat2": "Completion rate",
  "hero.stat3": "Satisfaction",
  "section.how": "A 4-step journey",
  "section.benefits": "Why G_Phob",
  "section.science": "A science-based approach",
  "section.testimonials": "They regained confidence",
  "section.faq": "Frequently asked questions",
  "section.contact": "Let's talk",
  "nav.dashboard": "Dashboard",
  "nav.therapy": "Therapy",
  "nav.progress": "Progress",
  "nav.mood": "Mood",
  "nav.ai": "AI Assistant",
  "nav.calendar": "Calendar",
  "nav.messages": "Messages",
  "nav.notifications": "Notifications",
  "nav.files": "Files",
  "nav.profile": "Therapy profile",
  "nav.settings": "Settings",
  "nav.therapist": "Therapist space",
  "nav.admin": "Admin panel",
  "auth.login": "Sign in",
  "auth.register": "Create account",
  "auth.logout": "Sign out",
};

const ar: Dict = {
  "nav.how": "كيف يعمل",
  "nav.benefits": "الفوائد",
  "nav.science": "المقاربة العلمية",
  "nav.testimonials": "الشهادات",
  "nav.faq": "الأسئلة الشائعة",
  "nav.contact": "اتصل بنا",
  "cta.start": "ابدأ العلاج",
  "cta.learn": "اعرف المزيد",
  "cta.login": "تسجيل الدخول",
  "hero.badge": "العلاج بالتعرض في الواقع الافتراضي بمساعدة الذكاء الاصطناعي",
  "hero.title": "تغلب على مخاوفك، تجربة تلو الأخرى",
  "hero.subtitle":
    "يرافق G_Phob الأطفال والمراهقين والبالغين في علاج الرهاب والقلق عبر تعرض تدريجي وممتع بإشراف المعالجين.",
  "hero.stat1": "مريض مرافق",
  "hero.stat2": "نسبة الإتمام",
  "hero.stat3": "الرضا",
  "section.how": "رحلة من أربع خطوات",
  "section.benefits": "لماذا G_Phob",
  "section.science": "مقاربة قائمة على العلم",
  "section.testimonials": "استعادوا ثقتهم",
  "section.faq": "الأسئلة الشائعة",
  "section.contact": "لنتحدث",
  "nav.dashboard": "لوحة التحكم",
  "nav.therapy": "العلاج",
  "nav.progress": "التقدم",
  "nav.mood": "المزاج",
  "nav.ai": "المساعد الذكي",
  "nav.calendar": "التقويم",
  "nav.messages": "الرسائل",
  "nav.notifications": "الإشعارات",
  "nav.files": "الملفات",
  "nav.profile": "الملف العلاجي",
  "nav.settings": "الإعدادات",
  "nav.therapist": "فضاء المعالج",
  "nav.admin": "الإدارة",
  "auth.login": "دخول",
  "auth.register": "إنشاء حساب",
  "auth.logout": "خروج",
};

const dicts: Record<Lang, Dict> = { fr, en, ar };

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("gphob.lang") as Lang | null;
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: (l) => {
        setLangState(l);
        localStorage.setItem("gphob.lang", l);
      },
      t: (key) => dicts[lang][key] ?? dicts.fr[key] ?? key,
    }),
    [lang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

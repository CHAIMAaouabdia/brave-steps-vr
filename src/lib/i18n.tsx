import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";

/** key: [fr, en, ar] */
const T: Record<string, [string, string, string]> = {
  // ---------- navigation / shell ----------
  "nav.how": ["Comment ça marche", "How it works", "كيف يعمل"],
  "nav.benefits": ["Bénéfices", "Benefits", "الفوائد"],
  "nav.science": ["Approche scientifique", "Scientific approach", "المقاربة العلمية"],
  "nav.testimonials": ["Témoignages", "Testimonials", "الشهادات"],
  "nav.faq": ["FAQ", "FAQ", "الأسئلة الشائعة"],
  "nav.contact": ["Contact", "Contact", "اتصل بنا"],
  "nav.dashboard": ["Tableau de bord", "Dashboard", "لوحة التحكم"],
  "nav.therapy": ["Thérapie", "Therapy", "العلاج"],
  "nav.progress": ["Progression", "Progress", "التقدم"],
  "nav.mood": ["Humeur", "Mood", "المزاج"],
  "nav.ai": ["Assistant IA", "AI Assistant", "المساعد الذكي"],
  "nav.calendar": ["Calendrier", "Calendar", "التقويم"],
  "nav.messages": ["Messages", "Messages", "الرسائل"],
  "nav.notifications": ["Notifications", "Notifications", "الإشعارات"],
  "nav.files": ["Documents", "Files", "الملفات"],
  "nav.profile": ["Profil thérapeutique", "Therapy profile", "الملف العلاجي"],
  "nav.settings": ["Paramètres", "Settings", "الإعدادات"],
  "nav.therapist": ["Espace thérapeute", "Therapist space", "فضاء المعالج"],
  "nav.admin": ["Administration", "Admin panel", "الإدارة"],
  "shell.pro": ["Pro", "Pro", "احترافي"],
  "shell.currentLevel": ["Niveau actuel", "Current level", "المستوى الحالي"],
  "shell.level": ["Niveau", "Level", "المستوى"],
  "shell.guest": ["Invité", "Guest", "زائر"],

  // ---------- generic ----------
  "common.back": ["Retour", "Back", "رجوع"],
  "common.continue": ["Continuer", "Continue", "متابعة"],
  "common.start": ["Démarrer", "Start", "ابدأ"],
  "common.finish": ["Terminer", "Finish", "إنهاء"],
  "common.pause": ["Pause", "Pause", "إيقاف مؤقت"],
  "common.resume": ["Reprendre", "Resume", "استئناف"],
  "common.quit": ["Quitter", "Quit", "خروج"],
  "common.retry": ["Réessayer", "Retry", "إعادة المحاولة"],
  "common.save": ["Enregistrer", "Save", "حفظ"],
  "common.loading": ["Chargement…", "Loading…", "جارٍ التحميل…"],
  "common.min": ["min", "min", "د"],
  "common.sec": ["s", "s", "ث"],
  "common.locked": ["Verrouillé", "Locked", "مقفل"],
  "common.completed": ["Terminé", "Completed", "مكتمل"],
  "common.of": ["sur", "of", "من"],

  "cta.start": ["Commencer la thérapie", "Start therapy", "ابدأ العلاج"],
  "cta.learn": ["En savoir plus", "Learn more", "اعرف المزيد"],
  "cta.login": ["Connexion", "Log in", "تسجيل الدخول"],
  "auth.login": ["Se connecter", "Sign in", "دخول"],
  "auth.register": ["Créer un compte", "Create account", "إنشاء حساب"],
  "auth.logout": ["Déconnexion", "Sign out", "خروج"],

  // ---------- landing ----------
  "hero.badge": [
    "Thérapie par exposition en réalité virtuelle assistée par IA",
    "AI-assisted virtual reality exposure therapy",
    "العلاج بالتعرض في الواقع الافتراضي بمساعدة الذكاء الاصطناعي",
  ],
  "hero.title": [
    "Vaincre ses peurs, une immersion à la fois",
    "Overcome your fears, one immersion at a time",
    "تغلب على مخاوفك، تجربة تلو الأخرى",
  ],
  "hero.subtitle": [
    "G_Phob accompagne enfants, adolescents et adultes dans le traitement des phobies et troubles anxieux grâce à une exposition graduelle, ludique et encadrée par des thérapeutes.",
    "G_Phob supports children, teenagers and adults through gradual, gamified exposure therapy supervised by clinicians.",
    "يرافق G_Phob الأطفال والمراهقين والبالغين في علاج الرهاب والقلق عبر تعرض تدريجي وممتع بإشراف المعالجين.",
  ],
  "hero.stat1": ["Patients accompagnés", "Patients supported", "مريض مرافق"],
  "hero.stat2": ["Taux de complétion", "Completion rate", "نسبة الإتمام"],
  "hero.stat3": ["Satisfaction", "Satisfaction", "الرضا"],
  "section.how": ["Un parcours en 4 étapes", "A 4-step journey", "رحلة من أربع خطوات"],
  "section.benefits": ["Pourquoi G_Phob", "Why G_Phob", "لماذا G_Phob"],
  "section.science": [
    "Une approche fondée sur la science",
    "A science-based approach",
    "مقاربة قائمة على العلم",
  ],
  "section.testimonials": [
    "Ils ont retrouvé confiance",
    "They regained confidence",
    "استعادوا ثقتهم",
  ],
  "section.faq": ["Questions fréquentes", "Frequently asked questions", "الأسئلة الشائعة"],
  "section.contact": ["Parlons de votre projet", "Let's talk", "لنتحدث"],

  // ---------- questionnaire ----------
  "q.kicker": ["Évaluation initiale", "Initial assessment", "التقييم الأولي"],
  "q.title": ["Questionnaire clinique guidé", "Guided clinical questionnaire", "استبيان سريري موجه"],
  "q.subtitle": [
    "Une dizaine de questions à choix multiples. L'IA analyse vos réponses et génère un scénario de jeu thérapeutique personnalisé.",
    "About ten multiple-choice questions. The AI analyses your answers and generates a personalised therapeutic game scenario.",
    "حوالي عشرة أسئلة اختيار من متعدد. يحلل الذكاء الاصطناعي إجاباتك وينشئ سيناريو لعب علاجي مخصص.",
  ],
  "q.question": ["Question", "Question", "سؤال"],
  "q.analyze": ["Analyser avec l'IA", "Analyse with AI", "التحليل بالذكاء الاصطناعي"],
  "q.analyzing": ["Analyse des réponses…", "Analysing answers…", "جارٍ تحليل الإجابات…"],
  "q.generated": ["Scénario généré", "Scenario generated", "تم إنشاء السيناريو"],
  "q.ready": ["Votre scénario est prêt !", "Your scenario is ready!", "سيناريوك جاهز!"],
  "q.seeProfile": ["Voir mon profil", "View my profile", "عرض ملفي"],
  "q.playNow": ["Jouer le niveau 1", "Play level 1", "العب المستوى 1"],
  "q.pickOne": ["Une seule réponse", "Single answer", "إجابة واحدة"],
  "q.pickMany": ["Plusieurs réponses possibles", "Multiple answers allowed", "يمكن اختيار عدة إجابات"],
  "q.aiFallback": [
    "Analyse locale utilisée (IA indisponible).",
    "Local analysis used (AI unavailable).",
    "تم استخدام التحليل المحلي (الذكاء الاصطناعي غير متاح).",
  ],

  // question labels
  "q1": ["Quelle est votre peur principale ?", "What is your main fear?", "ما هو خوفك الرئيسي؟"],
  "q2": ["Quelles autres situations vous angoissent ?", "Which other situations make you anxious?", "ما المواقف الأخرى التي تسبب لك القلق؟"],
  "q3": ["Quelle est l'intensité de cette peur ?", "How intense is this fear?", "ما شدة هذا الخوف؟"],
  "q4": ["Depuis combien de temps ?", "For how long?", "منذ متى؟"],
  "q5": ["Quel est l'impact sur votre quotidien ?", "What is the impact on daily life?", "ما تأثيره على حياتك اليومية؟"],
  "q6": ["Comment réagissez-vous face au déclencheur ?", "How do you react to the trigger?", "كيف تتفاعل مع المحفز؟"],
  "q7": ["Comment dormez-vous ?", "How do you sleep?", "كيف تنام؟"],
  "q8": ["Votre animal préféré ?", "Your favourite animal?", "حيوانك المفضل؟"],
  "q9": ["Votre univers préféré ?", "Your favourite universe?", "عالمك المفضل؟"],
  "q10": ["Quel type de jeu aimez-vous ?", "What kind of game do you like?", "ما نوع اللعب الذي تحبه؟"],
  "q11": ["Votre motivation à suivre la thérapie ?", "Your motivation to follow the therapy?", "دافعك لمتابعة العلاج؟"],

  // ---------- scenario / therapy ----------
  "sc.title": ["Scénario personnalisé", "Personalised scenario", "سيناريو مخصص"],
  "sc.none": [
    "Aucun scénario généré. Répondez au questionnaire pour que l'IA crée votre parcours.",
    "No scenario yet. Complete the questionnaire so the AI can build your journey.",
    "لا يوجد سيناريو بعد. أكمل الاستبيان لينشئ الذكاء الاصطناعي مسارك.",
  ],
  "sc.startQuestionnaire": ["Commencer le questionnaire", "Start the questionnaire", "ابدأ الاستبيان"],
  "sc.regenerate": ["Regénérer le scénario", "Regenerate scenario", "إعادة توليد السيناريو"],
  "therapy.title": ["Parcours d'exposition", "Exposure journey", "مسار التعرض"],
  "therapy.subtitle": [
    "Niveaux calibrés par l'IA selon votre profil",
    "Levels calibrated by AI from your profile",
    "مستويات معايرة بالذكاء الاصطناعي حسب ملفك",
  ],
  "therapy.levelsDone": ["Niveaux terminés", "Levels completed", "المستويات المكتملة"],
  "therapy.next": ["Prochain palier", "Next stage", "المرحلة التالية"],
  "therapy.rewards": ["Récompenses cumulées", "Total rewards", "المكافآت المتراكمة"],
  "therapy.play": ["Jouer la mission", "Play the mission", "العب المهمة"],
  "therapy.replay": ["Rejouer", "Replay", "إعادة اللعب"],

  // ---------- game ----------
  "game.mission": ["Mission", "Mission", "المهمة"],
  "game.objective": ["Objectif", "Objective", "الهدف"],
  "game.anxiety": ["Niveau d'anxiété", "Anxiety level", "مستوى القلق"],
  "game.breathe": ["Respirer", "Breathe", "تنفّس"],
  "game.score": ["Score", "Score", "النقاط"],
  "game.time": ["Temps", "Time", "الوقت"],
  "game.enter": ["Entrer en VR", "Enter VR", "ادخل الواقع الافتراضي"],
  "game.instructions": [
    "Cliquez sur les éléments de la mission qui apparaissent. Évitez les distracteurs : ils augmentent votre anxiété. Utilisez « Respirer » pour vous apaiser.",
    "Click the mission items as they appear. Avoid distractors: they raise your anxiety. Use “Breathe” to calm down.",
    "انقر على عناصر المهمة عند ظهورها. تجنب المشتتات فهي ترفع قلقك. استخدم «تنفّس» للتهدئة.",
  ],
  "game.success": ["Mission réussie !", "Mission complete!", "تمت المهمة بنجاح!"],
  "game.failed": ["Mission non validée", "Mission not validated", "لم تُنجز المهمة"],
  "game.failedHint": [
    "Votre anxiété est montée trop haut ou le temps est écoulé. Réessayez, c'est une étape normale de l'exposition.",
    "Your anxiety got too high or time ran out. Try again — this is a normal part of exposure.",
    "ارتفع قلقك كثيراً أو انتهى الوقت. حاول مجدداً، هذه مرحلة طبيعية في التعرض.",
  ],
  "game.next": ["Niveau suivant", "Next level", "المستوى التالي"],
  "game.backToJourney": ["Retour au parcours", "Back to journey", "العودة للمسار"],
  "game.calmBonus": ["Bonus de calme", "Calm bonus", "مكافأة الهدوء"],

  // ---------- profile ----------
  "profile.title": ["Profil thérapeutique", "Therapy profile", "الملف العلاجي"],
  "profile.subtitle": [
    "Mis à jour automatiquement après chaque session",
    "Automatically updated after every session",
    "يتم تحديثه تلقائياً بعد كل جلسة",
  ],
  "profile.risk": ["Niveau de risque", "Risk level", "مستوى الخطورة"],
  "profile.fearScore": ["Score de peur", "Fear score", "درجة الخوف"],
  "profile.motivation": ["Score de motivation", "Motivation score", "درجة الدافعية"],
  "profile.recommended": ["Thérapie recommandée", "Recommended therapy", "العلاج الموصى به"],
  "profile.difficulty": ["Difficulté d'exposition", "Exposure difficulty", "صعوبة التعرض"],
  "profile.global": ["Progression globale", "Overall progress", "التقدم العام"],
  "profile.aiReco": ["Recommandations de l'IA", "AI recommendations", "توصيات الذكاء الاصطناعي"],
  "profile.achievements": ["Succès débloqués", "Unlocked achievements", "الإنجازات المفتوحة"],
  "risk.low": ["Faible", "Low", "منخفض"],
  "risk.moderate": ["Modéré", "Moderate", "متوسط"],
  "risk.high": ["Élevé", "High", "مرتفع"],

  // ---------- settings ----------
  "set.appearance": ["Apparence", "Appearance", "المظهر"],
  "set.dark": ["Mode sombre", "Dark mode", "الوضع الداكن"],
  "set.language": ["Langue", "Language", "اللغة"],
  "set.profile": ["Profil", "Profile", "الملف الشخصي"],
  "set.notifications": ["Notifications", "Notifications", "الإشعارات"],
  "set.security": ["Sécurité & accessibilité", "Security & accessibility", "الأمان وإمكانية الوصول"],
};

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const idx: Record<Lang, 0 | 1 | 2> = { fr: 0, en: 1, ar: 2 };

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("gphob.lang") as Lang | null;
    if (stored && stored in idx) setLangState(stored);
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
      t: (key) => T[key]?.[idx[lang]] ?? T[key]?.[0] ?? key,
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

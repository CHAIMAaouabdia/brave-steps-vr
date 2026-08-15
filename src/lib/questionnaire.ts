import type { Lang } from "@/lib/i18n";

export type QOption = {
  id: string;
  emoji: string;
  label: [string, string, string]; // fr, en, ar
  weight?: number;
};

export type Question = {
  id: string;
  labelKey: string;
  multi?: boolean;
  options: QOption[];
};

const L = (fr: string, en: string, ar: string): [string, string, string] => [fr, en, ar];

export const QUESTIONS: Question[] = [
  {
    id: "mainFear",
    labelKey: "q1",
    options: [
      { id: "heights", emoji: "🏔️", label: L("Hauteurs", "Heights", "المرتفعات") },
      { id: "spiders", emoji: "🕷️", label: L("Araignées", "Spiders", "العناكب") },
      { id: "dogs", emoji: "🐕", label: L("Chiens", "Dogs", "الكلاب") },
      { id: "elevators", emoji: "🛗", label: L("Ascenseurs", "Elevators", "المصاعد") },
      { id: "flying", emoji: "✈️", label: L("Avion", "Flying", "الطيران") },
      { id: "darkness", emoji: "🌑", label: L("Obscurité", "Darkness", "الظلام") },
      { id: "crowds", emoji: "👥", label: L("Foules", "Crowds", "الزحام") },
      { id: "speaking", emoji: "🎤", label: L("Parler en public", "Public speaking", "التحدث أمام الجمهور") },
      { id: "needles", emoji: "💉", label: L("Aiguilles", "Needles", "الإبر") },
      { id: "blood", emoji: "🩸", label: L("Sang", "Blood", "الدم") },
    ],
  },
  {
    id: "secondaryFears",
    labelKey: "q2",
    multi: true,
    options: [
      { id: "hospitals", emoji: "🏥", label: L("Hôpitaux", "Hospitals", "المستشفيات") },
      { id: "water", emoji: "🌊", label: L("Eau profonde", "Deep water", "المياه العميقة") },
      { id: "alone", emoji: "🚪", label: L("Rester seul", "Being alone", "البقاء وحيداً") },
      { id: "exam", emoji: "📝", label: L("Examens", "Exams", "الامتحانات") },
      { id: "noise", emoji: "🔊", label: L("Bruits forts", "Loud noises", "الأصوات العالية") },
      { id: "none", emoji: "✅", label: L("Aucune autre", "None", "لا شيء آخر") },
    ],
  },
  {
    id: "intensity",
    labelKey: "q3",
    options: [
      { id: "mild", emoji: "🙂", label: L("Légère (1-3)", "Mild (1-3)", "خفيف (1-3)"), weight: 3 },
      { id: "moderate", emoji: "😟", label: L("Modérée (4-6)", "Moderate (4-6)", "متوسط (4-6)"), weight: 5 },
      { id: "strong", emoji: "😰", label: L("Forte (7-8)", "Strong (7-8)", "قوي (7-8)"), weight: 8 },
      { id: "extreme", emoji: "😱", label: L("Extrême (9-10)", "Extreme (9-10)", "شديد جداً (9-10)"), weight: 10 },
    ],
  },
  {
    id: "duration",
    labelKey: "q4",
    options: [
      { id: "lt1", emoji: "🌱", label: L("Moins d'un an", "Less than a year", "أقل من سنة"), weight: 2 },
      { id: "1-3", emoji: "🌿", label: L("1 à 3 ans", "1 to 3 years", "1 إلى 3 سنوات"), weight: 4 },
      { id: "3-10", emoji: "🌳", label: L("3 à 10 ans", "3 to 10 years", "3 إلى 10 سنوات"), weight: 6 },
      { id: "gt10", emoji: "🏔️", label: L("Plus de 10 ans", "More than 10 years", "أكثر من 10 سنوات"), weight: 8 },
    ],
  },
  {
    id: "impact",
    labelKey: "q5",
    options: [
      { id: "low", emoji: "🟢", label: L("Faible — je gère", "Low — I cope", "منخفض — أتحكم"), weight: 2 },
      { id: "moderate", emoji: "🟡", label: L("Modéré — j'évite parfois", "Moderate — I sometimes avoid", "متوسط — أتجنب أحياناً"), weight: 5 },
      { id: "high", emoji: "🟠", label: L("Élevé — j'évite souvent", "High — I often avoid", "مرتفع — أتجنب غالباً"), weight: 8 },
      { id: "severe", emoji: "🔴", label: L("Sévère — cela bloque ma vie", "Severe — it blocks my life", "شديد — يعيق حياتي"), weight: 10 },
    ],
  },
  {
    id: "reaction",
    labelKey: "q6",
    options: [
      { id: "avoid", emoji: "🏃", label: L("Je fuis la situation", "I flee the situation", "أهرب من الموقف"), weight: 9 },
      { id: "panic", emoji: "💓", label: L("Palpitations, panique", "Palpitations, panic", "خفقان وذعر"), weight: 8 },
      { id: "freeze", emoji: "🧊", label: L("Je me fige", "I freeze", "أتجمد"), weight: 7 },
      { id: "endure", emoji: "😤", label: L("Je supporte avec stress", "I endure with stress", "أتحمل بتوتر"), weight: 5 },
    ],
  },
  {
    id: "sleep",
    labelKey: "q7",
    options: [
      { id: "good", emoji: "😴", label: L("Bien", "Well", "جيداً"), weight: 2 },
      { id: "average", emoji: "🌙", label: L("Moyennement", "So-so", "متوسط"), weight: 5 },
      { id: "bad", emoji: "🥱", label: L("Mal, réveils fréquents", "Badly, frequent waking", "سيء، استيقاظ متكرر"), weight: 8 },
    ],
  },
  {
    id: "animal",
    labelKey: "q8",
    options: [
      { id: "cat", emoji: "🐱", label: L("Chat", "Cat", "قط") },
      { id: "dog", emoji: "🐶", label: L("Chien", "Dog", "كلب") },
      { id: "rabbit", emoji: "🐰", label: L("Lapin", "Rabbit", "أرنب") },
      { id: "dolphin", emoji: "🐬", label: L("Dauphin", "Dolphin", "دلفين") },
      { id: "bird", emoji: "🐦", label: L("Oiseau", "Bird", "طائر") },
      { id: "horse", emoji: "🐴", label: L("Cheval", "Horse", "حصان") },
    ],
  },
  {
    id: "universe",
    labelKey: "q9",
    options: [
      { id: "forest", emoji: "🌲", label: L("Forêt enchantée", "Enchanted forest", "غابة ساحرة") },
      { id: "space", emoji: "🚀", label: L("Espace", "Space", "الفضاء") },
      { id: "ocean", emoji: "🐠", label: L("Océan", "Ocean", "المحيط") },
      { id: "city", emoji: "🏙️", label: L("Ville lumineuse", "Bright city", "مدينة مضيئة") },
      { id: "mountain", emoji: "⛰️", label: L("Montagne", "Mountain", "الجبل") },
      { id: "farm", emoji: "🌻", label: L("Ferme paisible", "Peaceful farm", "مزرعة هادئة") },
    ],
  },
  {
    id: "gameStyle",
    labelKey: "q10",
    options: [
      { id: "collect", emoji: "⭐", label: L("Collecter des objets", "Collect items", "جمع العناصر") },
      { id: "puzzle", emoji: "🧩", label: L("Résoudre des énigmes", "Solve puzzles", "حل الألغاز") },
      { id: "rescue", emoji: "🛟", label: L("Sauver des personnages", "Rescue characters", "إنقاذ الشخصيات") },
      { id: "explore", emoji: "🧭", label: L("Explorer librement", "Free exploration", "الاستكشاف الحر") },
    ],
  },
  {
    id: "motivation",
    labelKey: "q11",
    options: [
      { id: "low", emoji: "😕", label: L("Faible", "Low", "منخفضة"), weight: 3 },
      { id: "medium", emoji: "🙂", label: L("Moyenne", "Medium", "متوسطة"), weight: 6 },
      { id: "high", emoji: "💪", label: L("Forte", "High", "قوية"), weight: 9 },
      { id: "max", emoji: "🔥", label: L("Très forte", "Very high", "قوية جداً"), weight: 10 },
    ],
  },
];

export type Answers = Record<string, string[]>;

export type GameLevel = {
  id: number;
  title: string;
  mission: string;
  objective: string;
  targetEmoji: string;
  distractorEmoji: string;
  targetCount: number;
  timeLimit: number; // seconds
  spawnMs: number;
  reward: string;
  xp: number;
  coins: number;
};

export type Scenario = {
  universe: string;
  summary: string;
  riskLevel: "low" | "moderate" | "high";
  fearScore: number; // 0-10
  motivation: number; // 0-100
  recommendation: string;
  recommendations: string[];
  levels: GameLevel[];
  lang: Lang;
  source: "ai" | "local";
  createdAt: string;
};

const langIdx: Record<Lang, 0 | 1 | 2> = { fr: 0, en: 1, ar: 2 };

export function optionLabel(q: Question, id: string, lang: Lang) {
  const o = q.options.find((x) => x.id === id);
  return o ? o.label[langIdx[lang]] : id;
}

export function answersSummary(answers: Answers, lang: Lang) {
  return QUESTIONS.map((q) => {
    const picked = (answers[q.id] ?? []).map((id) => optionLabel(q, id, lang)).join(", ");
    return `${q.id}: ${picked || "-"}`;
  }).join("\n");
}

function weightOf(qId: string, answers: Answers) {
  const q = QUESTIONS.find((x) => x.id === qId);
  const id = answers[qId]?.[0];
  return q?.options.find((o) => o.id === id)?.weight ?? 5;
}

export function computeScores(answers: Answers) {
  const fear = Math.round(
    (weightOf("intensity", answers) * 0.4 +
      weightOf("impact", answers) * 0.3 +
      weightOf("reaction", answers) * 0.2 +
      weightOf("duration", answers) * 0.1) *
      10,
  ) / 10;
  const motivation = Math.min(100, Math.round(weightOf("motivation", answers) * 9 + 10));
  const riskLevel: Scenario["riskLevel"] = fear >= 8 ? "high" : fear >= 5 ? "moderate" : "low";
  return { fear, motivation, riskLevel };
}

const UNIVERSE_EMOJI: Record<string, { target: string; distract: string; name: [string, string, string] }> = {
  forest: { target: "🍄", distract: "🐝", name: ["Forêt enchantée", "Enchanted forest", "غابة ساحرة"] },
  space: { target: "⭐", distract: "☄️", name: ["Station spatiale", "Space station", "محطة فضائية"] },
  ocean: { target: "🐚", distract: "🪼", name: ["Récif corallien", "Coral reef", "الشعاب المرجانية"] },
  city: { target: "🔑", distract: "🚧", name: ["Ville lumineuse", "Bright city", "مدينة مضيئة"] },
  mountain: { target: "🏔️", distract: "🪨", name: ["Sentier de montagne", "Mountain trail", "درب الجبل"] },
  farm: { target: "🌻", distract: "🐝", name: ["Ferme paisible", "Peaceful farm", "مزرعة هادئة"] },
};

const MISSIONS: [string, string, string][] = [
  ["Sauver un chaton", "Save a kitten", "إنقاذ قطة"],
  ["Trouver les clés cachées", "Find the hidden keys", "العثور على المفاتيح المخفية"],
  ["Collecter les étoiles", "Collect the stars", "جمع النجوم"],
  ["Secourir un chien", "Rescue a dog", "إنقاذ كلب"],
  ["Réparer le pont", "Repair the bridge", "إصلاح الجسر"],
  ["Atteindre le phare", "Reach the lighthouse", "الوصول إلى المنارة"],
  ["Traverser la forêt", "Cross the forest", "عبور الغابة"],
  ["Explorer la montagne", "Explore the mountain", "استكشاف الجبل"],
  ["Ouvrir le trésor", "Open the treasure", "فتح الكنز"],
  ["Célébrer la victoire", "Celebrate the victory", "الاحتفال بالنصر"],
];

/** Deterministic fallback used when the AI gateway is unavailable. */
export function buildLocalScenario(answers: Answers, lang: Lang): Scenario {
  const i = langIdx[lang];
  const { fear, motivation, riskLevel } = computeScores(answers);
  const uniId = answers["universe"]?.[0] ?? "forest";
  const uni = UNIVERSE_EMOJI[uniId] ?? UNIVERSE_EMOJI["forest"]!;
  const animalQ = QUESTIONS.find((q) => q.id === "animal")!;
  const animalEmoji = animalQ.options.find((o) => o.id === answers["animal"]?.[0])?.emoji ?? "🐱";
  const fearLabel = optionLabel(QUESTIONS[0]!, answers["mainFear"]?.[0] ?? "dogs", lang);

  const levels: GameLevel[] = MISSIONS.map((m, k) => {
    const n = k + 1;
    return {
      id: n,
      title:
        i === 0 ? `Palier ${n} — ${uni.name[0]}` : i === 1 ? `Stage ${n} — ${uni.name[1]}` : `المرحلة ${n} — ${uni.name[2]}`,
      mission: m[i],
      objective:
        i === 0
          ? `Collectez ${4 + n} éléments en gardant votre anxiété sous contrôle.`
          : i === 1
            ? `Collect ${4 + n} items while keeping your anxiety under control.`
            : `اجمع ${4 + n} عناصر مع التحكم في قلقك.`,
      targetEmoji: n % 3 === 0 ? animalEmoji : uni.target,
      distractorEmoji: uni.distract,
      targetCount: 4 + n,
      timeLimit: 40 + n * 5,
      spawnMs: Math.max(650, 1400 - n * 70),
      reward:
        i === 0 ? `Badge palier ${n}` : i === 1 ? `Stage ${n} badge` : `شارة المرحلة ${n}`,
      xp: 100 + n * 20,
      coins: 25 + n * 5,
    };
  });

  const summary =
    i === 0
      ? `Exposition graduelle à « ${fearLabel} » dans l'univers « ${uni.name[0]} », calibrée sur un score de peur de ${fear}/10.`
      : i === 1
        ? `Gradual exposure to “${fearLabel}” inside the “${uni.name[1]}” universe, calibrated on a fear score of ${fear}/10.`
        : `تعرض تدريجي لـ «${fearLabel}» داخل عالم «${uni.name[2]}»، معاير على درجة خوف ${fear}/10.`;

  const recommendation =
    i === 0
      ? "Exposition graduelle TCC en 10 paliers, 3 sessions hebdomadaires de 5 à 10 minutes avec régulation respiratoire."
      : i === 1
        ? "CBT gradual exposure over 10 stages, 3 weekly sessions of 5-10 minutes with breathing regulation."
        : "تعرض تدريجي سلوكي معرفي عبر 10 مراحل، 3 جلسات أسبوعياً من 5 إلى 10 دقائق مع تنظيم التنفس.";

  const recommendations =
    i === 0
      ? [
          `Commencer par des paliers courts (${levels[0]!.timeLimit}s) pour éviter l'évitement précoce.`,
          "Ajouter 3 minutes de cohérence cardiaque avant chaque session.",
          `Univers personnalisé : ${uni.name[0]} ${animalEmoji}.`,
        ]
      : i === 1
        ? [
            `Start with short stages (${levels[0]!.timeLimit}s) to prevent early avoidance.`,
            "Add 3 minutes of paced breathing before each session.",
            `Personalised universe: ${uni.name[1]} ${animalEmoji}.`,
          ]
        : [
            `ابدأ بمراحل قصيرة (${levels[0]!.timeLimit} ث) لتفادي التجنب المبكر.`,
            "أضف 3 دقائق من التنفس المنتظم قبل كل جلسة.",
            `عالم مخصص: ${uni.name[2]} ${animalEmoji}.`,
          ];

  return {
    universe: uni.name[i],
    summary,
    riskLevel,
    fearScore: fear,
    motivation,
    recommendation,
    recommendations,
    levels,
    lang,
    source: "local",
    createdAt: new Date().toISOString(),
  };
}

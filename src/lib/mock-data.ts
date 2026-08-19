export type Level = {
  id: number;
  title: string;
  mission: string;
  description: string;
  difficulty: "سهل" | "متوسط" | "مكثف";
  duration: number;
  objectives: string[];
  reward: string;
  xp: number;
  coins: number;
  scene: "mountain" | "forest";
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "أول نفس",
    mission: "إنقاذ قطة صغيرة",
    description:
      "غوص لطيف جدًا في حديقة مشمسة. القطة الصغيرة عالقة على درجة صغيرة: اقترب بهدوء وطمئنها.",
    difficulty: "سهل",
    duration: 6,
    objectives: ["التنفس بطريقة 4-7-8 لمدة 60 ثانية", "الاقتراب من القطة", "البقاء هادئًا 3 دقائق"],
    reward: "وسام الشجاعة الناشئة",
    xp: 120,
    coins: 30,
    scene: "forest",
  },
  {
    id: 2,
    title: "مفاتيح الهدوء",
    mission: "العثور على المفاتيح المخفية",
    description:
      "استكشف غرفة مضيئة وابحث عن ثلاثة مفاتيح مخفية. كل مفتاح يُطلق تمرين تنفس موجّه.",
    difficulty: "سهل",
    duration: 8,
    objectives: ["العثور على 3 مفاتيح", "الحفاظ على التوتر أقل من 4/10", "الإنهاء دون توقف"],
    reward: "وسام المستكشف",
    xp: 150,
    coins: 35,
    scene: "forest",
  },
  {
    id: 3,
    title: "مطر النجوم",
    mission: "جمع النجوم",
    description:
      "مشهد ليلي مهدئ لترويض الظلام من خلال جمع نجوم مضيئة.",
    difficulty: "سهل",
    duration: 9,
    objectives: ["جمع 12 نجمة", "البقاء 5 دقائق في العتمة", "تدوين شعورك"],
    reward: "وسام الليلة الهادئة",
    xp: 180,
    coins: 40,
    scene: "forest",
  },
  {
    id: 4,
    title: "صديق ذو أربع أرجل",
    mission: "إنقاذ كلب",
    description:
      "كلب ودود ينتظر خلف سياج. التعرّض التدريجي يسمح بتقليل المسافة بالوتيرة التي تناسبك.",
    difficulty: "متوسط",
    duration: 10,
    objectives: ["تقليل المسافة إلى مترين", "مداعبة الكلب", "توتر نهائي أقل من 5/10"],
    reward: "وسام الثقة بالحيوانات",
    xp: 210,
    coins: 45,
    scene: "forest",
  },
  {
    id: 5,
    title: "الجسر المعلّق",
    mission: "إصلاح الجسر",
    description:
      "أول مواجهة مع المرتفعات: أصلح ألواح جسر فوق نهر هادئ.",
    difficulty: "متوسط",
    duration: 12,
    objectives: ["وضع 5 ألواح", "النظر إلى الأسفل لمدة 10 ثوانٍ", "عبور الجسر بالكامل"],
    reward: "وسام البنّاء",
    xp: 250,
    coins: 55,
    scene: "mountain",
  },
  {
    id: 6,
    title: "نحو النور",
    mission: "الوصول إلى المنارة",
    description:
      "اصعد درجات المنارة، طابقًا تلو الآخر، مع فترات توقف لتنظيم المشاعر.",
    difficulty: "متوسط",
    duration: 13,
    objectives: ["الصعود إلى 4 طوابق", "مراقبة الأفق", "النزول بهدوء"],
    reward: "وسام حارس المنارة",
    xp: 280,
    coins: 60,
    scene: "mountain",
  },
  {
    id: 7,
    title: "تحت المظلة الخضراء",
    mission: "عبور الغابة",
    description:
      "عبور غابة مع أصوات غامرة وحشرات وظلال. تعرّض مزدوج للظلام والحيوانات.",
    difficulty: "مكثف",
    duration: 15,
    objectives: ["عبور 3 مناطق", "مصادفة عنكبوت", "الإنهاء دون الانسحاب"],
    reward: "وسام القلب الشجاع",
    xp: 320,
    coins: 70,
    scene: "forest",
  },
  {
    id: 8,
    title: "الصعود",
    mission: "استكشاف الجبل",
    description:
      "صعود موجّه مع مناظر بانورامية مثيرة للدوار بشكل متزايد وتمارين للتوازن الذهني.",
    difficulty: "مكثف",
    duration: 16,
    objectives: ["الوصول إلى القمة", "البقاء دقيقتين عند الحافة", "تصوير الوادي"],
    reward: "وسام متسلق الجبال",
    xp: 360,
    coins: 80,
    scene: "mountain",
  },
  {
    id: 9,
    title: "الصندوق المنسي",
    mission: "فتح الكنز",
    description:
      "مصعد قديم يقود إلى غرفة سرية: تعرّض للأماكن المغلقة مع تعزيز إيجابي.",
    difficulty: "مكثف",
    duration: 17,
    objectives: ["ركوب المصعد", "البقاء 90 ثانية والباب مغلق", "فتح الصندوق"],
    reward: "وسام صائد الكنوز",
    xp: 400,
    coins: 95,
    scene: "mountain",
  },
  {
    id: 10,
    title: "المشهد الكبير",
    mission: "الاحتفال بالانتصار",
    description:
      "إلقاء كلمة أمام جمهور افتراضي ودود، ثم احتفال ختامي بالمسار.",
    difficulty: "مكثف",
    duration: 20,
    objectives: ["التحدث لمدة 3 دقائق", "النظر إلى الجمهور", "تلقّي التصفيق"],
    reward: "كأس إتقان G_Phob",
    xp: 500,
    coins: 120,
    scene: "mountain",
  },
];

export const FEARS = [
  { id: "heights", fr: "المرتفعات", emoji: "🏔️" },
  { id: "spiders", fr: "العناكب", emoji: "🕷️" },
  { id: "dogs", fr: "الكلاب", emoji: "🐕" },
  { id: "elevators", fr: "المصاعد", emoji: "🛗" },
  { id: "flying", fr: "الطائرة", emoji: "✈️" },
  { id: "darkness", fr: "الظلام", emoji: "🌙" },
  { id: "crowds", fr: "الحشود", emoji: "👥" },
  { id: "speaking", fr: "التحدث أمام الجمهور", emoji: "🎤" },
  { id: "hospitals", fr: "المستشفيات", emoji: "🏥" },
  { id: "blood", fr: "الدم", emoji: "🩸" },
  { id: "needles", fr: "الإبر", emoji: "💉" },
  { id: "other", fr: "أخرى", emoji: "✨" },
];

export const ACHIEVEMENTS = [
  { id: "a1", name: "الخطوة الأولى", desc: "إنهاء الجلسة الأولى", icon: "🌱", unlocked: true },
  { id: "a2", name: "الانتظام", desc: "3 جلسات في أسبوع واحد", icon: "🔥", unlocked: true },
  { id: "a3", name: "إتقان التنفس", desc: "10 تمارين تنفس", icon: "🌬️", unlocked: true },
  { id: "a4", name: "المستكشف", desc: "فتح المستوى 4", icon: "🧭", unlocked: true },
  { id: "a5", name: "القلب الشجاع", desc: "إنهاء جلسة مكثفة", icon: "🦁", unlocked: false },
  { id: "a6", name: "عدّاء المسافات", desc: "20 جلسة متراكمة", icon: "🏅", unlocked: false },
  { id: "a7", name: "الهدوء التام", desc: "متوسط توتر أقل من 3/10", icon: "🧘", unlocked: false },
  { id: "a8", name: "الإتقان", desc: "إنهاء المستويات العشرة", icon: "🏆", unlocked: false },
];

export const weeklySessions = [
  { day: "الإثنين", sessions: 2, stress: 6.2, mood: 5 },
  { day: "الثلاثاء", sessions: 1, stress: 5.6, mood: 6 },
  { day: "الأربعاء", sessions: 3, stress: 5.1, mood: 7 },
  { day: "الخميس", sessions: 2, stress: 4.4, mood: 7 },
  { day: "الجمعة", sessions: 4, stress: 3.9, mood: 8 },
  { day: "السبت", sessions: 3, stress: 3.4, mood: 8 },
  { day: "الأحد", sessions: 2, stress: 3.0, mood: 9 },
];

export const monthlyProgress = [
  { month: "يناير", sessions: 6, fear: 8.4, completion: 12 },
  { month: "فبراير", sessions: 10, fear: 7.8, completion: 24 },
  { month: "مارس", sessions: 14, fear: 7.0, completion: 38 },
  { month: "أبريل", sessions: 12, fear: 6.1, completion: 49 },
  { month: "مايو", sessions: 18, fear: 5.2, completion: 63 },
  { month: "يونيو", sessions: 21, fear: 4.3, completion: 78 },
];

export const radarData = [
  { axis: "الهدوء", value: 78 },
  { axis: "الثقة", value: 66 },
  { axis: "الدافعية", value: 88 },
  { axis: "النوم", value: 61 },
  { axis: "التركيز", value: 72 },
  { axis: "الاستقلالية", value: 69 },
];

export const pieData = [
  { name: "منتهية", value: 42 },
  { name: "جارية", value: 14 },
  { name: "مخطَّطة", value: 9 },
  { name: "متوقَّفة", value: 3 },
];

export type Patient = {
  id: string;
  name: string;
  age: number;
  phobia: string;
  level: number;
  sessions: number;
  risk: "Faible" | "Modéré" | "Élevé";
  progress: number;
  lastSession: string;
  status: "Actif" | "Pause" | "Terminé";
};

export const PATIENTS: Patient[] = [
  { id: "p1", name: "ياسمين بلقاسم", age: 12, phobia: "الكلاب", level: 4, sessions: 18, risk: "Faible", progress: 62, lastSession: "قبل يومين", status: "Actif" },
  { id: "p2", name: "لوكاس مورو", age: 27, phobia: "المرتفعات", level: 7, sessions: 31, risk: "Modéré", progress: 78, lastSession: "أمس", status: "Actif" },
  { id: "p3", name: "أمين حداد", age: 16, phobia: "التحدث أمام الجمهور", level: 3, sessions: 9, risk: "Élevé", progress: 34, lastSession: "قبل 6 أيام", status: "Pause" },
  { id: "p4", name: "كلير دوبوا", age: 34, phobia: "الطائرة", level: 6, sessions: 24, risk: "Faible", progress: 71, lastSession: "قبل 3 أيام", status: "Actif" },
  { id: "p5", name: "نور شريف", age: 9, phobia: "الظلام", level: 2, sessions: 6, risk: "Modéré", progress: 21, lastSession: "اليوم", status: "Actif" },
  { id: "p6", name: "توما جيرار", age: 41, phobia: "المصاعد", level: 9, sessions: 44, risk: "Faible", progress: 92, lastSession: "قبل 5 أيام", status: "Terminé" },
  { id: "p7", name: "سلمى تركي", age: 22, phobia: "العناكب", level: 5, sessions: 20, risk: "Modéré", progress: 55, lastSession: "قبل 4 أيام", status: "Actif" },
  { id: "p8", name: "هوغو لوفيفر", age: 14, phobia: "الإبر", level: 1, sessions: 3, risk: "Élevé", progress: 12, lastSession: "قبل 8 أيام", status: "Pause" },
];

export const AI_REPLIES = [
  "ألاحظ تقدمًا جميلًا في جلساتك الأخيرة. انخفض متوسط مستوى توترك من 6.2 إلى 3.8 من أصل 10.",
  "تنفّس بعمق: شهيق لمدة 4 ثوانٍ، احبس النفس 7 ثوانٍ، ثم زفير لمدة 8 ثوانٍ. يمكننا تكرار هذه الدورة معًا.",
  "عمل رائع اليوم. هل تريد متابعة مهمة «الوصول إلى المنارة» أم تفضل أخذ استراحة؟",
  "تشير إجاباتك إلى قلق ترقّبي متوسط. أنصح بتعرّض أقصر لكن أكثر تكرارًا.",
  "تذكّر: الانزعاج مؤقت، ويقلّ مع كل تعرّض. أنت تحرز تقدمًا حقيقيًا.",
  "لقد أنشأت مهمة مخصصة بناءً على ملفك: «عبور الغابة» بمستوى شدة يناسبك 6/10.",
];

export const SUGGESTED_QUESTIONS = [
  "كيف أشعر اليوم؟",
  "اقترح عليّ تمرين تنفس",
  "ما هي مهمتي القادمة؟",
  "أشعر بالقلق قبل الجلسة",
  "لخّص تقدمي هذا الأسبوع",
];

export const MOTIVATIONAL = [
  "الشجاعة ليست غياب الخوف، بل قرار المضي قدمًا رغمه.",
  "كل تعرّض هو انتصار على التجنّب.",
  "شيئًا فشيئًا، يتعلّم الدماغ أن الخطر ليس حقيقيًا.",
];

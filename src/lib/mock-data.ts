export type Level = {
  id: number;
  title: string;
  mission: string;
  description: string;
  difficulty: "Douce" | "Modérée" | "Intense";
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
    title: "Premier souffle",
    mission: "Sauver un chaton",
    description:
      "Une immersion très douce dans un jardin ensoleillé. Le chaton est bloqué sur une petite marche : approche-toi calmement et rassure-le.",
    difficulty: "Douce",
    duration: 6,
    objectives: ["Respirer 4-7-8 pendant 60s", "Approcher le chaton", "Rester calme 3 minutes"],
    reward: "Badge Courage naissant",
    xp: 120,
    coins: 30,
    scene: "forest",
  },
  {
    id: 2,
    title: "Les clés du calme",
    mission: "Trouver les clés cachées",
    description:
      "Explore une pièce lumineuse et retrouve trois clés dissimulées. Chaque clé déclenche un exercice de respiration guidée.",
    difficulty: "Douce",
    duration: 8,
    objectives: ["Trouver 3 clés", "Maintenir le stress sous 4/10", "Terminer sans pause"],
    reward: "Badge Explorateur",
    xp: 150,
    coins: 35,
    scene: "forest",
  },
  {
    id: 3,
    title: "Pluie d'étoiles",
    mission: "Collecter les étoiles",
    description:
      "Une scène nocturne apaisante pour apprivoiser l'obscurité en collectant des étoiles lumineuses.",
    difficulty: "Douce",
    duration: 9,
    objectives: ["Collecter 12 étoiles", "Rester 5 min dans la pénombre", "Noter son ressenti"],
    reward: "Badge Nuit sereine",
    xp: 180,
    coins: 40,
    scene: "forest",
  },
  {
    id: 4,
    title: "Ami à quatre pattes",
    mission: "Secourir un chien",
    description:
      "Un chien amical attend derrière une barrière. L'exposition progressive permet de réduire la distance à ton rythme.",
    difficulty: "Modérée",
    duration: 10,
    objectives: ["Réduire la distance à 2m", "Caresser le chien", "Stress final < 5/10"],
    reward: "Badge Confiance animale",
    xp: 210,
    coins: 45,
    scene: "forest",
  },
  {
    id: 5,
    title: "Le pont suspendu",
    mission: "Réparer le pont",
    description:
      "Une première confrontation avec la hauteur : répare les planches d'un pont au-dessus d'une rivière calme.",
    difficulty: "Modérée",
    duration: 12,
    objectives: ["Poser 5 planches", "Regarder vers le bas 10s", "Traverser entièrement"],
    reward: "Badge Bâtisseur",
    xp: 250,
    coins: 55,
    scene: "mountain",
  },
  {
    id: 6,
    title: "Vers la lumière",
    mission: "Atteindre le phare",
    description:
      "Monte les marches du phare, palier par palier, avec des pauses de régulation émotionnelle.",
    difficulty: "Modérée",
    duration: 13,
    objectives: ["Monter 4 paliers", "Observer l'horizon", "Descendre sereinement"],
    reward: "Badge Gardien du phare",
    xp: 280,
    coins: 60,
    scene: "mountain",
  },
  {
    id: 7,
    title: "Sous la canopée",
    mission: "Traverser la forêt",
    description:
      "Une traversée forestière avec sons immersifs, insectes et ombres. Exposition combinée obscurité + animaux.",
    difficulty: "Intense",
    duration: 15,
    objectives: ["Traverser 3 zones", "Croiser une araignée", "Terminer sans quitter"],
    reward: "Badge Cœur vaillant",
    xp: 320,
    coins: 70,
    scene: "forest",
  },
  {
    id: 8,
    title: "L'ascension",
    mission: "Explorer la montagne",
    description:
      "Ascension guidée avec panoramas de plus en plus vertigineux et exercices d'ancrage.",
    difficulty: "Intense",
    duration: 16,
    objectives: ["Atteindre le sommet", "Rester 2 min au bord", "Photographier la vallée"],
    reward: "Badge Alpiniste",
    xp: 360,
    coins: 80,
    scene: "mountain",
  },
  {
    id: 9,
    title: "Le coffre oublié",
    mission: "Ouvrir le trésor",
    description:
      "Un ascenseur ancien mène à une salle secrète : exposition à l'espace clos avec renforcement positif.",
    difficulty: "Intense",
    duration: 17,
    objectives: ["Prendre l'ascenseur", "Rester 90s porte fermée", "Ouvrir le coffre"],
    reward: "Badge Chasseur de trésor",
    xp: 400,
    coins: 95,
    scene: "mountain",
  },
  {
    id: 10,
    title: "Grande scène",
    mission: "Célébrer la victoire",
    description:
      "Prise de parole devant une foule virtuelle bienveillante, puis célébration finale du parcours.",
    difficulty: "Intense",
    duration: 20,
    objectives: ["Parler 3 minutes", "Regarder le public", "Recevoir les applaudissements"],
    reward: "Trophée Maîtrise G_Phob",
    xp: 500,
    coins: 120,
    scene: "mountain",
  },
];

export const FEARS = [
  { id: "heights", fr: "Hauteurs", emoji: "🏔️" },
  { id: "spiders", fr: "Araignées", emoji: "🕷️" },
  { id: "dogs", fr: "Chiens", emoji: "🐕" },
  { id: "elevators", fr: "Ascenseurs", emoji: "🛗" },
  { id: "flying", fr: "Avion", emoji: "✈️" },
  { id: "darkness", fr: "Obscurité", emoji: "🌙" },
  { id: "crowds", fr: "Foules", emoji: "👥" },
  { id: "speaking", fr: "Parler en public", emoji: "🎤" },
  { id: "hospitals", fr: "Hôpitaux", emoji: "🏥" },
  { id: "blood", fr: "Sang", emoji: "🩸" },
  { id: "needles", fr: "Aiguilles", emoji: "💉" },
  { id: "other", fr: "Autre", emoji: "✨" },
];

export const ACHIEVEMENTS = [
  { id: "a1", name: "Premier pas", desc: "Terminer la première session", icon: "🌱", unlocked: true },
  { id: "a2", name: "Régularité", desc: "3 sessions en une semaine", icon: "🔥", unlocked: true },
  { id: "a3", name: "Souffle maîtrisé", desc: "10 exercices de respiration", icon: "🌬️", unlocked: true },
  { id: "a4", name: "Explorateur", desc: "Débloquer le niveau 4", icon: "🧭", unlocked: true },
  { id: "a5", name: "Cœur vaillant", desc: "Terminer une session intense", icon: "🦁", unlocked: false },
  { id: "a6", name: "Marathonien", desc: "20 sessions cumulées", icon: "🏅", unlocked: false },
  { id: "a7", name: "Zen", desc: "Stress moyen sous 3/10", icon: "🧘", unlocked: false },
  { id: "a8", name: "Maîtrise", desc: "Terminer les 10 niveaux", icon: "🏆", unlocked: false },
];

export const weeklySessions = [
  { day: "Lun", sessions: 2, stress: 6.2, mood: 5 },
  { day: "Mar", sessions: 1, stress: 5.6, mood: 6 },
  { day: "Mer", sessions: 3, stress: 5.1, mood: 7 },
  { day: "Jeu", sessions: 2, stress: 4.4, mood: 7 },
  { day: "Ven", sessions: 4, stress: 3.9, mood: 8 },
  { day: "Sam", sessions: 3, stress: 3.4, mood: 8 },
  { day: "Dim", sessions: 2, stress: 3.0, mood: 9 },
];

export const monthlyProgress = [
  { month: "Jan", sessions: 6, fear: 8.4, completion: 12 },
  { month: "Fév", sessions: 10, fear: 7.8, completion: 24 },
  { month: "Mar", sessions: 14, fear: 7.0, completion: 38 },
  { month: "Avr", sessions: 12, fear: 6.1, completion: 49 },
  { month: "Mai", sessions: 18, fear: 5.2, completion: 63 },
  { month: "Juin", sessions: 21, fear: 4.3, completion: 78 },
];

export const radarData = [
  { axis: "Calme", value: 78 },
  { axis: "Confiance", value: 66 },
  { axis: "Motivation", value: 88 },
  { axis: "Sommeil", value: 61 },
  { axis: "Concentration", value: 72 },
  { axis: "Autonomie", value: 69 },
];

export const pieData = [
  { name: "Terminées", value: 42 },
  { name: "En cours", value: 14 },
  { name: "Planifiées", value: 9 },
  { name: "Abandonnées", value: 3 },
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
  { id: "p1", name: "Yasmine Belkacem", age: 12, phobia: "Chiens", level: 4, sessions: 18, risk: "Faible", progress: 62, lastSession: "il y a 2 jours", status: "Actif" },
  { id: "p2", name: "Lucas Moreau", age: 27, phobia: "Hauteurs", level: 7, sessions: 31, risk: "Modéré", progress: 78, lastSession: "hier", status: "Actif" },
  { id: "p3", name: "Amine Haddad", age: 16, phobia: "Parler en public", level: 3, sessions: 9, risk: "Élevé", progress: 34, lastSession: "il y a 6 jours", status: "Pause" },
  { id: "p4", name: "Claire Dubois", age: 34, phobia: "Avion", level: 6, sessions: 24, risk: "Faible", progress: 71, lastSession: "il y a 3 jours", status: "Actif" },
  { id: "p5", name: "Nour Cherif", age: 9, phobia: "Obscurité", level: 2, sessions: 6, risk: "Modéré", progress: 21, lastSession: "aujourd'hui", status: "Actif" },
  { id: "p6", name: "Thomas Girard", age: 41, phobia: "Ascenseurs", level: 9, sessions: 44, risk: "Faible", progress: 92, lastSession: "il y a 5 jours", status: "Terminé" },
  { id: "p7", name: "Salma Torki", age: 22, phobia: "Araignées", level: 5, sessions: 20, risk: "Modéré", progress: 55, lastSession: "il y a 4 jours", status: "Actif" },
  { id: "p8", name: "Hugo Lefèvre", age: 14, phobia: "Aiguilles", level: 1, sessions: 3, risk: "Élevé", progress: 12, lastSession: "il y a 8 jours", status: "Pause" },
];

export const AI_REPLIES = [
  "Je perçois une belle progression dans vos dernières sessions. Votre niveau de stress moyen est passé de 6,2 à 3,8 sur 10.",
  "Respirez profondément : inspirez 4 secondes, retenez 7, expirez 8. Nous pouvons répéter ce cycle ensemble.",
  "Excellent travail aujourd'hui. Souhaitez-vous enchaîner sur la mission « Atteindre le phare » ou préférez-vous une pause ?",
  "Vos réponses suggèrent une anxiété anticipatoire modérée. Je recommande une exposition plus courte mais plus fréquente.",
  "Rappelez-vous : l'inconfort est temporaire, et il diminue à chaque exposition. Vous progressez réellement.",
  "J'ai généré une mission personnalisée basée sur votre profil : « Traverser la forêt » avec un niveau d'intensité adapté à 6/10.",
];

export const SUGGESTED_QUESTIONS = [
  "Comment je me sens aujourd'hui ?",
  "Propose-moi un exercice de respiration",
  "Quelle est ma prochaine mission ?",
  "Je me sens anxieux avant la séance",
  "Résume ma progression de la semaine",
];

export const MOTIVATIONAL = [
  "Le courage n'est pas l'absence de peur, mais la décision d'avancer malgré elle.",
  "Chaque exposition est une victoire sur l'évitement.",
  "Petit à petit, le cerveau apprend que le danger n'est pas réel.",
];

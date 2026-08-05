import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Role = "patient" | "therapist";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  age?: string;
  gender?: string;
  country?: string;
  emergency?: string;
};

export type Assessment = {
  fears: string[];
  intensity: number;
  duration: string;
  impact: string;
  sleep: number;
  stress: number;
  animal: string;
  hobby: string;
  color: string;
  game: string;
  music: string;
};

export type MoodEntry = { id: string; mood: string; note: string; date: string };

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  type: "reminder" | "session" | "achievement" | "appointment" | "quote";
  date: string;
  read: boolean;
};

type Progress = {
  xp: number;
  coins: number;
  completed: number[];
  sessions: number;
  streak: number;
};

type State = {
  user: User | null;
  assessment: Assessment | null;
  progress: Progress;
  moods: MoodEntry[];
  notifications: AppNotification[];
  theme: "light" | "dark";
};

const defaultState: State = {
  user: null,
  assessment: null,
  progress: { xp: 1840, coins: 320, completed: [1, 2, 3], sessions: 17, streak: 5 },
  moods: [
    { id: "m1", mood: "😊", note: "Bonne séance ce matin", date: "2026-08-03" },
    { id: "m2", mood: "😐", note: "Journée neutre", date: "2026-08-02" },
    { id: "m3", mood: "😨", note: "Anxiété avant la mission pont", date: "2026-08-01" },
  ],
  notifications: [
    { id: "n1", title: "Rappel quotidien", body: "Votre séance de 15 minutes vous attend.", type: "reminder", date: "Aujourd'hui, 09:00", read: false },
    { id: "n2", title: "Succès débloqué", body: "Badge « Explorateur » obtenu !", type: "achievement", date: "Hier, 18:24", read: false },
    { id: "n3", title: "Session terminée", body: "Niveau 3 — Pluie d'étoiles complété à 100%.", type: "session", date: "Hier, 18:20", read: true },
    { id: "n4", title: "Prochain rendez-vous", body: "Dr. Amina Rahmani — vendredi 14:30.", type: "appointment", date: "Il y a 2 jours", read: true },
    { id: "n5", title: "Citation du jour", body: "Chaque exposition est une victoire sur l'évitement.", type: "quote", date: "Il y a 2 jours", read: true },
  ],
  theme: "light",
};

type Ctx = State & {
  login: (email: string, role: Role) => void;
  register: (u: User) => void;
  logout: () => void;
  setAssessment: (a: Assessment) => void;
  completeLevel: (id: number, xp: number, coins: number) => void;
  addMood: (mood: string, note: string) => void;
  markAllRead: () => void;
  pushNotification: (n: Omit<AppNotification, "id" | "date" | "read">) => void;
  setTheme: (t: "light" | "dark") => void;
  level: number;
};

const AppCtx = createContext<Ctx | null>(null);
const KEY = "gphob.state";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state, hydrated]);

  const update = useCallback((fn: (s: State) => State) => setState(fn), []);

  const value = useMemo<Ctx>(() => {
    const level = Math.max(1, Math.min(10, state.progress.completed.length + 1));
    return {
      ...state,
      level,
      login: (email, role) =>
        update((s) => ({
          ...s,
          user: s.user
            ? { ...s.user, email, role }
            : {
                firstName: role === "therapist" ? "Amina" : "Yasmine",
                lastName: role === "therapist" ? "Rahmani" : "Belkacem",
                email,
                role,
              },
        })),
      register: (u) => update((s) => ({ ...s, user: u })),
      logout: () => update((s) => ({ ...s, user: null })),
      setAssessment: (a) => update((s) => ({ ...s, assessment: a })),
      completeLevel: (id, xp, coins) =>
        update((s) => ({
          ...s,
          progress: {
            ...s.progress,
            completed: s.progress.completed.includes(id)
              ? s.progress.completed
              : [...s.progress.completed, id],
            xp: s.progress.xp + xp,
            coins: s.progress.coins + coins,
            sessions: s.progress.sessions + 1,
          },
          notifications: [
            {
              id: `n${Date.now()}`,
              title: "Session terminée",
              body: `Niveau ${id} complété. +${xp} XP, +${coins} pièces.`,
              type: "session",
              date: "À l'instant",
              read: false,
            },
            ...s.notifications,
          ],
        })),
      addMood: (mood, note) =>
        update((s) => ({
          ...s,
          moods: [
            { id: `m${Date.now()}`, mood, note, date: new Date().toISOString().slice(0, 10) },
            ...s.moods,
          ],
        })),
      markAllRead: () =>
        update((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      pushNotification: (n) =>
        update((s) => ({
          ...s,
          notifications: [
            { ...n, id: `n${Date.now()}`, date: "À l'instant", read: false },
            ...s.notifications,
          ],
        })),
      setTheme: (t) => update((s) => ({ ...s, theme: t })),
    };
  }, [state, update]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppStateProvider");
  return ctx;
}

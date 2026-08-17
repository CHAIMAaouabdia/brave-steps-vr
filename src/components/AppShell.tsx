import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BrainCircuit,
  CalendarDays,
  FileText,
  Gauge,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Settings,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/lib/app-state";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", key: "nav.dashboard", icon: LayoutDashboard },
  { to: "/therapy", key: "nav.therapy", icon: Sparkles },
  { to: "/progress", key: "nav.progress", icon: Gauge },
  { to: "/mood", key: "nav.mood", icon: Heart },
  { to: "/ai", key: "nav.ai", icon: BrainCircuit },
  { to: "/calendar", key: "nav.calendar", icon: CalendarDays },
  { to: "/messages", key: "nav.messages", icon: MessageSquare },
  { to: "/files", key: "nav.files", icon: FileText },
  { to: "/profile", key: "nav.profile", icon: UserRound },
] as const;

const PRO_NAV = [
  { to: "/therapist", key: "nav.therapist", icon: Stethoscope },
  { to: "/admin", key: "nav.admin", icon: Shield },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const { t, lang, setLang } = useI18n();
  const { user, notifications, theme, setTheme, logout, level, progress } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => !n.read).length;

  const initials = user ? `${user.firstName[0] ?? "G"}${user.lastName[0] ?? "P"}` : "GP";

  const NavList = () => (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
            pathname === item.to
              ? "gradient-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
          )}
        >
          <item.icon className="size-4 shrink-0" />
          <span className="truncate">{t(item.key)}</span>
        </Link>
      ))}
      <p className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t("shell.pro")}
      </p>
      {PRO_NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
            pathname === item.to
              ? "gradient-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
          )}
        >
          <item.icon className="size-4 shrink-0" />
          <span className="truncate">{t(item.key)}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-72 flex-col border-e bg-sidebar p-5 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <BrainCircuit className="size-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight">G_Phob</span>
        </Link>
        <NavList />
        <div className="mt-auto rounded-3xl border bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">{t("shell.currentLevel")}</p>
          <p className="text-2xl font-bold">
            {t("shell.level")} {level}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full gradient-calm transition-all"
              style={{ width: `${Math.min(100, (progress.xp % 1000) / 10)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {progress.xp} XP · {progress.coins} 🪙
          </p>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-72 overflow-y-auto bg-sidebar p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold">G_Phob</span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>
            <NavList />
          </div>
        </div>
      )}

      <div className="lg:ps-72">
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
                {subtitle && (
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {action}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-semibold uppercase">
                    {lang}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(["fr", "en", "ar"] as Lang[]).map((l) => (
                    <DropdownMenuItem key={l} onClick={() => setLang(l)}>
                      {l === "fr" ? "Français" : l === "en" ? "English" : "العربية"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
              <Link to="/notifications" className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="size-5" />
                </Button>
                {unread > 0 && (
                  <Badge className="absolute -end-1 -top-1 size-5 justify-center rounded-full p-0 text-[10px]">
                    {unread}
                  </Badge>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-9 cursor-pointer border">
                    <AvatarFallback className="gradient-calm text-sm font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {user ? `${user.firstName} ${user.lastName}` : t("shell.guest")}
                    <p className="text-xs font-normal text-muted-foreground">
                      {user?.email ?? "demo@gphob.io"}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                    <UserRound className="size-4" /> {t("nav.profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
                    <Settings className="size-4" /> {t("nav.settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate({ to: "/" });
                    }}
                  >
                    <LogOut className="size-4" /> {t("auth.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="animate-rise p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

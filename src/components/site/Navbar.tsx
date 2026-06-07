import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/teachers", label: "Faculty" },
  { to: "/admissions", label: "Admissions" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "News" },
  { to: "/results", label: "Results" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-elegant" : "bg-background"
      }`}
    >
      <div className="container-prose flex items-center justify-between h-16 md:h-20 text-foreground flex-nowrap">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg overflow-hidden bg-white/5 border border-white/15 p-0.5 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-transform group-hover:scale-105 flex-shrink-0">
            <img src="/logo.png" alt="Galaxy Public School & College Logo" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight flex-shrink-0">
            <div className="font-display text-xs sm:text-sm xl:text-base font-bold whitespace-nowrap">Galaxy Public School</div>
            <div className="font-display text-[10px] sm:text-xs xl:text-sm font-semibold whitespace-nowrap text-white/90 mt-0.5">& College</div>
            <div className="text-[8px] sm:text-[9px] xl:text-[10px] tracking-[0.2em] text-white/60 uppercase mt-0.5">Umerkot</div>
          </div>
        </Link>
 
        <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
          {links.map((l) => {
            const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-md transition-all duration-300 relative whitespace-nowrap ${
                  active ? "text-[oklch(0.72_0.15_255)] drop-shadow-[0_0_8px_oklch(0.62_0.2_255/0.8)] font-semibold" : "text-white/70 hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)]"
                }`}
              >
                {l.label}
                {active && <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-[oklch(0.62_0.2_255)] shadow-[0_0_8px_oklch(0.62_0.2_255/0.8)] rounded-full animate-pulse" />}
              </Link>
            );
          })}
          <Link
            to="/admissions"
            className="ml-2 xl:ml-3 inline-flex items-center px-3 xl:px-4 py-2 rounded-md bg-[oklch(0.62_0.2_255)] text-white text-xs xl:text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.6)] hover:scale-[1.02] transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Apply Now
          </Link>
        </nav>
 
        <button
          aria-label="Toggle menu"
          className="xl:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
 
      {open && (
        <div className="xl:hidden border-t border-white/10 bg-background text-foreground">
          <div className="container-prose py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-2.5 text-sm font-medium border-b border-white/5 last:border-0 text-white/70 hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admissions"
              className="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[oklch(0.62_0.2_255)] text-white text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.6)] transition-all duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
